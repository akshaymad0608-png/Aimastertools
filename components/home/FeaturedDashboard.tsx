import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Award, GitCompare } from 'lucide-react';
import { Tool } from '../../types';
import ToolCard from '../ToolCard';

interface FeaturedDashboardProps {
  trendingToolsCurated: Tool[];
  recentlyAddedToolsCurated: Tool[];
  topFreeToolsCurated: Tool[];
}

export const FeaturedDashboard: React.FC<FeaturedDashboardProps> = ({
  trendingToolsCurated,
  recentlyAddedToolsCurated,
  topFreeToolsCurated
}) => {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 mb-16">
      
      {/* 1. 🔥 CURATED TRENDING AI TOOLS Grid */}
      <div>
        <div className="flex items-center gap-2.5 mb-6">
          <div className="p-2 w-9 h-9 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20 flex items-center justify-center">
            <TrendingUp size={16} />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--color-text-primary)] leading-none tracking-tight">Today's Trending AI</h3>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 font-medium">The most active, highly rated AI platforms engineered for fast growth.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4.5 sm:gap-6">
          {trendingToolsCurated.map((tool) => (
            <ToolCard key={`trending-${tool.id}`} tool={tool} />
          ))}
        </div>
      </div>

      {/* 2. ⚔ AI TOOL COMPARISON DUELS */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600/10 via-indigo-600/5 to-purple-600/10 border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none -translate-y-12 translate-x-12 glowing-orb-bg"></div>
        
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/20 text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-2.5">
              <GitCompare size={10} />
              Side-By-Side Duels
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-[var(--color-text-primary)] tracking-tight">AI Tool Comparative Battles</h3>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 font-medium max-w-xl">
              Prebuilt specifications matchups. Instantly match capabilities, rates, pricing schemes, and real ratings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
            <Link 
              to="/compare?tools=flowise,langflow"
              className="p-4 rounded-2xl bg-[var(--color-cardBg)] hover:bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-indigo-500/30 transition-all shadow-sm flex items-center justify-between gap-6 group"
            >
              <div className="min-w-0">
                <div className="text-[13px] font-bold text-[var(--color-text-primary)] truncate">Flowise vs Langflow</div>
                <div className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider mt-0.5">Agents & Flows</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                ⚔
              </div>
            </Link>

            <Link 
              to="/compare?tools=openrouter,modelcontextprotocol"
              className="p-4 rounded-2xl bg-[var(--color-cardBg)] hover:bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-indigo-500/30 transition-all shadow-sm flex items-center justify-between gap-6 group"
            >
              <div className="min-w-0">
                <div className="text-[13px] font-bold text-[var(--color-text-primary)] truncate">OpenRouter vs MCP</div>
                <div className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider mt-0.5">APIs & Connectors</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                ⚔
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. TWO-COLUMN BENTO GRID: 🆕 Recently Added vs 🏆 Top Free Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Column A: Recently Added */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center">
              <Clock size={16} />
            </div>
            <div>
              <h3 className="text-lg font-black text-[var(--color-text-primary)]">Recently Added Tools</h3>
              <p className="text-xs text-[var(--color-text-secondary)]">The newest additions to our directories, updated weekly.</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3.5">
            {recentlyAddedToolsCurated.map((tool) => (
              <ToolCard key={`recent-${tool.id}`} tool={tool} />
            ))}
          </div>
        </div>

        {/* Column B: Top Free Tools */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2 w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
              <Award size={16} />
            </div>
            <div>
              <h3 className="text-lg font-black text-[var(--color-text-primary)]">Top Free & Open Source</h3>
              <p className="text-xs text-[var(--color-text-secondary)]">Pragmatic, powerful tools with 100% free accessibility models.</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3.5">
            {topFreeToolsCurated.map((tool) => (
              <ToolCard key={`free-${tool.id}`} tool={tool} />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
