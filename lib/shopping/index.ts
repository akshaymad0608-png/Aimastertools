import type { ProductDataProvider } from './provider';
import { ManualProductProvider } from './ManualProductProvider';
import { AmazonPAAPIProvider } from './AmazonPAAPIProvider';
import { ACTIVE_PRODUCTS } from '../../data/products';

export type { ProductDataProvider } from './provider';
export { ManualProductProvider } from './ManualProductProvider';
export { AmazonPAAPIProvider } from './AmazonPAAPIProvider';
export * from './affiliate';

/**
 * Picks the provider the pages talk to.
 *
 * Amazon first when it is genuinely configured, hand-entered products
 * otherwise. Nothing in the UI imports either class directly, so switching
 * happens here and only here.
 *
 * The PA-API keys are read through import.meta.env only to answer "are we
 * configured", never to sign a request in the browser. vite.config.ts already
 * compiles process.env.GEMINI_API_KEY into the client bundle via `define`,
 * which is a live demonstration of how a key ends up shipped to every visitor —
 * so the signing itself belongs in an api/ function, and this file must never
 * grow one.
 */
const env = (typeof import.meta !== 'undefined'
  ? (import.meta as unknown as { env?: Record<string, string> }).env
  : undefined) ?? {};

const amazon = new AmazonPAAPIProvider({
  // Presence check only. These are intentionally not the secret key — that one
  // has no VITE_ prefix and therefore never reaches the client at all.
  partnerTag: env.VITE_AMAZON_ASSOCIATE_ID,
  proxyPath: '/api/amazon-products',
});

const manual = new ManualProductProvider(ACTIVE_PRODUCTS);

export const productProvider: ProductDataProvider = amazon.isConfigured ? amazon : manual;

/** Reported on /ai-shopping so the page can say where its facts come from. */
export const providerStatus = {
  active: productProvider.id,
  amazonConnected: amazon.isConfigured,
  hasProducts: manual.isConfigured || amazon.isConfigured,
};
