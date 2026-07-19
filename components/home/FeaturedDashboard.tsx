import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Columns2 } from 'lucide-react';
import { Tool } from '../../types';
import ToolCard from '../ToolCard';
import ToolLogo from '../ToolLogo';
import { MOCK_TOOLS } from '../../data/tools';
import { pairSlug } from '../../utils/pairs';

interface FeaturedDashboardProps {
  trendingToolsCurated: Tool[];
  recentlyAddedToolsCurated: Tool[];
  topFreeToolsCurated: Tool[];
}

const ColumnHead: React.FC<{ eyebrow: string; title: string; to: string }> = ({ eyebrow, title, to }) => (
  <div className="mb-6 flex items-end justify-between gap-4 border-b border-[var(--color-border)] pb-4">
    <div>
      <p className="label-mono">{eyebrow}</p>
      <h3 className="mt-2 text-[21px] text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>{title}</h3>
    </div>
    <Link to={to} className="shrink-0 text-[13px] font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline">
      See all
    </Link>
  </div>
);

export const FeaturedDashboard: React.FC<FeaturedDashboardProps> = ({
  trendingToolsCurated,
  recentlyAddedToolsCurated,
  topFreeToolsCurated,
}) => {
  /**
   * Comparison pairs are derived from the catalogue rather than hard-coded,
   * so a link can never point at a tool that has been renamed or removed.
   */
  const comparisonPairs = React.useMemo(() => {
    const byCategory = new Map<string, Tool[]>();
    for (const t of MOCK_TOOLS) {
      if (!byCategory.has(t.category)) byCategory.set(t.category, []);
      byCategory.get(t.category)!.push(t);
    }
    return [...byCategory.entries()]
      .map(([category, tools]) => tools.sort((a, b) => b.rating - a.rating).slice(0, 2).concat([]) as Tool[])
      .filter((pair) => pair.length === 2)
      .sort((a, b) => b[0].rating + b[1].rating - (a[0].rating + a[1].rating))
      .slice(0, 3);
  }, []);

  return (
    <div className="mb-16 flex flex-col gap-16">
      {/* Highest rated, as a full-bleed rank list */}
      <section aria-labelledby="top-rated">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[var(--color-border)] pb-5">
          <div>
            <p className="eyebrow">Top of the index</p>
            <h2 id="top-rated" className="display-md mt-3 text-[var(--color-text-primary)]">
              Highest rated right now
            </h2>
          </div>
          <Link to="/?tab=Trending" className="btn-secondary h-10 whitespace-nowrap px-4 text-[13px]">
            See the full ranking <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {trendingToolsCurated.map((tool, i) => (
            <ToolCard key={`trending-${tool.id}`} tool={tool} rank={i + 1} layout="vertical" />
          ))}
        </div>
      </section>

      {/* Comparison desk — real, data-derived head-to-heads */}
      <section
        aria-labelledby="compare-desk"
        className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-6 sm:p-9"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Comparison desk</p>
            <h2 id="compare-desk" className="display-md mt-3 text-[var(--color-text-primary)]">
              Two tabs open, <em>one decision</em> left.
            </h2>
            <p className="mt-3.5 text-[15.5px] leading-relaxed text-[var(--color-text-secondary)]">
              Put any two entries side by side and read their pricing, limits and best use
              cases in the same column widths. No scrolling between marketing pages.
            </p>
            <Link to="/compare" className="btn-primary mt-6 h-11 px-5">
              Open the comparison tool <Columns2 size={16} />
            </Link>
          </div>

          <ul className="flex w-full shrink-0 flex-col gap-3 lg:w-[360px]">
            {comparisonPairs.map(([a, b]) => (
              <li key={`${a.id}-${b.id}`}>
                <Link
                  to={`/compare/${pairSlug(a, b)}`}
                  className="group flex items-center justify-between gap-4 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 transition-colors hover:border-[var(--color-primary)]"
                >
                  <span className="flex min-w-0 items-center gap-3.5">
                    <span className="flex shrink-0 -space-x-2.5">
                      {[a, b].map((t) => (
                        <span
                          key={t.id}
                          className="grid h-9 w-9 place-items-center overflow-hidden rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-1"
                        >
                          <ToolLogo domain={t.domain} brandColor={t.brandColor} name={t.name} className="h-full w-full" />
                        </span>
                      ))}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[13.5px] font-semibold text-[var(--color-text-primary)]">
                        {a.name} <span className="font-normal text-[var(--color-text-muted)]">vs</span> {b.name}
                      </span>
                      <span className="label-mono mt-0.5 block truncate">{a.category}</span>
                    </span>
                  </span>
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-primary)]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Two honest columns */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
        <section aria-labelledby="new-arrivals">
          <ColumnHead eyebrow="Newest entries" title="Just added" to="/?tab=Newest" />
          <div id="new-arrivals" className="flex flex-col gap-4">
            {recentlyAddedToolsCurated.map((tool) => (
              <ToolCard key={`recent-${tool.id}`} tool={tool} />
            ))}
          </div>
        </section>

        <section aria-labelledby="free-picks">
          <ColumnHead eyebrow="Costs nothing" title="Best free & open source" to="/?pricing=Free" />
          <div id="free-picks" className="flex flex-col gap-4">
            {topFreeToolsCurated.map((tool) => (
              <ToolCard key={`free-${tool.id}`} tool={tool} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FeaturedDashboard;
