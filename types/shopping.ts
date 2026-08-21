/**
 * Product model for the AI Shopping vertical.
 *
 * Almost every field is optional, and that is the point. This site cannot
 * invent a price, a rating or a review count, and Amazon's terms do not allow
 * scraping them. A record with nothing but a name, a category and an affiliate
 * link is a legitimate record — the UI is written to render exactly what is
 * present and say "check the latest price on Amazon" for everything else.
 *
 * Required is only what cannot be faked and cannot be missing: an id, a name,
 * a category, and somewhere to send the reader.
 */

export type ProductCategorySlug =
  | 'smartphones'
  | 'laptops'
  | 'smart-tvs'
  | 'earbuds'
  | 'smartwatches'
  | 'gaming'
  | 'cameras'
  | 'smart-home'
  | 'home-appliances'
  | 'computer-accessories'
  | 'power-banks'
  | 'monitors'
  | 'tablets'
  | 'printers'
  | 'networking';

/** Where a record's facts came from. Shown to the reader, not decoration. */
export type ProductSource =
  /** Entered by hand from the product's own listing or spec sheet. */
  | 'manual'
  /** Returned by the Amazon Product Advertising API. */
  | 'amazon-paapi'
  /** Seeded for development. Never rendered when DEMO_DATA is off. */
  | 'demo';

export interface ProductSpec {
  /** e.g. "Processor". Category-specific; the comparison table groups on these. */
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategorySlug;

  /** Amazon Standard Identification Number, when the record came from Amazon. */
  asin?: string;
  brand?: string;
  subcategory?: string;
  imageUrl?: string;

  /**
   * Price fields are a snapshot, never a promise. Rendered only alongside the
   * timestamp that says when they were true, and always beside a link to check.
   */
  price?: number;
  mrp?: number;
  currency?: string;

  /** Only ever set from a source that actually reports them. */
  rating?: number;
  reviewCount?: number;
  availability?: string;

  keyFeatures?: string[];
  specifications?: ProductSpec[];
  pros?: string[];
  cons?: string[];

  /**
   * An editorial read, written by a person from the specifications above.
   * Not generated, and not a claim the specs do not support.
   */
  aiVerdict?: string;

  /**
   * The affiliate destination. Stored whole and never rewritten — an Amazon
   * Special Link carries its own tag and must not be reassembled by hand.
   */
  affiliateUrl?: string;
  /** Recorded for reporting. Never used to build a URL from scratch. */
  associateId?: string;
  trackingId?: string;

  source: ProductSource;
  /** ISO date. The UI hides every price and rating when this is missing. */
  lastUpdated?: string;

  isFeatured?: boolean;
  isTrending?: boolean;
  isActive?: boolean;
}

export interface ProductCategory {
  slug: ProductCategorySlug;
  name: string;
  /** One line, used on cards and as the meta description seed. */
  blurb: string;
  /** The spec labels this category compares on, in the order they should show. */
  compareFields: string[];
  /** Category-level Amazon tracking id, when one has been created. */
  trackingId?: string;
}

export interface ProductQuery {
  category?: ProductCategorySlug;
  brand?: string;
  /** Inclusive bounds, in the currency the records carry. */
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  limit?: number;
}

/**
 * Why a list came back empty. The UI says something different for each, because
 * "no products matched your filters" and "this catalogue has not been filled in
 * yet" are not the same message to a reader.
 */
export type EmptyReason = 'no-provider' | 'not-configured' | 'no-results' | 'error';

export interface ProductResult<T> {
  data: T;
  /** Set when data is empty or partial. */
  emptyReason?: EmptyReason;
  /** Safe to show a reader. Never contains credentials or stack traces. */
  message?: string;
  /** Which provider answered, for the trust line on the page. */
  source?: ProductSource;
}
