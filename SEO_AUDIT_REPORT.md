# SEO audit report — AI Master Tools

Audited 2026-10-04. Origin: https://aimastertools.space

## Scope and method

- **Stack:** Vite + React single-page app with a custom `prerender.mjs` pass (one static HTML file per route), Firebase for data, `scripts/generate-sitemap.mjs` for the sitemap, deployed on Vercel.
- **Static validation:** `scripts/seo-validate.mjs` over the production build (what a crawler sees without running JavaScript).
- **Lab performance:** Lighthouse 12 (mobile preset, simulated throttling), Chromium headless, against a plain local static server serving the build. A plain `python3 -m http.server` does **not** gzip/brotli, so the "enable text compression" findings and the absolute LCP are pessimistic compared with production hosting. Treat the numbers as a baseline to compare against after changes, not as field data.
- **Not verified here:** indexing status, rankings and Core Web Vitals field data (INP is only measurable in the field). Those come from Search Console.
- Search Console data for this property is not available to the tooling in this environment; use the CSV workflow.

## Results at a glance

| Pages built | Indexable | `noindex` | Sitemap URLs | Errors | Warnings | Notes |
|---|---|---|---|---|---|---|
| 1768 | 826 | 942 | 826 | 0 | 424 | 3 |

### Validator findings (after this PR's fixes)

| Severity | Check | Count | Example |
|---|---|---|---|
| warn | `thin-static-content` | 424 | `/about — 123 visible words in static HTML` |
| info | `one-inbound-link` | 2 | `/contact — only linked from /blog/ai-tool-changes-retired-renamed-repri` |
| info | `sitemap-no-lastmod` | 1 | `/sitemap.xml` |

### Lighthouse (mobile, local baseline)

| Category | Score |
|---|---|
| Performance | 56 |
| Accessibility | 96 |
| Best practices | 93 |
| SEO | 100 |

Lab metrics (home page): LCP **11.8 s**, FCP 10.5 s, TBT 0 ms, CLS 0.

## Issues found and fixed so far

- AdSense flagged the site "Low-value content". Earlier work (PRs #13–#18) removed fabricated testimonials, ratings and stats; set templated `/compare/*` and `/alternatives/*` pages (≈940 URLs) to `noindex, follow` and removed them from the sitemap; turned the `SoftwareApplication` JSON-LD (which had no genuine rating) into `WebPage` with an `about` Thing; removed the Googlebot meta that contradicted `noindex`; added `/contact` to the sitemap.
- This pass: the bare `/alternatives` static page is now `noindex, follow` because the client app has no route for it (it would render as a 404 once JavaScript runs).

## Issues still open

- Most tool/category pages carry only ~120–150 words of static HTML; the full content is rendered by JavaScript. Google renders JS, so this is not an error, but non-JS crawlers (and AI answer engines) see little. Adding a short unique, factual paragraph per tool to the prerender is the highest-value content task.
- Homepage DOM is ~2,600 elements and ~545 KiB of unused JavaScript was reported: route-level code splitting would help.
- Short titles on four `/ai-shopping/*` pages (16–17 characters) — the title picker chose its shortest variant.
- AdSense: after the next full crawl, tick "I confirm that I have fixed the issues" and click **Request review** (≈20–25 October 2026, 2–3 weeks after the last deploy).

## What this audit deliberately does not claim

- No ranking, traffic or indexing improvement is promised. Rankings depend on content quality, links and competition.
- Structured data uses only facts visible on the site; no review/rating markup is emitted without real reviews.
