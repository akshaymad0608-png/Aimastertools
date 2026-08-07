import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ExternalLink, Info, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { EARN_CATEGORIES } from '../data/earn';
import { SITE, absoluteUrl } from '../utils/seo';

const CURRENT_YEAR = new Date().getFullYear();
const clean = (name: string) => name.replace(/\s*\([^)]*\)/, '').trim();

const EarnCategory: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = EARN_CATEGORIES.find((c) => c.id === slug);

  if (!category) return <Navigate to="/earn" replace />;

  const name = clean(category.name);
  const n = category.sites.length;
  const title = `Best ${name} Websites (${CURRENT_YEAR}) — ${n} Legit Sites`;
  const description = `${category.blurb} ${n} hand-checked sites, each with an official link and an honest, no-hype intro.`;

  return (
    <div className="page-top min-h-screen bg-[var(--color-background)] pb-16">
      <SEO
        title={title}
        description={description}
        url={`/earn/${category.id}`}
        keywords={[
          `best ${name.toLowerCase()} websites`,
          `${name.toLowerCase()} sites`,
          `earn money ${name.toLowerCase()}`,
          'earn online',
          'make money online',
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: title,
          description,
          url: absoluteUrl(`/earn/${category.id}`),
          isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
          mainEntity: {
            '@type': 'ItemList',
            name: category.name,
            numberOfItems: n,
            itemListElement: category.sites.map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: s.name,
              url: `https://${s.url}`,
            })),
          },
        }}
      />

      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'Earn Online', path: '/earn' }, { label: name }]} />

        <div className="mt-4 grid gap-6 lg:grid-cols-[236px_minmax(0,1fr)]">
          {/* Sibling-category sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="label-mono mb-2.5">Categories</p>
            <nav aria-label="Earn categories" className="flex gap-1.5 overflow-x-auto pb-2 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
              <Link
                to="/earn"
                className="flex shrink-0 items-center justify-between gap-2 whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-2 text-[13.5px] font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
              >
                All categories <ArrowRight size={13} aria-hidden="true" />
              </Link>
              {EARN_CATEGORIES.map((c) => {
                const active = c.id === category.id;
                return (
                  <Link
                    key={c.id}
                    to={`/earn/${c.id}`}
                    aria-current={active ? 'page' : undefined}
                    className={`flex shrink-0 items-center justify-between gap-2 whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-2 text-[13.5px] font-medium transition-colors ${active ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]'}`}
                  >
                    <span className="truncate">{c.name}</span>
                    <span className={`text-[11px] tabular-nums ${active ? 'text-white/80' : 'text-[var(--color-text-muted)]'}`}>{c.sites.length}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main column */}
          <div>
            <p className="eyebrow">Earn online</p>
            <h1 className="display-md mt-1.5 text-[var(--color-text-primary)]">
              Best <em>{name}</em> websites
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
              {category.blurb}
            </p>

            <div className="mt-6 flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-text-secondary)]">
              <Info size={18} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
              <p>
                These are independent websites, not affiliated with AI Master Tools. Earnings and eligibility
                vary by country, skill and effort — always read each platform's own terms, and never pay
                upfront to "unlock" work.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
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
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">{site.intro}</p>
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

            <div className="mt-10">
              <Link to="/earn" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:underline">
                <ArrowRight size={15} className="rotate-180" aria-hidden="true" /> Back to all Earn Online categories
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <NewsletterSection showToast={() => {}} />
      </div>
    </div>
  );
};

export default EarnCategory;
