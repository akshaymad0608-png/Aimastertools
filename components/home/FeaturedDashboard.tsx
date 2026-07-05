import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Award, GitCompare, Zap } from 'lucide-react';
import { Tool } from '../../types';
import ToolCard from '../ToolCard';
import ToolLogo from '../ToolLogo';

interface FeaturedDashboardProps {
  trendingToolsCurated: Tool[];
  recentlyAddedToolsCurated: Tool[];
  topFreeToolsCurated: Tool[];
}

export const FeaturedDashboard: React.FC<FeaturedDashboardProps> = ({ trendingToolsCurated, recentlyAddedToolsCurated, topFreeToolsCurated }) => {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 mb-16">
      
      {/* TOOL OF THE DAY (Retention hook) */}
      <div className="rounded-[16px] overflow-hidden border bg-[var(--color-cardBg)] border-[var(--color-border)]">
        <div className="p-6 md:p-8 relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest mb-4 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
              <Award size={14} /> Tool of the Day
            </div>
            <h3 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-2">Claude 3.5 Sonnet</h3>
            <p className="text-[var(--color-text-secondary)] font-medium mb-6">Anthropic's latest model sets a new standard for intelligence, speed, and coding capabilities. See why developers are switching.</p>
            <Link to="/tool/2" className="btn-secondary">
              View Tool Deep Dive
            </Link>
          </div>
          <div className="shrink-0 w-full md:w-[340px]">
            {recentlyAddedToolsCurated.length > 0 && (
               <ToolCard tool={recentlyAddedToolsCurated[0]} layout="horizontal" />
            )}
          </div>
        </div>
      </div>

      {/* TRENDING */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)]"><TrendingUp size={20} /></div>
            <div>
              <h3 className="text-2xl font-bold leading-none tracking-tight flex items-center gap-2 text-[var(--color-text-primary)]">Trending This Week</h3>
              <p className="text-sm mt-1 text-[var(--color-text-secondary)]">The most active, highly rated AI platforms.</p>
            </div>
          </div>
          <Link to="/?tab=Trending" className="hidden sm:flex items-center gap-2 text-sm font-medium transition-colors px-4 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)]">View All Trending</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {trendingToolsCurated.map((tool, index) => (
            <div key={`trending-${tool.id}`} className="relative group">
              <div className="h-full"><ToolCard tool={tool} rank={index + 1} layout="vertical" /></div>
            </div>
          ))}
        </div>
      </div>

      {/* COMPARE BANNER */}
      <div className="p-6 sm:p-10 rounded-[16px] bg-[var(--color-cardBg)] border border-[var(--color-border)] relative overflow-hidden shadow-sm">
        {/* Decorative Gradients */}
        <div className="absolute top-[-30%] right-[-10%] w-[50%] h-[150%] bg-[var(--color-primary)] opacity-[0.05] blur-[80px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[50%] h-[150%] bg-[var(--color-accent)] opacity-[0.05] blur-[80px] pointer-events-none mix-blend-screen" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest mb-4 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] shadow-sm">
              <GitCompare size={12} /> Compare AI Tools
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-3">Find the perfect match for your workflow.</h3>
            <p className="text-base font-medium max-w-xl text-[var(--color-text-secondary)] mb-6">Don't guess. Compare pricing, accuracy, speed, and best use cases side-by-side before you subscribe.</p>
            <div>
              <Link to="/compare" className="btn-primary inline-flex items-center gap-2">Start Comparing <GitCompare size={16} /></Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-[340px] shrink-0">
            {[
              { to:'/compare?tools=chatgpt,claude', domain1:'chatgpt.com', alt1:'ChatGPT', domain2:'claude.ai', alt2:'Claude', label:'ChatGPT vs Claude', sublabel:'LLM Giants Clash' },
              { to:'/compare?tools=midjourney,dall-e', domain1:'midjourney.com', alt1:'Midjourney', domain2:'openai.com', alt2:'DALL-E', label:'Midjourney vs DALL-E', sublabel:'Image Generation' },
            ].map((item, i) => (
              <Link key={i} to={item.to} className="p-4 rounded-xl flex items-center justify-between gap-4 group bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex -space-x-3 shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-white border border-[var(--color-border)] flex items-center justify-center p-1.5 z-10 shadow-sm overflow-hidden"><ToolLogo domain={item.domain1} name={item.alt1} className="w-full h-full object-contain" /></div>
                    <div className="w-10 h-10 rounded-lg bg-white border border-[var(--color-border)] flex items-center justify-center p-1.5 z-20 shadow-sm overflow-hidden"><ToolLogo domain={item.domain2} name={item.alt2} className="w-full h-full object-contain" /></div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[var(--color-text-primary)] leading-tight truncate">
                      {item.label.split(' vs ')[0]} <span className="font-normal text-[var(--color-text-muted)]">vs</span> {item.label.split(' vs ')[1]}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5 truncate text-[var(--color-text-secondary)]">{item.sublabel}</div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[var(--color-cardBg)] border border-[var(--color-border)] text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-colors"><GitCompare size={14} /></div>
              </Link>
            ))}
          </div>

        </div>
      </div>

      {/* NEW ARRIVALS + EDITOR'S CHOICE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {[
          { title:'New Arrivals', sub:'Just added this week', icon:<Zap size={20} strokeWidth={2.5}/>, color:'#06b6d4', bg:'rgba(6,182,212,0.1)', border:'rgba(6,182,212,0.2)', linkColor:'#06b6d4', linkBg:'rgba(6,182,212,0.08)', to:'/?tab=Newest', tools:recentlyAddedToolsCurated, prefix:'recent' },
          { title:"Editor's Choice", sub:'Top free & open source', icon:<Award size={20} strokeWidth={2.5}/>, color:'#10b981', bg:'rgba(16,185,129,0.1)', border:'rgba(16,185,129,0.2)', linkColor:'#10b981', linkBg:'rgba(16,185,129,0.08)', to:'/?pricing=Free', tools:topFreeToolsCurated, prefix:'free' },
        ].map((col, i) => (
          <div key={i} className="rounded-[24px] border p-6 sm:p-8 shadow-sm transition-shadow hover:shadow-md" style={{ background:'var(--color-cardBg)', borderColor:'var(--color-border)' }}>
            <div className="flex items-center justify-between mb-7 border-b pb-5" style={{ borderColor:'var(--color-border)' }}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background:col.bg, color:col.color, border:`1px solid ${col.border}` }}>{col.icon}</div>
                <div>
                  <h3 className="text-xl font-black tracking-tight" style={{ color:'var(--color-text-primary)' }}>{col.title}</h3>
                  <p className="text-[13px] font-medium" style={{ color:'var(--color-text-secondary)' }}>{col.sub}</p>
                </div>
              </div>
              <Link to={col.to} className="text-xs font-bold px-3 py-1.5 rounded-lg transition-colors" style={{ color:col.linkColor, background:col.linkBg }}>See All</Link>
            </div>
            <div className="flex flex-col gap-4">
              {col.tools.map(tool => <ToolCard key={`${col.prefix}-${tool.id}`} tool={tool} />)}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
