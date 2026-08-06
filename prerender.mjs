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
  // Tool pages
  ...TOOLS.map((t) => ({
    path: `/tool/${t.id}`,
    heading: `${t.name} Review`,
    title: `${t.name} Review, Pricing, & Alternatives (${YEAR}) | AI Master Tools`,
    description: clamp(`Our review of ${t.name}. Discover its features, pricing, pros, cons, and the best AI alternatives for ${(t.category || 'AI').toLowerCase()}.`),
  })),
  // Category pages
  ...CATEGORIES.map((c) => {
    const n = catCount(c.name);
    return {
      path: `/category/${slugify(c.name)}`,
      heading: `Best ${c.name} AI Tools`,
      title: `${n} Best ${c.name} AI Tools (${YEAR}) — Compared & Ranked`,
      description: clamp(`Browse ${n} ${c.name.toLowerCase()} AI tools with pricing, ratings and honest reviews. Filter by free, freemium or paid and compare any two side by side.`),
    };
  }),
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
  html = html.replace('<h1>AI Master Tools</h1>', `<p style="font-size:20px;font-weight:700">${heading}</p>`);
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
