#!/usr/bin/env node
/**
 * Builds public/sitemap.xml from the data files.
 *
 * The data modules are TypeScript and pull in React types, so importing them
 * here would mean standing up a whole compiler for what is fundamentally a
 * string-extraction job. Instead the ids and slugs are plucked with regexes.
 * That is brittle if the data format changes, which is why the script fails
 * loudly on an empty result rather than quietly writing a sitemap with four
 * URLs in it — a silently-truncated sitemap is worse than none at all.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const SITE = 'https://aimastertools.space';

const read = (rel) => {
  const p = resolve(ROOT, rel);
  return existsSync(p) ? readFileSync(p, 'utf8') : '';
};

/* ------------------------------------------------------------ git dates -- */

const git = (args) => {
  try {
    return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
};

/**
 * A shallow clone stamps HEAD on every path. Detect it up front so the
 * fallback (previous sitemap dates) stays honest.
 */
const HISTORY_OK = (() => {
  if (!git(['rev-parse', '--git-dir'])) return false;
  if (existsSync(resolve(ROOT, '.git/shallow'))) return false;
  return Number(git(['rev-list', '--count', 'HEAD']) || 0) > 1;
})();

const dateCache = new Map();
const lastChanged = (relPaths) => {
  if (!HISTORY_OK) return '';
  const key = relPaths.join('|');
  if (dateCache.has(key)) return dateCache.get(key);
  const dates = relPaths
    .filter((p) => existsSync(resolve(ROOT, p)))
    .map((p) => git(['log', '-1', '--format=%cs', '--', p]))
    .filter(Boolean);
  const newest = dates.sort().pop() || '';
  dateCache.set(key, newest);
  return newest;
};

/* ----------------------------------------------------- lastmod manifest -- */

/**
 * <lastmod> comes from data/sitemap-lastmod.json, not from git.
 *
 * It used to be `git log -1` on the source files, with the previous sitemap as
 * a fallback. Vercel builds from a shallow clone, where git stamps HEAD on every
 * path, so that code deliberately refuses to run there — and the fallback
 * (public/sitemap.xml) is gitignored and so never exists on a fresh build. The
 * result: no URL had a <lastmod> in production.
 *
 * The manifest stores, per URL, a hash of the content the page is built from and
 * the date that hash was first seen. Unchanged hash = keep the committed date;
 * changed or new hash = today. Running the build locally updates the file, and
 * CI fails if it is out of date, so the dates in production are the dates the
 * content really changed — not the date of the last deploy.
 */
const MANIFEST_PATH = resolve(ROOT, 'data/sitemap-lastmod.json');
const manifest = (() => {
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
  } catch {
    return {};
  }
})();
const TODAY = process.env.SITEMAP_TODAY || new Date().toISOString().slice(0, 10);
const sha = (value) => createHash('sha1').update(value).digest('hex').slice(0, 16);

// Code files change constantly without changing what a visitor reads.
const CODE_ONLY = new Set(['prerender.mjs', 'App.tsx']);
const fileHash = (rels) =>
  sha(
    (rels || [])
      .filter((p) => !CODE_ONLY.has(p))
      .map((p) => read(p))
      .join('\u0000'),
  );

/** Collect every value of `key` in a data file, de-duplicated, order preserved. */
const pluck = (source, key) => {
  const out = new Set();
  const re = new RegExp(`["']?${key}["']?\\s*:\\s*["']([^"']+)["']`, 'g');
  let m;
  while ((m = re.exec(source))) out.add(m[1]);
  return [...out];
};

const toolIds = pluck(read('data/tools.ts'), 'id');
const categoryIds = pluck(read('data/categories.ts'), 'id');
const earnCategoryIds = pluck(read('data/earn.ts'), 'id');

/**
 * Drop name-duplicate tools so the sitemap advertises only ONE canonical URL
 * per product — the exact 640 ids prerender.mjs bakes static pages for. Some
 * tools ship under two ids (e.g. `manychat` + `manychat-automation`,
 * `gemini` + `google-gemini`); listing both hands Google duplicate content and
 * wastes crawl budget on pages that only get the SPA fallback (homepage meta).
 * Falls back to the full id list on any parse error rather than break the build.
 */
const canonicalToolIds = (() => {
  try {
    const src = read('data/tools.ts');
    const start = src.indexOf('Tool[] = [') + 'Tool[] = ['.length - 1;
    const arr = eval(src.slice(start, src.indexOf('\n];', start) + 2)).filter(Boolean);
    const seenId = new Set();
    const byId = arr.filter((t) => t.id && !seenId.has(t.id) && seenId.add(t.id));
    const canon = new Map();
    for (const t of byId) {
      const k = (t.name || '').trim().toLowerCase();
      const prev = canon.get(k);
      if (!prev || t.id.length < prev.id.length) canon.set(k, t);
    }
    const keep = new Set(
      byId.filter((t) => canon.get((t.name || '').trim().toLowerCase()) === t).map((t) => t.id),
    );
    const ids = toolIds.filter((id) => keep.has(id));
    return ids.length ? ids : toolIds;
  } catch {
    return toolIds;
  }
})();

/** Mirrors utils/slug.ts — category URLs are slugs, not encoded names. */
const slugify = (v) =>
  v
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\+/g, ' plus ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
const altEditorial = (() => {
  try {
    return JSON.parse(read('data/editorial/alternatives.json'));
  } catch {
    return { pages: [], facts: {} };
  }
})();
// Only subjects that have a canonical tool page, which is what prerender.mjs
// builds the alternatives page from.
const altPages = (altEditorial.pages || []).filter((p) => canonicalToolIds.includes(p.subject));
if (altPages.length !== (altEditorial.pages || []).length) {
  console.error('data/editorial/alternatives.json names a subject that is not a canonical tool id.');
  process.exit(1);
}
const collectionSlugs = pluck(read('data/collections.ts'), 'slug');
const blogSlugs = pluck(read('data/blog.ts') || read('data/blogs.ts'), 'slug');
/**
 * pluck() matches every "id" in the file, and each workflow's steps carry their
 * own — so s1..s4 were being published as workflow URLs that have never
 * existed. Only ids at the top level of a workflow object are real routes, and
 * those all start with "wf-".
 */
const workflowIds = pluck(read('data/workflows.ts'), 'id').filter((id) => /^wf-/.test(id));

/**
 * Comparison and alternatives pages. Both were previously unreachable:
 * comparisons only existed behind a query string that robots.txt blocks, and
 * the /alternatives/:slug route was linked from nowhere at all — the pages
 * rendered fine but no crawler could ever discover them. These are the two
 * highest-intent page types a directory can own, so they go in the sitemap.
 *
 * Mirrors utils/pairs.ts: top four tools per category, paired.
 */
/**
 * Parsed the same way prerender.mjs parses it.
 *
 * This used to scan the file with a regex over fixed-size windows, which reads
 * a slightly different set of tools than the prerender does — different set,
 * different top four per category, and three comparison URLs published here
 * that no page was ever written for. One parser, one answer.
 */
const toolRecords = (() => {
  const src = read('data/tools.ts');
  const start = src.indexOf('Tool[] = [') + 'Tool[] = ['.length - 1;
  return eval(src.slice(start, src.indexOf('\n];', start) + 2))
    .filter(Boolean)
    .map((t) => ({
      id: t.id,
      category: t.category,
      rating: t.rating,
      pricing: t.pricing,
      hash: sha(JSON.stringify(t)),
      added: (t.dateAdded || '').slice(0, 10),
    }));
})();

// Pair from canonical tools only — the same list the tool URLs below use.
//
// Deduping by id alone let name-duplicates back in, and a pair naming one of
// them is a URL the app cannot render: ComparePair resolves slugs through
// MOCK_TOOLS, which drops exactly those tools. 57 such pairs were listed here
// and prerendered as shells that hydrated into the not-found state.
const canonicalSet = new Set(canonicalToolIds);
const seenTool = new Set();
const tools = toolRecords.filter(
  (t) => canonicalSet.has(t.id) && !seenTool.has(t.id) && seenTool.add(t.id),
);

const byCategory = new Map();
for (const t of tools) {
  if (!byCategory.has(t.category)) byCategory.set(t.category, []);
  byCategory.get(t.category).push(t);
}

const comparisonSlugs = [];
const seenPair = new Set();
for (const list of byCategory.values()) {
  const top = [...list].sort((p, q) => q.rating - p.rating).slice(0, 4);
  for (let i = 0; i < top.length; i++) {
    for (let j = i + 1; j < top.length; j++) {
      const [x, y] = top[i].id.localeCompare(top[j].id) <= 0 ? [top[i], top[j]] : [top[j], top[i]];
      const slug = `${slugify(x.id)}-vs-${slugify(y.id)}`;
      if (seenPair.has(slug)) continue;
      seenPair.add(slug);
      comparisonSlugs.push(slug);
    }
  }
}

if (toolIds.length === 0) {
  console.error('\n  Sitemap aborted: no tool ids found in data/tools.ts.');
  console.error('  The data format has probably changed — fix the regex above');
  console.error('  rather than shipping a sitemap that omits every tool page.\n');
  process.exit(1);
}

/** priority/changefreq are hints only, but a flat 1.0 across 1300 URLs is noise. */

/**
 * Free-tools pages. Mirrors utils/freeTools.ts and prerender.mjs: a category
 * earns a page once it has four free or freemium tools, below which it has
 * nothing to say that the category page does not already say.
 */
const freeCategorySlugs = (() => {
  const known = new Set(pluck(read('data/categories.ts'), 'id'));
  // Count only canonical tools. Some products appear under two ids, and
  // counting both pushes a category over the four-tool threshold here while the
  // prerender — which dedupes by name — leaves it below and writes no page.
  const canonical = new Set(canonicalToolIds);
  const counts = new Map();
  for (const t of tools) {
    if (!canonical.has(t.id)) continue;
    if (!/^(free|freemium|open source)$/i.test(t.pricing || '')) continue;
    if (!known.has(t.category)) continue;
    counts.set(t.category, (counts.get(t.category) || 0) + 1);
  }
  return [...counts.entries()].filter(([, n]) => n >= 4).map(([id]) => slugify(id));
})();


/**
 * Shopping category slugs, parsed rather than repeated. A second hand-kept
 * copy of this list is how the prerenderer and this file drift apart, which
 * is what put 57 comparison URLs in a sitemap with no page behind them.
 */
const shoppingSlugs = (() => {
  const src = read('data/shoppingCategories.ts');
  if (!src) return [];
  return pluck(src, 'slug');
})();
// Source-file sets used to derive lastmod for each URL group.
const SRC_APP   = ['index.html', 'App.tsx', 'prerender.mjs'];
const SRC_TOOLS = ['data/tools.ts', 'prerender.mjs'];
const SRC_CATS  = ['data/categories.ts', 'data/tools.ts'];
const SRC_EARN  = ['data/earn.ts'];
const SRC_COLL  = ['data/collections.ts'];
const SRC_BLOG  = ['data/blog.ts', 'data/blogs.ts'];
const SRC_WF    = ['data/workflows.ts'];
const SRC_SHOP  = ['data/shoppingCategories.ts'];
const SRC_FREE  = ['data/categories.ts', 'data/tools.ts'];

const urls = [
  { loc: '/', changefreq: 'daily', priority: '1.0', from: SRC_APP },
  { loc: '/categories', changefreq: 'weekly', priority: '0.9', from: SRC_CATS },
  { loc: '/collections', changefreq: 'weekly', priority: '0.8', from: SRC_COLL },
  { loc: '/compare', changefreq: 'monthly', priority: '0.8', from: SRC_TOOLS },
  { loc: '/find', changefreq: 'monthly', priority: '0.8', from: SRC_TOOLS },
  { loc: '/blog', changefreq: 'weekly', priority: '0.8', from: SRC_BLOG },
  { loc: '/prompts', changefreq: 'weekly', priority: '0.7', from: SRC_APP },
  { loc: '/earn', changefreq: 'weekly', priority: '0.8', from: SRC_EARN },
  { loc: '/free', changefreq: 'weekly', priority: '0.85', from: SRC_FREE },
  { loc: '/workflows', changefreq: 'weekly', priority: '0.7', from: SRC_WF },
  { loc: '/discover', changefreq: 'weekly', priority: '0.6', from: SRC_TOOLS },
  { loc: '/about', changefreq: 'monthly', priority: '0.5', from: ['pages/About.tsx'] },
  { loc: '/contact', changefreq: 'yearly', priority: '0.4', from: ['pages/Contact.tsx'] },
  { loc: '/ai-shopping', changefreq: 'weekly', priority: '0.8', from: SRC_SHOP },
  { loc: '/ai-shopping/finder', changefreq: 'monthly', priority: '0.7', from: SRC_SHOP },
  ...shoppingSlugs.map((slug) => ({ loc: `/ai-shopping/${slug}`, changefreq: 'weekly', priority: '0.7', from: SRC_SHOP })),
  { loc: '/affiliate-disclosure', changefreq: 'yearly', priority: '0.2', from: SRC_APP },
  { loc: '/careers', changefreq: 'monthly', priority: '0.3', from: SRC_APP },
  { loc: '/privacy', changefreq: 'yearly', priority: '0.2', from: SRC_APP },
  { loc: '/terms', changefreq: 'yearly', priority: '0.2', from: SRC_APP },

  // Static "Best AI ___" landing pages (served from public/, so not in the data).
  ...[
    'best-google-ai-tools',
    'best-ai-image-generators',
    'best-ai-writing-tools',
    'best-ai-chatbots',
    'best-ai-coding-tools',
    'best-ai-video-generators',
    'best-free-ai-tools',
    'best-ai-logo-makers',
    'best-ai-voice-generators',
  ].map((slug) => ({ loc: `/${slug}.html`, changefreq: 'weekly', priority: '0.85', from: [`public/${slug}.html`] })),

  ...canonicalToolIds.map((id) => ({
    loc: `/tool/${encodeURIComponent(id)}`,
    changefreq: 'weekly',
    priority: '0.7',
    from: SRC_TOOLS,
    tool: id,
  })),
  ...categoryIds.map((id) => ({
    loc: `/category/${slugify(id)}`,
    changefreq: 'weekly',
    priority: '0.8',
    from: SRC_CATS,
    category: id,
  })),
  ...earnCategoryIds.map((id) => ({
    loc: `/earn/${id}`,
    changefreq: 'weekly',
    priority: '0.75',
    from: SRC_EARN,
  })),
  ...collectionSlugs.map((slug) => ({
    loc: `/collections/${slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    from: SRC_COLL,
  })),
  ...blogSlugs.map((slug) => ({
    loc: `/blog/${slug}`,
    changefreq: 'monthly',
    priority: '0.6',
    from: SRC_BLOG,
  })),
  ...workflowIds.map((id) => ({
    loc: `/workflows/${encodeURIComponent(id)}`,
    changefreq: 'monthly',
    priority: '0.6',
    from: SRC_WF,
  })),
  // /compare/<a>-vs-<b> and /alternatives/<tool>-alternatives are left out on
  // purpose. All ~940 of them are assembled from the same one-line tool records,
  // and AdSense rejected the site for "low-value content". They stay reachable
  // for visitors but are noindex (prerender.mjs, components/SEO.tsx), so they
  // must not be advertised here either.
  //
  // The exception is the short whitelist in data/editorial/alternatives.json:
  // pages with a curated list, sourced facts and a comparison table, for tools
  // people are demonstrably searching alternatives for. Those are indexable
  // (utils/altEditorial.mjs is the one definition) and listed here.
  ...altPages.map((p) => ({
    loc: `/alternatives/${slugify(p.subject)}-alternatives`,
    changefreq: 'monthly',
    priority: '0.6',
    from: ['data/editorial/alternatives.json'],
    alt: p.subject,
  })),
  ...freeCategorySlugs.map((slug) => ({
    loc: `/free/${slug}`,
    changefreq: 'weekly',
    priority: '0.8',
    from: SRC_FREE,
    category: categoryIds.find((id) => slugify(id) === slug),
  })),
];

const seen = new Set();
const unique = urls.filter((u) => (seen.has(u.loc) ? false : seen.add(u.loc)));

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const toolById = new Map(toolRecords.map((t) => [t.id, t]));

/** What the page at this URL is built from, reduced to a hash. */
const identityOf = (u) => {
  if (u.alt) {
    const page = altEditorial.pages.find((p) => p.subject === u.alt);
    const refs = [u.alt, ...page.alternatives.map((a) => a.ref)];
    return sha(
      JSON.stringify(page) +
        '\u0000' +
        JSON.stringify(refs.map((r) => altEditorial.facts[r] || null)) +
        '\u0000' +
        refs.map((r) => toolById.get(r)?.hash || '').join('|'),
    );
  }
  if (u.tool) return toolById.get(u.tool)?.hash || fileHash(u.from);
  if (u.category) {
    const inCat = toolRecords.filter((t) => t.category === u.category).map((t) => `${t.id}:${t.hash}`);
    return sha(`${u.category}\u0000${inCat.sort().join('|')}`);
  }
  return fileHash(u.from);
};

/** First-seen date for a URL with no manifest entry yet: the best honest source. */
const bootstrapDate = (u) => {
  if (u.alt) return altEditorial.checkedAt || '';
  if (u.tool) return toolById.get(u.tool)?.added || '';
  if (u.category) {
    const dates = toolRecords.filter((t) => t.category === u.category).map((t) => t.added).filter(Boolean);
    return dates.sort().pop() || '';
  }
  return lastChanged(u.from || []);
};

const nextManifest = {};
let stamped = 0;
const entries = unique.map((u) => {
  const hash = identityOf(u);
  const known = manifest[u.loc];
  let lastmod;
  if (known && known.hash === hash && known.lastmod) {
    lastmod = known.lastmod;
  } else if (!known && bootstrapDate(u)) {
    lastmod = bootstrapDate(u);
  } else {
    lastmod = TODAY; // the content changed (or nothing better is known)
    stamped++;
  }
  nextManifest[u.loc] = { hash, lastmod };
  return { ...u, lastmod };
});

// Sorted, so the file only shows a diff when a date really moved.
const manifestJson =
  JSON.stringify(
    Object.fromEntries(Object.keys(nextManifest).sort().map((k) => [k, nextManifest[k]])),
    null,
    1,
  ) + '\n';
if (manifestJson !== (existsSync(MANIFEST_PATH) ? readFileSync(MANIFEST_PATH, 'utf8') : '')) {
  writeFileSync(MANIFEST_PATH, manifestJson, 'utf8');
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map(
    (u) => `  <url>
    <loc>${esc(SITE + u.loc)}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(ROOT, 'public/sitemap.xml'), xml, 'utf8');

const dated = entries.filter((e) => e.lastmod).length;
console.log(`sitemap.xml written — ${entries.length} URLs`);
console.log(
  `  tools ${canonicalToolIds.length} (of ${toolIds.length} raw) · categories ${categoryIds.length} · ` +
    `collections ${collectionSlugs.length} · blog ${blogSlugs.length} · workflows ${workflowIds.length}`,
);
console.log(
  `  excluded (noindex): comparisons ${comparisonSlugs.length} · alternatives ${canonicalToolIds.length - altPages.length} (${altPages.length} curated alternatives pages are indexed)`,
);
console.log(
  `  ${dated} with lastmod (${stamped} stamped ${TODAY} because their content changed), manifest data/sitemap-lastmod.json`,
);
if (dated < entries.length * 0.95) {
  console.error(`  Sitemap aborted: only ${dated}/${entries.length} URLs have a lastmod.`);
  process.exit(1);
}
