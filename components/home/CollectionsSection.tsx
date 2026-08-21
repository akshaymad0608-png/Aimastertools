import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CollectionCard } from '../CollectionCard';
import { COLLECTIONS } from '../../data/collections';

export const CollectionsSection: React.FC = () => {
  const featured = COLLECTIONS.slice(0, 3);
  if (!featured.length) return null;

  return (
    <section className="section section-alt" aria-labelledby="collections-heading">
      <div className="container-custom">
        <div className="section-head">
          <div className="section-head__title">
            <p className="eyebrow">Curated lists</p>
            <h2 id="collections-heading" className="display-md mt-4 text-[var(--color-text-primary)]">
              Shortlists, <em>already made</em>.
            </h2>
            <p className="section-head__lede">
              Small sets of tools assembled around one job, so you can read four entries
              instead of four hundred.
            </p>
          </div>
          <Link to="/collections" className="btn-secondary h-11 shrink-0 whitespace-nowrap px-5">
            All collections <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {featured.map((c) => (
            <CollectionCard key={c.id} collection={c} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
