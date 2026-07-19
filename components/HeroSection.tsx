import React from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { TOOL_COUNT, CATEGORY_COUNT, FREE_TOOL_COUNT, LAST_UPDATED_LABEL } from '../utils/stats';

interface HeroSectionProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  onChipClick?: (val: string) => void;
}

/**
 * The hero is the search desk. The job of this page is "find me the right
 * tool", so the field is the largest thing on screen and everything else
 * is catalogue furniture around it.
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  searchTerm,
  handleSearchChange,
  searchInputRef,
  onChipClick,
}) => {
  const reduce = useReducedMotion();
  const trending = ['Writing', 'Image', 'Video', 'Coding', 'Agents', 'Research', 'Voice'];

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.2, 0.7, 0.3, 1] as const },
        };

  return (
    <section id="home" className="relative overflow-hidden border-b border-[var(--color-border)]">
      {/* Engineering-paper grid, faded out at the edges */}
      <div
        aria-hidden="true"
        className="grid-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_35%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-18rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[var(--color-primary)] opacity-[0.07] blur-[130px]"
      />

      <div className="page-top-hero container-custom relative z-10 pb-14 md:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p {...rise(0)} className="eyebrow justify-center">
            {`Last updated ${LAST_UPDATED_LABEL} · ${TOOL_COUNT} entries`}
          </motion.p>

          <motion.h1
            {...rise(0.06)}
            className="display-xl mt-5 text-[var(--color-text-primary)]"
          >
            Every AI tool worth
            <br className="hidden sm:block" />{' '}
            knowing, in <em>one index</em>.
          </motion.h1>

          <motion.p
            {...rise(0.12)}
            className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--color-text-secondary)]"
          >
            Search by name or by the job you need done. Every entry lists real pricing,
            what it is good at, and what to use instead.
          </motion.p>

          {/* The search desk */}
          <motion.div {...rise(0.18)} className="relative z-20 mt-9">
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                document
                  .getElementById('search-results')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="group relative flex items-center rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-cardBg)] shadow-[var(--shadow-card)] transition-all focus-within:border-[var(--color-primary)] focus-within:shadow-[var(--shadow-glow)]"
            >
              <label htmlFor="hero-search" className="sr-only">
                Search AI tools
              </label>
              <Search
                size={20}
                strokeWidth={2.2}
                aria-hidden="true"
                className="pointer-events-none absolute left-5 text-[var(--color-text-muted)] transition-colors group-focus-within:text-[var(--color-primary)]"
              />
              <input
                id="hero-search"
                ref={searchInputRef}
                type="search"
                autoComplete="off"
                placeholder="Try “video generator”, “Claude”, “free logo maker”…"
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-16 w-full border-none bg-transparent pl-14 pr-4 text-[16px] font-medium text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] sm:h-[72px] sm:pr-36 sm:text-[17px]"
              />
              <button type="submit" className="btn-primary absolute right-2.5 hidden h-11 px-5 sm:inline-flex">
                Search <ArrowRight size={15} />
              </button>
            </form>
          </motion.div>

          {/* Quick filters, labelled honestly as filters rather than "trending" */}
          <motion.div
            {...rise(0.24)}
            className="relative z-20 mt-5 flex flex-wrap items-center justify-center gap-2"
          >
            <span className="label-mono mr-1">Jump to</span>
            {trending.map((query) => (
              <button
                key={query}
                type="button"
                onClick={() => onChipClick?.(query)}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-cardBg)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                {query}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Catalogue facts — replaces borrowed logos with things that are true */}
        <motion.dl
          {...rise(0.3)}
          className="mx-auto mt-14 grid max-w-3xl grid-cols-2 divide-x divide-[var(--color-border)] border-y border-[var(--color-border)] sm:grid-cols-4 sm:divide-y-0"
        >
          {[
            [String(TOOL_COUNT), 'Tools indexed'],
            [String(CATEGORY_COUNT), 'Categories'],
            [String(FREE_TOOL_COUNT), 'Free or open source'],
            ['Weekly', 'Link checks'],
          ].map(([value, label], i) => (
            <div key={label} className={`px-4 py-5 text-center ${i < 2 ? 'border-b border-[var(--color-border)] sm:border-b-0' : ''}`}>
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="stat-value block">{value}</span>
                <span className="label-mono mt-1.5 block">{label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.p {...rise(0.34)} className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
          Not sure what you need?{' '}
          <Link to="/find" className="font-semibold text-[var(--color-primary)] underline underline-offset-4">
            Answer three questions
          </Link>{' '}
          and we will shortlist for you.
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
