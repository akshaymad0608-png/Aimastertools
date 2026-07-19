import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEOCollection } from '../types';

interface CollectionCardProps {
  collection: SEOCollection;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => (
  <Link
    to={`/collections/${collection.slug}`}
    className="card group flex h-full flex-col p-6 transition-transform hover:-translate-y-0.5"
  >
    <div className="flex items-center justify-between gap-3">
      <span className="label-mono">Collection</span>
      <span className="label-mono tabular-nums">{collection.toolIds.length} tools</span>
    </div>

    <h3 className="title-sm mt-4 text-[19px] font-semibold leading-snug tracking-[-0.02em] text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-primary)]">
      {collection.title}
    </h3>

    <p className="mt-2.5 line-clamp-3 flex-1 text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
      {collection.metaDescription}
    </p>

    <span className="mt-6 flex items-center gap-1.5 border-t border-[var(--color-border)] pt-4 text-[13px] font-semibold text-[var(--color-primary)]">
      Open collection
      <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
    </span>
  </Link>
);

export default CollectionCard;
