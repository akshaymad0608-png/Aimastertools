import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MOCK_TOOLS } from '../data/tools';
import ToolCard from '../components/ToolCard';
import { ChevronRight, LayoutGrid } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Format slug to category name, e.g., "video-generators" -> "Video Generators"
  const categoryName = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Category';
  
  const categoryTools = useMemo(() => {
    return MOCK_TOOLS.filter(tool => tool.category.toLowerCase() === categoryName.toLowerCase() || (slug && tool.category.toLowerCase().includes(slug.replace('-', ' '))));
  }, [categoryName, slug]);

  return (
    <div className="pt-24 pb-20 bg-[var(--color-background)] min-h-screen">
      <Helmet>
        <title>Best {categoryName} AI Tools in 2024 - AIMasterTools</title>
        <meta name="description" content={`Discover the best ${categoryName} AI tools. Compare pricing, features, and reviews for top ${categoryName} software.`} />
        <meta name="keywords" content={`${categoryName} AI tools, best ${categoryName} software, top ${categoryName} applications, free ${categoryName} AI`} />
      </Helmet>

      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8 animate-fade-in-up">
          <Link to="/" className="hover:text-[var(--color-text-primary)] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/categories" className="hover:text-[var(--color-text-primary)] transition-colors">Categories</Link>
          <ChevronRight size={14} />
          <span className="text-[var(--color-text-primary)] font-medium">{categoryName}</span>
        </div>

        {/* Header */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold text-sm mb-4">
            <LayoutGrid size={16} />
            Category
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-4">
            Best {categoryName} AI Tools
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl">
            Explore {categoryTools.length > 0 ? categoryTools.length : 'the best'} handpicked AI tools in the {categoryName} category. Boost your productivity with the top rated solutions.
          </p>
        </div>

        {/* Tool Grid */}
        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            {categoryTools.map((tool, idx) => (
              <ToolCard key={tool.id} tool={tool} rank={idx + 1} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">No tools found in {categoryName}</h3>
            <p className="text-[var(--color-text-secondary)] mb-6">We are constantly adding new tools. Check back soon!</p>
            <Link to="/" className="btn-primary">Browse All Tools</Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoryPage;
