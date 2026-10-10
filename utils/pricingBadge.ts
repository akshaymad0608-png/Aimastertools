/**
 * Colours for the pricing pill on tool and compare pages.
 *
 * "Paid" used to be red, the same family as the site's call-to-action
 * buttons, so it read like a warning rather than a plain fact. Paid is now
 * neutral, Free is green, and everything else (Freemium, usage based, open
 * source) keeps the amber accent.
 */
export const pricingBadgeClass = (pricing: string): string => {
  if (pricing === 'Free') return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30';
  if (pricing === 'Paid') return 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)]';
  return 'bg-amber-500/10 text-[var(--color-accent)] border-amber-500/20';
};

/** "2026-06-27T16:44:56.051Z" -> "27 Jun 2026"; anything unparseable is returned as is. */
export const formatListedDate = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
};
