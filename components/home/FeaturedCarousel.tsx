import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, ArrowRight } from 'lucide-react';
import { MOCK_TOOLS } from '../../data/tools';
import { Tool } from '../../types';

const GlassCard = ({ tool, rank }: { tool: Tool, rank: number }) => {
  return (
    <Link 
      to={`/tool/${tool.id}`}
      className="block w-[300px] sm:w-[340px] md:w-[400px] shrink-0 relative group pr-6"
    >
      <div className="h-full relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white/40 dark:bg-black/40 backdrop-blur-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_20px_40px_rgba(255,255,255,0.03)] group-hover:bg-white/60 dark:group-hover:bg-black/60 group-hover:border-[var(--color-primary)]/30">
        
        {/* Glow effect */}
        <div className="absolute -inset-1 opacity-0 group-hover:opacity-15 transition-opacity duration-700 blur-2xl" style={{ backgroundColor: tool.brandColor || 'var(--color-primary)' }}></div>
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[var(--color-cardBg)] border border-[var(--color-border)] shadow-sm">
                  <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                {/* Ranking Badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-purple-600 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-[var(--color-primary)]/30 border border-white/20">
                  {rank}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-xl text-[var(--color-text-primary)] leading-tight">{tool.name}</h3>
                <span className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">{tool.category}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-[var(--color-background)]/80 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-[var(--color-border)] shadow-sm">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-[var(--color-text-primary)]">{tool.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-[var(--color-text-secondary)] text-sm line-clamp-3 mb-8 flex-grow font-medium leading-relaxed">
            {tool.description}
          </p>

          <div className="flex items-center justify-between pt-5 border-t border-[var(--color-border)]/40 mt-auto">
            <span className="text-xs font-bold text-[var(--color-primary)] px-3 py-1.5 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
              {tool.pricing}
            </span>
            <div className="flex items-center text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors text-sm font-bold gap-1.5">
              Explore <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const FeaturedCarousel: React.FC = () => {
  const featuredTools = [...MOCK_TOOLS]
    .filter(t => t && t.featured)
    .sort((a, b) => b.rating - a.rating);

  const displayTools = featuredTools.length >= 4 ? featuredTools : [...MOCK_TOOLS].filter(t => t).sort((a, b) => b.rating - a.rating).slice(0, 8);

  const marqueeTools = [...displayTools, ...displayTools];

  return (
    <section className="py-24 md:py-32 bg-[var(--color-background)] relative overflow-hidden border-t border-[var(--color-border)]">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 relative z-10 mb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 font-bold text-xs uppercase tracking-widest mb-6 shadow-sm backdrop-blur-md">
              <Sparkles size={16} className="animate-pulse" /> Editor's Choice
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[var(--color-text-primary)]">
              Featured AI Tools
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mt-6 font-medium leading-relaxed max-w-xl">
              Discover the absolute best AI applications, hand-picked by our editors for exceptional performance, value, and innovation.
            </p>
          </div>
          <Link to="/?tab=Featured" className="btn-secondary whitespace-nowrap hidden sm:flex items-center gap-2">
            View All Featured <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="w-full relative px-0 pb-10">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[var(--color-background)] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[var(--color-background)] to-transparent z-20 pointer-events-none"></div>
        
        <div className="overflow-hidden pt-4">
          <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
            {marqueeTools.map((tool, index) => (
              <GlassCard 
                key={`${tool.id}-${index}`} 
                tool={tool} 
                rank={(index % displayTools.length) + 1} 
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="container-custom max-w-7xl mx-auto px-4 sm:hidden mt-4">
          <Link to="/?tab=Featured" className="btn-secondary w-full justify-center py-3">
            View All Featured
          </Link>
      </div>
    </section>
  );
};
