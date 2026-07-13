import React, { useState } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TopBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] relative z-[100]"
      >
        <div className="container-custom max-w-7xl mx-auto px-4 py-2 sm:py-2.5 flex items-center justify-center relative">
          <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-semibold pr-8 text-center sm:text-left">
            <span className="hidden sm:inline-flex items-center justify-center bg-white/20 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold shrink-0">
              New
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} className="shrink-0 text-yellow-300" />
              <span>
                <strong>Join our growing community!</strong> Discover the best AI tools to supercharge your workflow and 10x your productivity.
              </span>
            </span>
            <a href="#home" className="hidden md:inline-flex items-center gap-1 text-white/90 hover:text-white underline underline-offset-2 ml-2 transition-colors">
              Explore now <ArrowRight size={14} />
            </a>
          </div>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute right-2 sm:right-4 p-1 rounded-full bg-black/10 hover:bg-black/20 text-white/90 hover:text-white transition-colors flex items-center justify-center"
            aria-label="Close banner"
          >
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
