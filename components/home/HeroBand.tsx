import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { TOOL_COUNT, CATEGORY_COUNT, FREE_TOOL_COUNT } from '../../utils/stats';
import { CATEGORIES } from '../../data/categories';
import { HeroArt } from './HeroArt';

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
 * Light theme layout: a bold two-line headline and the search on the left,
 * a soft pink-and-silver illustration with the tool finder on the right, and
 * a quiet row underneath with the finder and the busiest categories.
 */
export const HeroBand: React.FC<HeroBandProps> = ({
  searchTerm,
  onSearchChange,
  onSubmit,
  inputRef,
}) => {
  const top = CATEGORIES.slice(0, 6);

  return (
    <section className="page-top overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-background)]">
      <div className="container-custom pb-12 pt-4 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-6">
          <div>
            <p className="eyebrow">Independent · no pay-to-rank</p>

            <h1 className="display-xl mt-5 text-[var(--color-text-primary)]">
              Every AI tool worth knowing. <em>In one place.</em>
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
                    className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] opacity-70"
                    aria-hidden="true"
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <HeroArt />
        </div>

        <div className="mt-12 grid gap-8 border-t border-[var(--color-border)] pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-12">
          <div className="flex items-start gap-4">
            <span aria-hidden="true" className="relative mt-0.5 block h-12 w-12 shrink-0">
              <span className="absolute left-0 top-0 h-7 w-7 rounded-full bg-gradient-to-br from-white to-[#f4b3c9] shadow-sm" />
              <span className="absolute bottom-0 right-0 h-8 w-8 rounded-xl bg-gradient-to-br from-white to-[#c9cad1] shadow-sm" />
            </span>
            <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
              Not sure what you need? Answer three questions and get a short list.
              <Link
                to="/find"
                className="mt-1 block font-semibold text-[var(--color-text-primary)] underline decoration-[1.5px] underline-offset-4 hover:text-[var(--color-primary)]"
              >
                Open the tool finder
              </Link>
            </p>
          </div>

          <div>
            <p className="label-mono">Start somewhere</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {top.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-[13.5px] font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  >
                    {cat.name}
                    <span className="label-mono tabular-nums">{cat.count}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/categories"
                  className="inline-flex items-center gap-1.5 px-2 py-1.5 text-[13.5px] font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline"
                >
                  All {CATEGORY_COUNT} <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBand;
