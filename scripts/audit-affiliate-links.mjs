#!/usr/bin/env node
/**
 * Check every stored affiliate link before it goes out.
 *
 * This exists because of a link that shipped reporting to techakki0a-21 — a
 * tracking id from a different Associates account — while this site's own is
 * aimastertools-21. It worked. It looked right. Every sale through it would
 * have paid somewhere else, and nothing in the codebase noticed, because
 * nothing was looking.
 *
 * It reports; it never repairs. Rewriting the tag inside a Special Link is the
 * one thing not to do — the fix is always to regenerate it in SiteStripe with
 * the right tracking id selected.
 *
 *   npm run audit:links
 *
 * Exits non-zero when a link would pay the wrong account, so it can gate a
 * deploy if you want it to.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve, dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const OUT = join(tmpdir(), `aff-audit-${process.pid}.mjs`);

let auditAffiliateUrl;
let DEFAULT_ASSOCIATE_ID;
try {
  // esbuild is already a build dependency; hand-stripping TypeScript breaks on
  // the first optional parameter it meets.
  execFileSync(
    'npx',
    ['esbuild', 'lib/shopping/affiliate.ts', '--bundle', '--format=esm', '--platform=node', `--outfile=${OUT}`],
    { cwd: ROOT, stdio: 'pipe', shell: true },
  );
  ({ auditAffiliateUrl, DEFAULT_ASSOCIATE_ID } = await import(pathToFileURL(OUT).href));
} catch (err) {
  console.error('\n  Could not build the affiliate module:', err?.message ?? err);
  process.exit(1);
}

const src = readFileSync(join(ROOT, 'data/products.ts'), 'utf8');
const OPEN = 'export const PRODUCTS: Product[] = [';
const start = src.indexOf(OPEN) + OPEN.length - 1;
const end = src.indexOf('\n];', start);

let products = [];
if (start >= OPEN.length && end > 0) {
  try {
    products = eval(src.slice(start, end) + ']').filter(Boolean);
  } catch (err) {
    // A parse failure must be loud. Silently auditing zero links would report
    // a clean run over a catalogue it never read.
    console.error('\n  Could not parse data/products.ts:', err?.message ?? err);
    rmSync(OUT, { force: true });
    process.exit(1);
  }
}

console.log(`\nAuditing ${products.length} product link(s) against ${DEFAULT_ASSOCIATE_ID}\n`);

let bad = 0;
for (const p of products) {
  if (!p.affiliateUrl) {
    console.log(`  –  ${p.id}: no link stored (the card renders no button)`);
    continue;
  }
  const a = auditAffiliateUrl(p.affiliateUrl, DEFAULT_ASSOCIATE_ID);
  if (!a.ok) bad++;
  console.log(`  ${a.ok ? 'ok' : 'XX'} ${p.id}${a.asin ? `  asin ${a.asin}` : ''}${a.tag ? `  tag ${a.tag}` : ''}`);
  for (const e of a.errors) console.log(`       error:   ${e}`);
  for (const w of a.warnings) console.log(`       warning: ${w}`);
}

rmSync(OUT, { force: true });
console.log(bad ? `\n  ${bad} link(s) would pay the wrong account.\n` : '\n  All links report to the expected tracking id.\n');
process.exit(bad ? 1 : 0);
