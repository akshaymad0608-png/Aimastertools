import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { CollectionCard } from '../CollectionCard';
import { COLLECTIONS } from '../../data/collections';

export const CollectionsSection: React.FC = () => {
  // Show only top 3 collections on home page
  const featuredCollections = COLLECTIONS.slice(0, 3);

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-semibold mb-4 border border-[var(--color-primary)]/20">
              <Layers size={16} className="mr-2" />
              Curated Lists
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-4">
              Popular AI Tool Collections
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Hand-picked collections of the best AI tools for specific use cases, industries, and workflows.
            </p>
          </div>
          <Link 
            to="/collections" 
            className="inline-flex items-center text-[var(--color-primary)] font-semibold hover:text-[var(--color-primary-dark)] transition-colors group whitespace-nowrap"
          >
            View all collections
            <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
};
