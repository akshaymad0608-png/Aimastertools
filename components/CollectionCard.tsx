import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { SEOCollection } from '../types';

interface CollectionCardProps {
  collection: SEOCollection;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  return (
    <Link 
      to={`/collections/${collection.slug}`}
      className="group block p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl hover:border-[var(--color-primary)] hover:shadow-xl transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
      
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300">
          <Layers size={24} />
        </div>
        <div className="bg-[var(--color-background)] border border-[var(--color-border)] px-3 py-1 rounded-full text-xs font-medium text-[var(--color-text-secondary)]">
          {collection.toolIds.length} Tools
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
        {collection.title}
      </h3>
      
      <p className="text-[var(--color-text-secondary)] text-sm mb-6 line-clamp-2">
        {collection.metaDescription}
      </p>
      
      <div className="flex items-center text-[var(--color-primary)] font-medium text-sm group-hover:gap-2 transition-all">
        Explore Collection <ArrowRight size={16} className="ml-1" />
      </div>
    </Link>
  );
};
