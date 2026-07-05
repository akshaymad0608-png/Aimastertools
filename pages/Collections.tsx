import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Layers } from 'lucide-react';
import SEO from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CollectionCard } from '../components/CollectionCard';
import { COLLECTIONS } from '../data/collections';
import { NewsletterSection } from '../components/home/NewsletterSection';

const Collections: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-24 pb-16">
      <SEO 
        title="Best AI Tool Collections & Curated Lists"
        description="Explore our hand-picked collections of the best AI tools for various use cases, industries, and professions. Find exactly what you need to boost your productivity."
        url={typeof window !== 'undefined' ? window.location.href : ''}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumbs items={[{ label: 'Collections' }]} />
        </div>
        
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[var(--color-primary)]/20 blur-[100px] rounded-full -z-10"></div>
          
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-sm font-semibold">
            <Sparkles size={16} className="mr-2" />
            Curated AI Lists
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-6">
            Discover the Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[#8b5cf6]">AI Tools</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)]">
            Explore our expertly curated collections to find the perfect AI tools for your specific needs, workflows, and industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {COLLECTIONS.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
      
      <NewsletterSection showToast={() => {}} />
    </div>
  );
};

export default Collections;
