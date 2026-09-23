/**
 * Post-build prerender for the static Vercel host.
 *
 * The app is a client-rendered SPA, so every deep link was served the same
 * index.html — meaning crawlers, social scrapers and AI bots saw the homepage
 * title/description on all 600+ tool pages, every category page and /compare,
 * /blog etc. This writes a static <path>/index.html per route with the correct
 * <title>, description, canonical and Open Graph tags baked in (matching what
 * the React <SEO> component sets client-side). React still hydrates on load.
 * Vercel serves the specific file when it exists and only applies the SPA
 * rewrite for unknown paths.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const DIST = 'dist';
const SITE = 'https://aimastertools.space';
const YEAR = new Date().getFullYear();

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/\+/g, ' plus ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const clamp = (s, n = 160) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)).trimEnd() + '…');

/* ------------------------------------------------------- listing lengths -- */

/**
 * A result listing shows roughly 50-60 characters of title and 120-160 of
 * description. Every page here is generated from a template, and the variable
 * part — a tool name, a pair of tool names, a category — swings by forty
 * characters or more, so no single template can land inside those windows:
 * "8 Best AIVA Alternatives (2026) | AI Master Tools" is 49 and the same
 * template with a longer name is 68.
 *
 * So templates now offer several phrasings, longest first, and the longest one
 * that fits wins. Where nothing fits, the shortest is used and reported at the
 * end of the build rather than shipped quietly.
 */
const TITLE_MIN = 50;
const TITLE_MAX = 60;
const DESC_MIN = 120;
const DESC_MAX = 160;

const titleWarnings = [];

const pickTitle = (candidates, path = '') => {
  const fits = candidates.find((c) => c.length >= TITLE_MIN && c.length <= TITLE_MAX);
  if (fits) return fits;
  const shortest = candidates.reduce((a, b) => (b.length < a.length ? b : a));
  titleWarnings.push(`${shortest.length} ${path} — ${shortest}`);
  return shortest;
};

const descWarnings = [];

/**
 * Descriptions are clamped at the top already; this is the other end. A short
 * one takes the first tail that carries it over the minimum without going past
 * the maximum, so the sentence stays true to the page rather than padded.
 */
const fitDescription = (text, tails, path = '') => {
  const s = clamp(text, DESC_MAX);
  if (s.length >= DESC_MIN) return s;
  const tail = tails.find((t) => s.length + t.length >= DESC_MIN && s.length + t.length <= DESC_MAX);
  if (tail) return s + tail;
  const longest = tails.reduce((a, b) => (b.length > a.length ? b : a), '');
  descWarnings.push(`${(s + longest).length} ${path}`);
  return clamp(s + longest, DESC_MAX);
};

const DESC_TAILS = [
  ` Ratings, pricing tiers and the closest alternatives, all checked and updated for ${YEAR}.`,
  ` Pricing, ratings and the closest alternatives, updated for ${YEAR}.`,
  ` Pricing, ratings and alternatives, updated for ${YEAR}.`,
  ` Updated for ${YEAR}.`,
];

// ---- Load tools (dedup by id, then by normalized name — matches MOCK_TOOLS) --
const toolsSrc = readFileSync('data/tools.ts', 'utf8');
const tStart = toolsSrc.indexOf('Tool[] = [') + 'Tool[] = ['.length - 1;
const rawTools = eval(toolsSrc.slice(tStart, toolsSrc.indexOf('\n];', tStart) + 2)).filter(Boolean);
const seenId = new Set();
const byId = rawTools.filter((t) => t.id && !seenId.has(t.id) && seenId.add(t.id));
const canon = new Map();
for (const t of byId) {
  const k = (t.name || '').trim().toLowerCase();
  const p = canon.get(k);
  if (!p || t.id.length < p.id.length) canon.set(k, t);
}
const TOOLS = byId.filter((t) => canon.get((t.name || '').trim().toLowerCase()) === t);

/**
 * Real SoftwareApplication + Offer schema for a tool page, ported from
 * utils/seo.ts's toolSchema() so the prerendered HTML carries the same honest
 * claims the client-side <SEO> component already makes — an agent or crawler
 * that never runs React currently sees none of it.
 *
 * Same restraint as the source: no `image` (every tool's imageUrl is an
 * Unsplash stock photo of something else, not the product), no invented
 * `price` (a paid tool gets a pricing *category*, never a number nobody
 * checked), and no `aggregateRating` — there is no real per-tool review count
 * in this dataset, so the field simply doesn't fire rather than being backed
 * by a fabricated count.
 */
const toolJsonLd = (t) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE}/tool/${t.id}#software`,
  name: t.name,
  description: t.longDescription || t.description,
  url: `${SITE}/tool/${t.id}`,
  sameAs: t.url,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: t.category,
  operatingSystem: 'Web',
  ...(t.launchYear ? { datePublished: `${t.launchYear}-01-01` } : {}),
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    category: t.pricing,
    ...(t.pricing === 'Free' || t.pricing === 'Open Source' ? { price: '0' } : {}),
    availability: 'https://schema.org/OnlineOnly',
    url: t.url,
  },
});

// ---- Load categories + count tools each ------------------------------------
const catSrc = readFileSync('data/categories.ts', 'utf8');
const cStart = catSrc.indexOf('CATEGORY_META = [') + 'CATEGORY_META = ['.length - 1;
const CATEGORIES = eval(catSrc.slice(cStart, catSrc.indexOf('\n];', cStart) + 2)).filter(Boolean);

/**
 * 47 tools in data/tools.ts carry a `category` string with no matching entry
 * in CATEGORY_META at all — 'Development', 'Design' and 'Education', where
 * the real categories are 'Code & Development', 'UI/UX & Design Tools' and
 * 'Learning & Education'. Every one of those 47 tools fell out of both its
 * category page's tool list and this count. Aliasing them here is the
 * narrow fix for that; the underlying category strings in data/tools.ts are
 * still wrong and worth correcting at the source separately.
 */
const CATEGORY_ALIASES = {
  Development: 'Code & Development',
  Design: 'UI/UX & Design Tools',
  Education: 'Learning & Education',
  // Nine tools (Notion Academy, Obsidian, Obsidian Help, Raycast, Cal.com
  // and duplicates) carry 'Productivity', which is not a category either —
  // the real one is 'Productivity & Collaboration', and 'Productivity
  // Automation' is a separate, narrower category these tools do not belong
  // to. Unaliased, their pages linked to /category/productivity, which does
  // not exist: the "Page has links to broken page: 5 URLs" in Ahrefs'
  // 19 September crawl.
  Productivity: 'Productivity & Collaboration',
};
const toolsForCategory = (name) =>
  TOOLS.filter((t) => t.category === name || CATEGORY_ALIASES[t.category] === name);
const catCount = (name) => toolsForCategory(name).length;

// ---- Load the Earn Online directory (for its counts + crawlable summary) ----
let EARN_SITES = 0;
let EARN_CATS = [];
try {
  const earnSrc = readFileSync('data/earn.ts', 'utf8');
  const eStart = earnSrc.indexOf('EarnCategory[] = [') + 'EarnCategory[] = ['.length - 1;
  EARN_CATS = eval(earnSrc.slice(eStart, earnSrc.indexOf('\n];', eStart) + 2)).filter(Boolean);
  EARN_SITES = EARN_CATS.reduce((n, c) => n + (c.sites ? c.sites.length : 0), 0);
} catch {
  EARN_CATS = [];
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---- Build the route list --------------------------------------------------
/* --------------------------------------------- alternatives & comparisons -- */

/**
 * Built with the same grouping and slug rules as scripts/generate-sitemap.mjs.
 * If the two ever disagree, the sitemap points at URLs that were never
 * prerendered — which is exactly the state this is fixing.
 */
const sameCategory = (tool) =>
  TOOLS.filter((o) => o.category === tool.category && o.id !== tool.id).sort(
    (a, b) => (b.rating || 0) - (a.rating || 0),
  );

const toolLine = (t) =>
  `<li><a href="/tool/${esc(t.id)}"><strong>${esc(t.name)}</strong></a> — ${esc(
    t.description || '',
  )} (${esc(t.pricing || 'Pricing varies')}, rated ${t.rating || '—'}/5)</li>`;

const ALTERNATIVES_ROUTES = TOOLS.map((t) => {
  const alts = sameCategory(t).slice(0, 8);
  const cat = (t.category || 'AI').toLowerCase();
  return {
    path: `/alternatives/${slugify(t.id)}-alternatives`,
    heading: `Best ${t.name} Alternatives`,
    title: pickTitle([
      // Names run from three characters ("Poe", "n8n") to the high thirties,
      // so the ladder has to reach in both directions.
      `${alts.length} Best ${t.name} Alternatives and Competitors to Try in ${YEAR}`,
      `${alts.length} Best ${t.name} Alternatives and Competitors, Compared (${YEAR})`,
      `${alts.length} Best ${t.name} Alternatives and Competitors in ${YEAR}`,
      `${alts.length} Best ${t.name} Alternatives to Try in ${YEAR} | Compared`,
      `${alts.length} Best ${t.name} Alternatives and Competitors (${YEAR})`,
      `${alts.length} Best ${t.name} Alternatives to Try in ${YEAR}`,
      `${alts.length} Best ${t.name} Alternatives (${YEAR}) | AI Master Tools`,
      `${alts.length} Best ${t.name} Alternatives in ${YEAR} | AI Master Tools`,
      `${alts.length} Best ${t.name} Alternatives Compared (${YEAR})`,
      `${alts.length} Best ${t.name} Alternatives (${YEAR}) — Compared`,
      `${alts.length} Best ${t.name} Alternatives (${YEAR})`,
      `Best ${t.name} Alternatives (${YEAR})`,
    ], `/alternatives/${slugify(t.id)}-alternatives`),
    description: clamp(
      `Looking for an alternative to ${t.name}? Compare ${alts.length} other ${cat} tools on pricing, ratings and what each one is actually good at.`,
    ),
    extraHtml: alts.length
      ? `<p style="font-size:15px;color:#475569">${esc(t.name)} is a ${esc(cat)} tool${
          t.pricing ? ` (${esc(t.pricing)})` : ''
        }. These are the closest ${alts.length} alternatives in the same category, ranked by rating.</p>` +
        `<ul style="font-size:15px;line-height:1.7;color:#475569;padding-left:18px">${alts
          .map(toolLine)
          .join('')}</ul>` +
        // Back to the tool this page is about, and across to each
        // alternative's own round-up. Without the second list every
        // /alternatives/* page had exactly one incoming link — the tool page
        // that names it — and nothing tied the 654 of them together.
        `<p style="font-size:15px;line-height:1.6"><a href="/tool/${esc(
          t.id,
        )}">Read the full ${esc(t.name)} review</a></p>` +
        `<h2 style="font-size:20px;margin:24px 0 8px">Alternatives to each of these</h2>` +
        `<ul style="font-size:15px;line-height:1.7;color:#475569;padding-left:18px">${alts
          .map(
            (o) =>
              `<li><a href="/alternatives/${slugify(o.id)}-alternatives">${esc(
                o.name,
              )} alternatives</a></li>`,
          )
          .join('')}</ul>`
      : '',
  };
});

// Pairs come from the name-deduped list — the same one utils/pairs.ts uses.
//
// This script and the sitemap used to pair from `byId` instead, which put 57
// pairs on the site that the app cannot render: ComparePair resolves a slug
// through MOCK_TOOLS, and every one of those 57 named a tool the name-dedup
// had dropped. They shipped as prerendered shells that hydrated straight into
// the not-found state, and the sitemap advertised all of them. Meanwhile 49
// pairs the app does list were never prerendered at all.
//
// One list, three consumers: prerender, sitemap and utils/pairs.ts.
const byCategory = new Map();
for (const t of TOOLS) {
  if (!byCategory.has(t.category)) byCategory.set(t.category, []);
  byCategory.get(t.category).push(t);
}

const COMPARE_ROUTES = [];
const seenPair = new Set();
for (const list of byCategory.values()) {
  const top = [...list].sort((p, q) => q.rating - p.rating).slice(0, 4);
  for (let i = 0; i < top.length; i++) {
    for (let j = i + 1; j < top.length; j++) {
      const [x, y] = top[i].id.localeCompare(top[j].id) <= 0 ? [top[i], top[j]] : [top[j], top[i]];
      const slug = `${slugify(x.id)}-vs-${slugify(y.id)}`;
      if (seenPair.has(slug)) continue;
      seenPair.add(slug);
      const cat = (x.category || 'AI').toLowerCase();
      COMPARE_ROUTES.push({
        path: `/compare/${slug}`,
        // Read by comparesByTool below; stripped before the route is rendered.
        pairIds: [x.id, y.id],
        pairNames: [x.name, y.name],
        heading: `${x.name} vs ${y.name}`,
        title: pickTitle([
          `${x.name} vs ${y.name} — Pricing, Features and Ratings (${YEAR})`,
          `${x.name} vs ${y.name}: Which Is Better in ${YEAR}? | Compared`,
          `${x.name} vs ${y.name} — Which One Should You Pick in ${YEAR}?`,
          `${x.name} vs ${y.name}: Which Is Better? (${YEAR}) | Compared`,
          `${x.name} vs ${y.name}: Which Is Better? (${YEAR})`,
          `${x.name} vs ${y.name} — Which Is Better in ${YEAR}?`,
          `${x.name} vs ${y.name}: Compared (${YEAR})`,
          `${x.name} vs ${y.name} Compared (${YEAR})`,
          `${x.name} vs ${y.name} (${YEAR})`,
          `${x.name} vs ${y.name}`,
        ], `/compare/${slug}`),
        description: fitDescription(
          `${x.name} vs ${y.name} compared on pricing, ratings and what each does best, so you can pick the right ${cat} tool.`,
          DESC_TAILS,
          `/compare/${slug}`,
        ),
        extraHtml:
          `<ul style="font-size:15px;line-height:1.7;color:#475569;padding-left:18px">${toolLine(x)}${toolLine(
            y,
          )}</ul>` +
          `<p style="font-size:15px;color:#475569">Both are ${esc(cat)} tools. ${esc(x.name)} rates ${
            x.rating || '—'
          }/5 and ${esc(y.name)} rates ${y.rating || '—'}/5; pricing is ${esc(
            x.pricing || 'unlisted',
          )} and ${esc(y.pricing || 'unlisted')} respectively.</p>`,
      });
    }
  }
}

/**
 * Which compare pages each tool appears on.
 *
 * The 309 /compare/* pages and the 654 /alternatives/* pages are generated
 * from the catalogue and listed in sitemap.xml, but nothing on the site links
 * to either set — Ahrefs reported every one of them as an orphan. They are
 * also the two pages a reader of a tool page most plausibly wants next, so
 * the link belongs on the tool page on its own merits, not just for the
 * crawler. This index lets the tool route below name its own pairs without
 * walking COMPARE_ROUTES once per tool.
 */
const comparesByTool = new Map();
for (const r of COMPARE_ROUTES) {
  for (const id of r.pairIds || []) {
    if (!comparesByTool.has(id)) comparesByTool.set(id, []);
    comparesByTool.get(id).push(r);
  }
}

/* ------------------------------------ blog, collections, workflows, legal -- */

/**
 * The last of the sitemap's URLs that this script never covered. Same problem
 * as the alternatives pages, just at a smaller scale: each was advertised to
 * Google and each served the homepage's title over an empty body.
 */
const loadArray = (file, marker) => {
  try {
    const src = readFileSync(file, 'utf8');
    const at = src.indexOf(marker);
    if (at < 0) return [];
    const start = at + marker.length - 1;
    return eval(src.slice(start, src.indexOf('\n];', start) + 2)).filter(Boolean);
  } catch {
    return [];
  }
};

const BLOGS = loadArray('data/blogs.ts', 'BlogPost[] = [');
const COLLECTIONS = loadArray('data/collections.ts', 'Collection[] = [');
const WORKFLOWS = loadArray('data/workflows.ts', 'Workflow[] = [');

const BLOG_ROUTES = BLOGS.filter((b) => b.slug).map((b) => ({
  path: `/blog/${b.slug}`,
  heading: b.title,
  title: pickTitle([
    `${b.title} (${YEAR}) | AI Master Tools`,
    `${b.title} | AI Master Tools`,
    `${b.title} — AI Master Tools`,
    `${b.title} (${YEAR})`,
    b.title,
  ], `/blog/${b.slug || ''}`),
  description: fitDescription(b.excerpt || `${b.title} — a guide from AI Master Tools.`, DESC_TAILS, `/blog/${b.slug || ''}`),
  extraHtml: `<p style="font-size:15px;color:#475569">${esc(b.excerpt || '')}</p>`,
}));

const COLLECTION_ROUTES = COLLECTIONS.filter((c) => c.slug).map((c) => {
  const picked = (c.toolIds || [])
    .map((id) => TOOLS.find((t) => t.id === id))
    .filter(Boolean)
    .slice(0, 10);
  return {
    path: `/collections/${c.slug}`,
    heading: c.title,
    title: pickTitle([
      ...(c.metaTitle ? [c.metaTitle] : []),
      `${c.title} (${YEAR}) | AI Master Tools`,
      `${c.title} — Compared and Rated (${YEAR})`,
      `${c.title} — Compared (${YEAR})`,
      `${c.title} (${YEAR}) — Compared`,
      `${c.title} — AI Master Tools (${YEAR})`,
      `${c.title} (${YEAR})`,
      c.title,
    ], `/collections/${c.slug || ''}`),
    description: fitDescription(c.metaDescription || c.intro || `${c.title} — hand-picked AI tools.`, DESC_TAILS, `/collections/${c.slug || ''}`),
    extraHtml:
      `<p style="font-size:15px;color:#475569">${esc(c.intro || '')}</p>` +
      (picked.length
        ? `<ul style="font-size:15px;line-height:1.7;color:#475569;padding-left:18px">${picked
            .map(toolLine)
            .join('')}</ul>`
        : ''),
  };
});

const WORKFLOW_ROUTES = WORKFLOWS.filter((w) => w.id).map((w) => ({
  path: `/workflows/${w.id}`,
  heading: w.title || w.name || 'AI workflow',
  title: pickTitle([
    `${w.title || w.name || 'AI Workflow'} — Step-by-Step AI Automation Recipe (${YEAR})`,
    `${w.title || w.name || 'AI Workflow'} — AI Automation Recipe, Step by Step`,
    `${w.title || w.name || 'AI Workflow'} — AI Automation Recipe (${YEAR})`,
    `${w.title || w.name || 'AI Workflow'} — Automation Recipe (${YEAR})`,
    `${w.title || w.name || 'AI Workflow'} — AI Workflow (${YEAR})`,
    `${w.title || w.name || 'AI Workflow'} — AI Recipe (${YEAR})`,
    `${w.title || w.name || 'AI Workflow'} — AI Recipe`,
    `${w.title || w.name || 'AI Workflow'} (${YEAR})`,
    `${w.title || w.name || 'AI Workflow'}`,
  ], `/workflows/${w.id || ''}`),
  description: fitDescription(
    w.description || w.summary || `A step-by-step AI workflow you can copy, using the tools it names.`,
    [
      ` The tools it uses, the order to run them in, and what each step produces — updated for ${YEAR}.`,
      ` The tools it uses and the order to run them in, updated for ${YEAR}.`,
      ` The tools it uses and the order to run them in.`,
      ` Updated for ${YEAR}.`,
    ],
    `/workflows/${w.id || ''}`,
  ),
  extraHtml: `<p style="font-size:15px;color:#475569">${esc(w.description || w.summary || '')}</p>`,
}));


/* ------------------------------------------------- AI Shopping routes -- */

/**
 * Parsed from data/shoppingCategories.ts rather than repeated here. A second
 * copy of this list is a second thing to forget to update — which is exactly
 * how 57 comparison URLs ended up pointing at pages nobody had written.
 */
const SHOPPING_CATEGORIES = (() => {
  try {
    const src = readFileSync('data/shoppingCategories.ts', 'utf8');
    const open = 'ProductCategory[] = [';
    const start = src.indexOf(open) + open.length - 1;
    const end = src.indexOf('\n];', start);
    if (start < open.length || end < 0) return [];
    return eval(src.slice(start, end) + ']').filter(Boolean);
  } catch {
    return [];
  }
})();

const SHOPPING_ROUTES = [
  {
    path: '/ai-shopping',
    heading: 'AI Shopping',
    title: 'AI Shopping — Find the Right Product Without the Research',
    description: 'Tell us the budget and what it is for, and get products that fit — compared on the specifications that actually decide it, with prices you check yourself.',
    // The per-category pages below were reachable from the sitemap only.
    extraHtml: `<ul style="font-size:15px;line-height:1.7;color:#475569;padding-left:18px"><li><a href="/ai-shopping/finder">AI Product Finder</a></li>${SHOPPING_CATEGORIES.map(
      (c) => `<li><a href="/ai-shopping/${esc(c.slug)}">Best ${esc(c.name)}</a></li>`,
    ).join('')}</ul>`,
  },
  {
    path: '/ai-shopping/finder',
    heading: 'AI Product Finder',
    title: 'AI Product Finder — Say Your Budget, Get a Shortlist',
    description: 'Describe what you need and what you can spend. The category and budget are read from the sentence, matched against the catalogue, and each pick is explained from the record.',
  },
  {
    path: '/affiliate-disclosure',
    heading: 'Affiliate Disclosure',
    title: 'Affiliate Disclosure — How AI Master Tools Makes Money',
    description: 'AI Master Tools earns commission on some outbound links, including as an Amazon Associate. What that means, what it does not change, and how to tell which links pay.',
  },
  ...SHOPPING_CATEGORIES.map((c) => ({
    path: `/ai-shopping/${c.slug}`,
    heading: c.name,
    title: pickTitle([
      `Best ${c.name} — Compared on What Matters (${YEAR})`,
      `Best ${c.name} in ${YEAR} — Compared Spec by Spec`,
      `${c.name} Compared — Specs, Prices and Picks (${YEAR})`,
      `Best ${c.name} (${YEAR}) — Honest Comparison`,
      `${c.name}: What to Buy in ${YEAR}`,
      `Best ${c.name} ${YEAR}`,
    ], `/ai-shopping/${c.slug}`),
    description: fitDescription(c.blurb, DESC_TAILS, `/ai-shopping/${c.slug}`),
  })),
];
const LEGAL_ROUTES = [
  {
    path: '/about',
    heading: 'About AI Master Tools',
    title: 'About AI Master Tools — Who Compiles This Index, and How',
    description: 'An independent index of AI tools, opened and filed by hand. How a tool gets listed, what the ratings mean, and how the site makes money.',
  },
  {
    path: '/privacy',
    heading: 'Privacy Policy',
    title: 'Privacy Policy — What AI Master Tools Collects and Why',
    description: 'What AI Master Tools collects, what it deliberately does not, how your data is handled and stored, and the choices you have over it. Written in plain English.',
  },
  {
    path: '/terms',
    heading: 'Terms of Service',
    title: 'Terms of Service — Using the AI Master Tools Directory',
    description: 'The terms that apply when you use AI Master Tools — what the directory is, what the ratings and reviews mean, and the limits of what we can promise.',
  },
  {
    path: '/careers',
    heading: 'Careers',
    title: 'Careers at AI Master Tools — Open Roles and Contact',
    description: 'Open roles at AI Master Tools and how to get in touch about working on the directory, its reviews and the tooling behind them. No listings right now.',
  },
];

/* ------------------------------------------------------- free tools hub -- */

/**
 * "Free" is the modifier most often attached to a tool search, and the
 * catalogue already records each tool's pricing — but nothing was built on it,
 * so the site answered "AI image tools" and never "free AI image tools".
 *
 * These pages keep free and freemium apart, which is the part most directories
 * blur and the reason the page earns a place next to /category/:slug.
 */
/**
 * What to append after a category name.
 *
 * The names vary: some already end in "Tools" ("AI Ecommerce Tools"), some
 * already carry "AI" ("AI Chatbots & Assistants"), some carry neither
 * ("3D & Animation"). Appending a fixed "AI Tools" to all three produces
 * "Ecommerce Tools Tools" and "AI Chatbots AI Tools".
 *
 * "Tools" is not the only word that already names the products, though.
 * A category ending in "Assistants", "Engines", "Builders", "Extensions" or
 * "APIs" is a complete noun phrase too, and appending anything to it gives
 * "AI Search Engines tools" or "AI Chrome Extensions tools". Only categories
 * naming an activity or a subject — "Social Media Automation", "Image & Art
 * Generation", "Marketing & SEO" — actually need a product noun after them.
 */
const PRODUCT_NOUN = /\b(tools?|assistants?|engines?|builders?|extensions?|generators?|editors?|platforms?|apps?|bots?|apis?)$/i;

const suffixFor = (name, lower = false) => {
  const t = lower ? 'tools' : 'Tools';
  if (PRODUCT_NOUN.test(name)) return '';
  return /\bAI\b/.test(name) ? t : `AI ${t}`;
};

const isFree = (t) => /^(free|open source)$/i.test(t.pricing || '');
const isFreemium = (t) => /^freemium$/i.test(t.pricing || '');
const FREE_MIN = 4;

const knownCategoryIds = new Set(CATEGORIES.map((c) => c.id));
const freeByCategory = new Map();
for (const t of TOOLS) {
  if (!isFree(t) && !isFreemium(t)) continue;
  if (!knownCategoryIds.has(t.category)) continue;
  if (!freeByCategory.has(t.category)) freeByCategory.set(t.category, []);
  freeByCategory.get(t.category).push(t);
}

const FREE_CATS = [...freeByCategory.entries()]
  .filter(([, list]) => list.length >= FREE_MIN)
  .map(([id, list]) => {
    const sorted = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    const meta = CATEGORIES.find((c) => c.id === id);
    return {
      id,
      name: (meta && meta.name) || id,
      slug: slugify(id),
      tools: sorted,
      fullyFree: sorted.filter(isFree),
      freemium: sorted.filter(isFreemium),
    };
  })
  .sort((a, b) => b.tools.length - a.tools.length);


const FREE_ROUTES = [
  {
    path: '/free',
    heading: 'Free AI tools, honestly labelled',
    title: pickTitle([
      `Free AI Tools (${YEAR}) — ${FREE_CATS.length} Categories, Truly Free vs Freemium`,
      `Free AI Tools (${YEAR}) — ${FREE_CATS.length} Categories Compared`,
      `Free AI Tools (${YEAR}) | AI Master Tools`,
    ], '/free'),
    description: clamp(
      `AI tools you can use without paying, across ${FREE_CATS.length} categories — the genuinely free ones listed apart from the ones with a free tier, so you know which is which before signing up.`,
    ),
    extraHtml:
      `<p style="font-size:15px;color:#475569">Some of these cost nothing at all. The rest are freemium — a real free tier with paid plans above it. Most directories blur the two; every page here keeps them apart, with the count for each.</p>` +
      `<ul style="font-size:15px;line-height:1.7;color:#475569;padding-left:18px">${FREE_CATS.map(
        (c) =>
          // "AI tools" sits outside the link: category names here already run
          // to four words ("Image & Art Generation"), so repeating it inside
          // every anchor pushed the whole list past five words for no gain.
          // suffixFor drops it entirely where the name already ends in "Tools",
          // which otherwise read "Free UI/UX & Design Tools AI tools".
          `<li><a href="/free/${c.slug}">Free ${esc(c.name)}</a>${
            suffixFor(c.name, true) ? ' ' + suffixFor(c.name, true) : ''
          } — ${c.tools.length} tools, ${c.fullyFree.length} fully free</li>`,
      ).join('')}</ul>`,
  },
  ...FREE_CATS.map((c) => ({
    path: `/free/${c.slug}`,
    // Category names already carry "AI" ("AI Chatbots & Assistants"), so
    // appending "AI tools" to them reads as a stutter.
    heading: `${c.tools.length} free ${c.name} ${suffixFor(c.name, true)}`.trim(),
    title: pickTitle([
      `${c.tools.length} Best Free ${c.name} ${suffixFor(c.name)} (${YEAR}) | AI Master Tools`,
      `${c.tools.length} Best Free ${c.name} ${suffixFor(c.name)} (${YEAR}) — Compared`,
      `${c.tools.length} Best Free ${c.name} ${suffixFor(c.name)} (${YEAR})`,
      `Best Free ${c.name} ${suffixFor(c.name)} (${YEAR})`,
    ].map((x) => x.replace(/ {2,}/g, ' ')), `/free/${slugify(c.name)}`),
    /*
      Two problems this description used to have, both across many pages.

      It appended a hardcoded "AI tools" to a category name that usually
      already ends in "Tools", so 11 of these read "...ui/ux & design tools AI
      tools". suffixFor() exists for exactly that and the heading above already
      uses it — the description just wasn't.

      And 18 of them opened "0 completely free and N with a real free tier",
      leading a search listing with a zero. Where nothing in the category is
      fully free there is no split to explain, so the sentence says what is
      actually on offer instead. Naming the top few tools gives a searcher
      something to recognise, which a bare count never does.
    */
    description: clamp(
      (() => {
        const label = `${c.name.toLowerCase()} ${suffixFor(c.name, true)}`.replace(/ {2,}/g, ' ').trim();
        const names = c.tools.slice(0, 3).map((t) => t.name).join(', ');
        return c.fullyFree.length
          ? `${c.tools.length} free ${label} — ${c.fullyFree.length} completely free, ${c.freemium.length} with a real free tier. ${names} and more, rated and compared.`
          : `${c.tools.length} ${label} with a genuinely free tier — ${names} and more, rated and compared so you know the limits before you sign up.`;
      })(),
    ),
    extraHtml:
      (c.fullyFree.length
        ? `<h2 style="font-size:20px;margin:28px 0 10px">Free to use (${c.fullyFree.length})</h2>` +
          `<p style="font-size:15px;color:#475569">No paid plan behind them — free or open source, usable as they are.</p>` +
          `<ul style="font-size:15px;line-height:1.7;color:#475569;padding-left:18px">${c.fullyFree
            .map(toolLine)
            .join('')}</ul>`
        : '') +
      (c.freemium.length
        ? `<h2 style="font-size:20px;margin:28px 0 10px">Free tier available (${c.freemium.length})</h2>` +
          `<p style="font-size:15px;color:#475569">Freemium: a real free tier with limits, and paid plans once you outgrow it.</p>` +
          `<ul style="font-size:15px;line-height:1.7;color:#475569;padding-left:18px">${c.freemium
            .map(toolLine)
            .join('')}</ul>`
        : ''),
  })),
];

const routes = [
  {
    // The nav names this, and 654 /alternatives/* pages existed with no index
    // of their own — each reachable from a single tool page and nothing else.
    path: '/alternatives',
    heading: 'AI tool alternatives',
    title: `AI Tool Alternatives (${YEAR}) — Compare Every Tool's Rivals`,
    description:
      'Find the closest alternatives to any AI tool in the directory — same category, compared on pricing, ratings and what each one is actually good at.',
    extraHtml: ALTERNATIVES_ROUTES.length
      ? `<ul style="columns:2;font-size:15px;line-height:1.8;color:#475569;padding-left:18px">${ALTERNATIVES_ROUTES.map(
          (r) => `<li><a href="${r.path}">${esc(r.heading)}</a></li>`,
        ).join('')}</ul>`
      : '',
  },
  {
    path: '/categories',
    title: `All AI Tool Categories (${YEAR}) — Browse Them All Free`,
    description: 'Browse every AI tool category — chatbots, image generation, coding, video, writing, marketing and more. Find and compare the best tools in each.',
    extraHtml: `<ul style="columns:2;font-size:15px;line-height:1.8;color:#475569;padding-left:18px">${CATEGORIES.map(
      (c) => `<li><a href="/category/${slugify(c.name)}">${esc(c.name)}</a></li>`,
    ).join('')}</ul>`,
  },
  {
    path: '/compare',
    title: `Compare AI Tools Side by Side (${YEAR}) | AI Master Tools`,
    description: 'Compare any two AI tools side by side — category, pricing, ratings and free-to-start — so you can choose the right one without a free trial.',
    extraHtml: COMPARE_ROUTES.length
      ? `<ul style="font-size:15px;line-height:1.7;color:#475569;padding-left:18px">${COMPARE_ROUTES.map(
          (r) => `<li><a href="${r.path}">${esc(r.pairNames[0])} vs ${esc(r.pairNames[1])}</a></li>`,
        ).join('')}</ul>`
      : '',
  },
  {
    path: '/collections',
    title: `Curated AI Tool Collections (${YEAR}) | AI Master Tools`,
    description: 'Hand-picked collections of the best AI tools for specific jobs and workflows — writing, video, design, coding and research, ready to explore.',
    extraHtml: COLLECTIONS.length
      ? `<ul style="font-size:15px;line-height:1.7;color:#475569;padding-left:18px">${COLLECTIONS.map(
          (c) => `<li><a href="/collections/${esc(c.slug)}">${esc(c.title)}</a></li>`,
        ).join('')}</ul>`
      : '',
  },
  {
    path: '/blog',
    title: `AI Tools Blog — Guides, Comparisons and Prompt Tips`,
    description: 'AI tool guides, honest comparisons and prompt-engineering tutorials to help you pick the right AI tools and actually get results out of them.',
    extraHtml: BLOGS.length
      ? `<ul style="font-size:15px;line-height:1.7;color:#475569;padding-left:18px">${BLOGS.map(
          (b) => `<li><a href="/blog/${esc(b.slug)}">${esc(b.title)}</a></li>`,
        ).join('')}</ul>`
      : '',
  },
  { path: '/prompts', title: `AI Prompt Library — Reusable Prompt Frameworks (${YEAR})`, description: 'A free library of reusable AI prompt frameworks — persona setup, chain-of-thought and few-shot scaffolds you can paste and edit.' },
  {
    path: '/workflows',
    title: `AI Workflows & Automation Recipes (${YEAR}) | AI Master Tools`,
    description: 'Step-by-step AI workflows and automation recipes that chain the best tools together to get real work done, with the exact order to run them in.',
    extraHtml: WORKFLOWS.length
      ? `<ul style="font-size:15px;line-height:1.7;color:#475569;padding-left:18px">${WORKFLOWS.map(
          (w) => `<li><a href="/workflows/${esc(w.id)}">${esc(w.title || w.name || w.id)}</a></li>`,
        ).join('')}</ul>`
      : '',
  },
  { path: '/discover', title: `Discover New and Trending AI Tools, Updated Weekly`, description: 'Discover new and trending AI tools across every category — chatbots, image, video, writing, coding and automation — with pricing, ratings and honest reviews.' },
  { path: '/find', title: `AI Tool Finder — Answer 3 Questions | AI Master Tools`, description: 'Not sure which AI tool you need? Answer three quick questions about your job, budget and skill level, and we will shortlist the best tools for you — free.' },
  {
    path: '/earn',
    heading: 'Websites to Earn Online',
    title: `Earn Online — ${EARN_SITES || 80}+ Websites to Make Money by Category (${YEAR})`,
    description: `A curated directory of ${EARN_SITES || 80}+ real websites to earn online — remote jobs, freelance, work from home, surveys, testing, gig work, e-commerce and more.`,
    extraHtml: EARN_CATS.length
      ? `<p style="font-size:15px;line-height:1.6;color:#64748b">Categories covered:</p><ul style="columns:2;font-size:15px;line-height:1.8;color:#475569;padding-left:18px">${EARN_CATS.map(
          (c) => `<li><a href="/earn/${esc(c.id)}">${esc(c.name)}</a></li>`,
        ).join('')}</ul>`
      : '',
  },
  // Earn Online per-category pages
  ...EARN_CATS.map((c) => {
    const cn = c.name.replace(/\s*\([^)]*\)/, '').trim();
    return {
      path: `/earn/${c.id}`,
      heading: `Best ${cn} websites`,
      title: pickTitle([
        `Best ${cn} Websites to Earn Online (${YEAR}) — ${c.sites.length} Legit Sites`,
        `Best ${cn} Websites (${YEAR}) — ${c.sites.length} Legit Sites Compared`,
        `Best ${cn} Websites (${YEAR}) — ${c.sites.length} Legit Sites`,
        `Best ${cn} Websites (${YEAR}) — ${c.sites.length} Sites`,
        `Best ${cn} Websites to Earn Online (${YEAR})`,
        `Best ${cn} Websites (${YEAR})`,
      ], `/earn/${slugify(cn)}`),
      description: clamp(`${c.blurb} ${c.sites.length} hand-checked sites, each with an official link and an honest intro.`),
      extraHtml: `<ul style="font-size:15px;line-height:1.7;color:#475569;padding-left:18px">${c.sites
        .map((s) => `<li><strong>${esc(s.name)}</strong> — ${esc(s.intro)}</li>`)
        .join('')}</ul>`,
    };
  }),
  // Tool pages
  ...TOOLS.map((t) => ({
    path: `/tool/${t.id}`,
    heading: `${t.name} Review`,
    title: pickTitle([
      `${t.name} Review (${YEAR}) — Features, Pricing and Alternatives`,
      `${t.name} Review (${YEAR}) — Features, Pricing & Alternatives`,
      `${t.name} Review (${YEAR}) — Features, Pricing and Verdict`,
      `${t.name} Review (${YEAR}) — Pricing, Rating and Verdict`,
      `${t.name} Review (${YEAR}) — Pricing & Alternatives`,
      `${t.name} Review (${YEAR}) — Rating & Pricing`,
      `${t.name} Review (${YEAR}) — Features & Pricing`,
      `${t.name} Review (${YEAR}) — Verdict`,
      `${t.name} Review (${YEAR}) — Features, Pricing & Alternatives`,
      `${t.name} Review (${YEAR}) — Features, Pricing and Verdict`,
      `${t.name} Review (${YEAR}) — Pricing, Rating and Verdict`,
      `${t.name} Review (${YEAR}) — Pricing, Rating & Alternatives`,
      `${t.name} Review & Alternatives (${YEAR}) | AI Master Tools`,
      `${t.name} Review (${YEAR}) — Pricing and Alternatives`,
      `${t.name} Review & Alternatives (${YEAR})`,
      `${t.name} Review (${YEAR})`,
    ], `/tool/${t.id}`),
    description: fitDescription(`Our review of ${t.name}. Discover its features, pricing, rating, and the best AI alternatives for ${(t.category || 'AI').toLowerCase()}.`, DESC_TAILS, `/tool/${t.id}`),
    jsonLd: toolJsonLd(t),
    // Same orphan-page problem as category pages, from the tool's side: a
    // tool page linked to the generic nav and nothing else crawlable, so it
    // had no outgoing links into the rest of the catalog either. A few real
    // alternatives in the same category give it both a path out and, for
    // those alternatives, one more incoming link than the category page
    // alone provides.
    extraHtml: (() => {
      const canonicalCat = CATEGORY_ALIASES[t.category] || t.category;
      const alts = toolsForCategory(canonicalCat).filter((o) => o.id !== t.id).slice(0, 8);
      const catLink = `<p style="font-size:15px;line-height:1.6"><a href="/category/${slugify(canonicalCat || '')}">See all ${(canonicalCat || 'AI').toLowerCase()} tools</a></p>`;
      const list = alts.length
        ? `<ul style="font-size:15px;line-height:1.7;color:#475569;padding-left:18px">${alts
            .map((o) => `<li><a href="/tool/${esc(o.id)}">${esc(o.name)}</a></li>`)
            .join('')}</ul>`
        : '';
      // The tool's own alternatives round-up and head-to-head pages. Both are
      // generated and in the sitemap, and until now nothing linked to either.
      const altPage = `<p style="font-size:15px;line-height:1.6"><a href="/alternatives/${slugify(
        t.id,
      )}-alternatives">All ${esc(t.name)} alternatives, compared</a></p>`;
      const pairs = comparesByTool.get(t.id) || [];
      const compare = pairs.length
        ? `<h2 style="font-size:20px;margin:24px 0 8px">${esc(t.name)} head to head</h2>` +
          `<ul style="font-size:15px;line-height:1.7;color:#475569;padding-left:18px">${pairs
            .map(
              (r) =>
                `<li><a href="${r.path}">${esc(r.pairNames[0])} vs ${esc(
                  r.pairNames[1],
                )}</a></li>`,
            )
            .join('')}</ul>`
        : '';
      const title = alts.length
        ? `<h2 style="font-size:20px;margin:24px 0 8px">${esc(t.name)} alternatives</h2>`
        : '';
      return `${title}${catLink}${list}${altPage}${compare}`;
    })(),
  })),
  // Category pages
  ...CATEGORIES.map((c) => {
    const n = catCount(c.name);
    // Without this, the category page's only crawlable content was its own
    // h1 and description — none of the tools "in" the category were actually
    // linked from anywhere but the sitemap. React renders the real tool grid
    // client-side, but that never reaches a crawler that doesn't run it, so
    // every one of the 654 tool pages sat with zero incoming internal links
    // (Ahrefs: "Orphan page", 1,724 of 1,794 URLs — nearly the whole site).
    // Same fix already used for /earn/<category>: list the real tools here,
    // with real <a href="/tool/...">, so category pages actually distribute
    // link equity to them instead of just describing a count.
    const toolsInCat = toolsForCategory(c.name);
    return {
      path: `/category/${slugify(c.name)}`,
      heading: `Best ${c.name} AI Tools`,
      title: pickTitle([
        `${n} Best ${c.name} AI Tools to Try in ${YEAR}, Compared & Rated`,
        `${n} Best ${c.name} AI Tools (${YEAR}) — Compared, Rated & Priced`,
        `${n} Best ${c.name} AI Tools (${YEAR}) — Compared and Rated`,
        `${n} Best ${c.name} AI Tools (${YEAR}) — Compared & Rated`,
        `${n} Best ${c.name} AI Tools (${YEAR}) | AI Master Tools`,
        `${n} Best ${c.name} AI Tools (${YEAR}) — Free and Paid`,
        `${n} Best ${c.name} AI Tools Compared (${YEAR})`,
        `${n} Best ${c.name} AI Tools (${YEAR})`,
      ], `/category/${slugify(c.name)}`),
      description: clamp(`Browse ${n} ${c.name.toLowerCase()} AI tools with pricing, ratings and honest reviews. Filter by free, freemium or paid and compare any two side by side.`),
      extraHtml: toolsInCat.length
        ? `<ul style="font-size:15px;line-height:1.7;color:#475569;padding-left:18px">${toolsInCat
            .map((t) => `<li><a href="/tool/${esc(t.id)}"><strong>${esc(t.name)}</strong></a> — ${esc(clamp(t.description || t.longDescription || '', 100))}</li>`)
            .join('')}</ul>`
        : '',
    };
  }),
  // Alternatives and comparison pages.
  //
  // The sitemap has been advertising 945 of these while this script covered
  // none of them, so every one served the shell: the homepage's title, the
  // homepage's description, and an empty body. To Google that is 945 duplicates
  // of one page, which is why they sit at position 70–82 collecting one or two
  // impressions each. They get their own titles and their own content here.
  ...ALTERNATIVES_ROUTES,
  ...COMPARE_ROUTES,
  ...BLOG_ROUTES,
  ...COLLECTION_ROUTES,
  ...WORKFLOW_ROUTES,
  ...LEGAL_ROUTES,
  ...FREE_ROUTES,
  ...SHOPPING_ROUTES,
];

/**
 * dist/index.html is the shared base for every prerendered page — the loop
 * below copies it per route and only overwrites title/description/OG/canonical.
 * It never touches the <noscript> paragraph text, so the literal "640+" baked
 * into that paragraph was shipping on every single prerendered page (tool,
 * category, alternatives — all of them), not just the homepage. The homepage
 * itself compounds it: nothing in the loop processes "/" at all (there is no
 * route for it), so its title/meta/OG carried the same stale figure too, while
 * every route's own injected intro paragraph already computed TOOLS.length
 * correctly — meaning a single tool page could show "640+" and "699+" in two
 * different sentences on the same document.
 *
 * Fixing it on `template`, before the loop reads from it, corrects both: the
 * homepage (which gets no further processing) and the noscript text on every
 * other route. It also can't go stale again — this moves with the catalog on
 * every future build instead of needing a manual find-and-replace.
 */
const template = readFileSync(join(DIST, 'index.html'), 'utf8').replaceAll('640+', `${TOOLS.length}+`);
writeFileSync(join(DIST, 'index.html'), template);

let n = 0;
/**
 * Sibling links, so no page depends on a single parent for its only link.
 *
 * Listing a section's children on its hub gives each child exactly one
 * incoming internal link. That clears the orphan error but leaves the whole
 * section one edit away from being unreachable again, and Ahrefs reports it
 * as "only one dofollow incoming internal link" either way.
 *
 * Each page therefore also links to a window of its siblings. The window
 * slides by position rather than always starting at the first sibling, so the
 * incoming links spread evenly across the section instead of piling onto
 * whichever children happen to sort first.
 *
 * Sections the catalogue already interlinks densely — tools, alternatives,
 * compares, categories — are skipped: they get their links from the
 * contextual blocks above, and a sibling window there would add hundreds of
 * undifferentiated links per page for no gain.
 */
const SIBLING_WINDOW = 10;
const DENSE_SECTIONS = new Set(['tool', 'alternatives', 'compare', 'category']);
const sections = new Map();
for (const r of routes) {
  const seg = r.path.split('/')[1] || '';
  if (!seg || DENSE_SECTIONS.has(seg)) continue;
  if (r.path === `/${seg}`) continue; // the hub itself already lists them
  if (!sections.has(seg)) sections.set(seg, []);
  sections.get(seg).push(r);
}

const siblingNav = (route) => {
  const seg = route.path.split('/')[1] || '';
  const list = sections.get(seg);
  if (!list || list.length < 2) return '';
  const at = list.indexOf(route);
  if (at < 0) return '';
  const picks = [];
  for (let k = 1; k <= Math.min(SIBLING_WINDOW, list.length - 1); k++) {
    picks.push(list[(at + k) % list.length]);
  }
  return (
    `<h2 style="font-size:20px;margin:24px 0 8px">More in this section</h2>` +
    `<ul style="font-size:15px;line-height:1.7;color:#475569;padding-left:18px">${picks
      .map((r) => `<li><a href="${r.path}">${esc(r.heading || r.title)}</a></li>`)
      .join('')}</ul>`
  );
};

for (const route of routes) {
  const url = `${SITE}${route.path}`;
  const t = esc(route.title);
  const d = esc(route.description);
  let html = template;
  // data-prerendered marks this as the sized title. components/SEO.tsx reads it
  // back and uses it instead of computing its own, so the document ends up with
  // one title rather than two that disagree.
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title data-prerendered="true">${t}</title>`);
  html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${d}" />`);
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  html = html.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${t}" />`);
  html = html.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${d}" />`);
  html = html.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`);
  html = html.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${t}" />`);
  html = html.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${d}" />`);

  // Give each route its own crawlable body (h1 + intro) inside the empty #root.
  // React's createRoot replaces it on mount, so it never double-renders.
  const heading = esc(route.heading || route.title.split(/ [|—] /)[0]);
  // Convert the generic <noscript> h1 to a paragraph so the injected #root h1
  // below is the single, per-route h1.
  html = html.replace(/<h1>AI Master Tools[^<]*<\/h1>/, `<p style="font-size:20px;font-weight:700">${heading}</p>`);
  // Every top-level page, not just four of them. The nav is the only link
  // most of these hubs get: /discover, /find, /prompts, /workflows, /free,
  // /earn, /collections, /ai-shopping and the legal pages each sat at zero
  // incoming internal links because nothing but sitemap.xml named them.
  const nav =
    '<nav aria-label="Browse">' +
    [
      ['/', 'All AI tools'],
      ['/categories', 'Categories'],
      ['/compare', 'Compare'],
      ['/alternatives', 'Alternatives'],
      ['/collections', 'Collections'],
      ['/discover', 'Discover'],
      ['/find', 'Tool finder'],
      ['/free', 'Free AI tools'],
      ['/prompts', 'Prompts'],
      ['/workflows', 'Workflows'],
      ['/earn', 'Earn online'],
      ['/ai-shopping', 'AI shopping'],
      ['/blog', 'Blog'],
      ['/about', 'About'],
      ['/careers', 'Careers'],
      ['/affiliate-disclosure', 'Affiliate disclosure'],
      ['/privacy', 'Privacy'],
      ['/terms', 'Terms'],
    ]
      .map(([href, label]) => `<a href="${href}">${label}</a>`)
      .join(' · ') +
    '</nav>';
  const support = `Free to explore on AI Master Tools — the independent directory of ${TOOLS.length}+ AI tools. Search by name or by the job you need done, filter by free, freemium or paid, check ratings and real pricing, and compare any two tools side by side to choose the right one in minutes.`;
  const seoBlock = `<div id="root"><div id="prerender-seo" style="max-width:820px;margin:0 auto;padding:48px 20px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif"><h1 style="font-size:30px;line-height:1.2;margin:0 0 14px;font-weight:800">${heading}</h1><p style="font-size:17px;line-height:1.6;color:#475569">${d}</p><p style="font-size:15px;line-height:1.6;color:#64748b">${support}</p>${route.extraHtml || ''}${siblingNav(route)}${nav}</div></div>`;
  html = html.replace('<div id="root"></div>', seoBlock);

  // Real structured data for the routes that carry it (currently tool pages),
  // baked into the static file rather than left to appear only after React
  // hydrates. See toolJsonLd() above for what it does and does not claim.
  if (route.jsonLd) {
    const script = `<script type="application/ld+json">${JSON.stringify(route.jsonLd)}</script>`;
    html = html.replace('</head>', `${script}\n  </head>`);
  }

  const outPath = join(DIST, route.path.slice(1), 'index.html');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  n++;
}

console.log(`prerendered ${n} routes — ${TOOLS.length} tools · ${CATEGORIES.length} categories · ${routes.length - TOOLS.length - CATEGORIES.length} pages`);

/* ------------------------------------------------------- service worker -- */

/**
 * Stamp the service worker with a build id.
 *
 * Its cache name was a literal that never changed, so the worker file stayed
 * byte-identical across deploys. A browser only installs a worker whose bytes
 * differ — so install and activate never ran again, the old cache was never
 * dropped, and anyone who had visited before kept getting an old bundle. The
 * id is derived from the built asset filenames, which are content-hashed, so it
 * changes exactly when the output does.
 */
const swPath = join(DIST, 'sw.js');
try {
  const shell = readFileSync(join(DIST, 'index.html'), 'utf8');
  const assets = [...shell.matchAll(/\/assets\/[A-Za-z0-9._-]+/g)].map((m) => m[0]).sort().join('|');
  let hash = 0;
  for (let i = 0; i < assets.length; i++) hash = ((hash << 5) - hash + assets.charCodeAt(i)) | 0;
  const buildId = Math.abs(hash).toString(36);
  const sw = readFileSync(swPath, 'utf8').replace('__BUILD_ID__', buildId);
  writeFileSync(swPath, sw);
  console.log(`service worker cache: amt-${buildId}`);
} catch (err) {
  console.error('service worker not stamped:', err.message);
  process.exitCode = 1;
}

/* Report anything the length fitters could not place, rather than shipping it
   quietly. These are titles whose variable part is longer than the window
   itself — a tool name of 55 characters leaves no room for anything else. */
if (titleWarnings.length) {
  console.warn(`prerender: ${titleWarnings.length} titles outside ${TITLE_MIN}-${TITLE_MAX}`);
  for (const w of titleWarnings.slice(0, 12)) console.warn(`  ${w}`);
  if (titleWarnings.length > 12) console.warn(`  … ${titleWarnings.length - 12} more`);
}
if (descWarnings.length) {
  console.warn(`prerender: ${descWarnings.length} descriptions outside ${DESC_MIN}-${DESC_MAX}`);
  for (const w of descWarnings.slice(0, 8)) console.warn(`  ${w}`);
}

/**
 * A real 404 document.
 *
 * Vercel serves this with a 404 status for any path that matches no file —
 * but only now that the catch-all rewrite is gone. Until this, every typo and
 * stale link answered 200 with the homepage and `index, follow`, which offers
 * Google an unbounded supply of duplicate pages at addresses nobody chose.
 *
 * noindex as well as the status, because the two are read by different things
 * and either one alone leaves a gap.
 */
const notFoundHtml = template
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Page not found — AI Master Tools</title>')
  .replace(
    /<meta name="description"[^>]*>/,
    '<meta name="description" content="That page does not exist. The tool directory, comparisons, alternatives and category guides are all still here." />',
  )
  .replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex, follow" />')
  .replace(
    /<div id="root"[^>]*><\/div>/,
    `<div id="root"><div id="prerender-seo" style="max-width:820px;margin:0 auto;padding:48px 20px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif">` +
      `<h1 style="font-size:30px;line-height:1.2;margin:0 0 14px;font-weight:800">Page not found</h1>` +
      `<p style="font-size:17px;line-height:1.6;color:#475569">That page does not exist — the link may be out of date, or the address mistyped.</p>` +
      `<nav aria-label="Browse"><a href="/">All AI tools</a> &middot; <a href="/categories">Categories</a> &middot; ` +
      `<a href="/compare">Compare</a> &middot; <a href="/free">Free tools</a> &middot; <a href="/blog">Blog</a></nav>` +
      `</div></div>`,
  );

writeFileSync(join(DIST, '404.html'), notFoundHtml);
console.log('prerender: 404.html (noindex)');
