import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import CategoryIcon from '../CategoryIcon';
import { MOCK_TOOLS } from '../../data/tools';
import { PRICING_TIERS, pricingCount, TOOL_COUNT } from '../../utils/stats';

/**
 * A plain-text index of ways into the catalogue.
 *
 * This section exists for two audiences at once. Readers who do not know what
 * to search for get a menu of entry points; crawlers get a dense block of
 * internal links so category and tag pages are reachable within one hop of the
 * home page instead of being buried behind a client-side filter.
 */
export const BrowseHub: React.FC = () => {
  const topTags = React.useMemo(() => {
    const counts = new Map<string, number>();
    for (const tool of MOCK_TOOLS) {
      for (const tag of tool.tags || []) {
        const key = tag.toLowerCase().trim();
        if (key) counts.set(key, (counts.get(key) || 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 24);
  }, []);

  return (
    <section className="section section-rule" aria-labelledby="browse-heading">
      <div className="container-custom">
        <div className="section-head">
          <div className="section-head__title">
            <p className="eyebrow">Ways in</p>
            <h2 id="browse-heading" className="display-md mt-4 text-[var(--color-text-primary)]">
              Not sure <em>what</em> to search for?
            </h2>
            <p className="section-head__lede">
              {TOOL_COUNT} entries, sliced three ways — by the job you need done, by what you
              are willing to pay, and by the thing the tool actually works on.
            </p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div>
            <h3 className="label-mono border-b border-[var(--color-border)] pb-3">By category</h3>
            <ul className="mt-4 flex flex-col">
              {CATEGORIES.slice(0, 12).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="group flex items-center justify-between gap-4 border-b border-[var(--color-border)]/60 py-2.5 text-[14.5px] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <CategoryIcon name={cat.name} color={cat.color} size={15} />
                      <span className="truncate">{cat.name}</span>
                    </span>
                    <span className="label-mono shrink-0 tabular-nums">{cat.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/categories" className="mt-4 inline-block text-[13px] font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline">
              All categories &rarr;
            </Link>
          </div>

          <div>
            <h3 className="label-mono border-b border-[var(--color-border)] pb-3">By price</h3>
            <ul className="mt-4 flex flex-col">
              {PRICING_TIERS.map((tier) => {
                const n = pricingCount(tier);
                if (!n) return null;
                return (
                  <li key={tier}>
                    <Link
                      to={`/?pricing=${encodeURIComponent(tier)}`}
                      className="flex items-baseline justify-between gap-4 border-b border-[var(--color-border)]/60 py-2.5 text-[14.5px] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
                    >
                      <span>{tier} AI tools</span>
                      <span className="label-mono shrink-0 tabular-nums">{n}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <h3 className="label-mono mt-8 border-b border-[var(--color-border)] pb-3">Other routes</h3>
            <ul className="mt-4 flex flex-col">
              {[
                { to: '/find', label: 'Answer three questions' },
                { to: '/compare', label: 'Compare two tools' },
                { to: '/collections', label: 'Curated collections' },
                { to: '/workflows', label: 'Tool workflows' },
                { to: '/prompts', label: 'Prompt library' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="block border-b border-[var(--color-border)]/60 py-2.5 text-[14.5px] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label-mono border-b border-[var(--color-border)] pb-3">By tag</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {topTags.map(([tag, n]) => (
                <li key={tag}>
                  <Link to={`/?tag=${encodeURIComponent(tag)}`} className="link-chip">
                    <span style={{ fontFamily: 'var(--font-mono)' }}>#{tag.replace(/\s+/g, '-')}</span>
                    <span className="link-chip__count">{n}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseHub;
