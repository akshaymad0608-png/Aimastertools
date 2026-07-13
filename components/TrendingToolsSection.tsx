import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { MOCK_TOOLS } from '../data/tools';
import ToolCard from './ToolCard';

export const TrendingToolsSection: React.FC = () => {
  const trendingTools = [...MOCK_TOOLS]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8); // Take top 8 trending

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
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              Most Popular Tools
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mt-4">
              Explore the AI tools that are currently trending in the community. High ratings and massive user growth.
            </p>
          </div>
          <Link to="/?tab=Trending" className="inline-flex items-center gap-2 font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors whitespace-nowrap">
            View all trending <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="w-full relative px-0">
        {/* Optional: Add gradient fades on the sides for a seamless look */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-[var(--color-background)] to-transparent z-10 pointer-events-none hidden md:block"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-[var(--color-background)] to-transparent z-10 pointer-events-none hidden md:block"></div>
        
        <div className="overflow-hidden mask-fade-sides">
          {/* Note: Using pr-6 on children instead of gap-6 to make the 50% translation mathematically perfect for the infinite loop */}
          <div className="animate-marquee flex">
            {marqueeTools.map((tool, index) => (
              <div key={`${tool.id}-${index}`} className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 relative group pr-6">
                <div className="absolute -top-3 right-3 z-10 bg-[var(--color-cardBg)] text-[var(--color-text-primary)] border border-[var(--color-border)] text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 transition-transform group-hover:scale-105">
                  #{ (index % trendingTools.length) + 1 } Trending
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
