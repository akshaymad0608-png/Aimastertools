#!/usr/bin/env node
/**
 * Builds public/best-free-ai-tools.html from data/editorial/best-free.json and
 * the tool catalogue.
 *
 *   node scripts/build-best-free.mjs            # writes the file
 *   node scripts/build-best-free.mjs --stdout   # prints it (used by the test)
 *
 * Why generated: the page used to be a hand-edited 400-line HTML file whose
 * table, cards and JSON-LD each repeated the same facts and drifted apart (a
 * "Rating" column nobody could source, "Last updated: July 2026", breadcrumbs
 * pointing at the homepage twice). Here every fact lives once, in the JSON, with
 * the vendor URL it came from, and the table, cards, ItemList and FAQPage are all
 * derived from it.
 *
 * What it will not do: invent a fact. A tool entry without a source URL fails
 * the build rather than publishing an unsupported claim.
 *
 * The URL, canonical and `index, follow` are unchanged from the page this
 * replaces.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://aimastertools.space';
const PATH = '/best-free-ai-tools.html';
const URL_ = SITE + PATH;
// Same expression prerender.mjs and vite.config.ts use for the build year.
const YEAR = Number(process.env.BUILD_YEAR) || new Date().getFullYear();

const read = (rel) => readFileSync(resolve(ROOT, rel), 'utf8');
const data = JSON.parse(read('data/editorial/best-free.json'));

/* ----------------------------------------------------------- catalogue -- */
const catalogue = (() => {
  const src = read('data/tools.ts');
  const start = src.indexOf('Tool[] = [') + 'Tool[] = ['.length - 1;
  return eval(src.slice(start, src.indexOf('\n];', start) + 2)).filter(Boolean);
})();
const byId = new Map(catalogue.map((t) => [t.id, t]));
const slugify = (v) =>
  v.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/&/g, ' and ').replace(/\+/g, ' plus ')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ------------------------------------------------------------- checks -- */
const fail = (msg) => {
  console.error('build-best-free: ' + msg);
  process.exit(1);
};
const CHECKED = data.checkedAt;
if (!/^\d{4}-\d{2}-\d{2}$/.test(CHECKED || '')) fail('checkedAt must be an ISO date');
const checkedLong = new Date(CHECKED + 'T00:00:00Z').toLocaleDateString('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
});
for (const t of data.tools) {
  if (!byId.has(t.id)) fail(`tool "${t.id}" is not in data/tools.ts`);
  if (!t.sources?.length) fail(`tool "${t.id}" has no sources: an unsourced free-plan claim is not published`);
  for (const s of t.sources) if (!/^https:\/\//.test(s.url)) fail(`tool "${t.id}": source URL must be https (${s.url})`);
  for (const k of ['whatItDoes', 'bestFor', 'freeShort', 'freeDetail', 'limitShort', 'limitDetail']) {
    if (!t[k]) fail(`tool "${t.id}" is missing ${k}`);
  }
}
const COUNT = data.tools.length;
const TOOLS_APPROX = `${Math.floor(catalogue.length / 10) * 10}+`;

/* ---------------------------------------------------------------- copy -- */
const TITLE = `Best Free AI Tools (${YEAR}): ${COUNT} Picks You Can Use Free`;
const H1 = `The Best Free AI Tools Online: ${COUNT} Picks for ${YEAR}`;
const DESCRIPTION = `The best free AI tools online in ${YEAR}: ${COUNT} picks for chat, images, writing, video, coding and music, with what each free plan includes and where it stops.`;
if (TITLE.length > 65) fail(`title is ${TITLE.length} characters`);
if (DESCRIPTION.length > 160) fail(`description is ${DESCRIPTION.length} characters`);

const faqs = data.faqs.map((f) => ({ q: f.q, a: f.a.replaceAll('{{CHECKED_LONG}}', checkedLong) }));
const linkOf = (id) => {
  const t = byId.get(id);
  return `<a href="/tool/${esc(id)}">${esc(t.name)}</a>`;
};
const catLink = (t) => `<a href="/category/${slugify(t.category)}">${esc(t.category)}</a>`;

/* ---------------------------------------------------------------- json -- */
const ld = (obj) => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/</g, '\\u003c')}\n</script>`;
const jsonLd = [
  ld({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Free AI tools', item: SITE + '/free' },
      { '@type': 'ListItem', position: 3, name: 'Best Free AI Tools', item: URL_ },
    ],
  }),
  ld({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': URL_ + '#webpage',
    url: URL_,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: 'en',
    dateModified: CHECKED,
    isPartOf: { '@type': 'WebSite', name: 'AI Master Tools', url: SITE + '/' },
  }),
  ld({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: H1,
    itemListElement: data.tools.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: byId.get(t.id).name,
      url: `${SITE}/tool/${t.id}`,
    })),
  }),
  ld({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }),
].join('\n');

/* --------------------------------------------------------------- parts -- */
const navLinks = [
  ['/', 'All tools'], ['/categories', 'Categories'], ['/free', 'Free tools'], ['/compare', 'Compare'], ['/blog', 'Blog'],
];
const nav = navLinks.map(([h, l]) => `<a href="${h}">${l}</a>`).join('\n      ');

const jobsList = (() => {
  const jobs = new Map();
  for (const t of data.tools) jobs.set(t.job, [...(jobs.get(t.job) || []), t.id]);
  return [...jobs.entries()]
    .map(([job, ids]) => `<li><b>${esc(job)}:</b> ${ids.map((id) => `<a href="#${esc(id)}">${esc(byId.get(id).name)}</a>`).join(', ')}</li>`)
    .join('\n      ');
})();

const tableRows = data.tools
  .map((t) => {
    const c = byId.get(t.id);
    return `<tr><td>${linkOf(t.id)}</td><td>${esc(t.bestFor)}</td><td>${esc(t.freeShort)}</td><td>${esc(t.limitShort)}</td><td>${catLink(c)}</td></tr>`;
  })
  .join('\n        ');

const cards = data.tools
  .map((t, i) => {
    const c = byId.get(t.id);
    const sources = t.sources
      .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a>`)
      .join(' · ');
    const alt = t.alternativesLink
      ? `<a class="btn ghost" href="/alternatives/${slugify(t.id)}-alternatives">${esc(c.name)} alternatives</a>`
      : '';
    return `<article class="tool" id="${esc(t.id)}">
    <h3><span class="rank">${i + 1}.</span> <a href="/tool/${esc(t.id)}">${esc(c.name)}</a></h3>
    <p class="job">${esc(t.job)} · ${catLink(c)}</p>
    <dl class="facts">
      <div><dt>What it does</dt><dd>${esc(t.whatItDoes)}</dd></div>
      <div><dt>Best for <span class="tag">our view</span></dt><dd>${esc(t.bestFor)}</dd></div>
      <div><dt>Free access <span class="tag src">from the vendor</span></dt><dd>${esc(t.freeDetail)}</dd></div>
      <div><dt>Main limitation <span class="tag src">from the vendor</span></dt><dd>${esc(t.limitDetail)}</dd></div>
    </dl>
    <p class="srcs">Sources, as read on <time datetime="${CHECKED}">${esc(checkedLong)}</time>: ${sources}</p>
    <p class="actions"><a class="btn" href="/tool/${esc(t.id)}">${esc(c.name)} listing →</a> <a class="btn ghost" href="${esc(c.url)}" target="_blank" rel="noopener noreferrer nofollow">Visit ${esc(c.name)} ↗</a> ${alt}</p>
  </article>`;
  })
  .join('\n\n  ');

const startWith = data.startWith
  .map((s) => `<li><b>If you need ${esc(s.need)}:</b> start with ${s.ids.map(linkOf).join(', ')}. ${esc(s.why)}</li>`)
  .join('\n      ');

const faqHtml = faqs.map((f) => `<div class="faq-item"><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join('\n    ');
const spokes = data.spokes.map((s) => `<a href="${esc(s.path)}">${esc(s.label)}</a>`).join('\n    ');
const related = data.relatedGuides.map((r) => `<a href="${esc(r.path)}">${esc(r.label)}</a>`).join('\n    ');

const css = `:root{--bg:#0b1020;--card:#141a2e;--line:#26304d;--text:#e7ebf5;--muted:#9aa6c2;--brand:#5b7cff;--brand2:#7c93ff;--good:#37d39b;--chip:#1d2540}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--text);font:16px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
  a{color:var(--brand);text-decoration:none}a:hover{text-decoration:underline}
  .wrap{max-width:860px;margin:0 auto;padding:0 20px}
  header.site{border-bottom:1px solid var(--line);padding:14px 0;position:sticky;top:0;background:rgba(11,16,32,.9);backdrop-filter:blur(8px);z-index:5}
  header.site .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
  .logo{font-weight:800;font-size:18px;color:var(--text)}
  .logo span{background:linear-gradient(90deg,var(--brand),var(--brand2));-webkit-background-clip:text;background-clip:text;color:transparent}
  .nav{display:flex;gap:18px;font-size:14px}
  .nav a{color:var(--muted)}
  .crumbs{font-size:13px;color:var(--muted);padding:18px 0 0}.crumbs a{color:var(--muted)}
  h1{font-size:34px;line-height:1.2;margin:12px 0 8px;font-weight:800}
  .lede{font-size:18px;color:var(--muted);margin:0 0 8px}
  .meta{font-size:13px;color:var(--muted);margin:8px 0 26px}
  h2{font-size:24px;margin:40px 0 10px;font-weight:750}
  h3{font-size:19px;margin:0}
  .note{font-size:14px;color:var(--muted);margin:6px 0 14px}
  .answer{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px 20px;margin:10px 0 0}
  .answer ul{margin:8px 0 0;padding-left:20px}
  .table-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:14px;margin:8px 0 10px}
  table{width:100%;border-collapse:collapse;font-size:14px;min-width:720px}
  th,td{text-align:left;padding:12px 14px;border-bottom:1px solid var(--line);vertical-align:top}
  th{background:var(--chip);color:var(--muted);font-weight:600;white-space:nowrap}
  tr:last-child td{border-bottom:none}
  .tool{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:22px;margin:16px 0}
  .tool h3 a{color:var(--text)}
  .rank{color:var(--muted);font-weight:700;font-size:14px}
  .job{font-size:13px;color:var(--muted);margin:2px 0 10px}.job a{color:var(--muted);text-decoration:underline}
  .facts{margin:0}.facts div{padding:8px 0;border-top:1px solid var(--line)}.facts div:first-child{border-top:none}
  .facts dt{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);font-weight:700}
  .facts dd{margin:2px 0 0}
  .tag{font-size:10px;letter-spacing:.03em;border:1px solid var(--line);border-radius:999px;padding:1px 7px;margin-left:6px;text-transform:none;color:var(--muted)}
  .tag.src{color:var(--good);border-color:var(--good)}
  .srcs{font-size:12.5px;color:var(--muted);margin:10px 0 0}
  .actions{margin:12px 0 0;display:flex;flex-wrap:wrap;gap:10px}
  .btn{display:inline-block;background:linear-gradient(90deg,var(--brand),var(--brand2));color:#0b1020;font-weight:700;padding:8px 14px;border-radius:10px;font-size:14px}
  .btn.ghost{background:transparent;color:var(--brand);border:1px solid var(--line)}
  .btn:hover{text-decoration:none;opacity:.92}
  .terms dt{font-weight:700;margin-top:12px}.terms dd{margin:2px 0 0;color:var(--muted)}
  .faq-item{border-top:1px solid var(--line);padding:12px 0}.faq-item h3{font-size:17px}.faq-item p{margin:6px 0 0;color:var(--muted)}
  .cta{background:linear-gradient(120deg,#182042,#1c1636);border:1px solid var(--line);border-radius:18px;padding:26px;text-align:center;margin:36px 0}
  .cta h2{margin:0 0 8px}
  .related{display:flex;flex-wrap:wrap;gap:10px;margin:10px 0 0}
  .related a{background:var(--chip);border:1px solid var(--line);border-radius:999px;padding:7px 14px;font-size:14px}
  footer{border-top:1px solid var(--line);margin-top:40px;padding:26px 0;color:var(--muted);font-size:14px}
  footer .links{display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:8px}footer a{color:var(--muted)}
  @media(max-width:600px){h1{font-size:27px}.nav{width:100%;overflow-x:auto;white-space:nowrap;gap:16px;padding-bottom:2px}}`;

const footerLinks = [
  ['/free', 'Free AI tools'], ['/categories', 'Categories'], ['/compare', 'Compare'], ['/blog', 'Blog'], ['/about', 'About'],
  ['/contact', 'Contact'], ['/affiliate-disclosure', 'Affiliate disclosure'], ['/privacy', 'Privacy'], ['/terms', 'Terms'],
].map(([h, l]) => `<a href="${h}">${l}</a>`).join('\n      ');

/* ---------------------------------------------------------------- page -- */
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(TITLE)}</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="description" content="${esc(DESCRIPTION)}" />
<link rel="canonical" href="${URL_}" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<meta name="author" content="AI Master Tools" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="AI Master Tools" />
<meta property="og:title" content="${esc(TITLE)}" />
<meta property="og:description" content="${esc(DESCRIPTION)}" />
<meta property="og:url" content="${URL_}" />
<meta property="og:image" content="${SITE}/og-cover.png" />
<meta property="article:modified_time" content="${CHECKED}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(TITLE)}" />
<meta name="twitter:description" content="${esc(DESCRIPTION)}" />
<meta name="twitter:image" content="${SITE}/og-cover.png" />
${jsonLd}
<style>
  ${css}
</style>
</head>
<body>
<header class="site">
  <div class="wrap">
    <a class="logo" href="/">AI <span>Master Tools</span></a>
    <nav class="nav" aria-label="Main">
      ${nav}
    </nav>
  </div>
</header>
<main class="wrap">
  <div class="crumbs"><a href="/">Home</a> › <a href="/free">Free AI tools</a> › <span>Best free AI tools</span></div>
  <h1>${esc(H1)}</h1>
  <p class="lede">The best free AI tools in ${YEAR} are ${data.tools.map((t) => esc(byId.get(t.id).name)).slice(0, -1).join(', ')} and ${esc(byId.get(data.tools[COUNT - 1].id).name)}. Each has a free plan you can start on without paying, but nearly all of them cap how much you can do, so the useful question is not whether a tool is free but how far free gets you. This page answers that for each one.</p>
  <p class="meta">Free-plan details last checked <time datetime="${CHECKED}">${esc(checkedLong)}</time> · Sources are linked under every tool</p>

  <h2>What are the best free AI tools?</h2>
  <div class="answer">
    <p style="margin:0">${esc(data.quickAnswer.intro)}</p>
    <ul>
      ${jobsList}
    </ul>
  </div>
  <p class="note">These are our picks, not a ranking by quality or popularity. Free plans change often, so check the vendor's page before you depend on one.</p>

  <h2>Best free AI tools at a glance</h2>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Tool</th><th>Best for</th><th>Free access</th><th>Free-tier limitation</th><th>Category</th></tr></thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  </div>
  <p class="note">“Free access” and “limitation” come from the vendors' own pages (linked below); “best for” is our judgement. The details under each tool say more.</p>

  <h2>The ${COUNT} best free AI tools, one by one</h2>
  <p class="note">Lines tagged <span class="tag src">from the vendor</span> are taken from the linked pricing or help pages. Lines tagged <span class="tag">our view</span> are our own recommendation.</p>

  ${cards}

  <h2>Free vs freemium: what “free” really means</h2>
  <p>“Free AI tool” covers several different deals, and the differences decide whether a tool will still work for you in a month:</p>
  <dl class="terms">
    <dt>Free or open source</dt>
    <dd>Costs nothing to use. Open-source software is free to run, but you may still pay for the computer or hosting it runs on. None of the ${COUNT} picks here is this kind of tool.</dd>
    <dt>Free plan (free tier)</dt>
    <dd>A plan that stays free, with fewer features or lower usage limits than paid plans. Every pick here has one.</dd>
    <dt>Freemium</dt>
    <dd>The business model behind most of these tools: a free plan to get you started and paid plans for more. Freemium does not mean unlimited. All ${COUNT} picks are freemium.</dd>
    <dt>Free trial</dt>
    <dd>Full access for a limited period, after which you pay or lose access. A trial is not a free plan, and the tools here are included for their ongoing free plans.</dd>
    <dt>Credits, tokens and quotas</dt>
    <dd>A free allowance that is used up as you work and refills later. Leonardo AI (daily tokens), Suno AI (daily credits), Ideogram (weekly credits), ElevenLabs (monthly credits), Canva (a monthly AI allowance) and Windsurf (a usage quota) work this way. ChatGPT, Gemini, Claude, Perplexity and Copilot instead apply usage limits that vary by feature and demand.</dd>
    <dt>Personal versus commercial use</dt>
    <dd>Free does not always mean free for business. Suno and ElevenLabs both say their free plans are for non-commercial use.</dd>
  </dl>
  <p>Our <a href="/free">free AI tools hub</a> lists tools by category and keeps tools that are free outright apart from those with only a free tier.</p>

  <h2>Which free AI tool should you start with?</h2>
  <ul>
      ${startWith}
  </ul>

  <h2>How we chose and checked these tools</h2>
  <p><b>Selection.</b> Each tool has an ongoing free plan according to its own pricing or help pages, and together the ${COUNT} cover different jobs: chat, research, images, design, video, music, voice and coding. Each is also listed in our directory, linked from its name.</p>
  <p><b>Checking.</b> The free-access and limitation lines were taken from the vendor pages linked under each tool, as they read on <time datetime="${CHECKED}">${esc(checkedLong)}</time>. ${esc(data.sourceNote)} If we could not confirm a detail from a vendor page, we do not state it.</p>
  <p><b>Opinion versus fact.</b> “Best for” and the starting recommendations are our own judgement, not vendor claims. The order is by job, not by merit.</p>
  <p><b>Independence.</b> The links to the tools on this page are ordinary links, and none is an affiliate link at the time of writing. See our <a href="/affiliate-disclosure">affiliate disclosure</a>. Free plans change often, so treat every limit above as a snapshot.</p>

  <h2>Frequently asked questions</h2>
  <div class="faq">
    ${faqHtml}
  </div>

  <h2>Browse more free AI tools by category</h2>
  <p>This page is a short list of picks. For everything with a free plan, browse by category:</p>
  <div class="related">
    <a href="/free">All free AI tools</a>
    ${spokes}
  </div>

  <h2>Related guides</h2>
  <div class="related">
    ${related}
  </div>
  <div class="cta">
    <h2>Explore ${TOOLS_APPROX} AI tools</h2>
    <p style="color:var(--muted);margin:0 0 4px">This is one short list. Browse, compare and read about AI tools for writing, images, coding, chat, video and more.</p>
    <a class="btn" href="/">Browse all AI tools →</a>
  </div>
</main>
<footer><div class="wrap">© ${YEAR} <a href="/">AI Master Tools</a> · Independent AI tools directory
    <div class="links">
      ${footerLinks}
    </div>
  </div>
</footer>
</body>
</html>
`;

if (process.argv.includes('--stdout')) {
  process.stdout.write(html);
} else {
  writeFileSync(resolve(ROOT, 'public/best-free-ai-tools.html'), html, 'utf8');
  const words = html.replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`best-free-ai-tools.html written — ${COUNT} tools, ${faqs.length} FAQs, about ${words} words, checked ${CHECKED}`);
}
