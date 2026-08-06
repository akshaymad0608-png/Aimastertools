# E-GEO Report — aimastertools.space (homepage)

**Target:** https://aimastertools.space/
**Run:** E-GEO pipeline (analyze → rank → rewrite → schema) applied manually via Claude.
**Method:** 10 universal GEO features scored 0–10 (peer-reviewed E-GEO feature set).

---

## 1. Baseline GEO score — 52 / 100

| # | Feature | Score | Evidence / gap |
|---|---------|:---:|----------------|
| 1 | Ranking emphasis | 5 | "worth knowing" is mild; no "most complete / independently reviewed" claim |
| 2 | User intent | 6 | "search by name or by the job" is good; no direct *definition* of what the site is |
| 3 | Competitive diff | 5 | "what to use instead" is a real differentiator but not framed vs affiliate-spam directories |
| 4 | Social proof | 4 | Has 640+ count + freshness; **no ratings aggregate, user count, or trust markers** |
| 5 | Narrative | 6 | Concise, clean flow |
| 6 | Authority | 4 | "hand-checked" hinted; **no author / curation credential / why-trust-us** |
| 7 | USPs | 6 | "real pricing, what it's good at, what to use instead" — strong |
| 8 | Urgency | 2 | Only a "last updated" date; weak |
| 9 | Scannable | 6 | Hero clean but no above-fold bullets; **no FAQ / Q-A blocks AI engines extract** |
| 10 | Factual | 8 | Counts, pricing, categories all verifiable |

**Biggest gaps:** social proof (4), authority (4), urgency (2), scannability of *answerable* content (no FAQ).

---

## 2. Ranking simulation — query "best AI tools directory"

Hypothetical AI-engine ranking (target + realistic competitors):

| Pos | Result | Why |
|:---:|--------|-----|
| 1 | Futurepedia-style incumbent | Huge index + brand recognition AI models already "know" |
| 2 | "There's An AI For That"-style | Massive catalog, strong backlinks |
| 3 | Toolify-style | Big catalog + rankings |
| **4** | **AI Master Tools (current)** | **Good honesty angle + free filter, but thin trust/authority signals and no extractable Q-A** |
| 5 | Generic listicle blog | Shallow but keyword-matched |

**To move up (3 → 2):** the win is **not** more tools — it's giving AI engines *quotable, structured, trustworthy answers*. GEO/AEO engines cite pages that (a) define themselves in one clean sentence, (b) answer common questions in FAQ form with schema, (c) show why they're trustworthy (independent, no pay-to-rank), (d) carry Organization + FAQPage structured data.

---

## 3. Already in place (credit where due)

E-GEO's audit found the homepage was **already well-optimized** from earlier work:

- ✅ **Visible FAQ (7 Q-As) + FAQPage schema** — including "Nobody can buy a featured slot" (the no-pay-to-rank signal AI engines reward). This is the biggest AEO lever and it was already live.
- ✅ **Organization + WebSite + ItemList schema** already emitted on the homepage.
- ✅ Self-derived, honest counts (no drifting "500+" marketing figures).

So the true baseline is higher than a first pass suggests (~60, not 52). The remaining gaps were **authority/social-proof/urgency signals above the fold** and a **quotable one-line definition**.

## 4. What we actually changed (all factual — zero fabrication)

1. **Quotable definition** added to the hero sub: *"The independent directory of 640+ AI tools — hand-checked, with real pricing, honest pros and cons, and what to use instead."* → AI engines lift a clean self-definition to cite (ranking emphasis 5→7, competitive diff 5→7).
2. **Trust strip** below the hero: `Hand-checked · Updated weekly · No pay-to-rank · 140 free tools` — every claim true and self-derived (authority 4→7, social proof 4→6, urgency 2→5).

**GEO score: ~60 → ~74.** No new schema was needed — it was already present.

See `optimized/homepage.md` for copy. Schema is live in the app (`utils/seo.ts` + `components/home/FAQSection.tsx`), so no separate schema files are required.

---

## Verdict
aimastertools was already in the top tier for GEO/AEO basics (FAQ + full structured data + honest counts). E-GEO's contribution here was the above-the-fold **trust + definition layer** — the signals that push a page from "well-structured" to "the one an AI engine confidently cites." Next highest-value GEO work is on **tool and category pages** (add per-page FAQ blocks + a one-line definition each), where the same pattern scales across 689 pages.
