import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { EmptyReason } from '../../types/shopping';

interface CatalogueEmptyProps {
  reason?: EmptyReason;
  /** The message the provider returned, when it has one worth showing. */
  message?: string;
  /** Named so the copy can be specific about what is empty. */
  context?: string;
}

/**
 * What a shopping page shows when it has nothing to show.
 *
 * This is the default state of the whole vertical right now, not an edge case,
 * so it is written as a real piece of the page rather than a grey box. The one
 * thing it must never do is fill the gap with invented products.
 *
 * The reason matters: "we have not added anything here yet" and "your filters
 * matched nothing" ask the reader to do completely different things, and a
 * single generic message sends half of them the wrong way.
 */
export const CatalogueEmpty: React.FC<CatalogueEmptyProps> = ({ reason, message, context }) => {
  const copy = (() => {
    switch (reason) {
      case 'no-results':
        return {
          title: 'Nothing matches that yet',
          body: context
            ? `No ${context} in the catalogue fit those filters. Widening the budget or clearing a filter usually helps.`
            : 'No products fit those filters. Widening the budget or clearing a filter usually helps.',
        };
      case 'not-configured':
      case 'no-provider':
        return {
          title: 'We are still building this catalogue',
          body: context
            ? `${context[0].toUpperCase()}${context.slice(1)} are being added by hand, one listing at a time, so that every price and specification on this site is one a person actually read. Nothing is generated to fill the space.`
            : 'Products are being added by hand, one listing at a time, so that every price and specification on this site is one a person actually read. Nothing is generated to fill the space.',
        };
      case 'error':
      default:
        return {
          title: 'That did not load',
          body: 'Something went wrong fetching products. Reloading usually clears it.',
        };
    }
  })();

  return (
    <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] px-6 py-16 text-center">
      <h3 className="display-md text-[var(--color-text-primary)]">{copy.title}</h3>
      <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
        {copy.body}
      </p>
      {message && reason !== 'no-results' && (
        <p className="mt-3 text-[13px] text-[var(--color-text-muted)]">{message}</p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-secondary h-11 px-5 text-[13px]">
          Browse the AI tools index <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};

export default CatalogueEmpty;
