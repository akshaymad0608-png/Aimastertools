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
  description?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  name, 
  icon, 
  bg, 
  color, 
  count, 
  onClick, 
  isSelected, 
  isTrending,
  description
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative flex flex-col p-5 rounded-[20px] border text-left cursor-pointer transition-all duration-300 min-w-[220px] md:min-w-0 md:w-full snap-start outline-none ${
        isSelected 
          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-md ring-1 ring-[var(--color-primary)]/20' 
          : 'border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur-sm hover:border-[var(--color-primary)]/40 hover:shadow-lg'
      }`}
    >
      {/* Red Pulse Indicator for Trending items */}
      {isTrending && (
        <div className="absolute top-3 right-3 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
        </div>
      )}

      {/* Modern Gradient Icon Bubble with Smooth Transition */}
      <div 
        className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl mb-4 transition-all shadow-sm bg-gradient-to-br`}
        style={{ 
          background: isSelected ? `linear-gradient(135deg, ${color}33, ${color}11)` : `linear-gradient(135deg, ${bg}, transparent)`, 
          color: color,
          border: `1px solid ${color}33`
        }}
      >
        <i className={`ti ${icon}`} style={{ fontSize: "22px" }} />
      </div>

      {/* Text Details */}
      <div className="flex-1 w-full">
        <h4 
          className={`text-[16px] font-extrabold mb-1 truncate transition-colors ${
            isSelected ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]'
          }`}
        >
          {name}
        </h4>
        
        {description && (
          <p className="text-xs text-[var(--color-text-secondary)] mb-3 line-clamp-2 leading-relaxed h-[36px]">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-[var(--color-border)]/50">
          <span className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
            {count ?? 0} Tools
          </span>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-cardBg)] text-[var(--color-text-muted)] group-hover:bg-[var(--color-primary)] group-hover:text-white'}`}>
             <i className="ti ti-arrow-right text-[12px]" />
          </div>
        </div>
      </div>
    </motion.button>
  );
};
