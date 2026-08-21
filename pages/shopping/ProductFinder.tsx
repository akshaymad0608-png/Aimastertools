import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import SEO from '../../components/SEO';
import PageHeader from '../../components/PageHeader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { absoluteUrl } from '../../utils/seo';
import { SHOPPING_CATEGORIES, getShoppingCategory } from '../../data/shoppingCategories';
import { productProvider } from '../../lib/shopping';
import { parseIntent, describeIntent, type ParsedIntent } from '../../lib/shopping/intent';
import { trackAiSearch, trackAiRecommendation } from '../../lib/shopping/analytics';
import type { Product } from '../../types/shopping';
import ProductCard from '../../components/shopping/ProductCard';
import CatalogueEmpty from '../../components/shopping/CatalogueEmpty';
import AffiliateDisclosure from '../../components/shopping/AffiliateDisclosure';

interface Pick {
  id: string;
  label?: string;
  why?: string;
  suitsWho?: string;
  avoidIf?: string;
}

const EXAMPLES = [
  'gaming laptop under ₹60,000',
  'phone under ₹25,000 with a good camera',
  '55 inch TV for movies',
  'earbuds under ₹3,000 with ANC',
  'laptop for coding under ₹70,000',
];

/**
 * The product finder.
 *
 * Two halves, and only one of them needs a model.
 *
 * The budget and the category are read from the query by a regex in
 * lib/shopping/intent.ts — instantly, offline, and correctly. Those two things
 * decide most of the answer, and sending "under 60k" to a language model would
 * be slower, cost money, and occasionally come back wrong.
 *
 * The model's job is the part that cannot be done with a pattern: ranking the
 * shortlist and writing why each one fits. It runs in api/product-finder.ts,
 * server-side, because the browser must never hold the key — and it is handed
 * the candidate products so it can only rank what exists.
 *
 * So the page has three honest outcomes rather than one happy path:
 *   products + a key   ->  ranked picks with written reasons
 *   products, no key   ->  the matching products, no prose
 *   no products        ->  "not enough verified information", and nothing made up
 */
const ProductFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [intent, setIntent] = useState<ParsedIntent | null>(null);
  const [matches, setMatches] = useState<Product[]>([]);
  const [picks, setPicks] = useState<Pick[]>([]);
  const [note, setNote] = useState<string | undefined>();
  const [state, setState] = useState<'idle' | 'working' | 'done'>('idle');
  const [emptyMessage, setEmptyMessage] = useState<string | undefined>();

  const inputRef = useRef<HTMLInputElement>(null);

  const run = useCallback(async (raw: string) => {
    const text = raw.trim();
    if (!text) return;

    setState('working');
    setPicks([]);
    setNote(undefined);
    setEmptyMessage(undefined);

    const parsed = parseIntent(text);
    setIntent(parsed);

    const res = await productProvider
      .getProducts({
        category: parsed.category,
        minPrice: parsed.minPrice,
        maxPrice: parsed.maxPrice,
        search: parsed.search,
        limit: 12,
      })
      .catch(() => ({ data: [] as Product[], emptyReason: 'error' as const, message: undefined }));

    setMatches(res.data);
    setEmptyMessage(res.message);
    trackAiSearch({ query: text, category: parsed.category, resultCount: res.data.length });

    if (res.data.length === 0) {
      setState('done');
      return;
    }

    // Only the fields the model is allowed to cite are sent.
    try {
      const r = await fetch('/api/product-finder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: text,
          candidates: res.data.map((p) => ({
            id: p.id,
            name: p.name,
            brand: p.brand,
            price: p.price,
            currency: p.currency,
            keyFeatures: p.keyFeatures,
            specifications: p.specifications,
            pros: p.pros,
            cons: p.cons,
          })),
        }),
      });
      const json = await r.json();
      if (json?.picks?.length) {
        setPicks(json.picks);
        if (json.aiUsed) trackAiRecommendation({ query: text, recommended: json.picks.length });
      }
      if (json?.message) setNote(json.message);
      else if (json?.note) setNote(json.note);
    } catch {
      // The products are already on screen; the rationale is the optional part.
      setNote('The recommendation service did not respond. These are the products that match.');
    }

    setState('done');
  }, []);

  const byId = (id: string) => matches.find((p) => p.id === id);
  const ordered = picks.length
    ? picks.map((p) => ({ pick: p, product: byId(p.id) })).filter((x) => x.product)
    : matches.map((product) => ({ pick: undefined as Pick | undefined, product }));

  return (
    <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
      <SEO
        title="AI Product Finder — Say Your Budget, Get a Shortlist"
        description="Describe what you need and the budget you have. We read the category and price from your question, match it against the catalogue, and explain why each product fits."
        url="/ai-shopping/finder"
        keywords={['AI product finder', 'find a product by budget', 'product recommendation']}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            '@id': `${absoluteUrl('/ai-shopping/finder')}#app`,
            name: 'AI Product Finder',
            url: absoluteUrl('/ai-shopping/finder'),
            applicationCategory: 'ShoppingApplication',
            operatingSystem: 'Web',
          },
        ]}
      />

      <div className="container-custom">
        <Breadcrumbs
          items={[
            { label: 'AI Shopping', path: '/ai-shopping' },
            { label: 'Product finder', path: '/ai-shopping/finder' },
          ]}
        />

        <PageHeader
          eyebrow="Product finder"
          title="Say what you need and what you can spend"
          lede="A category and a budget is enough — “gaming laptop under ₹60,000”. We read both from the sentence, match them against the catalogue, and explain each recommendation from the specifications on the record."
        />

        <form
          role="search"
          className="mt-10 max-w-2xl"
          onSubmit={(e) => {
            e.preventDefault();
            run(query);
          }}
        >
          <label htmlFor="finder-input" className="sr-only">
            Describe the product you need
          </label>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              />
              <input
                id="finder-input"
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="gaming laptop under ₹60,000"
                className="h-13 w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-cardBg)] pl-11 pr-4 text-[15.5px] text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)]"
              />
            </div>
            <button
              type="submit"
              disabled={state === 'working' || !query.trim()}
              className="btn-primary h-13 shrink-0 px-6 text-[14px] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Sparkles size={16} aria-hidden="true" />
              {state === 'working' ? 'Looking…' : 'Find'}
            </button>
          </div>
        </form>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="label-mono">Try</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                setQuery(ex);
                run(ex);
              }}
              className="link-chip"
            >
              {ex}
            </button>
          ))}
        </div>

        {/* What was understood, shown back before any result. A finder that
            silently guesses the wrong category is worse than one that says
            which category it picked. */}
        {intent && state !== 'idle' && (
          <p className="mt-8 text-[14.5px] text-[var(--color-text-secondary)]" aria-live="polite">
            Reading that as <strong className="font-semibold text-[var(--color-text-primary)]">{describeIntent(intent)}</strong>
            {intent.category && (
              <>
                {' '}·{' '}
                <Link
                  to={`/ai-shopping/${intent.category}`}
                  className="font-medium text-[var(--color-primary)] underline-offset-4 hover:underline"
                >
                  browse all {getShoppingCategory(intent.category)?.name.toLowerCase()}
                </Link>
              </>
            )}
          </p>
        )}

        <section className="mt-8" aria-labelledby="results-heading" aria-busy={state === 'working'}>
          <h2 id="results-heading" className="sr-only">Recommendations</h2>

          {state === 'working' && (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <li key={i} className="h-72 animate-pulse rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]" />
              ))}
            </ul>
          )}

          {state === 'done' && ordered.length > 0 && (
            <>
              {note && (
                <p className="mb-6 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[13.5px] text-[var(--color-text-secondary)]">
                  {note}
                </p>
              )}
              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {ordered.map(({ pick, product }) => (
                  <li key={product!.id} className="flex flex-col">
                    {pick?.label && <p className="label-mono mb-2">{pick.label}</p>}
                    <ProductCard
                      product={product!}
                      category={getShoppingCategory(product!.category)}
                      sourcePage="/ai-shopping/finder"
                    />
                    {(pick?.why || pick?.suitsWho || pick?.avoidIf) && (
                      <div className="mt-3 space-y-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                        {pick.why && <p>{pick.why}</p>}
                        {pick.suitsWho && (
                          <p><span className="font-semibold text-[var(--color-text-primary)]">Suits</span> {pick.suitsWho}</p>
                        )}
                        {pick.avoidIf && (
                          <p><span className="font-semibold text-[var(--color-text-primary)]">Skip if</span> {pick.avoidIf}</p>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          {state === 'done' && ordered.length === 0 && (
            <div className="space-y-6">
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-5">
                <p className="text-[15px] leading-relaxed text-[var(--color-text-primary)]">
                  I don&rsquo;t have enough verified information to make a reliable recommendation yet.
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                  Nothing in the catalogue matches that, and guessing at products would defeat the
                  point of asking.
                </p>
              </div>
              <CatalogueEmpty
                reason={matches.length === 0 ? undefined : 'no-results'}
                message={emptyMessage}
                context={intent?.category ? getShoppingCategory(intent.category)?.name.toLowerCase() : undefined}
              />
            </div>
          )}
        </section>

        {state === 'idle' && (
          <section className="mt-14" aria-labelledby="cats-heading">
            <h2 id="cats-heading" className="label-mono">Or start from a category</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SHOPPING_CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link to={`/ai-shopping/${c.slug}`} className="link-chip">{c.name}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-14 max-w-2xl" aria-labelledby="how-heading">
          <h2 id="how-heading" className="label-mono">How the recommendation is made</h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
            The category and budget are read straight from your sentence. Everything shown comes
            from the catalogue — a product cannot be recommended unless it is in there, and a
            specification cannot be cited unless it is on the record. Where a field is unknown it
            is left out rather than filled in.{' '}
            <Link to="/about" className="font-medium text-[var(--color-primary)] underline-offset-4 hover:underline">
              How the index works <ArrowRight size={13} className="inline" aria-hidden="true" />
            </Link>
          </p>
        </section>

        <div className="mt-10 max-w-2xl">
          <AffiliateDisclosure />
        </div>
      </div>
    </main>
  );
};

export default ProductFinder;
