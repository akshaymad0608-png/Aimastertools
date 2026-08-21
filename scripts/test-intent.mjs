#!/usr/bin/env node
/**
 * Cases for the intent parser.
 *
 * This file exists because the category rule has now been wrong twice, in
 * opposite directions, and both times it looked right until someone typed a
 * real query:
 *
 *   longest match wins   -> "phone under 25000 with a good camera" gave cameras
 *   earliest match wins  -> "best camera phone"                    gave cameras
 *
 * Same wrong answer, opposite mistakes. A third change to that function without
 * a list like this would just be the third guess.
 *
 *   npm run test:intent
 */
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { rmSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const OUT = join(tmpdir(), `intent-test-${process.pid}.mjs`);

execFileSync(
  'npx',
  ['esbuild', 'lib/shopping/intent.ts', '--bundle', '--format=esm', '--platform=node', `--outfile=${OUT}`],
  { cwd: ROOT, stdio: 'pipe', shell: true },
);
const { parseIntent } = await import(pathToFileURL(OUT).href);

// [query, expected category, expected maxPrice (undefined = none)]
const CASES = [
  // The head noun is what is being bought.
  ['best camera phone', 'smartphones', undefined],
  ['camera phone', 'smartphones', undefined],
  ['camera-phone', 'smartphones', undefined],
  ['phone under 25000 with a good camera', 'smartphones', 25000],
  ['gaming laptop under 60000', 'laptops', 60000],
  ['laptop for video editing', 'laptops', undefined],
  ['dslr camera', 'cameras', undefined],
  ['camera under 50000', 'cameras', 50000],

  // Overlapping phrases: the longer one is the more specific.
  ['smart tv', 'smart-tvs', undefined],
  ['55 inch smart tv under 70k', 'smart-tvs', 70000],
  ['oled tv', 'smart-tvs', undefined],

  // Budgets in the forms people actually write.
  ['laptop under 80000', 'laptops', 80000],
  ['laptop under 80k', 'laptops', 80000],
  ['laptop under ₹80,000', 'laptops', 80000],
  ['laptop under 1.5 lakh', 'laptops', 150000],
  ['phone upto rs 30000', 'smartphones', 30000],

  // Plain single nouns.
  ['iphone', 'smartphones', undefined],
  ['earbuds under 3000', 'earbuds', 3000],
  ['router', 'networking', undefined],
  ['ipad', 'tablets', undefined],
  ['ps5', 'gaming', undefined],
  ['washing machine', 'home-appliances', undefined],
  ['power bank', 'power-banks', undefined],

  // Nothing recognisable is a valid answer, not a guess.
  ['something nice', undefined, undefined],
];

let failed = 0;
console.log(`\nParsing ${CASES.length} queries\n`);

for (const [q, wantCat, wantMax] of CASES) {
  const got = parseIntent(q);
  const okCat = got.category === wantCat;
  const okMax = got.maxPrice === wantMax;
  if (okCat && okMax) {
    console.log(`  ok  ${q}`);
  } else {
    failed++;
    console.log(`  XX  ${q}`);
    if (!okCat) console.log(`        category: got ${got.category ?? '(none)'}, want ${wantCat ?? '(none)'}`);
    if (!okMax) console.log(`        maxPrice: got ${got.maxPrice ?? '(none)'}, want ${wantMax ?? '(none)'}`);
  }
}

rmSync(OUT, { force: true });
console.log(failed ? `\n  ${failed} of ${CASES.length} wrong.\n` : `\n  All ${CASES.length} parsed as expected.\n`);
process.exit(failed ? 1 : 0);
