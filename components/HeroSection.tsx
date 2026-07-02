import React from 'react';
import { Search, TrendingUp, Cpu, Award, Users, Clock, Rocket, Star, Code, Video, Edit3, Image as ImageIcon, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from './CountUp';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  onChipClick?: (val: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ searchTerm, handleSearchChange, searchInputRef, onChipClick }) => {
  const trendingQueries = ['ChatGPT', 'Midjourney', 'Writing', 'Coding', 'Agents', 'Video Gen'];

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden" style={{ background: 'var(--color-background)' }}>
      {/* Mesh bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.12) 0%, transparent 65%)' }} />
        <div style={{ position:'absolute', top:'30%', left:'-10%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', filter:'blur(80px)' }} />
        <div style={{ position:'absolute', top:'20%', right:'-5%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', filter:'blur(80px)' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(16,185,129,0.15) 1px, transparent 1px)', backgroundSize:'28px 28px', maskImage:'radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)' }} />
      </div>

      {/* Floating icons */}
      <motion.div animate={{ y:[0,-18,0], opacity:[0.4,0.7,0.4] }} transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }} className="absolute top-[22%] left-[8%] hidden md:flex items-center justify-center w-11 h-11 rounded-2xl border shadow-lg z-0" style={{ background:'var(--color-surface)', borderColor:'rgba(16,185,129,0.25)', color:'#10b981' }}><Code size={18} /></motion.div>
      <motion.div animate={{ y:[0,16,0], opacity:[0.3,0.6,0.3] }} transition={{ duration:6.5, repeat:Infinity, ease:'easeInOut', delay:1 }} className="absolute top-[38%] right-[10%] hidden md:flex items-center justify-center w-12 h-12 rounded-2xl border shadow-lg z-0" style={{ background:'var(--color-surface)', borderColor:'rgba(6,182,212,0.25)', color:'#06b6d4' }}><ImageIcon size={22} /></motion.div>
      <motion.div animate={{ y:[0,-12,0], opacity:[0.3,0.5,0.3] }} transition={{ duration:4.5, repeat:Infinity, ease:'easeInOut', delay:2.5 }} className="absolute bottom-[28%] left-[18%] hidden lg:flex items-center justify-center w-10 h-10 rounded-2xl border shadow-lg z-0" style={{ background:'var(--color-surface)', borderColor:'rgba(168,85,247,0.25)', color:'#a855f7' }}><Edit3 size={16} /></motion.div>
      <motion.div animate={{ y:[0,20,0], opacity:[0.4,0.65,0.4] }} transition={{ duration:5.5, repeat:Infinity, ease:'easeInOut', delay:0.8 }} className="absolute top-[18%] right-[22%] hidden lg:flex items-center justify-center w-11 h-11 rounded-2xl border shadow-lg z-0" style={{ background:'var(--color-surface)', borderColor:'rgba(251,146,60,0.25)', color:'#f97316' }}><Video size={18} /></motion.div>

      <div className="container-custom text-center relative z-10 max-w-5xl mx-auto px-4 sm:px-6">

        {/* Badge */}
        <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold mb-7 cursor-pointer transition-all hover:-translate-y-0.5" style={{ background:'var(--color-surface)', borderColor:'rgba(16,185,129,0.35)', color:'var(--color-text-secondary)', boxShadow:'0 0 20px rgba(16,185,129,0.08)' }}>
          <Zap size={13} className="text-emerald-400" />
          <span style={{ color:'var(--color-text-primary)', fontWeight:700 }}>AI Master Tools 2026</span>
          <span className="w-1 h-1 rounded-full" style={{ background:'rgba(16,185,129,0.5)' }} />
          <span>Next-Gen Platform</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }} className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black tracking-tight leading-[1.08] mb-6" style={{ color:'var(--color-text-primary)' }}>
          Discover the World's Best
          <br className="hidden sm:block" />
          <span style={{ WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', backgroundImage:'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #6366f1 100%)' }}>{' '}AI Tools</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.2 }} className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed" style={{ color:'var(--color-text-secondary)' }}>
          Explore 500+ handpicked AI tools for writing, coding, images, videos, automation, business and productivity.
        </motion.p>

        {/* Search */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.3 }} className="max-w-3xl mx-auto mb-8">
          <form onSubmit={(e) => { e.preventDefault(); document.getElementById('content')?.scrollIntoView({ behavior:'smooth', block:'start' }); }} className="relative flex items-center rounded-2xl border p-2 transition-all duration-300" style={{ background:'var(--color-surface)', borderColor:'rgba(16,185,129,0.25)', boxShadow:'0 12px 40px -10px rgba(16,185,129,0.12)' }}>
            <Search className="absolute left-5" size={20} strokeWidth={2.5} style={{ color:'var(--color-text-muted)' }} />
            <input ref={searchInputRef} type="text" placeholder="Search ChatGPT, Midjourney, Video AI..." className="w-full h-14 pl-14 pr-28 bg-transparent border-none focus:ring-0 outline-none text-[17px] font-medium" style={{ color:'var(--color-text-primary)' }} value={searchTerm} onChange={handleSearchChange} />
            <span className="absolute right-[122px] text-[10px] font-mono border rounded-md px-2 py-1.5 hidden sm:inline-block tracking-widest font-bold" style={{ color:'var(--color-text-muted)', background:'var(--color-background)', borderColor:'var(--color-border)' }}>⌘K</span>
            <button type="submit" className="absolute right-2 top-2 bottom-2 flex items-center justify-center px-5 sm:px-7 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5" style={{ background:'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              <span className="hidden sm:inline">Search</span>
              <Search size={18} className="sm:hidden" />
            </button>
          </form>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button onClick={() => document.getElementById('content')?.scrollIntoView({ behavior:'smooth', block:'start' })} className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-base text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2" style={{ background:'linear-gradient(135deg, #10b981 0%, #0891b2 100%)' }}>
            <Rocket size={18} /> Explore AI Tools
          </button>
        </motion.div>

        {/* Trending Chips */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.6, delay:0.5 }} className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-2xl mx-auto">
          <span className="text-xs font-semibold flex items-center gap-1" style={{ color:'var(--color-text-muted)' }}>
            <TrendingUp size={13} style={{ color:'#10b981' }} /> Trending:
          </span>
          {trendingQueries.map((query) => (
            <button key={query} type="button" onClick={() => onChipClick?.(query)} className="text-xs font-medium px-3 py-1.5 rounded-full border cursor-pointer transition-all duration-200 hover:-translate-y-0.5" style={{ background:'var(--color-surface)', borderColor:'var(--color-border)', color:'var(--color-text-secondary)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(16,185,129,0.5)'; e.currentTarget.style.color='#10b981'; e.currentTarget.style.background='rgba(16,185,129,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--color-border)'; e.currentTarget.style.color='var(--color-text-secondary)'; e.currentTarget.style.background='var(--color-surface)'; }}>
              {query}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.6 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto mb-16">
          {[
            { icon:<Cpu size={22}/>, color:'#10b981', gradient:'from-emerald-500 to-teal-500', bg:'rgba(16,185,129,0.08)', value:<CountUp to={500} suffix="+"/>, label:'AI Tools' },
            { icon:<Award size={22}/>, color:'#6366f1', gradient:'from-violet-500 to-indigo-500', bg:'rgba(99,102,241,0.08)', value:<CountUp to={50} suffix="+"/>, label:'Categories' },
            { icon:<Users size={22}/>, color:'#06b6d4', gradient:'from-cyan-500 to-sky-500', bg:'rgba(6,182,212,0.08)', value:<CountUp to={100} suffix="K+"/>, label:'Monthly Users' },
            { icon:<Clock size={22}/>, color:'#f97316', gradient:'from-orange-500 to-amber-400', bg:'rgba(249,115,22,0.08)', value:<span className="text-2xl md:text-3xl font-extrabold">Daily</span>, label:'Updates' },
          ].map((s, i) => (
            <div key={i} className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl border transition-all hover:-translate-y-1 overflow-hidden`} style={{ background:'var(--color-surface)', borderColor:'var(--color-border)' }}>
              <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background:s.bg, color:s.color }}>{s.icon}</div>
              <div className="text-3xl md:text-4xl font-extrabold mb-1" style={{ color:'var(--color-text-primary)' }}>{s.value}</div>
              <div className="text-sm font-semibold" style={{ color:'var(--color-text-secondary)' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Trusted By */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1, delay:0.8 }} className="pt-8 border-t" style={{ borderColor:'var(--color-border)' }}>
          <p className="text-xs font-bold mb-6 tracking-widest uppercase" style={{ color:'var(--color-text-muted)' }}>Trusted by professionals at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 transition-all duration-500" style={{ opacity:0.5, filter:'grayscale(1)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.opacity='1'; (e.currentTarget as HTMLDivElement).style.filter='grayscale(0)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.opacity='0.5'; (e.currentTarget as HTMLDivElement).style.filter='grayscale(1)'; }}>
            {['GitHub','Google','Meta','Stripe','OpenAI'].map(name => (
              <span key={name} className="font-bold text-lg tracking-tight" style={{ color:'var(--color-text-primary)' }}>{name}</span>
            ))}
          </div>
        </motion.div>

      </div>
      {/* Social Proof (Acquisition & Trust) */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.7 }} className="mt-20 pt-10 border-t border-[var(--color-border)] max-w-4xl mx-auto flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
        <p className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-6">Trusted by professionals at</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
          {/* Mock company names for trust */}
          <div className="text-xl font-black font-serif italic text-[var(--color-text-secondary)]">TechCorp</div>
          <div className="text-xl font-black tracking-tighter text-[var(--color-text-secondary)]">INNOVATE</div>
          <div className="text-xl font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">Nexus</div>
          <div className="text-xl font-extrabold lowercase text-[var(--color-text-secondary)]">quantum.ai</div>
          <div className="text-xl font-black text-[var(--color-text-secondary)]">OXYGEN</div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
