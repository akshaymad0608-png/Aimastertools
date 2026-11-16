#!/usr/bin/env node
/**
 * Builds public/sitemap-recrawl.xml: a TEMPORARY sitemap of pages that are
 * noindex on purpose (see generate-sitemap.mjs and prerender.mjs).
 *
 * Why it exists: the pruning deploy on 10 Oct 2026 added noindex to roughly
 * 1,500 thin pages (comparisons, non-curated alternatives, tool pages without a
 * write-up). Google last crawled many of them in late September, so it has not
 * seen the noindex yet and still lists them as indexed. A sitemap with a
 * lastmod newer than the last crawl asks Google to look again.
 *
 * It is NOT referenced from robots.txt or the main sitemap. Submit it by hand in
 * Search Console (Sitemaps), expect "Submitted URL marked 'noindex'" for these
 * URLs, which is the point, and delete this file and the sitemap entry in
 * Search Console once the Page indexing report shows them as excluded.
 *
 * The selection rules mirror generate-sitemap.mjs; keep the two in step.
 *
 * Run: node scripts/generate-recrawl-sitemap.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://aimastertools.space';
/** The day the noindex went live (PR #23). Honest, and later than the last crawl. */
const NOINDEX_DATE = '2026-10-10';

const read = (rel) => {
  const p = resolve(ROOT, rel);
  return existsSync(p) ? readFileSync(p, 'utf8') : '';
};
const slugify = (v) =>
  v.toLowerCase().replace(/&/g, ' and ').replace(/\+/g, ' plus ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const src = read('data/tools.ts');
const start = src.indexOf('Tool[] = [') + 'Tool[] = ['.length - 1;
const all = eval(src.slice(start, src.indexOf('\n];', start) + 2)).filter(Boolean);

const seenId = new Set();
const byId = all.filter((t) => t.id && !seenId.has(t.id) && seenId.add(t.id));
const canon = new Map();
for (const t of byId) {
  const k = (t.name || '').trim().toLowerCase();
  const prev = canon.get(k);
  if (!prev || t.id.length < prev.id.length) canon.set(k, t);
}
const canonical = byId.filter((t) => canon.get((t.name || '').trim().toLowerCase()) === t);

const isEditorialTool = (t) => ((t && t.longDescription) || '').length >= 150 && !/AI Master Tools/.test(t.longDescription);
const curated = new Set(Object.keys(JSON.parse(read('data/curatedAlternatives.json'))));

const urls = [];
for (const t of canonical) {
  if (!isEditorialTool(t)) urls.push(`/tool/${encodeURIComponent(t.id)}`);
  if (!curated.has(t.id)) urls.push(`/alternatives/${slugify(t.id)}-alternatives`);
}

// Comparison pairs: top four tools per category by rating, paired.
const byCategory = new Map();
for (const t of canonical) {
  if (!byCategory.has(t.category)) byCategory.set(t.category, []);
  byCategory.get(t.category).push(t);
}
const seenPair = new Set();
for (const list of byCategory.values()) {
  const top = [...list].sort((p, q) => q.rating - p.rating).slice(0, 4);
  for (let i = 0; i < top.length; i++) {
    for (let j = i + 1; j < top.length; j++) {
      const [x, y] = top[i].id.localeCompare(top[j].id) <= 0 ? [top[i], top[j]] : [top[j], top[i]];
      const slug = `${slugify(x.id)}-vs-${slugify(y.id)}`;
      if (seenPair.has(slug)) continue;
      seenPair.add(slug);
      urls.push(`/compare/${slug}`);
    }
  }
}

const unique = [...new Set(urls)];
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique.map((u) => `  <url>\n    <loc>${esc(SITE + u)}</loc>\n    <lastmod>${NOINDEX_DATE}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
writeFileSync(resolve(ROOT, 'public/sitemap-recrawl.xml'), xml, 'utf8');
console.log(`sitemap-recrawl.xml written: ${unique.length} URLs (tools ${unique.filter((u) => u.startsWith('/tool/')).length}, alternatives ${unique.filter((u) => u.startsWith('/alternatives/')).length}, comparisons ${unique.filter((u) => u.startsWith('/compare/')).length})`);
