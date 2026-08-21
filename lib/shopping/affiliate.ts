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
