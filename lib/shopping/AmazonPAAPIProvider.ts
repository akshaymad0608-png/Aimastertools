import type { Product, ProductQuery, ProductResult, ProductCategorySlug } from '../../types/shopping';
import { type ProductDataProvider, empty } from './provider';

/**
 * Amazon Product Advertising API — declared, not connected.
 *
 * This file is deliberately a shell, and saying so is the point. PA-API access
 * requires an approved Associates account that has made qualifying sales, and
 * this site has neither the credentials nor, yet, the sales. Writing a client
 * that pretends to call it would produce made-up prices, which is the one thing
 * Amazon's terms and this site's own About page both rule out.
 *
 * What it does instead is fail honestly: `isConfigured` is false until real
 * credentials exist, and every method returns a "not configured" result the UI
 * already knows how to render.
 *
 * Two rules for whoever finishes it:
 *
 *   The keys are server-side only. vite.config.ts already compiles
 *   process.env.GEMINI_API_KEY into the client bundle through `define`, which
 *   means anything named that way ships to every visitor. PA-API signing has to
 *   happen in an api/ function, and this provider has to call that function
 *   rather than Amazon.
 *
 *   Prices and ratings from PA-API are licensed, cached for a limited window
 *   and must be shown with the time they were retrieved. The Product model
 *   already carries lastUpdated for exactly this, and the card hides the price
 *   when it is missing.
 */
export class AmazonPAAPIProvider implements ProductDataProvider {
  readonly id = 'amazon-paapi';

  constructor(
    private readonly config: {
      accessKey?: string;
      secretKey?: string;
      partnerTag?: string;
      /** The api/ route that signs and proxies the call. Never Amazon directly. */
      proxyPath?: string;
    } = {},
  ) {}

  get isConfigured() {
    return Boolean(this.config.accessKey && this.config.secretKey && this.config.partnerTag);
  }

  private unconfigured<T>(fallback: T): ProductResult<T> {
    return empty(
      fallback,
      'not-configured',
      'Live Amazon data is not connected. Products shown here are entered by hand.',
    );
  }

  async getProducts(_query?: ProductQuery): Promise<ProductResult<Product[]>> {
    return this.unconfigured<Product[]>([]);
  }

  async getProductById(_id: string): Promise<ProductResult<Product | null>> {
    return this.unconfigured<Product | null>(null);
  }

  async getCategoryProducts(_category: ProductCategorySlug, _query?: ProductQuery) {
    return this.unconfigured<Product[]>([]);
  }

  async getTrendingProducts(_limit?: number) {
    return this.unconfigured<Product[]>([]);
  }

  async searchProducts(_term: string, _query?: ProductQuery) {
    return this.unconfigured<Product[]>([]);
  }

  async compareProducts(_ids: string[]) {
    return this.unconfigured<Product[]>([]);
  }
}
