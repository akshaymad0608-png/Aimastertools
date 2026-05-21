import React from 'react';

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

export const CategoryCard: React.FC<CategoryCardProps> = ({ name, icon, bg, color, count, onClick, isSelected, isTrending }) => (
  <button
    onClick={onClick}
    className={`group relative flex items-center justify-start gap-3 p-3 lg:p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 min-w-[150px] md:min-w-0 md:w-full snap-start outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
      isSelected 
        ? 'border-[#534AB7] bg-[#f0eeff] shadow-sm' 
        : 'border-slate-200 bg-white hover:border-[#534AB7]/50 hover:bg-slate-50'
    }`}
  >
    {isTrending && (
      <div className="absolute -top-1 -right-1 flex items-center justify-center">
        <span className="flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
        </span>
      </div>
    )}
    <div 
      className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${isSelected ? 'bg-white shadow-sm' : ''}`}
      style={!isSelected ? { backgroundColor: bg } : undefined}
    >
      <i className={`ti ${icon}`} style={{ fontSize: "20px", color: color }} />
    </div>
    <div className="flex-1 min-w-0">
      <h3 className={`text-sm font-semibold truncate ${isSelected ? 'text-[#3E368F]' : 'text-slate-800'}`}>
        {name}
      </h3>
      {count !== undefined && (
        <p className={`text-xs mt-0.5 truncate ${isSelected ? 'text-[#534AB7]/80' : 'text-slate-500'}`}>
          {count} {count === 1 ? 'tool' : 'tools'}
        </p>
      )}
    </div>
  </button>
);
