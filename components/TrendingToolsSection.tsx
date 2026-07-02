import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { MOCK_TOOLS } from '../data/tools';
import ToolCard from './ToolCard';

export const TrendingToolsSection: React.FC = () => {
  const trendingTools = [...MOCK_TOOLS]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4); // Take top 4 trending

  return (
    <section className="py-16 md:py-24 bg-[var(--color-background)] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent pointer-events-none"></div>
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">
              <TrendingUp size={14} /> Trending Now
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--color-text-primary)]">
              Most Popular Tools
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mt-4">
              Explore the AI tools that are currently trending in the community. High ratings and massive user growth.
            </p>
          </div>
          <Link to="/?tab=Trending" className="inline-flex items-center gap-2 font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors whitespace-nowrap">
            View all trending <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingTools.map((tool, index) => (
            <div key={tool.id} className="relative group">
              <div className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg border border-white/20 flex items-center gap-1 transform rotate-3 group-hover:rotate-0 transition-transform">
                #{index + 1} Trending
              </div>
              <div className="h-full">
                <ToolCard tool={tool} layout="vertical" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
