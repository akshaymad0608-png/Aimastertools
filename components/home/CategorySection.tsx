import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { MOCK_TOOLS } from '../../data/tools';
import { CategoryCard } from '../CategoryCard';
import { Category } from '../../types';
import { Link } from 'react-router-dom';
import { ArrowRight, Grid3X3 } from 'lucide-react';

interface CategorySectionProps {
  selectedCategory: Category | 'All';
  setSelectedCategory: (category: Category | 'All') => void;
  setSearchTerm: (term: string) => void;
  onCategoryClick: (category: Category) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ 
  selectedCategory, 
  setSelectedCategory, 
  setSearchTerm, 
  onCategoryClick 
}) => {
  const displayedCategories = CATEGORIES.slice(0, 9);
  
  return (
    <div className="mb-16 w-full relative">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:'rgba(16,185,129,0.1)', color:'#10b981', border:'1px solid rgba(16,185,129,0.2)' }}>
            <Grid3X3 size={16} />
          </div>
          <h2 className="text-2xl font-black tracking-tight" style={{ color:'var(--color-text-primary)' }}>Explore Categories</h2>
        </div>
        <Link to="/categories" className="hidden sm:flex items-center gap-1.5 text-sm font-bold transition-colors cursor-pointer hover:underline" style={{ color:'#10b981' }}>
          View All <ArrowRight size={15} />
        </Link>
      </div>

      <div className="absolute right-0 top-16 bottom-0 w-12 bg-gradient-to-l from-[var(--color-background)] to-transparent pointer-events-none z-10 md:hidden" />
      
      <div className="flex flex-nowrap md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 overflow-x-auto md:overflow-visible hide-scrollbar pb-6 md:pb-0 snap-x snap-mandatory px-4 sm:px-6 md:px-0 -mx-4 sm:-mx-6 md:mx-0">
        <CategoryCard 
          name="All AI Tools" 
          icon="ti-layout-grid" 
          bg="#F0FDF4" 
          color="#15803d" 
          count={MOCK_TOOLS.length} 
          description="Browse the entire collection of 500+ AI tools." 
          emoji="🌍"
          isSelected={selectedCategory === 'All'} 
          onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} 
        />
        {displayedCategories.map(cat => (
          <CategoryCard 
            key={cat.id} 
            name={cat.name} 
            icon={cat.icon} 
            bg={cat.bg || '#f8f9fa'} 
            color={cat.color || '#444441'} 
            count={cat.count} 
            description={`Discover the best AI tools for ${cat.name.toLowerCase()}.`}
            emoji={cat.emoji} 
            isSelected={selectedCategory === cat.id} 
            isTrending={cat.name.includes('Image') || cat.name.includes('Code') || cat.name.includes('Chat')} 
            onClick={() => onCategoryClick(cat.id as Category)} 
          />
        ))}
      </div>
      
      <div className="mt-6 flex justify-center sm:hidden">
        <Link to="/categories" className="flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer" style={{ color:'#10b981', background:'rgba(16,185,129,0.08)' }}>
          View All Categories <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
