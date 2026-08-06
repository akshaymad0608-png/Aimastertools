import React from 'react';
import { ExternalLink, Info } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { EARN_CATEGORIES, EARN_SITE_COUNT, EARN_CATEGORY_COUNT } from '../data/earn';
import { SITE, absoluteUrl } from '../utils/seo';

const TITLE = `Earn Online — ${EARN_SITE_COUNT}+ Websites to Make Money by Category (2026)`;
const DESCRIPTION = `A curated directory of ${EARN_SITE_COUNT}+ real websites to earn online, grouped into ${EARN_CATEGORY_COUNT} categories — remote jobs, freelance, work from home, microtasks, surveys, testing, gig work, e-commerce, teaching and affiliate — each with a link and a short intro.`;

const EarnOnline: React.FC = () => {
  return (
    <div className="page-top min-h-screen bg-[var(--color-background)] pb-16">
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        url="/earn"
        keywords={[
          'earn money online',
          'websites to make money online',
          'remote job websites',
          'freelance websites',
          'work from home sites',
          'paid survey sites',
          'microtask websites',
          'gig work apps',
          'affiliate marketing programs',
          'online teaching platforms',
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: TITLE,
          description: DESCRIPTION,
          url: absoluteUrl('/earn'),
          isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
          hasPart: EARN_CATEGORIES.map((c) => ({
            '@type': 'ItemList',
            name: c.name,
            numberOfItems: c.sites.length,
            itemListElement: c.sites.map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: s.name,
              url: `https://${s.url}`,
            })),
          })),
        }}
      />

      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'Earn Online' }]} />

        <PageHeader
          eyebrow="Earn online"
          title={<>Websites to <em>earn online</em></>}
          lede="A hand-checked directory of legitimate sites where people find work or sell what they make — remote jobs, freelance, surveys, testing, gig work, e-commerce, teaching and more. Every entry links straight to the official site."
          meta={
            <>
              <span className="label-mono tabular-nums">{EARN_SITE_COUNT}+ websites</span>
              <span className="label-mono tabular-nums">{EARN_CATEGORY_COUNT} categories</span>
            </>
          }
        />

        {/* Honest disclaimer — sets expectations, builds trust */}
        <div className="mt-8 flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-text-secondary)]">
          <Info size={18} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
          <p>
            These are independent websites, not affiliated with AI Master Tools. Earnings, availability and eligibility vary a lot by country, skill and effort — always read each platform's own terms, and never pay upfront to "unlock" work.
          </p>
        </div>

        {/* Jump navigation */}
        <nav aria-label="Categories" className="mt-8 flex flex-wrap gap-2">
          {EARN_CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              {c.name}
            </a>
          ))}
        </nav>

        {/* Category sections */}
        <div className="mt-14 space-y-16">
          {EARN_CATEGORIES.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-24">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
                  {category.name}
                </h2>
                <p className="mt-2 text-[var(--color-text-secondary)]">{category.blurb}</p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.sites.map((site) => (
                  <a
                    key={site.name}
                    href={`https://${site.url}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="group flex flex-col rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-lift)]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]">
                        {site.name}
                      </span>
                      <ExternalLink
                        size={15}
                        className="shrink-0 text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-primary)]"
                      />
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {site.intro}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-[var(--color-text-muted)]">{site.url}</span>
                      {site.tag && (
                        <span className="rounded-full bg-[var(--color-background)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                          {site.tag}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <NewsletterSection showToast={() => {}} />
      </div>
    </div>
  );
};

export default EarnOnline;
