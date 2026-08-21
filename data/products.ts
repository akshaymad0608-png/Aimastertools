import type { Product } from '../types/shopping';

/**
 * The product catalogue. Empty, and that is the correct state right now.
 *
 * Nothing goes in here that has not been read off a real listing by a person.
 * There are no Product Advertising API credentials for this site, Amazon's
 * terms do not permit scraping listings for prices, ratings or images, and a
 * catalogue of invented products with invented prices would be worse than an
 * empty one — it would be the single fastest way to lose both the Associates
 * account and the reader.
 *
 * Every shopping page is written to render its empty state cleanly, so the
 * vertical ships and works with zero rows. Adding the first product is a data
 * task, not a code task.
 *
 * To add one, by hand:
 *
 *   1. Create the Special Link in the Amazon Associates dashboard — SiteStripe
 *      on the product page. Do not build the URL yourself; a hand-made `?tag=`
 *      link is not a Special Link.
 *   2. Paste it whole into affiliateUrl. Do not trim or rewrite it.
 *   3. Fill in only what you can see on the listing. Leave price, rating and
 *      reviewCount out entirely if you are not recording them today — the card
 *      renders "Check latest price on Amazon" instead, which is honest and is
 *      also what Amazon's terms expect when you are not showing live data.
 *   4. Set lastUpdated to the date you read it. The card hides the price when
 *      this is missing, because a price with no date is a guess.
 *
 * DEMO products: set source: 'demo'. They are filtered out of every page unless
 * VITE_DEMO_DATA is 'true', so they cannot be mistaken for live listings.
 */
export const PRODUCTS: Product[] = [];

/** Demo rows are only ever shown when explicitly switched on. */
export const DEMO_DATA_ENABLED =
  typeof import.meta !== 'undefined' &&
  (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_DEMO_DATA === 'true';

export const ACTIVE_PRODUCTS: Product[] = PRODUCTS.filter(
  (p) => p.isActive !== false && (DEMO_DATA_ENABLED || p.source !== 'demo'),
);

export const PRODUCT_COUNT = ACTIVE_PRODUCTS.length;
