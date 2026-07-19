# v8 — new palette, new mark, and two page types that can actually rank

## Look

**Palette "Foundry"** — sand paper, deep teal, copper.

| | before | now |
|---|---|---|
| Primary | cobalt `#23388f` | **deep teal `#12545c`** |
| Accent | ochre `#a8621a` | **copper `#b26a1e`** |
| Paper | `#f7f5f0` | **sand `#f8f6f0`** |
| Dark base | slate `#0e0f13` | **pitch `#0d100f`** / teal `#56b3b0` |

**Logo** — a shelf of five spines with one pulled forward in copper. Uneven bar
heights read as a collection and as a ranking at once, which is what the site
is; the copper spine is the pick standing proud of the row. Five solid shapes
and no fine detail, so it holds up at 16px where the previous ruled-card mark
went soft in a browser tab.

---

## Features added

I picked these on one test: does it bring people in, or help the people already
here decide? Anything that was only decoration got skipped.

### 1. Comparison pages at real URLs — the big one
`/compare/chatgpt-vs-claude`, **304 pages generated** from the catalogue.

"X vs Y" is the highest-intent query a directory can rank for: the searcher has
already narrowed to two options and wants someone to break the tie. The
comparison feature already existed — but only at `/compare?tools=a,b`. Query
strings make a poor canonical, and **this site's own robots.txt blocks
parameter URLs**, so not one comparison was reachable by a crawler.

Each page carries a real attribute table, a verdict that only claims what the
data supports, and three FAQs emitted as `FAQPage` schema — which is what earns
the expandable rich result on a "vs" query.

### 2. Alternatives pages — 639 of them, now real
The `/alternatives/:slug` route existed and was **linked from nowhere at all**.
It also returned `MOCK_TOOLS.slice(0, 8)` for every tool, with a comment in the
source admitting it was for demo purposes — so all 639 pages would have shown
an identical list.

Putting that in a sitemap would have handed Google 639 duplicate pages, which
is worse than not having them. So the matching was rewritten first: same
category, then ranked by shared tags, then by rating. "ChatGPT alternatives" is
one of the highest-volume queries in this space.

### 3. Internal linking so crawlers can find any of it
Tool pages now link to their own alternatives page and to every comparison they
appear in. Comparison pages cross-link to sibling comparisons in the same
category and to both tools' alternatives pages. Without this, sitemap entries
are just a list of orphans.

### 4. A broken link nobody had noticed
The home page comparison desk linked to `/compare?tool1=x&tool2=y`, but the
Compare page reads `?tools=a,b`. Every one of those links landed on an empty
comparison. They now point at the static pages.

---

## Sitemap

**728 → 1,671 URLs**

| | |
|---|---|
| Tools | 639 |
| **Alternatives** | **639** *(new)* |
| **Comparisons** | **304** *(new)* |
| Categories | 49 |
| Workflows | 14 |
| Blog | 8 |
| Collections | 6 |
| Static | 12 |

Resubmit in Search Console after deploying. Expect indexing to take weeks —
new pages of this kind get crawled slowly until the domain builds authority.

---

## One caution about the new pages

The comparison and alternatives pages are generated from data you already have.
That makes them honest, but it also makes them thin compared with a hand-written
comparison. They will rank for long-tail "X vs Y" queries where nobody else has
written anything; they will not outrank a detailed review for a popular pairing.

If a particular comparison starts pulling traffic, that is the signal to write a
real one by hand. The generated page is a floor, not a ceiling.

---

## Still outstanding

1. **Domain** — everything hardcodes `https://aimastertools.space`.
2. `SITE.twitter` is empty.
3. `dateAdded` is a batch timestamp on every tool, so "Newest" is import order.
4. 138 unused `.cjs` scripts at the project root.

`npx tsc --noEmit` clean. `npm run build` passes.
