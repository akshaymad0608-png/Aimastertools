import React from 'react';
import { Search, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <section id="home" className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-[var(--color-background)]">
      <div className="container-custom text-center relative z-10 max-w-4xl mx-auto px-4 sm:px-6">

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-[var(--color-text-primary)]"
        >
          Discover the World's Best AI Tools
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.1 }} 
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed text-[var(--color-text-secondary)]"
        >
          Explore 500+ handpicked AI tools for writing, coding, images, videos, automation, business and productivity.
        </motion.p>

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }} 
          className="max-w-2xl mx-auto mb-8"
        >
          <form 
            onSubmit={(e) => { e.preventDefault(); document.getElementById('search-results')?.scrollIntoView({ behavior:'smooth', block:'start' }); }} 
            className="relative flex items-center bg-[var(--color-cardBg)] border border-[var(--color-border)] rounded-xl shadow-sm transition-all focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:border-[var(--color-primary)]"
          >
            <Search className="absolute left-4 text-[var(--color-text-muted)]" size={20} />
            <input 
              ref={searchInputRef} 
              type="text" 
              placeholder="Search tools, categories, or use cases..." 
              className="w-full h-14 pl-12 pr-24 bg-transparent border-none outline-none text-base text-[var(--color-text-primary)]" 
              value={searchTerm} 
              onChange={handleSearchChange} 
            />
            <button 
              type="submit" 
              className="absolute right-2 top-2 bottom-2 px-4 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-dark)] transition-colors hidden sm:flex items-center"
            >
              Search
            </button>
            <button 
              type="submit" 
              className="absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors sm:hidden"
            >
              <Search size={18} />
            </button>
          </form>
        </motion.div>

        {/* Trending Chips */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.3 }} 
          className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-2xl mx-auto"
        >
          <span className="text-sm font-medium text-[var(--color-text-muted)] mr-2">
            Trending:
          </span>
          {trendingQueries.map((query) => (
            <button 
              key={query} 
              type="button" 
              onClick={() => onChipClick?.(query)} 
              className="text-sm font-medium px-3 py-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
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
        className="mt-12 pt-8 border-t border-[var(--color-border)] max-w-4xl mx-auto flex flex-col items-center justify-center"
      >
        <p className="text-sm font-medium text-[var(--color-text-muted)] tracking-wide mb-6">TRUSTED BY PROFESSIONALS AT</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
          <div className="text-lg font-bold text-[var(--color-text-secondary)]">Google</div>
          <div className="text-lg font-bold text-[var(--color-text-secondary)]">Meta</div>
          <div className="text-lg font-bold text-[var(--color-text-secondary)]">OpenAI</div>
          <div className="text-lg font-bold text-[var(--color-text-secondary)]">Stripe</div>
          <div className="text-lg font-bold text-[var(--color-text-secondary)]">Vercel</div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
