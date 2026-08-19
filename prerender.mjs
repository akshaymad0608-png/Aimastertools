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

// ---- Load categories + count tools each ------------------------------------
const catSrc = readFileSync('data/categories.ts', 'utf8');
const cStart = catSrc.indexOf('CATEGORY_META = [') + 'CATEGORY_META = ['.length - 1;
const CATEGORIES = eval(catSrc.slice(cStart, catSrc.indexOf('\n];', cStart) + 2)).filter(Boolean);
const catCount = (name) => TOOLS.filter((t) => t.category === name).length;

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
  `<li><strong>${esc(t.name)}</strong> — ${esc(t.description || '')} (${esc(
    t.pricing || 'Pricing varies',
  )}, rated ${t.rating || '—'}/5)</li>`;

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
          .join('')}</ul>`
      : '',
  };
});

// The sitemap pairs tools from the id-deduped list, not the name-deduped one,
// so the top four per category differ between the two. Mirror it exactly —
// grouping from `byId` and sorting the same way — or 60 of the URLs it
// advertises point at pages this script never wrote.
const byCategory = new Map();
for (const t of byId) {
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

const LEGAL_ROUTES = [
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
 */
const suffixFor = (name, lower = false) => {
  const t = lower ? 'tools' : 'Tools';
  if (/tools?$/i.test(name)) return '';
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
          `<li><a href="/free/${c.slug}">Free ${esc(c.name)}</a> AI tools — ${c.tools.length} tools, ${
            c.fullyFree.length
          } fully free</li>`,
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
    description: clamp(
      `${c.tools.length} free ${c.name.toLowerCase()} AI tools — ${c.fullyFree.length} completely free and ${
        c.freemium.length
      } with a real free tier, rated and kept apart so you know which is which.`,
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
  { path: '/categories', title: `All AI Tool Categories (${YEAR}) — Browse Them All Free`, description: 'Browse every AI tool category — chatbots, image generation, coding, video, writing, marketing and more. Find and compare the best tools in each.' },
  { path: '/compare', title: `Compare AI Tools Side by Side (${YEAR}) | AI Master Tools`, description: 'Compare any two AI tools side by side — features, pricing, ratings and pros and cons — so you can choose the right one without a free trial.' },
  { path: '/collections', title: `Curated AI Tool Collections (${YEAR}) | AI Master Tools`, description: 'Hand-picked collections of the best AI tools for specific jobs and workflows — writing, video, design, coding and research, ready to explore.' },
  { path: '/blog', title: `AI Tools Blog — Guides, Comparisons and Prompt Tips`, description: 'AI tool guides, honest comparisons and prompt-engineering tutorials to help you pick the right AI tools and actually get results out of them.' },
  { path: '/prompts', title: `AI Prompt Library — Reusable Prompt Frameworks (${YEAR})`, description: 'A free library of reusable AI prompt frameworks — persona setup, chain-of-thought and few-shot scaffolds you can paste and edit.' },
  { path: '/workflows', title: `AI Workflows & Automation Recipes (${YEAR}) | AI Master Tools`, description: 'Step-by-step AI workflows and automation recipes that chain the best tools together to get real work done, with the exact order to run them in.' },
  { path: '/discover', title: `Discover New and Trending AI Tools, Updated Weekly`, description: 'Discover new and trending AI tools across every category — chatbots, image, video, writing, coding and automation — with pricing, ratings and honest reviews.' },
  { path: '/find', title: `AI Tool Finder — Answer 3 Questions | AI Master Tools`, description: 'Not sure which AI tool you need? Answer three quick questions about your job, budget and skill level, and we will shortlist the best tools for you — free.' },
  {
    path: '/earn',
    heading: 'Websites to Earn Online',
    title: `Earn Online — ${EARN_SITES || 80}+ Websites to Make Money by Category (${YEAR})`,
    description: `A curated directory of ${EARN_SITES || 80}+ real websites to earn online — remote jobs, freelance, work from home, surveys, testing, gig work, e-commerce and more.`,
    extraHtml: EARN_CATS.length
      ? `<p style="font-size:15px;line-height:1.6;color:#64748b">Categories covered:</p><ul style="columns:2;font-size:15px;line-height:1.8;color:#475569;padding-left:18px">${EARN_CATS.map(
          (c) => `<li>${esc(c.name)}</li>`,
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
      `${t.name} Review (${YEAR}) — Pricing, Pros and Verdict`,
      `${t.name} Review (${YEAR}) — Pricing & Alternatives`,
      `${t.name} Review (${YEAR}) — Pros, Cons & Pricing`,
      `${t.name} Review (${YEAR}) — Features & Pricing`,
      `${t.name} Review (${YEAR}) — Verdict`,
      `${t.name} Review (${YEAR}) — Features, Pricing & Alternatives`,
      `${t.name} Review (${YEAR}) — Features, Pricing and Verdict`,
      `${t.name} Review (${YEAR}) — Pricing, Pros and Verdict`,
      `${t.name} Review (${YEAR}) — Pricing, Pros & Alternatives`,
      `${t.name} Review & Alternatives (${YEAR}) | AI Master Tools`,
      `${t.name} Review (${YEAR}) — Pricing and Alternatives`,
      `${t.name} Review & Alternatives (${YEAR})`,
      `${t.name} Review (${YEAR})`,
    ], `/tool/${t.id}`),
    description: fitDescription(`Our review of ${t.name}. Discover its features, pricing, pros, cons, and the best AI alternatives for ${(t.category || 'AI').toLowerCase()}.`, DESC_TAILS, `/tool/${t.id}`),
  })),
  // Category pages
  ...CATEGORIES.map((c) => {
    const n = catCount(c.name);
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
];

const template = readFileSync(join(DIST, 'index.html'), 'utf8');

let n = 0;
for (const route of routes) {
  const url = `${SITE}${route.path}`;
  const t = esc(route.title);
  const d = esc(route.description);
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);
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
  const nav = '<nav aria-label="Browse"><a href="/">All AI tools</a> · <a href="/categories">Categories</a> · <a href="/compare">Compare</a> · <a href="/blog">Blog</a></nav>';
  const support = `Free to explore on AI Master Tools — the independent directory of ${TOOLS.length}+ AI tools. Search by name or by the job you need done, filter by free, freemium or paid, check ratings and real pricing, and compare any two tools side by side to choose the right one in minutes.`;
  const seoBlock = `<div id="root"><div id="prerender-seo" style="max-width:820px;margin:0 auto;padding:48px 20px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif"><h1 style="font-size:30px;line-height:1.2;margin:0 0 14px;font-weight:800">${heading}</h1><p style="font-size:17px;line-height:1.6;color:#475569">${d}</p><p style="font-size:15px;line-height:1.6;color:#64748b">${support}</p>${route.extraHtml || ''}${nav}</div></div>`;
  html = html.replace('<div id="root"></div>', seoBlock);

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
