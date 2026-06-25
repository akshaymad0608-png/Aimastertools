import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Award, GitCompare, Zap } from 'lucide-react';
import { Tool } from '../../types';
import ToolCard from '../ToolCard';

interface FeaturedDashboardProps {
  trendingToolsCurated: Tool[];
  recentlyAddedToolsCurated: Tool[];
  topFreeToolsCurated: Tool[];
}

export const FeaturedDashboard: React.FC<FeaturedDashboardProps> = ({ trendingToolsCurated, recentlyAddedToolsCurated, topFreeToolsCurated }) => {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 mb-16">

      {/* TRENDING */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background:'rgba(249,115,22,0.1)', color:'#f97316', border:'1px solid rgba(249,115,22,0.2)' }}><TrendingUp size={20} strokeWidth={2.5} /></div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black leading-none tracking-tight flex items-center gap-2" style={{ color:'var(--color-text-primary)' }}>Trending This Week <span className="text-xl">🔥</span></h3>
              <p className="text-sm mt-1 font-medium" style={{ color:'var(--color-text-secondary)' }}>The most active, highly rated AI platforms.</p>
            </div>
          </div>
          <Link to="/?tab=Trending" className="hidden sm:flex items-center gap-2 text-sm font-bold transition-colors px-4 py-2 rounded-lg" style={{ color:'#f97316', background:'rgba(249,115,22,0.08)' }}>View All Trending</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {trendingToolsCurated.map((tool, index) => (
            <div key={`trending-${tool.id}`} className="relative group">
              <div className="absolute -top-3 -right-2 z-10 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1" style={{ background:'linear-gradient(135deg,#10b981,#059669)', border:'1px solid rgba(255,255,255,0.2)' }}>
                <TrendingUp size={10} /> +{Math.floor(Math.random() * 50) + 10}%
              </div>
              <div className="h-full"><ToolCard tool={tool} rank={index + 1} layout="vertical" /></div>
            </div>
          ))}
        </div>
      </div>

      {/* COMPARE BANNER */}
      <div className="p-6 sm:p-10 rounded-[24px] relative overflow-hidden" style={{ background:'linear-gradient(135deg, rgba(6,78,59,0.5) 0%, rgba(6,95,70,0.35) 40%, rgba(8,51,68,0.45) 100%)', border:'1px solid rgba(16,185,129,0.2)', backdropFilter:'blur(12px)' }}>
        <div style={{ position:'absolute', right:'-5%', top:'-10%', width:'380px', height:'380px', borderRadius:'50%', background:'rgba(16,185,129,0.15)', filter:'blur(90px)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', left:'-5%', bottom:'-10%', width:'280px', height:'280px', borderRadius:'50%', background:'rgba(6,182,212,0.12)', filter:'blur(70px)', pointerEvents:'none' }} />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background:'rgba(16,185,129,0.15)', border:'1px solid rgba(16,185,129,0.3)', color:'#34d399' }}><GitCompare size={12} /> Compare AI Tools Side by Side</div>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">Find the perfect match for your workflow.</h3>
            <p className="text-base sm:text-lg font-medium max-w-xl" style={{ color:'rgba(209,250,229,0.8)' }}>Don't guess. Compare pricing, accuracy, speed, and best use cases side-by-side before you subscribe.</p>
            <div className="mt-6">
              <Link to="/compare" className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:-translate-y-0.5" style={{ background:'linear-gradient(135deg,#10b981,#059669)', boxShadow:'0 8px 25px rgba(16,185,129,0.3)' }}>Start Comparing <GitCompare size={16} /></Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-[340px] shrink-0">
            {[
              { to:'/compare?tools=chatgpt,claude', img1:'https://img.logo.dev/chatgpt.com?token=pk_Yy124-7wSK-z-Hym446V9A', alt1:'ChatGPT', img2:'https://img.logo.dev/claude.ai?token=pk_Yy124-7wSK-z-Hym446V9A', alt2:'Claude', label:'ChatGPT vs Claude', sublabel:'LLM Giants Clash', hoverColor:'rgba(16,185,129,0.4)', sublabelColor:'#34d399' },
              { to:'/compare?tools=midjourney,dall-e', img1:'https://img.logo.dev/midjourney.com?token=pk_Yy124-7wSK-z-Hym446V9A', alt1:'Midjourney', img2:'https://img.logo.dev/openai.com?token=pk_Yy124-7wSK-z-Hym446V9A', alt2:'DALL-E', label:'Midjourney vs DALL-E', sublabel:'Image Generation', hoverColor:'rgba(6,182,212,0.4)', sublabelColor:'#22d3ee' },
            ].map((item, i) => (
              <Link key={i} to={item.to} className="p-4 sm:p-5 rounded-2xl transition-all flex items-center justify-between gap-4 group" style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(8px)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = item.hoverColor)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex -space-x-3 shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center p-2 z-10 shadow-sm overflow-hidden bg-white"><img src={item.img1} alt={item.alt1} className="w-full h-full object-contain" /></div>
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center p-2 z-20 shadow-sm overflow-hidden bg-white"><img src={item.img2} alt={item.alt2} className="w-full h-full object-contain" /></div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[15px] font-black text-white leading-tight truncate">
                      {item.label.split(' vs ')[0]} <span className="font-normal text-white/50">vs</span> {item.label.split(' vs ')[1]}
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-wider mt-0.5 truncate" style={{ color:item.sublabelColor }}>{item.sublabel}</div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', color:'rgba(255,255,255,0.7)' }}><GitCompare size={18} /></div>
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
