# AI Master Tools — v5

Design system **"Archive"** — bone paper, ink-blue `#23388f`, ochre `#a8621a`,
Instrument Serif display / Inter Tight body / IBM Plex Mono data.

---

## 1. Duplicate data — the same bug in four more files

`data/tools.ts` was de-duplicated last round. The same defect was in every
other data file: entries appended in batches with no id check.

| File | Entries | Real |
|---|---|---|
| `data/blogs.ts` | 18 | **8** |
| `data/prompts.ts` | 31 | **21** |
| `data/workflows.ts` | 15 | **5** |
| `data/tools.ts` *(fixed earlier)* | 839 | **639** |

Each export now filters on first-seen id. This is why the same blog images kept
appearing — the posts themselves were duplicated, not just the pictures.

## 2. Blog

- **The featured hero block was pasted three times** in `BlogIndex.tsx`, all
  three reading `blogPosts[0]`. Removed.
- **Invented authors removed.** Posts were being credited to five fictional
  people ("Sarah Collins, AI Strategist") assigned by `parseInt(id) % 5`. Real
  articles should not carry invented bylines.
- **Covers are now generated per post.** The eight posts shared a pool of stock
  Unsplash photos, several used twice, none related to the writing.
  `BlogCoverImage.tsx` now draws a deterministic pattern from a hash of the
  title, so every post looks different, the cover is stable across builds, and
  there is no network request.
- Page rebuilt with the shared masthead, category filter and a real lead story.

## 3. Categories — SEO-friendly URLs and icons back

- **URLs were `/category/Social%20Media%20Automation`.** They are now
  `/category/social-media-automation`. `utils/slug.ts` generates slugs once and
  resolves by lookup.
- The old page reconstructed the category name by title-casing the URL, which
  silently failed on ampersands and acronyms — "LLM Providers & APIs" came back
  as "Llm Providers & Apis" and matched **nothing**. Fixed.
- **Old URLs still work.** `findBySlug` accepts a slug, a legacy encoded name,
  or the raw name, so anything already in Google's index keeps resolving.
- **Icons are back.** `CategoryIcon.tsx` maps a category to a Lucide icon by
  keyword on its *name*, so a category added tomorrow gets a sensible icon with
  no edit here. The data's Tabler class names ("ti-share") would have needed a
  second icon font loaded for one grid.
- `CategoryPage` rewritten: real counts, average rating, related categories,
  proper structured data, `noindex` when empty.

## 4. Pages rebuilt

- **Saved / favourites** — category filters, sorting, real counts, and an empty
  state that says where the list is stored. It is device-local; the page now
  says so rather than implying an account exists.
- **Workflows** — the filter row was a hardcoded list of eleven categories over
  five workflows, so eight buttons led to an empty page. Categories now derive
  from the data, and each card shows its tool chain as `A → B → C`.
- **Prompts** — full prompt text shown in the open, copy button, example output
  collapsed, filters by task and by model with counts.
- **Collections** — shared masthead and a real count.

## 5. Type and colour

- Primary moved from cobalt `#2b44c7` to ink-blue `#23388f`, accent from
  `#b4741d` to a warmer `#a8621a`. Body-link contrast on bone goes from about
  4.5:1 to 6.2:1.
- Dark-mode primary pulled back from periwinkle to a steel blue.
- Icons, favicon, OG card and manifest regenerated to match.

Sitemap: **729 URLs**, category entries now emitted as slugs.

---

## Still outstanding before deploy

1. **Domain** — code uses `https://aimastertools.space`. Change `SITE.url` in
   `utils/seo.ts`, `public/robots.txt`, `scripts/generate-sitemap.mjs` and
   `index.html` if that is wrong.
2. **`AggregateRating` hardcodes `reviewCount: 150`** in `utils/seo.ts` and it is
   not true. Wire it to real counts or delete the block — fake review markup is
   a manual-action risk, not a ranking edge. *(Raised three times now.)*
3. Placeholder social handles in `SITE.twitter` / `sameAs`.
4. `dateAdded` values are batch timestamps, so "Newest" sorts by import order.
5. Resubmit the sitemap in Search Console.

`npx tsc --noEmit` clean. `npm run build` passes.
