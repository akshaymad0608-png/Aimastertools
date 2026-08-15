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
    title: `${alts.length} Best ${t.name} Alternatives (${YEAR}) | AI Master Tools`,
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
        title: `${x.name} vs ${y.name}: Which Is Better? (${YEAR}) | AI Master Tools`,
        description: clamp(
          `${x.name} vs ${y.name} compared on pricing, ratings and what each does best, so you can pick the right ${cat} tool.`,
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
  title: `${b.title} | AI Master Tools`,
  description: clamp(b.excerpt || `${b.title} — a guide from AI Master Tools.`),
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
    title: c.metaTitle || `${c.title} (${YEAR}) | AI Master Tools`,
    description: clamp(c.metaDescription || c.intro || `${c.title} — hand-picked AI tools.`),
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
  title: `${w.title || w.name || 'AI Workflow'} — Automation Recipe (${YEAR}) | AI Master Tools`,
  description: clamp(
    w.description || w.summary || `A step-by-step AI workflow you can copy, using the tools it names.`,
  ),
  extraHtml: `<p style="font-size:15px;color:#475569">${esc(w.description || w.summary || '')}</p>`,
}));

const LEGAL_ROUTES = [
  {
    path: '/privacy',
    heading: 'Privacy Policy',
    title: 'Privacy Policy | AI Master Tools',
    description: 'What AI Master Tools collects, what it does not, and how your data is handled.',
  },
  {
    path: '/terms',
    heading: 'Terms of Service',
    title: 'Terms of Service | AI Master Tools',
    description: 'The terms that apply when you use AI Master Tools.',
  },
  {
    path: '/careers',
    heading: 'Careers',
    title: 'Careers | AI Master Tools',
    description: 'Open roles and how to get in touch about working on AI Master Tools.',
  },
];

const routes = [
  { path: '/categories', title: `All AI Tool Categories (${YEAR}) | AI Master Tools`, description: 'Browse every AI tool category — chatbots, image generation, coding, video, writing, marketing and more. Find and compare the best tools in each.' },
  { path: '/compare', title: `Compare AI Tools Side by Side (${YEAR}) | AI Master Tools`, description: 'Compare any two AI tools side by side — features, pricing, ratings and pros & cons — to choose the right one fast.' },
  { path: '/collections', title: `Curated AI Tool Collections (${YEAR}) | AI Master Tools`, description: 'Hand-picked collections of the best AI tools for specific jobs and workflows — ready to explore.' },
  { path: '/blog', title: `AI Tools Blog — Guides, Comparisons & Prompts | AI Master Tools`, description: 'AI tool guides, honest comparisons and prompt-engineering tutorials to help you pick and use the right AI tools.' },
  { path: '/prompts', title: `AI Prompt Library — Reusable Prompt Frameworks | AI Master Tools`, description: 'A free library of reusable AI prompt frameworks — persona setup, chain-of-thought and few-shot scaffolds you can paste and edit.' },
  { path: '/workflows', title: `AI Workflows & Automation Recipes (${YEAR}) | AI Master Tools`, description: 'Step-by-step AI workflows and automation recipes that chain the best tools together to get real work done.' },
  { path: '/discover', title: `Discover New AI Tools (${YEAR}) | AI Master Tools`, description: 'Discover new and trending AI tools across every category, updated regularly.' },
  { path: '/find', title: `AI Tool Finder — Answer 3 Questions | AI Master Tools`, description: 'Not sure which AI tool you need? Answer three quick questions and we will shortlist the best tools for you — free.' },
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
      title: `Best ${cn} Websites (${YEAR}) — ${c.sites.length} Legit Sites`,
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
    title: `${t.name} Review & Alternatives (${YEAR}) | AI Master Tools`,
    description: clamp(`Our review of ${t.name}. Discover its features, pricing, pros, cons, and the best AI alternatives for ${(t.category || 'AI').toLowerCase()}.`),
  })),
  // Category pages
  ...CATEGORIES.map((c) => {
    const n = catCount(c.name);
    return {
      path: `/category/${slugify(c.name)}`,
      heading: `Best ${c.name} AI Tools`,
      title: `${n} Best ${c.name} AI Tools (${YEAR})`,
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
