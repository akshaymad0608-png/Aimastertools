import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../../components/SEO';
import PageHeader from '../../components/PageHeader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { absoluteUrl } from '../../utils/seo';
import { SHOPPING_CATEGORIES, getShoppingCategory } from '../../data/shoppingCategories';
import { productProvider } from '../../lib/shopping';
import { trackCategoryView } from '../../lib/shopping/analytics';
import type { Product, EmptyReason } from '../../types/shopping';
import ProductCard from '../../components/shopping/ProductCard';
import CatalogueEmpty from '../../components/shopping/CatalogueEmpty';
import AffiliateDisclosure from '../../components/shopping/AffiliateDisclosure';

/**
 * One shopping category.
 *
 * Loads through the provider rather than reading the dataset, so the day
 * Amazon's API is connected this page does not change. While the catalogue is
 * empty it renders its empty state, which is the honest default rather than a
 * failure.
 */
const ShoppingCategory: React.FC = () => {
  const { category: slug } = useParams<{ category: string }>();
  const category = slug ? getShoppingCategory(slug) : undefined;

  const [products, setProducts] = useState<Product[]>([]);
  const [reason, setReason] = useState<EmptyReason | undefined>();
  const [message, setMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;
    let cancelled = false;
    setLoading(true);
    productProvider
      .getCategoryProducts(category.slug)
      .then((res) => {
        if (cancelled) return;
        setProducts(res.data);
        setReason(res.emptyReason);
        setMessage(res.message);
      })
      .catch(() => {
        if (cancelled) return;
        // A provider that throws must not take the page down with it.
        setProducts([]);
        setReason('error');
        setMessage(undefined);
      })
      .finally(() => !cancelled && setLoading(false));
    trackCategoryView({ category: category.slug });
    return () => { cancelled = true; };
  }, [category]);

  if (!category) {
    return (
      <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
        <SEO
          title="Category not found — AI Shopping"
          description="That shopping category does not exist. Browse the categories AI Master Tools does cover."
          url="/ai-shopping"
          noindex
        />
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'AI Shopping', path: '/ai-shopping' }]} />
          <PageHeader
            eyebrow="Not found"
            title="No such category"
            lede="That shopping category does not exist here."
          />
          <div className="mt-10 flex flex-wrap gap-2">
            {SHOPPING_CATEGORIES.map((c) => (
              <Link key={c.slug} to={`/ai-shopping/${c.slug}`} className="link-chip">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
      <SEO
        title={`Best ${category.name} — Compared on What Matters (2026)`}
        description={`${category.blurb} Compared on ${category.compareFields.slice(0, 4).join(', ').toLowerCase()} and more.`}
        url={`/ai-shopping/${category.slug}`}
        keywords={[`best ${category.name.toLowerCase()}`, `${category.name.toLowerCase()} comparison`, `buy ${category.name.toLowerCase()}`]}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': `${absoluteUrl(`/ai-shopping/${category.slug}`)}#collection`,
            name: category.name,
            url: absoluteUrl(`/ai-shopping/${category.slug}`),
          },
        ]}
      />

      <div className="container-custom">
        <Breadcrumbs
          items={[
            { label: 'AI Shopping', path: '/ai-shopping' },
            { label: category.name, path: `/ai-shopping/${category.slug}` },
          ]}
        />

        <PageHeader eyebrow="AI Shopping" title={category.name} lede={category.blurb} />

        <section className="mt-12" aria-labelledby="results-heading">
          <h2 id="results-heading" className="sr-only">
            {category.name} in the catalogue
          </h2>

          {loading ? (
            /* A skeleton rather than a spinner, so the layout does not jump when
               rows arrive. */
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <li key={i} className="h-72 animate-pulse rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]" />
              ))}
            </ul>
          ) : products.length > 0 ? (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} category={category} sourcePage={`/ai-shopping/${category.slug}`} />
                </li>
              ))}
            </ul>
          ) : (
            <CatalogueEmpty reason={reason} message={message} context={category.name.toLowerCase()} />
          )}
        </section>

        <section className="mt-14" aria-labelledby="fields-heading">
          <h2 id="fields-heading" className="label-mono">What we compare on</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {category.compareFields.map((f) => (
              <li key={f} className="link-chip">{f}</li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="other-heading">
          <h2 id="other-heading" className="label-mono">Other categories</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SHOPPING_CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 8).map((c) => (
              <li key={c.slug}>
                <Link to={`/ai-shopping/${c.slug}`} className="link-chip">{c.name}</Link>
              </li>
            ))}
            <li>
              <Link to="/ai-shopping" className="link-chip">
                All categories <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </section>

        <div className="mt-14 max-w-2xl">
          <AffiliateDisclosure />
        </div>
      </div>
    </main>
  );
};

export default ShoppingCategory;
