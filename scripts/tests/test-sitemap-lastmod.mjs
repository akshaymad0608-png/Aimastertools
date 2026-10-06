#!/usr/bin/env node
/**
 * The sitemap must carry <lastmod>, and data/sitemap-lastmod.json must be up
 * to date with what the generator produces.
 *
 * Runs the generator. It rewrites the manifest if any page's content changed
 * since the committed one — in which case this fails and the new file must be
 * committed, otherwise production would stamp those pages with the deploy date.
 *
 *   npm run test:sitemap
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..', '..');
const MANIFEST = resolve(ROOT, 'data/sitemap-lastmod.json');
const run = () => execFileSync('node', ['scripts/generate-sitemap.mjs'], { cwd: ROOT, stdio: 'pipe' });
let failed = 0;
const fail = (m) => { failed++; console.error('  FAIL ' + m); };

const before = readFileSync(MANIFEST, 'utf8');
run();
const after = readFileSync(MANIFEST, 'utf8');
if (before !== after) fail('data/sitemap-lastmod.json was out of date — the generator rewrote it; commit the new file');
run();
if (readFileSync(MANIFEST, 'utf8') !== after) fail('the generator is not deterministic: a second run changed the manifest');

const xml = readFileSync(resolve(ROOT, 'public/sitemap.xml'), 'utf8');
const blocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
const manifest = JSON.parse(after);
const today = new Date().toISOString().slice(0, 10);
let dated = 0;
const locs = new Set();
for (const b of blocks) {
  const loc = b.match(/<loc>([^<]+)<\/loc>/)[1].replace('https://aimastertools.space', '') || '/';
  const lm = (b.match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1];
  locs.add(loc);
  if (!lm) continue;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lm) || lm > today) { fail(`${loc}: invalid or future lastmod ${lm}`); continue; }
  dated++;
  if (manifest[loc]?.lastmod !== lm) fail(`${loc}: sitemap lastmod ${lm} differs from the manifest`);
}
if (dated / blocks.length < 0.95) fail(`only ${dated}/${blocks.length} sitemap URLs have a lastmod`);
const stale = Object.keys(manifest).filter((k) => !locs.has(k));
if (stale.length) fail(`manifest keeps ${stale.length} URL(s) that are not in the sitemap, e.g. ${stale[0]}`);

if (failed) { console.error(`\n${failed} sitemap check(s) failed`); process.exit(1); }
console.log(`sitemap lastmod OK — ${dated}/${blocks.length} URLs dated, manifest current and deterministic`);
