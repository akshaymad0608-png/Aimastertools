import React from 'react';
import { useLocation } from 'react-router-dom';
import { AdSlot, AD_SLOTS } from './AdSlot';


const EXCLUDED_PATHS = new Set([
  '/privacy',
  '/terms',
  '/affiliate-disclosure',
]);

/**
 * Ads only go on pages that are indexable AND have enough content of their own.
 * An ad on a noindex page (compare pairs, alternatives, thin tool pages) or on a
 * short utility page (careers, find, contact, workflows) is exactly what the
 * AdSense "low-value content" review penalises, so those are never eligible.
 */
const AD_ELIGIBLE = [
  /^\/$/,
  /^\/blog(\/[^/]+)?$/,
  /^\/categories$/,
  /^\/category\/[^/]+$/,
  /^\/free(\/[^/]+)?$/,
  /^\/tool\/[^/]+$/,
];

/** null until the page's <SEO> has mounted, so no ad shows while a lazy route loads. */
let pageIndexable: boolean | null = null;

export function reportPageIndexable(value: boolean | null) {
  pageIndexable = value;
  listeners.forEach((l) => l());
}

let suppressed = false;
const listeners = new Set<() => void>();

export function setAdSuppressed(value: boolean) {
  suppressed = value;
  listeners.forEach((l) => l());
}

export const FooterAd: React.FC = () => {
  const { pathname } = useLocation();
  const [, force] = React.useReducer((n: number) => n + 1, 0);

  React.useEffect(() => {
    listeners.add(force);
    return () => { listeners.delete(force); };
  }, []);

  if (suppressed) return null;
  if (pageIndexable !== true) return null;
  if (!AD_ELIGIBLE.some((re) => re.test(pathname.replace(/\/+$/, '') || '/'))) return null;
  if (EXCLUDED_PATHS.has(pathname)) return null;

  return (
    <aside
      className="container-custom my-10"
      aria-label="Advertisement"
    >
      <div className="mx-auto max-w-[970px]">
        <p className="mb-2 text-center text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
          Advertisement
        </p>
        <AdSlot
          slot={AD_SLOTS.RESPONSIVE_DISPLAY}
          format="auto"
          responsive
          minHeight={320}
        />
      </div>
    </aside>
  );
};

export default FooterAd;
