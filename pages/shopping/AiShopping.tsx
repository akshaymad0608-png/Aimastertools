import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Columns2, ShieldCheck } from 'lucide-react';
import SEO from '../../components/SEO';
import PageHeader from '../../components/PageHeader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { SITE, absoluteUrl } from '../../utils/seo';
import { SHOPPING_CATEGORIES, SHOPPING_CATEGORY_COUNT } from '../../data/shoppingCategories';
import { providerStatus } from '../../lib/shopping';
import { PRODUCT_COUNT } from '../../data/products';
import AffiliateDisclosure from '../../components/shopping/AffiliateDisclosure';

/**
 * The AI Shopping landing page.
 *
 * Built to be honest about its own state. There is no live Amazon feed and no
 * catalogue yet, so this page does not open with a wall of product cards it
 * cannot fill — it opens with what the section is for, the categories it
 * covers, and a plain line about where its facts come from.
 *
 * It reuses the directory's own components (SEO, PageHeader, Breadcrumbs) and
 * its tokens, so it reads as another room in the same building rather than a
 * second website bolted on.
 */
const AiShopping: React.FC = () => {
  const hasCatalogue = PRODUCT_COUNT > 0;

  return (
    <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
      <SEO
        title="AI Shopping — Find the Right Product Without the Research"
        description={`Tell us the budget and what it is for, and get products that fit — across ${SHOPPING_CATEGORY_COUNT} categories, compared on the specifications that decide it.`}
        url="/ai-shopping"
        keywords={['AI shopping assistant', 'product finder', 'compare products', 'buying guides']}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': `${absoluteUrl('/ai-shopping')}#collection`,
            name: 'AI Shopping',
            url: absoluteUrl('/ai-shopping'),
            isPartOf: { '@type': 'WebSite', name: SITE.name, url: absoluteUrl('/') },
          },
        ]}
      />

      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'AI Shopping', path: '/ai-shopping' }]} />

        <PageHeader
          eyebrow="AI-powered product discovery"
          title="Find the right product without the research overload"
          lede="Tell us the budget, what it is for, and what you actually care about. We narrow it to the ones that fit and show you why — then you check the price yourself before you buy."
          /*
            These point at what exists.

            The first draft linked /ai-shopping/finder, /trending-products and
            /compare-products — three routes that have not been built. A landing
            page whose primary button 404s is worse than one with a plainer
            button, so the guided finder and the picks page get their CTAs when
            they get their routes.
          */
          action={
            <div className="flex flex-wrap gap-3">
              <a href="#categories-heading" className="btn-primary h-11 px-5 text-[13px]">
                <Sparkles size={15} aria-hidden="true" /> Browse categories
              </a>
              <Link to="/about" className="btn-secondary h-11 px-5 text-[13px]">
                How this works
              </Link>
            </div>
          }
        />

        {/*
          Said up front rather than buried. A shopping section with no catalogue
          that opens as though it has one is the exact pattern that makes these
          sites untrustworthy.
        */}
        {!hasCatalogue && (
          <div className="mt-12 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-5">
            <p className="label-mono flex items-center gap-2">
              <ShieldCheck size={13} aria-hidden="true" /> Where this stands
            </p>
            <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
              The catalogue is empty while products are added by hand. Nothing here is
              scraped and nothing is generated — every price, rating and specification will be
              one a person read off the listing, with the date they read it.
              {providerStatus.amazonConnected
                ? ' Live Amazon data is connected.'
                : ' Live Amazon pricing is not connected, so product pages will link you out to check the current price rather than quote one.'}
            </p>
          </div>
        )}

        <section className="mt-16" aria-labelledby="categories-heading">
          <div className="section-head">
            <div>
              <p className="eyebrow">Categories</p>
              <h2 id="categories-heading" className="display-md mt-4 text-[var(--color-text-primary)]">
                Start with what you are buying
              </h2>
            </div>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SHOPPING_CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={`/ai-shopping/${cat.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-5 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-lift)]"
                >
                  <h3 className="title-sm text-[15.5px] text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-primary)]">
                    {cat.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                    {cat.blurb}
                  </p>
                  <span className="label-mono mt-auto flex items-center justify-between gap-2 border-t border-[var(--color-border)] pt-3.5 [margin-top:1rem]">
                    <span className="tabular-nums">{cat.compareFields.length} spec fields</span>
                    <span aria-hidden="true" className="text-[13px] transition-transform duration-200 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 max-w-2xl" aria-labelledby="how-heading">
          <h2 id="how-heading" className="display-md text-[var(--color-text-primary)]">
            How this works
          </h2>
          <ol className="mt-8 space-y-5">
            {[
              ['Say what you need', 'A budget and a use — "a laptop under ₹70,000 for code" is enough to start.'],
              ['We narrow it', 'Only from products in the catalogue, and only on specifications the record actually carries. Nothing is invented to fill a gap.'],
              ['Compare side by side', 'Each category compares on its own fields, because a TV and a pair of earbuds share almost none.'],
              ['Check the price yourself', 'The final number is always on Amazon. We link you there rather than quote a price that may have moved.'],
            ].map(([title, body], i) => (
              <li key={title} className="flex gap-4">
                <span className="label-mono mt-0.5 shrink-0 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="block text-[15px] font-semibold text-[var(--color-text-primary)]">{title}</span>
                  <span className="mt-1 block text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">{body}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16" aria-labelledby="compare-heading">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-6 sm:p-8">
            <div className="max-w-xl">
              <h2 id="compare-heading" className="display-md text-[var(--color-text-primary)]">
                Two products, side by side
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                Each category compares on its own fields — a TV and a pair of earbuds share
                almost none — so the table adapts rather than showing a fixed set of mostly
                empty columns. Product comparison arrives with the first products; the tool
                index already has its own, and it works the same way.
              </p>
              <Link to="/compare" className="btn-secondary mt-6 h-11 px-5 text-[13px]">
                <Columns2 size={15} aria-hidden="true" /> Compare AI tools
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-16 max-w-2xl" aria-labelledby="disclosure-heading">
          <h2 id="disclosure-heading" className="label-mono">Disclosure</h2>
          <div className="mt-4">
            <AffiliateDisclosure />
          </div>
        </section>
      </div>
    </main>
  );
};

export default AiShopping;
