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
  emoji?: string;
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
  description,
  emoji
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative flex flex-col p-5 sm:p-6 rounded-[24px] border text-left cursor-pointer transition-all duration-300 min-w-[220px] md:min-w-0 md:w-full snap-start outline-none ${
        isSelected 
          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md ring-1 ring-[var(--color-primary)]/20' 
          : 'border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-xl hover:bg-[var(--color-surface)] hover:border-[var(--color-primary)]/30 hover:shadow-lg'
      }`}
    >
      {/* Red Pulse Indicator for Trending items */}
      {isTrending && (
        <div className="absolute top-4 right-4 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
        </div>
      )}

      {/* Modern Emoji / Icon Area */}
      <div 
        className={`flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl mb-5 transition-all shadow-sm bg-gradient-to-br`}
        style={{ 
          background: isSelected ? `linear-gradient(135deg, ${color}22, ${color}05)` : `linear-gradient(135deg, ${bg}, transparent)`, 
          color: color,
          border: `1px solid ${color}22`
        }}
      >
        {emoji ? (
          <span style={{ fontSize: "28px" }} role="img" aria-label={name} className="drop-shadow-sm transition-transform group-hover:scale-110 duration-300">{emoji}</span>
        ) : (
          <i className={`ti ${icon} transition-transform group-hover:scale-110 duration-300`} style={{ fontSize: "26px" }} />
        )}
      </div>

      {/* Text Details */}
      <div className="flex-1 w-full">
        <h4 
          className={`text-[17px] font-extrabold mb-1.5 truncate transition-colors ${
            isSelected ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]'
          }`}
        >
          {name}
        </h4>
        
        {description && (
          <p className="text-[13px] text-[var(--color-text-secondary)] mb-4 line-clamp-2 leading-relaxed h-[40px] font-medium opacity-80 group-hover:opacity-100 transition-opacity">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border)]/50">
          <span className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.1em]">
            {count ?? 0} Tools
          </span>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-[var(--color-primary)] text-white shadow-md' : 'bg-[var(--color-cardBg)] text-[var(--color-text-muted)] border border-[var(--color-border)] group-hover:bg-[var(--color-primary)] group-hover:border-transparent group-hover:text-white group-hover:shadow-md group-hover:scale-110'}`}> 
            <i className="ti ti-arrow-right text-[13px]" />
          </div>
        </div>
      </div>
    </motion.button>
  );
};
