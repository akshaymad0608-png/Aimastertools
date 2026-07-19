# Header overlap — the actual fix

## Why `pt-[180px]` does not solve it

The previous attempt set `pt-[140px]` on mobile and `pt-[180px]` on desktop.
That treats the header height as a constant. It is not one.

The header grows and shrinks with:

- the announcement banner being visible or dismissed,
- the nav rail wrapping at mid widths,
- the visitor's browser font size or page zoom,
- web fonts swapping in after first paint — the serif wordmark is taller than
  the fallback it replaces,
- the padding change the header itself applied on scroll.

Any fixed number is therefore too small at some viewport, which is the overlap
coming back, and too large everywhere else, which is a band of dead space above
the first line. `pt-[180px]` mostly hides the symptom on one screen size.

## What was done instead

**The header measures itself and publishes its height.**

```
Navbar  → ResizeObserver → --header-h
TopBanner                → --banner-h
```

Pages then clear both:

```css
.page-top {
  padding-top: calc(var(--banner-h, 0px) + var(--header-h, 64px) + 2rem);
}
```

`ResizeObserver` catches wrapping, zoom, rotation and font loading without a
resize listener firing on every frame. `document.fonts.ready` publishes once
more after the web fonts swap, which is the case a plain resize listener misses.

Three supporting changes:

1. **The header's own height is now stable.** It used to change padding on
   scroll (`py-3` → `py-2`), so the measurement would move as you scrolled and
   drag the page with it. Scrolling now changes only the rule and shadow.
2. **The mobile menu sheet was guessing too** — it was positioned at
   `top: calc(var(--banner-h) + 68px)`. It uses the measured value now.
3. **Anchor targets get the same clearance** via
   `[id] { scroll-margin-top: ... }`, so in-page jump links no longer land
   underneath the bar.

## Pages fixed

Sixteen pages had hardcoded `pt-*` values; all now use `.page-top`, and the home
hero uses `.page-top-hero`.

Three more had **no clearance at all** and were sitting under the header on
every visit — `Careers`, `PrivacyPolicy` and `TermsOfService`, all using
`py-12 md:py-20`, which is 48px against a header of roughly 64px. They are
low-traffic pages, which is presumably why it went unreported. `NotFound` had
the same problem.

## Verifying it

Resize the window slowly from 320px to 1920px and watch the gap above the
headline. It should stay visually constant. Then dismiss the announcement
banner — the whole page should shift up by exactly the banner's height, with
the gap unchanged.

`npx tsc --noEmit` clean. `npm run build` passes.
