/**
 * Shopping events, pushed into the GTM dataLayer that index.html already sets
 * up (GTM-WZV4CNBG, with GA4 on G-VV4GFEC1ZS).
 *
 * Nothing new is loaded and no second analytics stack is introduced — the brief
 * asked for that explicitly, and two tag managers on one page is how events end
 * up counted twice.
 *
 * Nothing here identifies a person. An affiliate click records what was clicked
 * and where from, which is what the reports need; it does not record who.
 */

type Payload = Record<string, string | number | boolean | undefined>;

const push = (event: string, payload: Payload = {}) => {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: unknown[] };
  if (!Array.isArray(w.dataLayer)) return; // GTM blocked or not loaded — stay silent.
  // Undefined keys are dropped rather than sent as "undefined" strings.
  const clean: Payload = {};
  for (const [k, v] of Object.entries(payload)) if (v !== undefined) clean[k] = v;
  w.dataLayer.push({ event, ...clean });
};

export const trackProductView = (p: { productId: string; category?: string }) =>
  push('product_view', p);

export const trackAffiliateClick = (p: {
  productId: string;
  category?: string;
  trackingId?: string;
  sourcePage?: string;
}) =>
  push('affiliate_click', {
    ...p,
    // Recorded client-side, so it is the reader's clock. Good enough for
    // ordering events, not something to reconcile against Amazon's reports.
    timestamp: new Date().toISOString(),
  });

export const trackAiSearch = (p: { query: string; category?: string; resultCount: number }) =>
  push('ai_search', p);

export const trackAiRecommendation = (p: { query: string; recommended: number }) =>
  push('ai_recommendation', p);

export const trackComparisonStarted = (p: { productId: string; count: number }) =>
  push('comparison_started', p);

export const trackComparisonCompleted = (p: { count: number; category?: string }) =>
  push('comparison_completed', p);

export const trackCategoryView = (p: { category: string }) => push('category_view', p);

export const trackGuideView = (p: { slug: string }) => push('guide_view', p);
