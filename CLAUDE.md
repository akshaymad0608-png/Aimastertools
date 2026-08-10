# AIMasterTools — Codebase Guide for AI Assistants

AIMasterTools is a client-rendered **AI-tools directory** website: a searchable,
categorized catalog of 640+ hand-checked AI tools, plus comparisons, workflows,
prompts, a blog, "earn online" landing pages, and SEO collection pages. It is a
**React 19 + Vite + TypeScript** single-page app with a static prerender step
for SEO, a small **Express** API for payments/email, **Firebase** auth, and
**Razorpay** checkout. It deploys to **Vercel** and serves from
`https://aimastertools.space`.

> There are two `CLAUDE.md` files in this repo, for two unrelated concerns:
> - **This file (`/CLAUDE.md`)** documents the web application — read it for any
>   feature, bug, or SEO work on the site.
> - **`.claude/CLAUDE.md`** documents the separate **E-GEO** (Generative Engine
>   Optimization) tooling — the `/geo*` slash commands, `geo-*` agents, and the
>   `geo-output/` convention. It is not part of the website's runtime.

## Tech Stack

| Concern | Choice |
|---------|--------|
| Framework | React 19, React Router 7 (`BrowserRouter`) |
| Build tool | Vite 6, `@vitejs/plugin-react` |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`), CSS variables in `index.css` |
| Animation | `framer-motion` |
| Icons | `lucide-react` |
| Auth | Firebase Auth (Google + email/password) |
| Data store | Firebase Firestore (bookmarks, user docs) |
| Payments | Razorpay (server-verified) |
| Server | Express 5 (`server.ts`) for `/api/*` in dev and prod |
| Email | Nodemailer + `pdfkit` receipts |
| SEO | `react-helmet-async` client-side + static prerender (`prerender.mjs`) |
| Deploy | Vercel (`vercel.json`) |
| Language | TypeScript (strict-ish, `noEmit`; `tsc` is the "lint") |

There is **no test framework** and **no ESLint** configured. `npm run lint` is
`tsc --noEmit` — a type check, not a linter.

## Commands

```bash
npm install          # install deps (Node.js required)
npm run dev          # tsx server.ts — Express + Vite middleware on :3000
npm run build        # sitemap + rss + vite build + prerender + bundle server
npm run preview      # vite preview of the built client
npm start            # node dist/server.cjs — run the bundled production server
npm run lint         # tsc --noEmit (type check; the only "lint")
npm run sitemap      # regenerate public/sitemap.xml only
```

`npm run build` runs, in order: `generate-sitemap.mjs` → `generate-rss.mjs` →
`vite build` → `prerender.mjs` → `esbuild` bundle of `server.ts` into
`dist/server.cjs`. If you change routes, categories, or the tool/blog data, the
sitemap and prerender output change too — always run a full build, not just
`vite build`, before reasoning about SEO output.

### Environment variables
- `GEMINI_API_KEY` — injected into the client as `process.env.API_KEY` /
  `process.env.GEMINI_API_KEY` via `vite.config.ts` (used by the "Find My Tool"
  AI feature through `@google/genai`). Set in `.env.local`.
- Razorpay / SMTP / email secrets are read server-side in `server.ts` and
  `api/*` from the environment. Never hardcode secrets; `.env*` is gitignored.

## Project Structure

```
/                     App root — most source lives at the top level, not in src/
├── index.tsx         Client entry; mounts <App>, registers the service worker
├── App.tsx           Provider tree + all React Router routes
├── index.html        HTML shell (GTM, fonts, CSP-friendly head)
├── index.css         Global styles + design tokens (CSS variables, themes)
├── types.ts          Core domain types: Tool, BlogPost, Prompt, CategoryStat, SEOCollection
├── firebase.ts       Firebase app/auth/firestore init
├── server.ts         Express server: /api/* routes, static serving, dev middleware
├── prerender.mjs     Post-build: writes per-route static index.html with real SEO tags
├── vite.config.ts    Vite config, env injection, manualChunks code-splitting
├── vercel.json       Rewrites (SPA + /api), security headers, CSP (report-only), caching
│
├── pages/            Route components (Home is eager; the rest are lazy-loaded)
├── components/       Shared UI; components/home/* are Home-page sections
├── context/          React context providers (see "State & Contexts")
├── data/             Static content data (the site's "database" — see "Data Layer")
├── utils/            seo.ts, slug.ts, logos.ts, pairs.ts, stats.ts
├── api/              Serverless-style handlers (Razorpay orders, payment verify, emails)
├── scripts/          Build-time generators (sitemap, rss) + data maintenance
├── public/           Static assets, PWA (manifest.json, sw.js, offline.html), robots, static best-* SEO pages
├── geo-output/       E-GEO tool output (not part of the app runtime)
└── .claude/          Claude Code config: E-GEO CLAUDE.md, agents, commands, skills
```

## Data Layer

The site has **no runtime database for content** — the tool catalog and all
editorial content are static TypeScript arrays in `data/`, bundled at build
time. Firestore is only used for per-user data (auth, bookmarks).

| File | Contents |
|------|----------|
| `data/tools.ts` | The catalog. ~880 raw entries exported as `MOCK_TOOLS` after **dedup by `id` then by normalized name**. This is the single source of truth — every count in the UI is derived from it. |
| `data/categories.ts` | `CATEGORY_META` (id, name, icon, emoji, colors); counts are computed from tools. |
| `data/collections.ts` | Curated `SEOCollection` groupings (SEO landing pages). |
| `data/blogs.ts` | Blog posts. |
| `data/prompts.ts` | Prompt library. |
| `data/workflows.ts` | Multi-tool "workflow" guides. |
| `data/earn.ts` | "Earn online" category landing content. |
| `data/comparisons.ts` | Comparison pair metadata. |

**Editing the catalog:** prefer editing `data/tools.ts` directly for small
changes. The many root-level `add_*.cjs`, `fix_*.cjs`, `patch_*.cjs`, and
`update_*.cjs` scripts are **one-off historical maintenance scripts** used to
bulk-generate or repair data during development. Do not treat them as a
supported pipeline — they are ad-hoc, often single-use, and many are stale or
empty. Only run one if you have read it and understand exactly what it rewrites.

**Dedup matters:** `tools.ts` exports `MOCK_TOOLS` through a two-stage filter
(id-unique, then name-canonical keeping the shortest id). `prerender.mjs`
re-implements the same dedup by parsing the file with `eval`, so if you change
the dedup logic or the array shape, update both places or prerender will drift
from the app.

## Routing

All routes are declared in `App.tsx`. `Home` is imported eagerly; every other
page is `React.lazy` + `Suspense`. Key routes:

- `/` Home · `/tool/:id` · `/categories` · `/category/:slug`
- `/compare`, `/compare/:pair`, `/alternatives/:slug`
- `/blog`, `/blog/:id` (`/blogs` redirects to `/blog`)
- `/collections`, `/collections/:slug` · `/discover` · `/find` (AI tool finder)
- `/prompts` · `/workflows`, `/workflows/:id`
- `/earn`, `/earn/:slug` · `/bookmarks`
- `/privacy`, `/terms`, `/careers` · `*` → `NotFound` (renders `noindex`)

**Slugs, not raw ids, in URLs.** `utils/slug.ts` provides `slugify()` and
`findBySlug()`. `findBySlug` resolves a slug, a legacy percent-encoded name, or
a raw name back to the item — so old indexed URLs keep working. Never
reconstruct a name by title-casing a slug; always resolve by lookup.

## State & Contexts

Provider nesting in `App.tsx` (outer → inner):
`HelmetProvider → ThemeProvider → AuthProvider → ProProvider → BookmarkProvider → Router`.

- **`ThemeContext`** — `dark`/`light`, persisted to `localStorage`, toggles the
  `class` on `<html>`. Default is `dark`.
- **`AuthContext`** — Firebase auth (Google popup/redirect + email/password);
  fires a welcome email via `/api/send-welcome-email` on new sign-up.
- **`ProContext`** — currently a **stub that always returns `isPro: true`**
  (`setProStatus` is a no-op). Pro/paywall gating is effectively disabled; keep
  this in mind before building features that assume a real subscription check.
- **`BookmarkContext`** — bookmarks backed by Firestore; exposes `bookmarkError`
  surfaced by the global toast in `App.tsx`.

## Styling & Design System

- Tailwind v4 via the Vite plugin; **no `tailwind.config.js`** — configuration
  is CSS-first in `index.css`.
- The theme is driven by **CSS custom properties** (`--color-primary`,
  `--color-background`, `--color-surface`, `--color-text-*`, `--color-border`,
  …). Use these tokens (e.g. `text-[var(--color-text-primary)]`) rather than
  hardcoded colors so light/dark both work. The current palette is a neutral
  zinc base with a single indigo accent (see `REDESIGN.md`).
- Typography: Hanken Grotesk. Icons: `lucide-react`.
- Responsive is mobile-first; there is a `MobileBottomNav`, an `InstallPrompt`
  (PWA "Add to Home Screen"), and a `FilterSheet` bottom sheet on mobile. When
  adding grids, watch mobile overflow — use `grid-cols-1` with `minmax(0,1fr)`
  so sidebars clamp to the viewport (a recurring past bug).

## SEO — first-class concern

SEO is central to this project; many commits are SEO fixes. Two layers work
together:

1. **Client-side:** the `SEO` component (`components/SEO.tsx`) + helpers in
   `utils/seo.ts` set title, canonical, meta description, keywords, Open Graph,
   and JSON-LD structured data. `utils/seo.ts` holds the canonical `SITE`
   constants (name, url, og image) — use them, don't re-declare site metadata.
2. **Build-time:** `prerender.mjs` writes a static `<route>/index.html` for
   every tool, category, collection, blog, compare, and earn route with the
   correct `<title>`/description/canonical/OG baked in, so crawlers and AI bots
   don't all see the homepage. Vercel serves the specific file when it exists
   and falls back to the SPA rewrite otherwise.

Also SEO-relevant: `scripts/generate-sitemap.mjs` (→ `public/sitemap.xml`),
`scripts/generate-rss.mjs` (→ RSS), `public/robots.txt`, `public/llms.txt`, and
the hand-written static `public/best-*.html` / `pages/best-*.html` landing
pages. **Keep titles under ~55–60 chars** to avoid SERP truncation and keep a
**single `<h1>` per prerendered route** — both have caused regressions before.
When you add or rename a route or content item, regenerate the sitemap and
prerender output.

## API & Server

`server.ts` runs Express for both dev (with Vite middleware) and prod (serving
`dist/`). It also duplicates the `api/*` handlers as routes. Endpoints:

- `GET /api/health`
- `POST /api/create-order` — creates a Razorpay order (server-side pricing in
  `PLAN_PRICING` to prevent client tampering)
- `POST /api/verify-payment`, `POST /api/verify-payment-id` — verify Razorpay
  signature server-side
- `POST /api/send-welcome-email`, `POST /api/send-purchase-email` — Nodemailer;
  purchase email attaches a `pdfkit`-generated receipt
- `POST /api/find-tools` — AI tool-finder backed by Gemini

`/api/*` is rate-limited (`express-rate-limit`, 100 req / 15 min per IP).
Payment amounts are **always** decided server-side; never trust a client-sent
price. `vercel.json` sets security headers and a report-only CSP — if you add a
third-party script, font, image host, or connect target, update the CSP there.

## PWA / Offline

`public/manifest.json` + `public/sw.js` make the site installable. The service
worker (registered in `index.tsx`) does cache-first for assets with an offline
fallback (`public/offline.html`). If you change caching behavior, bump the
cache version in `sw.js` so clients pick it up.

## Conventions & Gotchas

- **Path alias `@/*` → repo root** (`tsconfig.json` + `vite.config.ts`).
- **No `src/` directory** — application code lives at the repo root and in
  top-level folders (`pages/`, `components/`, `context/`, `utils/`, `data/`).
- **Console/debugger are stripped in production** by esbuild (`vite.config.ts`).
- **Code-splitting** is manual in `vite.config.ts` (`vendor-react`,
  `vendor-motion`, `vendor-icons`, `vendor-firebase`, `data-constants`). Keep
  large data and heavy deps out of the main chunk.
- **Match the surrounding code.** Files carry explanatory header comments
  documenting *why* a fix exists (see `utils/slug.ts`, `prerender.mjs`,
  `data/tools.ts`); preserve that style and don't undo the reasoning.
- The root markdown files (`AUDIT.md`, `DEPLOY-CHECKLIST.md`, `REDESIGN.md`,
  `WHATS-NEW.md`, `HEADER-FIX.md`) are historical notes — useful context, not
  authoritative current state.

## Deployment

Vercel, configured by `vercel.json`: SPA rewrite for unknown paths, `/api/*`
passthrough, immutable caching for `/assets/*`, and short cache for the sitemap.
`DEPLOY-CHECKLIST.md` has the human checklist. Because deploys serve prerendered
static HTML per route, **a broken build breaks SEO, not just the runtime** —
verify `npm run build` completes cleanly before deploying.
