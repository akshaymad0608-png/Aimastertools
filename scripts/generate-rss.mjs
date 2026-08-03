#!/usr/bin/env node
/**
 * Builds public/rss.xml from data/blogs.ts so readers and aggregators can
 * subscribe to the blog. Runs at build time alongside the sitemap.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://aimastertools.space';

const src = readFileSync(resolve(ROOT, 'data/blogs.ts'), 'utf8');
const marker = ': BlogPost[] = ';
const start = src.indexOf(marker) + marker.length;
const end = src.indexOf('\n];', start);
const raw = eval(src.slice(start, end + 2));

// de-dup by id (first wins), keep order
const seen = new Set();
const posts = raw.filter((p) => p && p.id && !seen.has(p.id) && seen.add(p.id));

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const rfc822 = (d) => {
  const date = new Date(d);
  return isNaN(date) ? new Date().toUTCString() : date.toUTCString();
};

const items = posts
  .map((p) => {
    const link = `${SITE}/blog/${p.slug || p.id}`;
    return `    <item>
      <title>${esc(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      ${p.category ? `<category>${esc(p.category)}</category>` : ''}
      <description>${esc(p.excerpt || '')}</description>
    </item>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI Master Tools — Blog</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>AI tool guides, comparisons and prompt-engineering tutorials from AI Master Tools.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

writeFileSync(resolve(ROOT, 'public/rss.xml'), xml, 'utf8');
console.log(`rss.xml written — ${posts.length} posts`);
