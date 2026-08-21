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
export const PRODUCTS: Product[] = [
  {
    id: 'sony-bravia-2-ii-k-55s25bm2',
    name: 'Sony 139 cm (55 inches) BRAVIA 2 II 4K Ultra HD Smart LED Google TV K-55S25BM2',
    brand: 'Sony',
    category: 'smart-tvs',
    subcategory: 'Smart Televisions',

    // Read off the Amazon.in listing on 21 Aug 2026. The date is the point:
    // ProductCard hides the price entirely without it, because a number with no
    // timestamp is a claim about right now that nobody checked.
    price: 63990,
    mrp: 99900,
    currency: 'INR',
    rating: 4.6,
    reviewCount: 1629,
    availability: 'In stock',
    lastUpdated: '2026-08-21',

    keyFeatures: [
      '55-inch 4K Ultra HD LED panel',
      'Google TV, with the Sony BRAVIA 2 II picture processing',
      'Dolby Atmos audio',
    ],
    specifications: [
      { label: 'Screen size', value: '55 inches (139 cm)' },
      { label: 'Resolution', value: '4K Ultra HD' },
      { label: 'Display technology', value: 'LED' },
      { label: 'Operating system', value: 'Google TV' },
      { label: 'Audio', value: 'Dolby Atmos' },
    ],

    /*
      Deliberately not recorded, though all of it was on the page:

        "500+ bought in past month"  — a sales claim, and the brief rules those
                                       out unless verified data supports them.
        "-36%"                       — not stored. ProductCard computes it from
                                       mrp and price, so it cannot drift out of
                                       step with the two numbers it describes.
                                       (99,900 -> 63,990 is 35.9%, shown as 36%.)
        "₹2000 coupon"               — promotional and time-limited. A coupon
                                       that expired last week is worse than no
                                       coupon shown.
        Delivery date                — depends on the reader's pin code, not ours.

      affiliateUrl is missing on purpose. The link has not been generated yet,
      and resolveAffiliateLink returns null without one, so the card renders no
      button at all rather than a dead one. Paste the SiteStripe link here and
      the product goes live.
    */

    source: 'manual',
    isActive: true,
    isFeatured: true,
  },
];

/** Demo rows are only ever shown when explicitly switched on. */
export const DEMO_DATA_ENABLED =
  typeof import.meta !== 'undefined' &&
  (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_DEMO_DATA === 'true';

export const ACTIVE_PRODUCTS: Product[] = PRODUCTS.filter(
  (p) => p.isActive !== false && (DEMO_DATA_ENABLED || p.source !== 'demo'),
);

export const PRODUCT_COUNT = ACTIVE_PRODUCTS.length;
