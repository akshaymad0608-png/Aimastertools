import React from 'react';
import { Search, LayoutGrid, Rows3 } from 'lucide-react';
import { Tool } from '../../types';
import ToolCard from '../ToolCard';
import { TOOL_COUNT, PRICING_TIERS, pricingCount } from '../../utils/stats';

interface ExploreDirectoryProps {
  isCurationActive: boolean;
  processedToolsLength: number;
  activeTab: 'Featured' | 'Newest' | 'Trending';
  setActiveTab: (tab: 'Featured' | 'Newest' | 'Trending') => void;
  selectedPricing: string;
  setSelectedPricing: (pricing: string) => void;
  displayedTools: Tool[];
  hasMore: boolean;
  onLoadMore: () => void;
  onReset: () => void;
}

export const ExploreDirectory: React.FC<ExploreDirectoryProps> = ({
  isCurationActive,
  processedToolsLength,
  activeTab,
  setActiveTab,
  selectedPricing,
  setSelectedPricing,
  displayedTools,
  hasMore,
  onLoadMore,
  onReset,
}) => {
  const [view, setView] = React.useState<'rows' | 'grid'>('rows');

  return (
    <section aria-labelledby="directory-heading" className="scroll-mt-28">
      <div className="flex flex-col gap-5 border-b border-[var(--color-border)] pb-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">The full index</p>
            <h2 id="directory-heading" className="display-md mt-3 text-[var(--color-text-primary)]">
              {isCurationActive ? 'Every tool in the catalogue' : 'Search results'}
            </h2>
          </div>
          <p className="label-mono tabular-nums">
            {isCurationActive
              ? `${TOOL_COUNT} entries`
              : `${processedToolsLength} of ${TOOL_COUNT} match`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Sort */}
          <div
            role="tablist"
            aria-label="Sort the directory"
            className="flex rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-1"
          >
            {(['Featured', 'Trending', 'Newest'] as const).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-[var(--radius-xs)] px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                  activeTab === tab
                    ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Pricing filter, with real counts so nobody clicks into an empty list */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedPricing('All')}
              aria-pressed={selectedPricing === 'All'}
              className={`link-chip ${selectedPricing === 'All' ? '!border-[var(--color-primary)] !text-[var(--color-primary)]' : ''}`}
            >
              All pricing
            </button>
            {PRICING_TIERS.map((tier) => {
              const n = pricingCount(tier);
              if (!n) return null;
              return (
                <button
                  key={tier}
                  onClick={() => setSelectedPricing(tier)}
                  aria-pressed={selectedPricing === tier}
                  className={`link-chip ${selectedPricing === tier ? '!border-[var(--color-primary)] !text-[var(--color-primary)]' : ''}`}
                >
                  {tier} <span className="link-chip__count">{n}</span>
                </button>
              );
            })}
          </div>

          {/* View toggle */}
          <div className="ml-auto hidden rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-1 md:flex">
            <button
              onClick={() => setView('rows')}
              aria-pressed={view === 'rows'}
              aria-label="List view"
              className={`grid h-8 w-8 place-items-center rounded-[var(--radius-xs)] ${
                view === 'rows' ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
              }`}
            >
              <Rows3 size={15} />
            </button>
            <button
              onClick={() => setView('grid')}
              aria-pressed={view === 'grid'}
              aria-label="Grid view"
              className={`grid h-8 w-8 place-items-center rounded-[var(--radius-xs)] ${
                view === 'grid' ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
              }`}
            >
              <LayoutGrid size={15} />
            </button>
          </div>
        </div>
      </div>

      {displayedTools.length > 0 ? (
        <ul
          className={
            view === 'grid'
              ? 'mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'
              : 'mt-6 flex flex-col gap-4'
          }
        >
          {displayedTools.map((tool, index) => (
            <li key={`explore-${tool.id}`}>
              <ToolCard tool={tool} rank={index + 1} layout={view === 'grid' ? 'vertical' : 'horizontal'} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] px-6 py-16 text-center">
          <Search size={28} className="mx-auto mb-4 text-[var(--color-text-muted)]" />
          <p className="text-[17px] font-semibold text-[var(--color-text-primary)]">Nothing matches that</p>
          <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
            Try a shorter search term, or clear the pricing filter — some categories have no
            free entries at all.
          </p>
          <button onClick={onReset} className="btn-secondary mt-6 h-10 px-5 text-[13px]">
            Clear all filters
          </button>
        </div>
      )}

      {hasMore && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <button onClick={onLoadMore} className="btn-secondary h-12 px-8">
            Load more tools
          </button>
          <p className="label-mono tabular-nums">
            Showing {displayedTools.length} of {processedToolsLength}
          </p>
        </div>
      )}
    </section>
  );
};

export default ExploreDirectory;
