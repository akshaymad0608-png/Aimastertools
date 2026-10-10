import type { Tool } from '../types';

/**
 * Whether a tool page carries an editorial write-up of its own.
 *
 * Most tool records hold the vendor's tagline as `description` and a
 * generated sentence as `longDescription` ("X, launched in 2022, is
 * catalogued under Y on AI Master Tools — freemium."). A page built from
 * those is a directory listing, and AdSense rejected the site for
 * low-value content. Those pages stay up for visitors but are noindex and
 * out of the sitemap; only tools with a researched paragraph are indexed.
 *
 * The generated sentences all name the site and are short; researched
 * paragraphs do neither. The same test is repeated in prerender.mjs and
 * scripts/generate-sitemap.mjs, which read data/tools.ts without the TS
 * toolchain; keep all three in step.
 */
export const isEditorialTool = (tool: Pick<Tool, 'longDescription'>): boolean => {
  const text = tool.longDescription || '';
  return text.length >= 150 && !/AI Master Tools/.test(text);
};
