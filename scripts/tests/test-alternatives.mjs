#!/usr/bin/env node
/**
 * Guards on data/editorial/alternatives.json, the source for the twelve
 * /alternatives/* pages that are allowed into the index.
 *
 * The other ~640 alternatives pages are generated from the tool records alone
 * and stay noindex. These twelve are only worth indexing while each has a
 * real, distinct list and facts that trace back to an official page, so the
 * rules below fail the build when a page drifts back towards a template or a
 * claim loses its source.
 *
 *   npm run test:alternatives
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { buildAltPage, isExternalRef, ALT_TITLE_MIN, ALT_TITLE_MAX } from '../../utils/altEditorial.mjs';
import { isPlaceholderUrl } from '../../utils/placeholderUrl.mjs';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..', '..');
const read = (p) => readFileSync(resolve(ROOT, p), 'utf8');

const src = read('data/tools.ts');
const start = src.indexOf('Tool[] = [') + 'Tool[] = ['.length - 1;
const tools = eval(src.slice(start, src.indexOf('\n];', start) + 2)).filter(Boolean);
const byId = new Map(tools.map((t) => [t.id, t]));
const data = JSON.parse(read('data/editorial/alternatives.json'));
const slugify = (v) => v.toLowerCase().replace(/&/g, ' and ').replace(/\+/g, ' plus ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

let failed = 0;
const check = (ok, msg) => {
  if (ok) return;
  failed++;
  console.error('  FAIL ' + msg);
};

const MAX_PAGES = 12;
const MIN_ALTS = 5;

check(/^\d{4}-\d{2}-\d{2}$/.test(data.checkedAt || ''), `checkedAt is not an ISO date (${data.checkedAt})`);
check(!Number.isNaN(Date.parse(data.checkedAt)) && Date.parse(data.checkedAt) <= Date.now() + 864e5, 'checkedAt is in the future');
check(data.pages.length > 0 && data.pages.length <= MAX_PAGES, `whitelist has ${data.pages.length} pages; it is capped at ${MAX_PAGES} on purpose. Raise MAX_PAGES only for a decision, not a drift.`);

const subjects = data.pages.map((p) => p.subject);
check(new Set(subjects).size === subjects.length, 'a subject appears twice');

// ---- facts: every claim has a source, no prices, no placeholder hosts
const PRICE = /(\$\s?\d|€\s?\d|£\s?\d|\b\d+(?:\.\d+)?\s?(?:usd|eur|gbp|dollars?)\b|\bper (?:month|year)\b|\/\s?(?:mo|month|yr|year)\b)/i;
const UNSUPPORTED = /\b(best-in-class|world[- ]class|guaranteed|#1\b|number one|unbeatable|revolutionary)\b/i;
for (const [key, f] of Object.entries(data.facts)) {
  check(typeof f.what === 'string' && f.what.length > 0, `${key}: fact has no "what"`);
  if (f.access) check((f.sources || []).length > 0, `${key}: states access/pricing but lists no source`);
  for (const s of f.sources || []) {
    check(/^https:\/\//.test(s.url) && !isPlaceholderUrl(s.url), `${key}: bad source url ${s.url}`);
    check(s.label && s.label.length > 2, `${key}: source without a label (${s.url})`);
  }
  for (const [field, text] of [['what', f.what], ['access', f.access]]) {
    check(!PRICE.test(text || ''), `${key}.${field}: quotes a price, which goes stale (${(text || '').match(PRICE)?.[0]})`);
    check(!UNSUPPORTED.test(text || ''), `${key}.${field}: promotional wording`);
  }
}
for (const [key, e] of Object.entries(data.externals)) {
  check(key.startsWith('ext:'), `${key}: external keys start with "ext:"`);
  check(/^https:\/\//.test(e.url) && !isPlaceholderUrl(e.url), `${key}: bad url ${e.url}`);
  check(!!data.facts[key], `${key}: external has no fact entry`);
}

// ---- pages
const signatures = [];
const titles = new Set();
for (const page of data.pages) {
  const id = page.subject;
  const tool = byId.get(id);
  check(!!tool, `${id}: subject is not a tool id`);
  if (!tool) continue;
  check(page.intro && page.intro.length > 120, `${id}: intro is missing or too short`);
  check(!PRICE.test(page.intro), `${id}: intro quotes a price`);
  check(page.alternatives.length >= MIN_ALTS, `${id}: ${page.alternatives.length} alternatives, need at least ${MIN_ALTS}`);
  check(page.pickIf?.length >= 2, `${id}: needs at least two "how to choose" lines`);
  check(page.faqs?.length >= 2, `${id}: needs at least two FAQs`);
  check(!!data.facts[id], `${id}: subject has no fact entry`);

  const refs = page.alternatives.map((a) => a.ref);
  check(new Set(refs).size === refs.length, `${id}: duplicate alternative`);
  check(!refs.includes(id), `${id}: lists itself as an alternative`);
  for (const a of page.alternatives) {
    check(isExternalRef(a.ref) ? !!data.externals[a.ref] : byId.has(a.ref), `${id}: unknown alternative "${a.ref}"`);
    check(!!data.facts[a.ref], `${id}: "${a.ref}" has no fact entry`);
    check(a.bestFor && a.differs, `${id}/${a.ref}: needs both bestFor and differs`);
    for (const t of [a.bestFor, a.differs]) {
      check(!PRICE.test(t || ''), `${id}/${a.ref}: quotes a price`);
      check(!UNSUPPORTED.test(t || ''), `${id}/${a.ref}: promotional wording`);
    }
  }
  signatures.push([id, new Set(refs)]);

  const built = buildAltPage({ data, tools, subjectId: id, slugify, siteUrl: 'https://aimastertools.space', year: 2026 });
  check(!!built, `${id}: buildAltPage returned nothing`);
  if (!built) continue;
  check(built.title.length >= ALT_TITLE_MIN && built.title.length <= ALT_TITLE_MAX, `${id}: title is ${built.title.length} characters (${built.title})`);
  check(built.description.length >= 100 && built.description.length <= 160, `${id}: description is ${built.description.length} characters`);
  check(!titles.has(built.title), `${id}: title is not unique`);
  titles.add(built.title);
  check(built.schemas.map((s) => s['@type']).join() === 'BreadcrumbList,ItemList,FAQPage', `${id}: wrong schema set`);
  const crumbs = built.schemas[0].itemListElement.map((x) => x.name);
  check(crumbs.join('>') === `Home>${tool.name}>Alternatives`, `${id}: breadcrumb is ${crumbs.join('>')}`);
  check(built.schemas[1].itemListElement.length === refs.length, `${id}: ItemList does not match the table`);
  check(built.schemas[1].itemListElement.every((e) => /^https:\/\//.test(e.url) && !/example\./.test(e.url)), `${id}: ItemList item without an absolute url`);
}

// ---- lists must differ from each other
for (let i = 0; i < signatures.length; i++) {
  for (let j = i + 1; j < signatures.length; j++) {
    const [a, A] = signatures[i];
    const [b, B] = signatures[j];
    const shared = [...A].filter((x) => B.has(x)).length;
    const jaccard = shared / (A.size + B.size - shared);
    check(jaccard < 0.6, `${a} and ${b} share ${shared} alternatives (${Math.round(jaccard * 100)}%); lists should differ`);
  }
}

// ---- optional: the build output, when there is one
if (existsSync(resolve(ROOT, 'dist/sitemap.xml')) || existsSync(resolve(ROOT, 'public/sitemap.xml'))) {
  const sm = read(existsSync(resolve(ROOT, 'dist/sitemap.xml')) ? 'dist/sitemap.xml' : 'public/sitemap.xml');
  for (const id of subjects) {
    const loc = `https://aimastertools.space/alternatives/${slugify(id)}-alternatives`;
    check(sm.includes(`<loc>${loc}</loc>`), `${id}: whitelisted page is not in the sitemap`);
  }
  const altUrls = [...sm.matchAll(/<loc>[^<]*\/alternatives\/([^<]+)<\/loc>/g)].length;
  check(altUrls === subjects.length, `sitemap lists ${altUrls} alternatives URLs, expected exactly ${subjects.length}`);
}
const dist = (p) => resolve(ROOT, 'dist', p, 'index.html');
if (existsSync(dist('alternatives/roadmap-sh-alternatives'))) {
  for (const id of subjects) {
    const html = readFileSync(dist(`alternatives/${slugify(id)}-alternatives`), 'utf8');
    check(!/<meta[^>]+name="robots"[^>]+noindex/i.test(html), `${id}: built page is noindex`);
    check(/<link[^>]+rel="canonical"[^>]+href="https:\/\/aimastertools\.space\/alternatives\/[^"]+-alternatives"/.test(html), `${id}: canonical is missing or wrong`);
  }
  const other = tools.find((t) => !subjects.includes(t.id) && existsSync(dist(`alternatives/${slugify(t.id)}-alternatives`)));
  if (other) {
    const html = readFileSync(dist(`alternatives/${slugify(other.id)}-alternatives`), 'utf8');
    check(/noindex/i.test(html), `${other.id}: a non-whitelisted alternatives page is indexable`);
  }
}

if (failed) {
  console.error(`\n${failed} alternatives check(s) failed.`);
  process.exit(1);
}
console.log(`alternatives: ${data.pages.length} pages · ${Object.keys(data.facts).length} facts · all sourced, distinct and within limits — OK`);
