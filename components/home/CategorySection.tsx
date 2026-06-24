import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { MOCK_TOOLS } from '../../data/tools';
import { CategoryCard } from '../CategoryCard';
import { Category } from '../../types';

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
  return (
    <div className="mb-12 w-full relative">
       <div className="flex items-center justify-between mb-4">
         <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Popular Categories</h2>
       </div>
       <div className="absolute right-0 top-12 bottom-0 w-12 bg-gradient-to-l from-[var(--color-surface)] to-transparent pointer-events-none z-10 md:hidden" />
       <div className="flex flex-nowrap md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto md:overflow-visible hide-scrollbar pb-3 md:pb-0 snap-x snap-mandatory">
            <CategoryCard
              name="All Tools"
              icon="ti-layout-grid"
              bg="#F1EFE8"
              color="#444441"
              count={MOCK_TOOLS.length}
              isSelected={selectedCategory === 'All'}
              onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
            />
            {CATEGORIES.map(cat => (
              <CategoryCard
                key={cat.id}
                name={cat.name}
                icon={cat.icon}
                bg={cat.bg || "#f8f9fa"}
                color={cat.color || "#444441"}
                count={cat.count}
                isSelected={selectedCategory === cat.id}
                isTrending={cat.name === 'Image & Art Generation' || cat.name === 'Code & Development'}
                onClick={() => onCategoryClick(cat.id as Category)}
              />
            ))}
       </div>
    </div>
  );
};
