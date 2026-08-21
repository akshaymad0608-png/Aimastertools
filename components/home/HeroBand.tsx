import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { TOOL_COUNT, CATEGORY_COUNT, FREE_TOOL_COUNT } from '../../utils/stats';
import { CATEGORIES } from '../../data/categories';

interface HeroBandProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

/**
 * The hero, given actual weight.
 *
 * What was here was a "compact band": an eyebrow, a headline, a paragraph and
 * four chips, inside py-8. No search, no route in, nothing to do — on a site
 * whose entire purpose is finding a tool, the first screen offered no way to
 * look for one. The search box lived in the header from xl up and inside the
 * directory further down the page, so on a phone the first thing a visitor saw
 * was a description of a search engine.
 *
 * The search field is the hero now. It writes to the same state the directory
 * filter uses, so the two can never disagree — one is the way in, the other
 * refines once you are there.
 *
 * Asymmetric rather than centred: a centred hero is the default every landing
 * page reaches for, and this one has a real second column to fill — the
 * busiest categories, which double as the fastest route into the index.
 */
export const HeroBand: React.FC<HeroBandProps> = ({
  searchTerm,
  onSearchChange,
  onSubmit,
  inputRef,
}) => {
  const top = CATEGORIES.slice(0, 6);

  return (
    <section className="page-top border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="container-custom py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="eyebrow">Independent · no pay-to-rank</p>

            <h1 className="display-xl mt-5 text-[var(--color-text-primary)]">
              Every AI tool worth knowing, in one place.
            </h1>

            <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-[var(--color-text-secondary)]">
              {TOOL_COUNT} tools, checked and filed by hand — with real pricing, honest
              limits, and what to use instead when one does not fit.
            </p>

            <form
              role="search"
              className="mt-8 max-w-xl"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
            >
              <label htmlFor="hero-search" className="sr-only">
                Search AI tools by name or job
              </label>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <div className="relative flex-1">
                  <Search
                    size={18}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                  />
                  <input
                    id="hero-search"
                    ref={inputRef}
                    type="search"
                    value={searchTerm}
                    onChange={onSearchChange}
                    placeholder="Search by name, or by the job you need done…"
                    className="h-13 w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-cardBg)] pl-11 pr-4 text-[15.5px] text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)]"
                  />
                </div>
                <button type="submit" className="btn-primary h-13 shrink-0 px-6 text-[14px]">
                  Search <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </form>

            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[var(--color-text-secondary)]">
              {[
                `${CATEGORY_COUNT} categories`,
                `${FREE_TOOL_COUNT} free or open source`,
                'Re-checked, not scraped',
              ].map((c) => (
                <li key={c} className="inline-flex items-center gap-2">
                  <span
                    className="h-1 w-1 rounded-full bg-[var(--color-primary)]"
                    aria-hidden="true"
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pt-2">
            <p className="label-mono">Start somewhere</p>
            <ul className="mt-5 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {top.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="group flex items-baseline justify-between gap-4 py-3.5 transition-colors hover:text-[var(--color-primary)]"
                  >
                    <span className="min-w-0 truncate text-[15px] font-medium text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-primary)]">
                      {cat.name}
                    </span>
                    <span className="label-mono shrink-0 tabular-nums">{cat.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/categories"
              className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline"
            >
              All {CATEGORY_COUNT} categories <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBand;
