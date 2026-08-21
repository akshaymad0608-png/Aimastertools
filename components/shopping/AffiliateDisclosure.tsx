import React from 'react';
import { Link } from 'react-router-dom';

/**
 * The Associates disclosure.
 *
 * Amazon requires it on any page carrying Special Links, and requires it to be
 * findable — so this renders at readable size in normal body colour, not as
 * grey 10px text under a fold. The brief asked for the same thing and it is
 * also just the honest way round.
 */
export const AffiliateDisclosure: React.FC<{ className?: string }> = ({ className = '' }) => (
  <p
    className={`text-[13.5px] leading-relaxed text-[var(--color-text-secondary)] ${className}`}
  >
    As an Amazon Associate, AI Master Tools earns from qualifying purchases. Links to
    products on this page may be affiliate links — they cost you nothing extra and do not
    change which products are listed or how they are ordered.{' '}
    <Link to="/affiliate-disclosure" className="font-medium text-[var(--color-primary)] underline-offset-4 hover:underline">
      Read the full disclosure
    </Link>
    .
  </p>
);

export default AffiliateDisclosure;
