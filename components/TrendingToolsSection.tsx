import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { MOCK_TOOLS } from '../data/tools';
import ToolCard from './ToolCard';

export const TrendingToolsSection: React.FC = () => {
  /**
   * Sorting by rating alone picks an arbitrary eight.
   *
   * 202 records share the top score of 4.9, so `sort` was returning whichever
   * eight happened to sit earliest in the array — a list that changes meaning
   * every time a record is inserted above them, and that reads as a ranking
   * while being nothing of the sort.
   *
   * Rating leads, then `featured` — the editor's-pick flag, which is the only
   * other deliberate signal in the record — and then name, so the order is
   * fully determined and the same eight appear on every render.
   *
   * Breaking the tie on name alone was stable but useless: it returned the
   * eight alphabetically-first of the 202, which is to say the A's and B's.
   * 25 records are both featured and top-rated, so that flag does the work and
   * the fallback almost never runs.
   *
   * The heading says "eight of the highest rated" rather than "the eight
   * highest rated", because with a scale this bunched the second claim is not
   * true.
   */
  const trendingTools = [...MOCK_TOOLS]
    .sort(
      (a, b) =>
        b.rating - a.rating ||
        Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
        a.name.localeCompare(b.name),
    )
    .slice(0, 8);

  // Duplicate the array to create a seamless infinite marquee effect
  const marqueeTools = [...trendingTools, ...trendingTools];

  return (
    <section className="py-16 md:py-24 bg-[var(--color-background)] relative border-t border-[var(--color-border)] overflow-hidden">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 relative z-10 mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] font-bold text-xs uppercase tracking-wider mb-4">
              <TrendingUp size={14} /> Trending Now
            </div>
            {/* The list is MOCK_TOOLS sorted by rating. There is no traffic,
                install or popularity data behind this site, so "trending in the
                community" and "massive user growth" were describing numbers
                that do not exist. The copy now says what the sort actually is. */}
            <h2 className="display-md text-[var(--color-text-primary)]">
              Eight of the highest rated
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mt-4">
              Ratings here are editorial rather than an average of user reviews, and a lot of
              tools share the top score — so this is a sample of the best rated, not a
              leaderboard. The full list is worth a scroll.
            </p>
          </div>
          <Link to="/?tab=Trending" className="inline-flex items-center gap-2 font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors whitespace-nowrap">
            See the full ranking <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="w-full relative px-0">
        {/*
          The two side-fade divs that used to sit here carried `from-…` and
          `to-transparent` with no `bg-gradient-to-*` to apply them, so they
          were gradient stops attached to nothing — invisible elements doing
          no work. The fade is real and comes from .mask-fade-sides below.

          py-6 is load-bearing: each rank badge is positioned -top-3, i.e.
          twelve pixels outside its card, and this container clips overflow.
          Without the padding the badges were sliced in half along their top
          edge, which is exactly how they were shipping.
        */}
        <div className="marquee-viewport mask-fade-sides overflow-hidden py-6">
          {/* Note: Using pr-6 on children instead of gap-6 to make the 50% translation mathematically perfect for the infinite loop */}
          <div className="animate-marquee flex">
            {marqueeTools.map((tool, index) => (
              <div
                key={`${tool.id}-${index}`}
                className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 relative group pr-6"
                aria-hidden={index >= trendingTools.length}
              >
                {/* Left, not right: the card already puts its Editor's-pick
                    tick in the top-right corner, and the two were landing in
                    the same three pixels. */}
                <div className="absolute -top-3 left-4 z-10 bg-[var(--color-cardBg)] text-[var(--color-text-primary)] border border-[var(--color-border)] text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 transition-transform group-hover:scale-105">
                  #{ (index % trendingTools.length) + 1 }
                </div>
                <div className="h-full">
                  <ToolCard tool={tool} layout="vertical" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
