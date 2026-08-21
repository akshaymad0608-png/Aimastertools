#!/usr/bin/env node
/**
 * Cases for the outbound link resolver, plus an audit of every affiliate link
 * currently stored on a tool.
 *
 * The rel on an outbound link is the one piece of a directory that is both
 * invisible and legally loaded. Before this resolver existed, eight files each
 * chose their own and three different values were live at once — one of them
 * declaring 699 unpaid links as paid, another passing ranking to every vendor
 * on the list. None of it was visible on the page, so nothing caught it.
 *
 *   npm run test:outbound
 */
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { readFileSync, rmSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const OUT = join(tmpdir(), `outbound-test-${process.pid}.mjs`);

execFileSync(
  'npx',
  ['esbuild', 'lib/affiliate/outbound.ts', '--bundle', '--format=esm', '--platform=node', `--outfile=${OUT}`],
  { cwd: ROOT, stdio: 'pipe', shell: true },
);
const { resolveToolLink, auditToolLink } = await import(pathToFileURL(OUT).href);

const AFF = 'noopener noreferrer sponsored nofollow';
const PLAIN = 'noopener noreferrer nofollow';

// [label, tool, expected rel, expected isAffiliate, expected href test]
const CASES = [
  [
    'plain listing gets nofollow and NOT sponsored',
    { name: 'Clay', url: 'https://clay.com' },
    PLAIN, false, (h) => h === 'https://clay.com',
  ],
  [
    'affiliate link gets sponsored and is used as the href',
    { name: 'Jasper', url: 'https://jasper.ai', affiliateUrl: 'https://partner.example/track?id=abc' },
    AFF, true, (h) => h === 'https://partner.example/track?id=abc',
  ],
  [
    'empty affiliateUrl falls back to the site, not to sponsored',
    { name: 'Notion', url: 'https://notion.so', affiliateUrl: '   ' },
    PLAIN, false, (h) => h === 'https://notion.so',
  ],
  [
    'a "#" url falls back to a search and is never affiliate',
    { name: 'Some Tool', url: '#' },
    PLAIN, false, (h) => h.startsWith('https://www.google.com/search'),
  ],
  [
    'a malformed url falls back instead of throwing',
    { name: 'Broken Tool', url: 'htp:/not a url' },
    PLAIN, false, (h) => h.startsWith('https://www.google.com/search'),
  ],
  [
    'a javascript: url is refused',
    { name: 'Nasty', url: 'javascript:alert(1)' },
    PLAIN, false, (h) => h.startsWith('https://www.google.com/search'),
  ],
  [
    'a javascript: AFFILIATE url is refused too',
    { name: 'Nasty2', url: 'https://ok.com', affiliateUrl: 'javascript:alert(1)' },
    PLAIN, false, (h) => h === 'https://ok.com',
  ],
];

let failed = 0;
console.log(`\nResolving ${CASES.length} outbound links\n`);

for (const [label, tool, wantRel, wantAff, hrefOk] of CASES) {
  const got = resolveToolLink(tool);
  const problems = [];
  if (got.rel !== wantRel) problems.push(`rel: got "${got.rel}", want "${wantRel}"`);
  if (got.isAffiliate !== wantAff) problems.push(`isAffiliate: got ${got.isAffiliate}, want ${wantAff}`);
  if (!hrefOk(got.href)) problems.push(`href: got "${got.href}"`);

  if (!problems.length) {
    console.log(`  ok  ${label}`);
  } else {
    failed++;
    console.log(`  XX  ${label}`);
    for (const p of problems) console.log(`        ${p}`);
  }
}

// Audit whatever is actually stored today.
const src = readFileSync(join(ROOT, 'data/tools.ts'), 'utf8');
const withAffiliate = (src.match(/affiliateUrl:\s*'[^']*'/g) || []).length;
console.log(`\nTools carrying an affiliate link: ${withAffiliate}`);

if (withAffiliate === 0) {
  console.log('  Nothing to audit yet. Every tool links to its own site, unpaid and nofollow.');
} else {
  // Pull just the records that have one, without standing up TypeScript.
  const OPEN = 'export const MOCK_TOOLS: Tool[] = [';
  const start = src.indexOf(OPEN) + OPEN.length - 1;
  const end = src.indexOf('\n];', start);
  let tools = [];
  try {
    tools = eval(src.slice(start, end) + ']').filter((t) => t && t.affiliateUrl);
  } catch (err) {
    console.error('  Could not parse data/tools.ts:', err?.message ?? err);
    rmSync(OUT, { force: true });
    process.exit(1);
  }
  for (const t of tools) {
    const a = auditToolLink(t);
    if (!a.ok) failed++;
    console.log(`  ${a.ok ? 'ok' : 'XX'} ${t.id}${a.host ? `  -> ${a.host}` : ''}`);
    for (const e of a.errors) console.log(`       error:   ${e}`);
    for (const w of a.warnings) console.log(`       warning: ${w}`);
  }
}

rmSync(OUT, { force: true });
console.log(failed ? `\n  ${failed} problem(s).\n` : '\n  All good.\n');
process.exit(failed ? 1 : 0);
