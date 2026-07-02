import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Star } from 'lucide-react';
import { MOCK_TOOLS } from '../data/tools';
import ToolLogo from './ToolLogo';

const TrendingSidebarWidget: React.FC = () => {
  const trendingTools = useMemo(() => {
    return [...MOCK_TOOLS]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }, []);

  return (
    <div className="glass-panel border border-[var(--color-border)] rounded-3xl p-6 md:p-8 sticky top-28 shadow-xl mt-6">
      <div className="flex items-center gap-2 mb-6 border-b border-[var(--color-border)] pb-4">
        <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20">
          <TrendingUp size={18} strokeWidth={2.5} />
        </div>
        <h3 className="text-xl font-bold text-[var(--color-text-primary)]">Trending Tools</h3>
      </div>
      
      <div className="flex flex-col gap-4">
        {trendingTools.map((tool, index) => (
          <Link 
            key={tool.id} 
            to={`/tool/${tool.id}`}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--color-surface)] border border-transparent hover:border-[var(--color-border)] transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center overflow-hidden shrink-0">
              <ToolLogo domain={tool.domain} name={tool.name} className="w-6 h-6" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-[var(--color-text-primary)] truncate group-hover:text-[var(--color-primary)] transition-colors">
                {tool.name}
              </h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold truncate max-w-[80px]">
                  {tool.category}
                </span>
                <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                  <Star size={10} className="fill-amber-500" />
                  {tool.rating}
                </span>
              </div>
            </div>
            
            <div className="text-xs font-black text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] opacity-50">
              #{index + 1}
            </div>
          </Link>
        ))}
      </div>
      
      <Link to="/?tab=Trending" className="block text-center mt-6 py-2.5 rounded-xl text-sm font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 transition-colors">
        View All Trending
      </Link>
    </div>
  );
};

export default TrendingSidebarWidget;
