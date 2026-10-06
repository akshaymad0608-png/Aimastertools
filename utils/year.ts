/**
 * The year used in titles and descriptions.
 *
 * prerender.mjs bakes titles at build time, while the React pages used to call
 * new Date().getFullYear() in the browser. From 1 January until the next
 * rebuild the static HTML said "2026" and the hydrated page said "2027" — two
 * titles for one URL. vite.config.ts now injects the build year as
 * __BUILD_YEAR__, so the client and prerender.mjs (which runs in the same
 * build) agree.
 */
declare const __BUILD_YEAR__: number | undefined;

export const YEAR: number =
  typeof __BUILD_YEAR__ === 'number' ? __BUILD_YEAR__ : new Date().getFullYear();
