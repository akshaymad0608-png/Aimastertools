import { MOCK_TOOLS } from '../data/tools';
import { Tool } from '../types';
import { slugify } from './slug';

/**
 * Head-to-head comparison pairs, generated from the catalogue.
 *
 * "X vs Y" is the highest-intent query a tools directory can rank for — the
 * person searching it has already narrowed to two options and wants someone to
 * break the tie. Until now the comparison page existed only at
 * `/compare?tools=a,b`. Query strings make a poor canonical, and this site's
 * own robots.txt blocks parameter URLs outright, so none of it was reachable
 * by a crawler.
 *
 * Pairs therefore get real paths — `/compare/chatgpt-vs-claude` — which can be
 * linked, crawled and listed in the sitemap.
 */

export interface ComparisonPair {
  slug: string;
  a: Tool;
  b: Tool;
  category: string;
}

/** Canonical ordering, so `a-vs-b` and `b-vs-a` never both exist. */
const orderPair = (x: Tool, y: Tool): [Tool, Tool] =>
  x.id.localeCompare(y.id) <= 0 ? [x, y] : [y, x];

export const pairSlug = (x: Tool, y: Tool): string => {
  const [first, second] = orderPair(x, y);
  return `${slugify(first.id)}-vs-${slugify(second.id)}`;
};

/**
 * Top-rated tools within each category, paired against each other. Capped at
 * four per category: past that the pages get thin and start competing with one
 * another for the same terms.
 */
export const COMPARISON_PAIRS: ComparisonPair[] = (() => {
  const byCategory = new Map<string, Tool[]>();
  for (const tool of MOCK_TOOLS) {
    if (!tool?.category) continue;
    if (!byCategory.has(tool.category)) byCategory.set(tool.category, []);
    byCategory.get(tool.category)!.push(tool);
  }

  const seen = new Set<string>();
  const out: ComparisonPair[] = [];

  for (const [category, tools] of byCategory) {
    const top = [...tools].sort((p, q) => q.rating - p.rating).slice(0, 4);
    for (let i = 0; i < top.length; i++) {
      for (let j = i + 1; j < top.length; j++) {
        const [a, b] = orderPair(top[i], top[j]);
        const slug = pairSlug(a, b);
        if (seen.has(slug)) continue;
        seen.add(slug);
        out.push({ slug, a, b, category });
      }
    }
  }

  return out;
})();

export const findPair = (slug: string | undefined): ComparisonPair | undefined => {
  if (!slug) return undefined;
  const target = slug.toLowerCase();
  const direct = COMPARISON_PAIRS.find((p) => p.slug === target);
  if (direct) return direct;

  // Accept any two real tool ids joined by "-vs-", even a combination we did
  // not pre-generate. Someone editing the URL should still land on a page.
  const [left, right] = target.split('-vs-');
  if (!left || !right) return undefined;
  const a = MOCK_TOOLS.find((t) => slugify(t.id) === left);
  const b = MOCK_TOOLS.find((t) => slugify(t.id) === right);
  if (!a || !b || a.id === b.id) return undefined;
  const [x, y] = orderPair(a, b);
  return { slug: pairSlug(x, y), a: x, b: y, category: x.category };
};

/** Comparisons involving a given tool — used for internal linking. */
export const pairsForTool = (toolId: string, limit = 4): ComparisonPair[] =>
  COMPARISON_PAIRS.filter((p) => p.a.id === toolId || p.b.id === toolId).slice(0, limit);
