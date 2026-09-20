# AI Master Tools

A directory of AI tools, prompts and workflows, at
[aimastertools.space](https://aimastertools.space). React 19 SPA, prerendered to
static HTML at build time, deployed on Vercel.

The catalogue is **654 tools across 53 categories**, plus prompts, multi-tool
workflows, curated collections, comparison pages and an Amazon-affiliate
shopping section. Everything is hand-curated and lives in `data/` as TypeScript
— there is no CMS and no database behind the listings.

## Quick start

**Prerequisites:** Node.js 18, 20, or 22+ (Vite's supported range — note it
excludes 21). `package.json` declares no `engines` field, so nothing enforces
this at install time.

```bash
npm install
cp .env.example .env.local    # then fill in what you need — see below
npm run dev                   # http://localhost:3000
```

The app runs without any keys configured. Missing keys degrade deliberately
rather than crashing:

- **No `GEMINI_API_KEY`** — the tool finder falls back to keyword matching, and
  the product finder answers "not enough information" instead of guessing.
- **No Amazon PA-API credentials** — the shopping section serves hand-entered
  products from `data/products.ts`. `AmazonPAAPIProvider.isConfigured` stays
  false and every method returns an explicit not-configured result.
- **No `RAZORPAY_*`** — dev returns a mock order; production returns a 500.
- **No `SMTP_*`** — emails are logged to the console rather than sent.

**Read [`.env.example`](.env.example) before adding a key.** It documents which
variables are safe to expose and which are secret. The short version: only
`VITE_`-prefixed values reach the browser; everything else must be read from
`process.env` server-side.

Note that `.env.example` is currently **incomplete** — `server.ts` also reads
`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `SMTP_HOST` / `SMTP_PORT` /
`SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS`, none of which are listed there. All
are secret; none take a `VITE_` prefix.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Express + Vite middleware in one process, port 3000 |
| `npm run build` | Sitemap → RSS → Vite build → prerender → bundle server |
| `npm start` | Serve the production build (`dist/server.cjs`) |
| `npm run lint` | `tsc --noEmit` — this project's only type check |
| `npm run check` | lint + all three test suites + the affiliate link audit |
| `npm run test:intent` | Cases for the shopping intent parser (`scripts/tests/`) |
| `npm run test:outbound` | Cases for the outbound `rel` resolver (`scripts/tests/`) |
| `npm run audit:links` | Verifies every stored affiliate link pays the right account |

Run `npm run check` before deploying. `audit:links` exits non-zero when a link
would pay the wrong Associates account, so it can gate a deploy.

## How it fits together

### Rendering

The app is client-rendered, but every route is also written to disk as static
HTML during the build. `prerender.mjs` emits a `<path>/index.html` per route
with the correct `<title>`, description, canonical and Open Graph tags baked in;
React then hydrates on load. Vercel serves the specific file when one exists and
falls back to the SPA rewrite for unknown paths.

This matters because without it, crawlers and social scrapers saw the homepage's
metadata on all 654 tool pages. The current sitemap is ~1,790 URLs, so the
metadata being per-page is most of the site's search surface.

`prerender.mjs` also enforces title/description length budgets: each page type
offers several phrasings, longest-first, and the longest one that fits a result
listing wins. Pages where nothing fits are reported at the end of the build
rather than shipped quietly — watch the build output for that list.

### Two runtimes, and they have drifted

- **`server.ts`** — Express. Used for local dev (with Vite in middleware mode)
  and for any non-Vercel host. Bundled by esbuild to `dist/server.cjs`.
- **`api/*.ts`** — Vercel serverless functions. What actually runs in
  production.

Most endpoints exist in both, but **the two sets are not identical** — check
before assuming an endpoint you tested locally exists in production:

| Endpoint | `server.ts` | `api/` |
|---|:--:|:--:|
| `health`, `create-order`, `verify-payment`, `verify-payment-id`, `send-welcome-email`, `send-purchase-email` | yes | yes |
| `find-tools` | yes | **no** |
| `product-finder` | **no** | yes |
| `amazon-products` | **no** | **no** |

`product-finder` is the one the shopping UI actually calls, so it works in
production and 404s in local Express dev. `amazon-products` is referenced by
`lib/shopping/index.ts` as the PA-API proxy path but has never been built —
it is only reached once real Amazon credentials are configured, which is why
nothing has hit it yet. Build it before switching the PA-API provider on.

If you add an endpoint, decide deliberately which runtime needs it rather than
assuming both are kept in sync.

### Data

`data/*.ts` are plain TypeScript arrays. Two things to know before editing them:

**Exports de-duplicate themselves.** `data/tools.ts` holds 879 raw entries and
exports 654. Entries were appended in batches over time without id checks, so
the export runs two passes: drop repeated ids, then collapse records that share
a normalized name (keeping the shortest, most canonical id — which is also the
URL most likely to already be indexed). Every count shown in the UI derives from
the export, so the counts stay honest. Blogs, prompts and workflows do the same.

Append to these files freely, but read the comment at the bottom of
`data/tools.ts` before changing the dedup rule.

**Some tooling parses these files with regexes.** `scripts/generate-sitemap.mjs`
plucks ids and slugs without standing up a compiler. It fails loudly on an empty
result rather than writing a truncated sitemap, but if you change the data
*format* (not just the contents), check the sitemap still builds.

### Generated files

`public/sitemap.xml` and `public/rss.xml` are **not in git**. They are written by
`scripts/generate-sitemap.mjs` and `scripts/generate-rss.mjs`, which are the
first two steps of `npm run build` — so Vercel rebuilds them on every deploy.

A fresh clone will not have them until you run `npm run build` (or just
`npm run sitemap`). That is deliberate: while they were tracked, regenerating
after a data change was a manual step, and the committed sitemap drifted into
advertising ~83 URLs that no longer existed. A file that cannot be committed
stale cannot go stale.

`public/sw.js` is the opposite case and stays in git — it is a source template
holding a `__BUILD_ID__` placeholder, and `prerender.mjs` only rewrites the copy
in `dist/`, never the source.

### Outbound links

Every link leaving the site for a tool's own website goes through
`lib/affiliate/outbound.ts`. Do not set `rel` at the call site.

The rule keys off whether money is actually involved: affiliate links get
`sponsored nofollow` and the page must disclose; plain listings get `nofollow`
and have nothing to disclose. Nothing in that module ever *constructs* an
affiliate URL — partner links are issued by the programme, and appending a
tracking parameter by hand produces a link that either does not track or
breaks the programme's terms.

This is centralised because it used to be decided in eight different files that
disagreed, and none of it is visible on the page, so nothing caught it.
`npm run test:outbound` covers the resolver.

## Project layout

```
api/              Vercel serverless functions (production endpoints)
components/       Shared UI; home/ and shopping/ subtrees
context/          Auth, Bookmarks, Compare, Pro, Theme providers
data/             The catalogue — tools, categories, prompts, workflows, blogs
lib/affiliate/    Outbound link + rel resolution
lib/shopping/     Amazon PA-API, manual products, intent parsing
pages/            Route components
public/           Static assets, robots.txt, llms.txt, sw.js (sitemap.xml
                  and rss.xml are generated — not in git, see below)
scripts/          generate-sitemap.mjs, generate-rss.mjs
scripts/tests/    Test + audit suites (npm run check)
utils/            Slugs, SEO helpers, logo resolution, stats
prerender.mjs     Post-build static HTML generation
server.ts         Express server (dev + non-Vercel hosts)
```

### A note on the root directory

The root used to hold 141 one-off codemods (`fix_*.cjs`, `add_*.cjs`,
`patch_*.cjs`, `update_*.cjs`) plus four orphaned `.ts` helpers. They were run
once against the data files, committed, and never referenced by any npm script
or import. They have been removed — `git show pre-cleanup-2026-09-20` recovers
any of them if you need to see what a past data migration did.

Keep the root for config and entry points only. New tooling belongs in
`scripts/`, and anything with assertions belongs in `scripts/tests/` so
`npm run check` picks it up.

## Deploying

Vercel, from `main`. [`vercel.json`](vercel.json) carries the redirects,
security headers and cache policy; the CSP is currently **report-only**, so
tightening it is a live task rather than a solved one.

Set the same environment variable names in the Vercel dashboard that you set in
`.env.local`. Remember the `api/` functions read `process.env` at request time —
the Vite build never sees them.

## Further reading

Design and audit notes from previous passes, kept for the reasoning rather than
as current state:

- [`AUDIT.md`](AUDIT.md) — content and routing defects, and how each was fixed
- [`DEPLOY-CHECKLIST.md`](DEPLOY-CHECKLIST.md) — pre-deploy verification
- [`REDESIGN.md`](REDESIGN.md) / [`WHATS-NEW.md`](WHATS-NEW.md) — design system history
- [`HEADER-FIX.md`](HEADER-FIX.md) — why the header measures itself instead of using a fixed offset
