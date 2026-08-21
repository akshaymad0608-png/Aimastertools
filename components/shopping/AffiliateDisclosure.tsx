import React from 'react';
import { Link } from 'react-router-dom';

/**
 * The affiliate disclosure.
 *
 * Amazon requires it on any page carrying Special Links, and requires it to be
 * findable — so this renders at readable size in normal body colour, not as
 * grey 10px text under a fold. The brief asked for the same thing and it is
 * also just the honest way round.
 *
 * `kind` picks the wording, because the two relationships are not the same and
 * saying "As an Amazon Associate" on a page of software links would be a false
 * statement about who is paying. Amazon's exact required sentence is used for
 * Amazon; partner programmes get a plain description of the same arrangement.
 */
export type DisclosureKind = 'amazon' | 'partner';

const COPY: Record<DisclosureKind, React.ReactNode> = {
  amazon: (
    <>
      As an Amazon Associate, AI Master Tools earns from qualifying purchases. Links to
      products on this page may be affiliate links — they cost you nothing extra and do not
      change which products are listed or how they are ordered.
    </>
  ),
  partner: (
    <>
      Some links on this page are affiliate links, and AI Master Tools may earn a commission
      if you sign up through one. It costs you nothing extra. It does not change which tools
      are listed, how they are rated, or the order they appear in — those are decided before
      anyone is paid, and tools with no affiliate programme sit alongside the ones that have
      one.
    </>
  ),
};

export const AffiliateDisclosure: React.FC<{
  className?: string;
  kind?: DisclosureKind;
}> = ({ className = '', kind = 'amazon' }) => (
  <p className={`text-[13.5px] leading-relaxed text-[var(--color-text-secondary)] ${className}`}>
    {COPY[kind]}{' '}
    <Link
      to="/affiliate-disclosure"
      className="font-medium text-[var(--color-primary)] underline-offset-4 hover:underline"
    >
      Read the full disclosure
    </Link>
    .
  </p>
);

export default AffiliateDisclosure;
