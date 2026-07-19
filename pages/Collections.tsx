import React from 'react';
import { Sparkles, Layers } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CollectionCard } from '../components/CollectionCard';
import { COLLECTIONS } from '../data/collections';
import { NewsletterSection } from '../components/home/NewsletterSection';

const Collections: React.FC = () => {
  return (
    <div className="page-top min-h-screen bg-[var(--color-background)] pb-16">
      <SEO 
        title="Best AI Tool Collections & Curated Lists"
        description="Explore our hand-picked collections of the best AI tools for various use cases, industries, and professions. Find exactly what you need to boost your productivity."
        url={typeof window !== 'undefined' ? window.location.href : ''}
      />
      
      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'Collections' }]} />

        <PageHeader
          eyebrow="Curated lists"
          title={<>Shortlists, <em>already made</em></>}
          lede="Small sets of tools assembled around a single job. Each collection is a decision someone has already worked through, with the reasoning left in."
          meta={<span className="label-mono tabular-nums">{COLLECTIONS.length} collections</span>}
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
