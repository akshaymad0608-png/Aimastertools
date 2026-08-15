import React from 'react';
import { X } from 'lucide-react';

const PRICING = ['All', 'Free', 'Freemium', 'Paid', 'Usage Based', 'Open Source'];
const SORTS = ['Featured', 'Trending', 'Newest'] as const;

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
  selectedPricing: string;
  setSelectedPricing: (p: string) => void;
  activeTab: 'Featured' | 'Newest' | 'Trending';
  setActiveTab: (t: 'Featured' | 'Newest' | 'Trending') => void;
  resultCount: number;
}

const chip = (active: boolean) =>
  `rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${
    active
      ? 'border-transparent bg-[var(--color-primary-fill)] text-white'
      : 'border-[var(--color-border)] text-[var(--color-text-secondary)]'
  }`;

/** Mobile-only bottom sheet for pricing + sort filters. */
const FilterSheet: React.FC<FilterSheetProps> = ({
  open,
  onClose,
  selectedPricing,
  setSelectedPricing,
  activeTab,
  setActiveTab,
  resultCount,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] md:hidden" role="dialog" aria-modal="true" aria-label="Filters">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 rounded-t-[20px] border-t border-[var(--color-border)] bg-[var(--color-background)] p-5 pb-8 shadow-[var(--shadow-lift)] animate-fade-in-up">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-[var(--color-border-strong)]" aria-hidden="true" />
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Filters</h2>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="grid h-8 w-8 place-items-center rounded-full text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
          >
            <X size={18} />
          </button>
        </div>

        <p className="label-mono mb-2.5 mt-5">Pricing</p>
        <div className="flex flex-wrap gap-2">
          {PRICING.map((p) => (
            <button key={p} onClick={() => setSelectedPricing(p)} className={chip(selectedPricing === p)}>
              {p}
            </button>
          ))}
        </div>

        <p className="label-mono mb-2.5 mt-5">Sort by</p>
        <div className="flex flex-wrap gap-2">
          {SORTS.map((t) => (
            <button key={t} onClick={() => setActiveTab(t)} className={chip(activeTab === t)}>
              {t}
            </button>
          ))}
        </div>

        <button onClick={onClose} className="btn-primary mt-7 h-12 w-full text-[15px]">
          Show {resultCount} tools
        </button>
      </div>
    </div>
  );
};

export default FilterSheet;
