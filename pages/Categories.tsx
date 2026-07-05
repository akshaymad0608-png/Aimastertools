import React, { useMemo } from 'react';
import { CATEGORIES } from '../data/categories';
import { MOCK_TOOLS } from '../data/tools';
import { CategoryCard } from '../components/CategoryCard';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid3X3 } from 'lucide-react';

const Categories: React.FC = () => {
  const navigate = useNavigate();

  // Create a sorted list of categories
  const sortedCategories = useMemo(() => {
    return [...CATEGORIES].sort((a, b) => b.count - a.count);
  }, []);

  return (
    <div className="pt-24 pb-20 bg-[var(--color-background)] min-h-screen">
      <Helmet>
        <title>All AI Tool Categories - AIMasterTools</title>
        <meta name="description" content="Browse all AI tool categories. Find the perfect AI software for writing, coding, marketing, and more." />
      </Helmet>
      
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold text-sm mb-4">
            <Grid3X3 size={16} />
            Directory
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-4">
            All Categories
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
            Browse {MOCK_TOOLS.length}+ AI tools organized by use case. Find the perfect AI software for your workflow.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <CategoryCard 
            name="All AI Tools" 
            icon="ti-layout-grid" 
            bg="#F0FDF4" 
            color="#15803d" 
            count={MOCK_TOOLS.length} 
            description="Browse the entire collection of all AI tools."
            emoji="🌍" 
            onClick={() => navigate('/')} 
          />
          {sortedCategories.map(cat => (
            <CategoryCard 
              key={cat.id} 
              name={cat.name} 
              icon={cat.icon} 
              bg={cat.bg || '#f8f9fa'} 
              color={cat.color || '#444441'} 
              count={cat.count} 
              description={`Discover the best AI tools for ${cat.name.toLowerCase()}.`}
              emoji={cat.emoji} 
              isTrending={cat.name.includes('Image') || cat.name.includes('Code') || cat.name.includes('Chat')} 
              onClick={() => navigate(`/?category=${encodeURIComponent(cat.id)}`)} 
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Categories;
