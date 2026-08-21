import type { Product, ProductCategory } from '../../types/shopping';

/**
 * Affiliate link handling.
 *
 * The rule that shapes this file: an Amazon Special Link is generated in the
 * Associates dashboard and carries its own tag. Rebuilding one by hand — taking
 * a product URL and appending `?tag=` — is how sites end up with links that do
 * not track, or that break Amazon's terms. So a stored affiliateUrl is used
 * exactly as stored, and this module only ever *reads* it.
 *
 * The one thing it will add is a category tracking id, and only when the stored
 * link does not already carry a tag of its own. That keeps per-category
 * reporting possible without rewriting a link Amazon generated.
 */

/** The account's default store id. Overridden per product or per category. */
export const DEFAULT_ASSOCIATE_ID = 'aimastertools-21';

export interface AffiliateLink {
  href: string;
  /** True when the href is an Amazon URL, so the label can name the retailer. */
  isAmazon: boolean;
  /** The tag the link will actually report under, when one is present. */
  tag?: string;
  /** rel value, kept in one place so no card forgets `sponsored`. */
  rel: string;
}

/** amazon.in, amazon.com, www.amazon.co.uk … the full storefront domains. */
const AMAZON_STORE = /(^|\.)amazon\.[a-z.]+$/i;

/**
 * Amazon's shortened link domains, plus the .amazon gTLD Amazon owns.
 *
 * These were being read as "not Amazon" — including amzn.to, which is what
 * SiteStripe hands you when you pick the short form. The button then said
 * "Check latest price" instead of naming the retailer, and the link fell
 * outside every Amazon-specific rule in this file.
 */
const AMAZON_SHORT = /^(amzn\.to|amzn\.eu|amzn\.asia|a\.co|.*\.amazon)$/i;

const isAmazonHost = (host: string) => AMAZON_STORE.test(host) || AMAZON_SHORT.test(host);

/**
 * A shortened link already carries its tag inside the redirect. Appending
 * `?tag=` to it does nothing useful and risks mangling a link Amazon
 * generated, so short links are passed through exactly as stored.
 */
const isShortLink = (host: string) => AMAZON_SHORT.test(host);

/**
 * Resolve where a product's button should point.
 *
 * Returns null when there is nothing to link to — the card renders no button at
 * all rather than a dead one.
 */
export const resolveAffiliateLink = (
  product: Pick<Product, 'affiliateUrl' | 'associateId' | 'trackingId'>,
  category?: Pick<ProductCategory, 'trackingId'>,
): AffiliateLink | null => {
  const raw = product.affiliateUrl?.trim();
  if (!raw) return null;

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    // A malformed stored link is a data problem, not something to paper over
    // with a guess at what was meant.
    return null;
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;

  const isAmazon = isAmazonHost(url.hostname);
  const rel = 'noopener noreferrer sponsored nofollow';

  if (!isAmazon) return { href: url.toString(), isAmazon: false, rel };

  // A short link carries its tag inside the redirect. Nothing to add, and
  // nothing that should be rewritten.
  if (isShortLink(url.hostname)) return { href: url.toString(), isAmazon: true, rel };

  // If the Special Link already carries a tag, it is left exactly as generated.
  const existing = url.searchParams.get('tag');
  if (existing) return { href: url.toString(), isAmazon: true, tag: existing, rel };

  // Otherwise attach the most specific id available: the product's own, then
  // the category's, then the account default.
  const tag = product.trackingId || product.associateId || category?.trackingId || DEFAULT_ASSOCIATE_ID;
  url.searchParams.set('tag', tag);
  return { href: url.toString(), isAmazon: true, tag, rel };
};

/** Cheap validity check for the admin form, so a bad link never reaches a card. */
export const isValidAffiliateUrl = (value: string): boolean => {
  if (!value.trim()) return false;
  try {
    const u = new URL(value.trim());
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
};

export interface LinkAudit {
  ok: boolean;
  /** Problems worth blocking on. */
  errors: string[];
  /** Things to look at, which do not stop the link working. */
  warnings: string[];
  tag?: string;
  asin?: string;
}

/**
 * Check a stored link before it earns nothing.
 *
 * This exists because of a link that shipped reporting to techakki0a-21 — a
 * tracking id belonging to a different Associates account — while the site's
 * own is aimastertools-21. It worked, it looked right, and every sale through
 * it would have paid somewhere else. Nothing in the code noticed, because
 * nothing was looking.
 *
 * It reports rather than repairs. Rewriting the tag inside a Special Link is
 * the one thing not to do here: the fix is to regenerate the link in SiteStripe
 * with the right tracking id selected.
 */
export const auditAffiliateUrl = (
  value: string,
  expectedTag: string = DEFAULT_ASSOCIATE_ID,
): LinkAudit => {
  const errors: string[] = [];
  const warnings: string[] = [];

  const raw = value.trim();
  if (!raw) return { ok: false, errors: ['No link.'], warnings };

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return { ok: false, errors: ['Not a valid URL.'], warnings };
  }

  if (url.protocol !== 'https:') warnings.push('Link is not https.');

  const host = url.hostname;
  if (!isAmazonHost(host)) {
    return { ok: true, errors, warnings: [...warnings, `${host} is not an Amazon domain — no tag will be added.`] };
  }

  const asin = (url.pathname.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/i) || [])[1];
  const tag = url.searchParams.get('tag') || undefined;

  if (isShortLink(host)) {
    // The tag is inside the redirect, so it cannot be read or checked here.
    warnings.push('Short link: the tracking id is inside the redirect and cannot be verified from the URL.');
    return { ok: true, errors, warnings, asin };
  }

  if (!tag) {
    warnings.push(`No tag on the link. The account default (${expectedTag}) will be attached.`);
  } else if (tag !== expectedTag) {
    errors.push(
      `Link reports to "${tag}", not "${expectedTag}". Commission from this link goes to that tracking id. ` +
        'Regenerate it in SiteStripe with the right tracking id selected — do not edit the tag by hand.',
    );
  }

  const isSiteStripe = url.searchParams.has('linkCode') || url.searchParams.has('linkId');
  if (tag && !isSiteStripe) {
    warnings.push('Has a tag but no linkCode/linkId — this may not be a SiteStripe Special Link.');
  }

  return { ok: errors.length === 0, errors, warnings, tag, asin };
};
