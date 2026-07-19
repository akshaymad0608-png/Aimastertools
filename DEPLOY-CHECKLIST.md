# Pre-deploy check

`npx tsc --noEmit` clean · `npm run build` passes · sitemap 1,671 URLs.

---

## Fixed in this pass

### Blog images were invisible — and the reason was subtle

The generated covers painted their shapes with
`fill="var(--color-primary)"` as an **SVG presentation attribute**. CSS custom
properties do not work there: `fill` is parsed as an SVG `<paint>` value, and
`var()` substitution only applies to CSS declarations. Browsers dropped the
value and fell back to black — which, at the 7–40% opacity these patterns used,
rendered as almost nothing on a light surface.

Moved to `style={{ fill: ... }}`, which puts it in the CSS cascade where `var()`
resolves. Opacities raised so the pattern is actually legible.

Two more blog image faults alongside it:

- `BlogSection.tsx` (home page strip) still loaded raw Unsplash URLs behind a
  pastel icon fallback from the old palette. Now uses the same generated cover
  as `/blog`, so the two pages match.
- The home hero cover was gated on `chatbotPost.imageUrl` existing. Since covers
  no longer need a remote image, any post without one rendered a bare robot icon.
- That hero's category badge was hardcoded to "AI CHATBOTS" regardless of which
  post it showed.

### Security headers added (`vercel.json`)

The file had rewrites only — no headers at all.

| Header | Why |
|---|---|
| `X-Content-Type-Options: nosniff` | Stops MIME-type confusion attacks |
| `Referrer-Policy: strict-origin-when-cross-origin` | Full URLs stop leaking to the tools you link out to |
| `X-Frame-Options: SAMEORIGIN` | Clickjacking |
| `Strict-Transport-Security` | Forces HTTPS, with preload |
| `Permissions-Policy` | Denies camera/geolocation; `interest-cohort=()` opts out of FLoC |
| `Cross-Origin-Opener-Policy` | Isolates the browsing context; `allow-popups` keeps Razorpay and Firebase auth working |
| `Cache-Control` on `/assets/*` | Hashed bundles cached for a year |

**The CSP ships as `Report-Only` on purpose.** An enforcing CSP that is even
slightly wrong takes the site down after deploy, and this app loads from
Google Fonts, GTM, jsdelivr, Firebase and Razorpay. Deploy, open DevTools →
Console, browse for a day, and see what it reports. When nothing is being
flagged, rename the header to `Content-Security-Policy` to enforce it.

---

## Checked and healthy

- **Firestore rules are genuinely well written** — ownership checks, field
  allow-lists, type and length validation, email regex, and `isPro` locked
  against client-side escalation. No changes needed.
- **No secrets in the repo.** Razorpay keys are read from `process.env` in
  `/api`, server-side, as they should be.
- **One `dangerouslySetInnerHTML`**, in `Home.tsx`, holding a static `<style>`
  block. No user data flows into it. React escapes everything else, so
  user-submitted reviews cannot inject markup.
- **All external links carry `rel="noopener noreferrer"`.**
- Canonical, hreflang, `noindex` handling and structured data all correct.
- `robots.txt` blocks parameter duplicates but not `/compare/` or
  `/alternatives/` — correct, those are the new indexable pages.

---

## Two things to decide before you go live

### 1. `newsletter_emails` accepts unauthenticated writes

```
allow create: if hasRequiredFields([...]) && isValidNewsletterEmail(...)
```

This is deliberate — you want signups without an account — and the validation
is tight. But there is no rate limit, so a script can write unlimited documents
and run up your Firestore bill. Options: put the write behind App Check, add a
Cloud Function with rate limiting, or accept the risk and set a Firestore
budget alert. **Set the budget alert either way.**

### 2. This is a client-rendered SPA

`dist/index.html` carries the homepage meta tags, but every other route's title,
description and JSON-LD are injected by React after load. Google executes
JavaScript and will index them, but on a second crawl pass that can take days
to weeks. Bing and most social preview scrapers do not run JavaScript at all —
so a link to `/compare/chatgpt-vs-claude` shared on LinkedIn will show the
homepage description.

For 1,671 pages that is the difference between ranking this quarter and next.
Prerendering with `vite-plugin-ssg` or moving to Vercel's SSR would fix it. Not
a blocker for launch — but it is the single biggest remaining constraint on the
SEO work, so worth planning.

---

## Deploy sequence

1. **Set `SITE.url`** in `utils/seo.ts` to the real domain, and match it in
   `public/robots.txt`, `scripts/generate-sitemap.mjs`, and the absolute URLs in
   `index.html`. *Everything currently says `aimastertools.space`.*
2. Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in Vercel environment
   variables. Do not commit them.
3. Deploy `firestore.rules` — Firebase console or `firebase deploy --only firestore:rules`.
4. `npm run build` — this regenerates the sitemap automatically.
5. After deploy, verify: `/sitemap.xml` loads, `/robots.txt` loads,
   `/compare/chatgpt-vs-claude` renders, dark mode toggles, mobile menu opens.
6. Submit the sitemap in Search Console. Request indexing on the homepage and
   two or three comparison pages to prime the crawl.
7. Set the Firestore budget alert.

---

## Known, unchanged, your call

- `SITE.twitter` is empty — the Twitter card omits site attribution.
- `dateAdded` is a batch timestamp on every tool, so "Newest" is import order.
- 138 unused `.cjs` scripts at the project root. They do not ship in the build.
- One JS chunk is over 500 kB. Route-level `React.lazy` is already in use for
  pages; the remaining weight is Firebase and framer-motion.
