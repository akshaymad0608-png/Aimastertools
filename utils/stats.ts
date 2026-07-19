import { MOCK_TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';

/**
 * Every number the site quotes about itself is derived here, from the data
 * itself. Hard-coded marketing figures ("500+ tools") drift away from the
 * truth the moment a tool is added, and a directory that cannot count its
 * own entries has no business ranking anyone else's.
 */

export const TOOL_COUNT = MOCK_TOOLS.length;
export const CATEGORY_COUNT = CATEGORIES.length;

export const FREE_TOOL_COUNT = MOCK_TOOLS.filter(
  (t) => t.pricing === 'Free' || t.pricing === 'Open Source',
).length;

export const FREEMIUM_TOOL_COUNT = MOCK_TOOLS.filter((t) => t.pricing === 'Freemium').length;

/** Rounds down to the nearest 10 so headline copy stays true between builds. */
export const roundDown = (n: number, step = 10) => Math.floor(n / step) * step;

/** "830+" style figure — always an understatement, never a claim we can't back. */
export const TOOL_COUNT_APPROX = `${roundDown(TOOL_COUNT, 10)}+`;
export const CATEGORY_COUNT_APPROX = `${roundDown(CATEGORY_COUNT, 5)}+`;

export const PRICING_TIERS = [
  'Free',
  'Freemium',
  'Paid',
  'Usage Based',
  'Open Source',
] as const;

export const pricingCount = (tier: string) =>
  MOCK_TOOLS.filter((t) => t.pricing === tier).length;

/** Most recent dateAdded in the catalogue, used for "last updated" honesty. */
export const LAST_UPDATED = MOCK_TOOLS.reduce((latest, t) => {
  const d = t.dateAdded ? new Date(t.dateAdded).getTime() : 0;
  return d > latest ? d : latest;
}, 0);

export const LAST_UPDATED_LABEL = LAST_UPDATED
  ? new Date(LAST_UPDATED).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  : '';
