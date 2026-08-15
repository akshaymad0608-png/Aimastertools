import { MOCK_TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import type { Tool } from '../types';

/**
 * The free-tier view of the catalogue.
 *
 * "Free" is the most common modifier people put in front of a tool search, and
 * the catalogue already knows each tool's pricing — but nothing on the site was
 * built around it. The category pages list everything regardless of price, so
 * someone searching for a free option has to open tools one by one to find out
 * which ones actually are.
 *
 * The distinction that matters is the one most directories blur: a tool that is
 * genuinely free is not the same as one with a free tier you will outgrow. Both
 * belong on the page; conflating them is what makes these lists untrustworthy.
 */

export type FreeKind = 'free' | 'freemium';

export const freeKind = (tool: Tool): FreeKind | null => {
  const p = (tool.pricing || '').toLowerCase();
  if (p === 'free' || p === 'open source') return 'free';
  if (p === 'freemium') return 'freemium';
  return null;
};

/** Every tool that costs nothing to start, newest-rated first. */
export const freeTools = (): Tool[] =>
  MOCK_TOOLS.filter((t) => freeKind(t) !== null).sort((a, b) => (b.rating || 0) - (a.rating || 0));

export interface FreeCategory {
  /** The category id as stored on tools, e.g. "Image & Art Generation". */
  id: string;
  name: string;
  slug: string;
  tools: Tool[];
  fullyFree: Tool[];
  freemium: Tool[];
}

const slugifyName = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/\+/g, ' plus ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * Categories worth a page of their own. Below four free tools a page has
 * nothing to say that the category page does not already say better, and
 * publishing it would only add another near-empty URL to the index.
 */
export const MIN_TOOLS_PER_PAGE = 4;

export const freeCategories = (): FreeCategory[] => {
  const known = new Map(CATEGORIES.map((c) => [c.id, c]));
  const grouped = new Map<string, Tool[]>();

  for (const tool of freeTools()) {
    if (!known.has(tool.category)) continue; // skip stray category strings
    if (!grouped.has(tool.category)) grouped.set(tool.category, []);
    grouped.get(tool.category)!.push(tool);
  }

  return [...grouped.entries()]
    .filter(([, tools]) => tools.length >= MIN_TOOLS_PER_PAGE)
    .map(([id, tools]) => ({
      id,
      name: known.get(id)!.name ?? id,
      slug: slugifyName(id),
      tools,
      fullyFree: tools.filter((t) => freeKind(t) === 'free'),
      freemium: tools.filter((t) => freeKind(t) === 'freemium'),
    }))
    .sort((a, b) => b.tools.length - a.tools.length);
};

export const findFreeCategory = (slug?: string): FreeCategory | undefined =>
  slug ? freeCategories().find((c) => c.slug === slug) : undefined;
