import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { CategoryCard } from '../CategoryCard';
import { Category } from '../../types';
import { TOOL_COUNT, CATEGORY_COUNT } from '../../utils/stats';

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
  onCategoryClick,
}) => {
  const displayed = CATEGORIES.slice(0, 9);

  return (
    <div className="mb-14">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-[var(--color-border)] pb-5">
        <div>
          <p className="eyebrow">Filter the index</p>
          <h2 className="display-md mt-3 text-[var(--color-text-primary)]">Browse by category</h2>
        </div>
        <Link
          to="/categories"
          className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline"
        >
          All {CATEGORY_COUNT} categories <ArrowRight size={15} />
        </Link>
      </div>

      <div className="rail -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-5">
        <CategoryCard
          name="All AI tools"
          icon="ti-layout-grid"
          bg="var(--color-primary-soft)"
          color="var(--color-primary)"
          count={TOOL_COUNT}
          description="The complete index, unfiltered and sorted by rating."
          isSelected={selectedCategory === 'All'}
          onClick={() => {
            setSearchTerm('');
            setSelectedCategory('All');
          }}
        />
        {displayed.map((cat) => (
          <CategoryCard
            key={cat.id}
            name={cat.name}
            icon={cat.icon}
            bg={cat.bg || 'var(--color-surface)'}
            color={cat.color || 'var(--color-text-secondary)'}
            count={cat.count}
            description={`Compare ${cat.count} ${cat.name.toLowerCase()} tools on price and rating.`}
            emoji={cat.emoji}
            isSelected={selectedCategory === cat.id}
            onClick={() => onCategoryClick(cat.id as Category)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
