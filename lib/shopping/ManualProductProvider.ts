import type { Product, ProductQuery, ProductResult, ProductCategorySlug } from '../../types/shopping';
import { type ProductDataProvider, empty } from './provider';
import { PRODUCTS } from '../../data/products';

/**
 * Products entered by hand.
 *
 * This is the provider that works today. Amazon's Associates terms allow a
 * Special Link created in the Associates dashboard to be placed on a site; they
 * do not allow scraping product pages for prices, ratings or images. So a
 * record here carries whatever a person typed in from the listing — and the
 * pages render exactly that, with a "check the latest price" link for
 * everything they do not have.
 *
 * It reads a static dataset rather than a database because the site has no
 * server-side store beyond Firestore, and putting a hundred products in a file
 * that ships with the bundle is the cheaper, faster and more cacheable answer
 * until there are thousands.
 */

const isLive = (p: Product) => p.isActive !== false;

const matches = (p: Product, q?: ProductQuery) => {
  if (!q) return true;
  if (q.category && p.category !== q.category) return false;
  if (q.brand && (p.brand || '').toLowerCase() !== q.brand.toLowerCase()) return false;
  // A record without a price is not excluded by a price filter — it is unknown,
  // not expensive, and dropping it would hide real products from the reader.
  if (typeof q.minPrice === 'number' && typeof p.price === 'number' && p.price < q.minPrice) return false;
  if (typeof q.maxPrice === 'number' && typeof p.price === 'number' && p.price > q.maxPrice) return false;
  if (q.search) {
    const hay = `${p.name} ${p.brand ?? ''} ${p.subcategory ?? ''} ${(p.keyFeatures ?? []).join(' ')}`.toLowerCase();
    if (!hay.includes(q.search.toLowerCase())) return false;
  }
  return true;
};

const take = <T,>(arr: T[], limit?: number) => (typeof limit === 'number' ? arr.slice(0, limit) : arr);

export class ManualProductProvider implements ProductDataProvider {
  readonly id = 'manual';

  private readonly all: Product[];

  constructor(products: Product[] = PRODUCTS) {
    this.all = products.filter(isLive);
  }

  get isConfigured() {
    return this.all.length > 0;
  }

  private notFilledIn<T>(fallback: T): ProductResult<T> {
    return empty(
      fallback,
      'not-configured',
      'The product catalogue has not been filled in yet.',
    );
  }

  async getProducts(query?: ProductQuery): Promise<ProductResult<Product[]>> {
    if (!this.isConfigured) return this.notFilledIn<Product[]>([]);
    const hits = take(this.all.filter((p) => matches(p, query)), query?.limit);
    return hits.length
      ? { data: hits, source: 'manual' }
      : empty([], 'no-results', 'Nothing in the catalogue matches those filters yet.');
  }

  async getProductById(id: string): Promise<ProductResult<Product | null>> {
    if (!this.isConfigured) return this.notFilledIn<Product | null>(null);
    const hit = this.all.find((p) => p.id === id) ?? null;
    return hit
      ? { data: hit, source: 'manual' }
      : empty(null, 'no-results', 'That product is not in the catalogue.');
  }

  async getCategoryProducts(category: ProductCategorySlug, query?: ProductQuery) {
    return this.getProducts({ ...query, category });
  }

  async getTrendingProducts(limit = 8): Promise<ProductResult<Product[]>> {
    if (!this.isConfigured) return this.notFilledIn<Product[]>([]);
    // isTrending is set by hand in the admin. There is no sales or traffic feed
    // behind this site, so nothing here is computed from popularity and the
    // page must not call it a bestseller list.
    const flagged = this.all.filter((p) => p.isTrending);
    const pool = flagged.length ? flagged : this.all.filter((p) => p.isFeatured);
    return pool.length
      ? { data: pool.slice(0, limit), source: 'manual' }
      : empty([], 'no-results', 'No products have been marked as picks yet.');
  }

  async searchProducts(term: string, query?: ProductQuery) {
    return this.getProducts({ ...query, search: term });
  }

  async compareProducts(ids: string[]): Promise<ProductResult<Product[]>> {
    if (!this.isConfigured) return this.notFilledIn<Product[]>([]);
    // Order follows the ids the reader picked, not the order of the dataset.
    const hits = ids.map((id) => this.all.find((p) => p.id === id)).filter((p): p is Product => Boolean(p));
    return hits.length
      ? { data: hits, source: 'manual' }
      : empty([], 'no-results', 'None of those products are in the catalogue.');
  }
}
