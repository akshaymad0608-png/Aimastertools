import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  onChipClick?: (val: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ searchTerm, handleSearchChange, searchInputRef, onChipClick }) => {
  const trendingQueries = ['ChatGPT', 'Midjourney', 'Writing', 'Coding', 'Agents', 'Video Gen'];

  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-44 md:pb-28 overflow-hidden bg-[var(--color-background)]">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-[-10%] left-[20%] w-[60%] h-[60%] rounded-full bg-[var(--color-primary)] opacity-[0.08] blur-[120px] mix-blend-screen animate-pulse duration-1000"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[50%] rounded-full bg-[var(--color-accent)] opacity-[0.05] blur-[100px] mix-blend-screen animate-pulse delay-700 duration-1000"></div>
        
        {/* Modern Grid Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>
      
      <div className="container-custom text-center relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Intro Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm mb-8 mx-auto"
        >
          <Sparkles size={14} className="text-[var(--color-primary)]" />
          <span className="text-xs sm:text-sm font-semibold text-[var(--color-text-secondary)]">Discover the next generation of AI tools</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-[var(--color-text-primary)]"
        >
          Supercharge your workflow <br className="hidden sm:block" /> with the best <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">AI Tools</span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed text-[var(--color-text-secondary)]"
        >
          Explore our curated directory of 500+ handpicked AI tools for writing, coding, images, videos, business, and productivity.
        </motion.p>
        
        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="max-w-3xl mx-auto mb-8 relative z-20"
        >
          <form 
            onSubmit={(e) => { e.preventDefault(); document.getElementById('search-results')?.scrollIntoView({ behavior:'smooth', block:'start' }); }}
            className="relative flex items-center bg-[var(--color-cardBg)]/80 backdrop-blur-2xl border border-[var(--color-border)] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all focus-within:shadow-[0_8px_40px_rgba(var(--color-primary-rgb),0.2)] focus-within:ring-4 focus-within:ring-[var(--color-primary)]/20 focus-within:border-[var(--color-primary)] hover:border-[var(--color-primary)]/50"
          >
            <Search className="absolute left-5 sm:left-6 text-[var(--color-text-muted)]" size={22} strokeWidth={2.5} />
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Search AI tools (e.g. video generator)..." 
              className="w-full h-16 sm:h-20 pl-14 sm:pl-16 pr-20 sm:pr-36 bg-transparent border-none outline-none text-base sm:text-lg text-[var(--color-text-primary)] font-medium placeholder-[var(--color-text-muted)]"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button 
              type="submit"
              className="absolute right-2 sm:right-3 top-2 sm:top-3 bottom-2 sm:bottom-3 px-6 rounded-xl bg-[var(--color-primary)] text-white font-bold hover:bg-[var(--color-primary-dark)] transition-all shadow-md hover:shadow-lg hidden sm:flex items-center gap-2"
            >
              Search
            </button>
            <button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 w-12 flex items-center justify-center rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors sm:hidden"
            >
              <Search size={20} strokeWidth={2.5} />
            </button>
          </form>
        </motion.div>
        
        {/* Trending Chips */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-16 max-w-2xl mx-auto relative z-20"
        >
          <span className="text-xs font-bold text-[var(--color-text-muted)] mr-1 tracking-wider uppercase">
            Trending
          </span>
          {trendingQueries.map((query) => (
            <button 
              key={query}
              type="button"
              onClick={() => onChipClick?.(query)}
              className="text-sm font-semibold px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all shadow-sm"
            >
              {query}
            </button>
          ))}
        </motion.div>
      </div>
      
      {/* Social Proof */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 pt-10 border-t border-[var(--color-border)]/60 max-w-4xl mx-auto flex flex-col items-center justify-center relative z-10"
      >
        <p className="text-[11px] font-bold text-[var(--color-text-muted)] tracking-[0.2em] uppercase mb-8">Loved by Professionals At</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <div className="text-xl font-extrabold text-[var(--color-text-secondary)] tracking-tight select-none">Google</div>
          <div className="text-xl font-extrabold text-[var(--color-text-secondary)] tracking-tight select-none">Meta</div>
          <div className="text-xl font-extrabold text-[var(--color-text-secondary)] tracking-tight select-none">OpenAI</div>
          <div className="text-xl font-extrabold text-[var(--color-text-secondary)] tracking-tight select-none">Stripe</div>
          <div className="text-xl font-extrabold text-[var(--color-text-secondary)] tracking-tight select-none">Vercel</div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
