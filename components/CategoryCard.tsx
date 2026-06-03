import React from 'react';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  name: string;
  icon: string;
  bg: string;
  color: string;
  count?: number;
  onClick?: () => void;
  isSelected?: boolean;
  isTrending?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  name, 
  icon, 
  bg, 
  color, 
  count, 
  onClick, 
  isSelected, 
  isTrending 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative flex items-center justify-start gap-3.5 p-3.5 rounded-2xl border text-left cursor-pointer transition-all duration-200 min-w-[160px] md:min-w-0 md:w-full snap-start outline-none ${
        isSelected 
          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-[0_4px_20px_rgba(99,102,241,0.15)] ring-1 ring-[var(--color-primary)]/20' 
          : 'border-[var(--color-border)] bg-[var(--color-cardBg)] hover:border-[var(--color-primary)]/30 hover:shadow-sm'
      }`}
    >
      {/* Red Pulse Indicator for Trending items */}
      {isTrending && (
        <div className="absolute top-2 right-2 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
        </div>
      )}

      {/* Modern Icon Bubble with Smooth Transition */}
      <div 
        className={`flex-shrink-0 flex items-center justify-center w-10.5 h-10.5 rounded-xl transition-all shadow-sm ${
          isSelected 
            ? 'bg-[var(--color-cardBg)] text-[var(--color-primary)] border border-[var(--color-primary)]/10 scale-105' 
            : 'border border-[var(--color-border)]/50'
        }`}
        style={!isSelected ? { backgroundColor: `${bg}15`, color: color } : { color: 'var(--color-primary)' }}
      >
        <i className={`ti ${icon}`} style={{ fontSize: "20px" }} />
      </div>

      {/* Text Details */}
      <div className="flex-1 min-w-0">
        <h4 
          className={`text-[14px] sm:text-[15px] font-bold truncate transition-colors ${
            isSelected ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)]'
          }`}
        >
          {name}
        </h4>
        {count !== undefined && (
          <p 
            className={`text-xs mt-0.5 truncate font-medium transition-colors ${
              isSelected ? 'text-[var(--color-primary)]/80 font-semibold' : 'text-[var(--color-text-shared)] text-[var(--color-text-secondary)]'
            }`}
          >
            {count} {count === 1 ? 'tool' : 'tools'}
          </p>
        )}
      </div>
    </motion.button>
  );
};
