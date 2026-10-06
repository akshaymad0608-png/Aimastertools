#!/usr/bin/env node
/**
 * Guards on public/best-free-ai-tools.html.
 *
 * The page ranks around position 31 for the "free AI tools" cluster, so what it
 * claims matters twice: to readers and to the AdSense review. These checks keep
 * the claims sourced, the schema honest and the page in step with its data.
 *
 *   npm run test:bestfree
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..', '..');
const read = (p) => readFileSync(resolve(ROOT, p), 'utf8');
const SITE = 'https://aimastertools.space';
let failed = 0;
const check = (ok, msg) => { if (!ok) { failed++; console.error('  FAIL ' + msg); } };
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

const html = read('public/best-free-ai-tools.html');
const data = JSON.parse(read('data/editorial/best-free.json'));

// 1. the committed file is what the generator produces (same year)
const year = (html.match(/<title>Best Free AI Tools \((\d{4})\)/) || [])[1];
check(year, 'title does not have the expected "Best Free AI Tools (YEAR)" shape');
const expected = execFileSync('node', ['scripts/build-best-free.mjs', '--stdout'], {
  cwd: ROOT, env: { ...process.env, BUILD_YEAR: year }, encoding: 'utf8', maxBuffer: 16e6,
});
check(expected === html, 'public/best-free-ai-tools.html is out of date: run `npm run build:bestfree` and commit it');

// 2. title, H1, canonical, robots
const title = decode((html.match(/<title>(.*?)<\/title>/s) || [])[1] || '');
const h1 = decode((html.match(/<h1>(.*?)<\/h1>/s) || [])[1] || '');
const n = data.tools.length;
check(title === `Best Free AI Tools (${year}): ${n} Picks You Can Use Free`, `unexpected title: ${title}`);
check(h1 === `The Best Free AI Tools Online: ${n} Picks for ${year}`, `unexpected H1: ${h1}`);
check(html.includes(`<link rel="canonical" href="${SITE}/best-free-ai-tools.html" />`), 'canonical must be the page itself');
check(html.includes('<meta name="robots" content="index, follow, max-image-preview:large" />'), 'robots must stay "index, follow, max-image-preview:large"');
check((html.match(/<h1>/g) || []).length === 1, 'exactly one H1');

// 3. required H2s
const h2s = [...html.matchAll(/<h2>(.*?)<\/h2>/g)].map((m) => decode(m[1]));
for (const want of [
  'What are the best free AI tools?', 'Best free AI tools at a glance', `The ${n} best free AI tools, one by one`,
  'Free vs freemium: what “free” really means', 'Which free AI tool should you start with?', 'How we chose and checked these tools',
]) check(h2s.includes(want), `missing H2: ${want}`);

// 4. JSON-LD
const blocks = [...html.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)].map((m) => JSON.parse(m[1]));
const byType = (t) => blocks.find((b) => b['@type'] === t);
const bc = byType('BreadcrumbList');
check(bc && bc.itemListElement.map((i) => i.item).join('|') === `${SITE}/|${SITE}/free|${SITE}/best-free-ai-tools.html`, 'BreadcrumbList must be Home > Free AI tools > Best Free AI Tools');
const list = byType('ItemList');
const sitemap = existsSync(resolve(ROOT, 'public/sitemap.xml')) ? read('public/sitemap.xml') : '';
check(list && list.itemListElement.length === n, 'ItemList length must equal the number of tools');
const catalogue = (() => {
  const src = read('data/tools.ts');
  const s = src.indexOf('Tool[] = [') + 'Tool[] = ['.length - 1;
  return eval(src.slice(s, src.indexOf('\n];', s) + 2)).filter(Boolean);
})();
const ids = new Set(catalogue.map((t) => t.id));
for (const it of list?.itemListElement || []) {
  const m = (it.url || '').match(/^https:\/\/aimastertools\.space\/tool\/([a-z0-9-]+)$/);
  check(m && ids.has(m[1]), `ItemList item "${it.name}" has an invalid url: ${it.url}`);
  if (sitemap) check(sitemap.includes(`<loc>${it.url}</loc>`), `ItemList url is not in the sitemap: ${it.url}`);
}
// FAQPage must equal the visible FAQ, question for question and answer for answer
const faq = byType('FAQPage');
const visible = [...html.matchAll(/<div class="faq-item"><h3>(.*?)<\/h3><p>(.*?)<\/p><\/div>/g)].map((m) => [decode(m[1]), decode(m[2])]);
const schema = (faq?.mainEntity || []).map((q) => [q.name, q.acceptedAnswer.text]);
check(visible.length > 0 && JSON.stringify(visible) === JSON.stringify(schema), 'FAQPage JSON-LD does not match the visible FAQ exactly');
check(!blocks.some((b) => b['@type'] === 'Article' || b.author), 'no Article/author markup without a verified author');
check(!/example\.(com|org|net)/.test(html), 'no placeholder URLs');

// 5. claims
check(!/\b\d(\.\d)?\s*\/\s*5\b/.test(html) && !/\bratings?\b/i.test(html.replace(/<script[\s\S]*?<\/script>/g, '')), 'no rating claims');
for (const phrase of ['genuinely free', '100% free', 'no credit card', '(no cost)']) {
  check(!html.toLowerCase().includes(phrase), `unsupported claim "${phrase}"`);
}
const body = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
for (const m of body.matchAll(/completely free/gi)) {
  const ctx = body.slice(Math.max(0, m.index - 60), m.index + 40);
  check(/Which AI tools are completely free\?/.test(ctx), `"completely free" appears outside the FAQ question: …${ctx.replace(/\s+/g, ' ')}…`);
}

// 6. every tool is sourced and dated
for (const t of data.tools) {
  check(t.sources?.length > 0 && t.sources.every((s) => /^https:\/\//.test(s.url)), `${t.id}: needs https source URLs`);
  const card = html.match(new RegExp(`<article class="tool" id="${t.id}">[\\s\\S]*?</article>`));
  check(card && card[0].includes(`datetime="${data.checkedAt}"`) && t.sources.every((s) => card[0].includes(s.url.replace(/&/g, '&amp;'))), `${t.id}: card must show its sources and the check date`);
  check(card && card[0].includes(`href="/tool/${t.id}"`), `${t.id}: card must link to its /tool page`);
}
const today = new Date().toISOString().slice(0, 10);
check(data.checkedAt <= today, 'checkedAt is in the future');
const ageDays = Math.floor((Date.parse(today) - Date.parse(data.checkedAt)) / 864e5);
if (ageDays > 90) console.warn(`  WARN free-plan facts were last checked ${ageDays} days ago: re-verify and update checkedAt`);

// 7. internal links all resolve
const cats = new Set([...read('data/categories.ts').matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1].toLowerCase().replace(/&/g, ' and ').replace(/\+/g, ' plus ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')));
for (const m of html.matchAll(/<a [^>]*href="(\/[^"#]*)"/g)) {
  const p = m[1];
  let ok = false;
  if (p === '/') ok = true;
  else if (/^\/tool\//.test(p)) ok = ids.has(p.slice(6));
  else if (/^\/category\//.test(p)) ok = cats.has(p.slice(10));
  else if (/^\/alternatives\/(.+)-alternatives$/.test(p)) ok = ids.has(p.match(/^\/alternatives\/(.+)-alternatives$/)[1]);
  else if (/\.html$/.test(p)) ok = existsSync(resolve(ROOT, 'public' + p));
  else ok = !sitemap || sitemap.includes(`<loc>${SITE}${p}</loc>`) || ['/affiliate-disclosure'].includes(p);
  check(ok, `internal link does not resolve: ${p}`);
}
check(/href="\/free"/.test(html), 'must link to the /free hub');

// 8. substance
const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
check(words >= 1500, `only ${words} words of static content`);

if (failed) { console.error(`\n${failed} best-free-ai-tools check(s) failed`); process.exit(1); }
console.log(`best-free-ai-tools OK — ${n} sourced tools, ${visible.length} FAQs match the schema, ${words} words, checked ${data.checkedAt}`);
