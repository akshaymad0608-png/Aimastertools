import type { Product, ProductQuery, ProductResult, ProductCategorySlug } from '../../types/shopping';

/**
 * The contract every source of product data has to meet.
 *
 * The UI talks to this and never to Amazon. That is the whole reason it exists:
 * there are no Product Advertising API credentials for this site yet, and there
 * may never be — approval depends on the account qualifying. Writing the pages
 * against an interface means the day credentials arrive, one file changes and
 * nothing else does.
 *
 * Every method returns ProductResult rather than a bare array, so a provider can
 * say *why* it has nothing — "not configured" and "nothing matched" are
 * different sentences to a reader, and a page that cannot tell them apart shows
 * the wrong one.
 */
export interface ProductDataProvider {
  /** Stable name, shown in the admin and in the trust line. */
  readonly id: string;
  /** False when the provider exists but has no credentials or no data. */
  readonly isConfigured: boolean;

  getProducts(query?: ProductQuery): Promise<ProductResult<Product[]>>;
  getProductById(id: string): Promise<ProductResult<Product | null>>;
  getCategoryProducts(category: ProductCategorySlug, query?: ProductQuery): Promise<ProductResult<Product[]>>;
  getTrendingProducts(limit?: number): Promise<ProductResult<Product[]>>;
  searchProducts(term: string, query?: ProductQuery): Promise<ProductResult<Product[]>>;
  compareProducts(ids: string[]): Promise<ProductResult<Product[]>>;
}

/** Shared helper so every provider returns the same shape for "nothing here". */
export const empty = <T,>(data: T, reason: ProductResult<T>['emptyReason'], message: string): ProductResult<T> => ({
  data,
  emptyReason: reason,
  message,
});
