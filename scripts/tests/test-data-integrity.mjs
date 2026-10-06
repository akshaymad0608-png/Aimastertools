#!/usr/bin/env node
/**
 * Guards on data/tools.ts: no placeholder URLs, no duplicate ids, every tool
 * in a known category, and the tool records that were wrong stay fixed.
 *
 * Ten records shipped with https://<name>.example.com. That URL became the
 * "Visit website" link and `sameAs` in structured data on the live site, and
 * nothing in the pipeline noticed.
 *
 *   npm run test:data
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { isPlaceholderUrl } from '../../utils/placeholderUrl.mjs';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..', '..');
const read = (p) => readFileSync(resolve(ROOT, p), 'utf8');

const src = read('data/tools.ts');
const start = src.indexOf('Tool[] = [') + 'Tool[] = ['.length - 1;
const tools = eval(src.slice(start, src.indexOf('\n];', start) + 2)).filter(Boolean);
const categories = new Set([...read('data/categories.ts').matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1]));
const byId = new Map(tools.map((t) => [t.id, t]));

let failed = 0;
const check = (ok, msg) => {
  if (ok) return;
  failed++;
  console.error('  FAIL ' + msg);
};

// 1. placeholder hosts
for (const t of tools) {
  check(!isPlaceholderUrl(t.url), `${t.id}: url is a placeholder host (${t.url})`);
  check(!isPlaceholderUrl(`https://${t.domain || 'x.invalid-not-set'}`) || !t.domain, `${t.id}: domain is a placeholder (${t.domain})`);
  check(/^https?:\/\//.test(t.url || ''), `${t.id}: url is missing or not http(s) (${t.url})`);
}

// 2. ids unique, categories known
check(new Set(tools.map((t) => t.id)).size === tools.length, 'tool ids are not unique');
for (const t of tools) check(categories.has(t.category), `${t.id}: unknown category "${t.category}"`);

// 2b. a category with no tools renders as "No category called ..." after hydration
//     while the prerendered page and the sitemap still advertise it
const used = new Set(tools.map((t) => t.category));
for (const c of categories) check(used.has(c), `category "${c}" has no tools: remove it from data/categories.ts`);

// 3. records that were removed or corrected stay that way
const REMOVED = ['pixmax-ai', 'clico', 'magica', 'holo', 'ai-overview-optimizer', 'aimey', 'whisper-flow'];
for (const id of REMOVED) check(!byId.has(id), `${id} should stay removed`);
check(byId.get('wispr-flow')?.url === 'https://wisprflow.ai', 'wispr-flow should point at wisprflow.ai');
const nova = byId.get('novamira');
check(nova?.url === 'https://novamira.ai', 'novamira url should be https://novamira.ai');
check(nova && /wordpress/i.test(nova.description), 'novamira description should describe the WordPress plugin');
check(byId.get('pexo')?.url === 'https://pexo.ai', 'pexo url should be https://pexo.ai');
check(byId.get('i10x')?.url === 'https://i10x.ai', 'i10x url should be https://i10x.ai');

// 4. every removed tool page (and the removed category) redirects somewhere that exists
const redirects = JSON.parse(read('vercel.json')).redirects;
const categorySlugs = new Set(
  [...categories].map((c) =>
    c.toLowerCase().replace(/&/g, ' and ').replace(/\+/g, ' plus ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
  ),
);
for (const id of REMOVED) {
  const r = redirects.find((x) => x.source === `/tool/${id}`);
  check(r && r.permanent, `${id}: missing permanent redirect in vercel.json`);
  if (!r) continue;
  const toTool = r.destination.match(/^\/tool\/(.+)$/);
  const toCat = r.destination.match(/^\/category\/(.+)$/);
  check(
    (toTool && byId.has(toTool[1])) || (toCat && categorySlugs.has(toCat[1])) || r.destination === '/categories',
    `${id}: redirect target ${r.destination} does not exist`,
  );
}

check(redirects.some((x) => x.source === '/category/personal-assistant' && x.permanent), 'removed category /category/personal-assistant needs a permanent redirect');

// 5. /collections/best-free-ai-tools competed with the flagship /best-free-ai-tools.html for one
//    intent. It is gone from the data (so it is neither prerendered nor in the sitemap) and redirects.
const collectionsSrc = read('data/collections.ts');
check(!/best-free-ai-tools/.test(collectionsSrc), 'data/collections.ts must not define or reference the best-free-ai-tools collection');
const bf = redirects.find((x) => x.source === '/collections/best-free-ai-tools');
check(bf && bf.permanent && bf.destination === '/best-free-ai-tools.html', '/collections/best-free-ai-tools must 301 to /best-free-ai-tools.html');
check(!redirects.some((x) => x.source === '/best-free-ai-tools.html'), '/best-free-ai-tools.html must never be redirected');

if (failed) {
  console.error(`\n${failed} data-integrity check(s) failed`);
  process.exit(1);
}
console.log(`data integrity OK — ${tools.length} tools, ${categories.size} categories, ${REMOVED.length} removed ids redirected`);
