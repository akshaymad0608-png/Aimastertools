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
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm text-xs font-semibold text-[var(--color-text-secondary)] mb-6 hover:border-[var(--color-primary)]/40 hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          <Sparkles size={13} className="text-purple-500 animate-pulse" />
          <span className="text-[var(--color-text-primary)] font-bold">Version 2.0</span>
          <span className="w-1 h-1 rounded-full bg-[var(--color-border)]"></span>
          <span>Next-Gen Directory</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black text-[var(--color-text-primary)] tracking-tight font-sans leading-[1.1] mb-6 mb-8"
        >
          Discover the Best <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 font-extrabold select-none">
            AI Tools
          </span> for Work, Creativity & Growth
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-[21px] text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto font-medium leading-relaxed"
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
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
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
        
      </div>
    </section>
  );
};

export default HeroSection;
