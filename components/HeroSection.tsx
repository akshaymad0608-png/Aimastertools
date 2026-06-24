import React from 'react';
import { Search, Sparkles, TrendingUp, Cpu, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from './CountUp';

interface HeroSectionProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  onChipClick?: (val: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  searchTerm, 
  handleSearchChange, 
  searchInputRef,
  onChipClick 
}) => {
  const trendingQueries = [
    'ChatGPT',
    'AI Image',
    'Writing',
    'Voice Sync',
    'Developer',
    'Video Gen'
  ];

  const handleChipClick = (query: string) => {
    if (onChipClick) {
      onChipClick(query);
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-16 md:pt-44 md:pb-24 bg-[var(--color-background)] overflow-hidden transition-colors duration-350">
      
      {/* Premium Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Futuristic Glowing Gradient Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.1)_0%,transparent_70%)] blur-[80px] md:blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[30%] right-1/4 -translate-y-1/2 w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.1)_0%,transparent_70%)] blur-[80px] md:blur-[120px] pointer-events-none z-0"></div>

      <div className="container-custom text-center relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--color-surface)] to-[var(--color-background)] border border-[var(--color-border)] shadow-sm text-xs sm:text-sm font-semibold text-[var(--color-text-secondary)] mb-6 hover:border-[var(--color-primary)]/40 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          <Sparkles size={14} className="text-purple-500 animate-pulse" />
          <span className="text-[var(--color-text-primary)] font-bold">AI Master Tools v2.0</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></span>
          <span>The Ultimate AI Directory</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black text-[var(--color-text-primary)] tracking-tight font-sans leading-[1.1] mb-6 sm:mb-8"
        >
          Discover the Best <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-purple-500 to-cyan-500 font-extrabold select-none drop-shadow-sm">
            AI Tools
          </span> for Work, Creativity & Growth
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl text-[var(--color-text-secondary)] mb-10 max-w-3xl mx-auto font-medium leading-relaxed"
        >
          Curated collection of 500+ breakthrough artificial intelligence services & platforms, updated daily for performance.
        </motion.p>

        {/* Search Bar Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-6"
        >
          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              document.getElementById('content')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
            }}
            className="relative flex items-center shadow-[0_12px_40px_-15px_rgba(37,99,235,0.12)] hover:shadow-[0_12px_40px_-5px_rgba(37,99,235,0.18)] transition-all duration-300 rounded-2xl border border-[var(--color-border)] bg-[var(--color-cardBg)] p-2 focus-within:ring-4 focus-within:ring-[var(--color-primary)]/10 focus-within:border-[var(--color-primary)]"
          >
            <Search className="absolute left-5 text-[var(--color-text-muted)]" size={20} strokeWidth={2.5} />
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Search by keyword, product name, or field..."
              className="w-full h-14 pl-14 pr-24 sm:pr-[155px] bg-transparent border-none focus:ring-0 outline-none text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] text-[17px] font-medium"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="absolute right-22 sm:right-[124px] text-[10px] font-mono text-[var(--color-text-muted)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md px-2 py-1.5 hidden sm:inline-block tracking-widest font-bold">⌘K</span>
            <button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 flex items-center justify-center px-4 sm:px-6 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-all shadow-[0_4px_12px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.4)]"
              aria-label="Submit search"
            >
              <span className="hidden sm:inline">Search Directory</span>
              <Search size={18} className="sm:hidden" />
            </button>
          </form>
        </motion.div>

        {/* Trending Search Chips Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12 sm:mb-16 max-w-2xl mx-auto"
        >
          <span className="text-xs font-semibold text-[var(--color-text-muted)] flex items-center gap-1">
            <TrendingUp size={13} className="text-blue-500" /> Trending:
          </span>
          {trendingQueries.map((query) => (
            <button
              key={query}
              type="button"
              onClick={() => handleChipClick(query)}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[var(--color-surface)] hover:bg-[var(--color-primary)]/10 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 cursor-pointer transition-all duration-200"
            >
              {query}
            </button>
          ))}
        </motion.div>

        {/* Premium Animated Bounding Cards for Statistics */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-16"
        >
          {/* Card 1: 500+ AI Tools */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--color-cardBg)] border border-[var(--color-border)] shadow-sm hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 group-hover:scale-y-110 transition-transform"></div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3 text-blue-500">
              <Cpu size={20} />
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-1">
              <CountUp to={500} suffix="+" />
            </div>
            <div className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
              AI Tools Indexed
            </div>
          </div>

          {/* Card 2: 50+ Categories */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--color-cardBg)] border border-[var(--color-border)] shadow-sm hover:border-purple-500/30 hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500 group-hover:scale-y-110 transition-transform"></div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3 text-purple-500">
              <Award size={20} />
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-1">
              <CountUp to={50} suffix="+" />
            </div>
            <div className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
              Niche Categories
            </div>
          </div>

          {/* Card 3: Free Forever */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--color-cardBg)] border border-[var(--color-border)] shadow-sm hover:border-cyan-500/30 hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-400 group-hover:scale-y-110 transition-transform"></div>
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center mb-3 text-cyan-400">
              <Sparkles size={20} />
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-1 flex items-center justify-center gap-1">
              100%
            </div>
            <div className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
              Free to Explore
            </div>
          </div>
        </motion.div>

        {/* Trusted By Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-6 border-t border-[var(--color-border)]/50"
        >
          <p className="text-sm font-semibold text-[var(--color-text-muted)] mb-6 tracking-wide uppercase">Trusted by professionals at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-bold text-xl text-[var(--color-text-primary)]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </div>
            <div className="flex items-center gap-2 font-bold text-xl text-[var(--color-text-primary)] tracking-tight">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </div>
            <div className="flex items-center gap-2 font-bold text-xl text-[var(--color-text-primary)]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M11.5 2C16.7467 2 21 6.25329 21 11.5C21 16.7467 16.7467 21 11.5 21C6.25329 21 2 16.7467 2 11.5C2 6.25329 6.25329 2 11.5 2ZM11.5 17.5C14.8137 17.5 17.5 14.8137 17.5 11.5C17.5 8.18629 14.8137 5.5 11.5 5.5C8.18629 5.5 5.5 8.18629 5.5 11.5C5.5 14.8137 8.18629 17.5 11.5 17.5ZM11.5 8C13.433 8 15 9.567 15 11.5C15 13.433 13.433 15 11.5 15C9.567 15 8 13.433 8 11.5C8 9.567 9.567 8 11.5 8ZM11.5 10.5C10.9477 10.5 10.5 10.9477 10.5 11.5C10.5 12.0523 10.9477 12.5 11.5 12.5C12.0523 12.5 12.5 12.0523 12.5 11.5C12.5 10.9477 12.0523 10.5 11.5 10.5Z"/></svg>
              Meta
            </div>
            <div className="flex items-center gap-2 font-black text-xl text-[var(--color-text-primary)] italic">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M14.502 6.643l-4.48 4.475-2.02-2.015-3.03 3.025 5.05 5.04 7.51-7.5-3.03-3.025zm1.515 1.51l3.03-3.025L14.007.083l-3.03 3.025 5.04 5.045zM8.96 14.195L5.93 17.22 10.98 22.27l3.03-3.025-5.05-5.05z"/></svg>
              STRIPE
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default HeroSection;
