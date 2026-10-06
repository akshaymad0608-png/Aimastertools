/**
 * What to append after a category name, and how to say the name in a sentence.
 *
 * One definition for every consumer. Before this file there were two copies of
 * suffixFor() that disagreed (prerender.mjs knew about "Assistants", "Engines",
 * "Builders"…, FreeCategory.tsx only about "Tools"), and the category title,
 * description and H1 in utils/seo.ts and prerender.mjs did no checking at all.
 * That produced "Best AI Chatbots & Assistants AI Tools" and "ai agents &
 * automation AI tools" on 29 of the 49 category pages.
 *
 * Plain .mjs so prerender.mjs (Node), the tests and the React app can all import
 * the same code.
 */

/**
 * Names that already end in a product noun. Appending anything to them gives
 * "AI Search Engines tools" or "AI Chrome Extensions tools". Only a name that
 * describes an activity or subject ("Social Media Automation", "Image & Art
 * Generation", "Marketing & SEO") needs a product noun after it.
 */
export const PRODUCT_NOUN =
  /\b(tools?|assistants?|engines?|builders?|extensions?|generators?|editors?|platforms?|apps?|bots?|apis?)$/i;

/** "Tools", "AI Tools" or nothing, depending on what the name already says. */
export const suffixFor = (name, lower = false) => {
  const t = lower ? 'tools' : 'Tools';
  if (PRODUCT_NOUN.test(name)) return '';
  return /\bAI\b/.test(name) ? t : `AI ${t}`;
};

/** Heading/title form: "Image & Art Generation AI Tools", "AI Chatbots & Assistants". */
export const categoryLabel = (name, lower = false) =>
  `${name} ${suffixFor(name, lower)}`.replace(/ {2,}/g, ' ').trim();

/**
 * Sentence form: lower-case, but acronyms survive.
 * "AI Chatbots & Assistants" -> "AI chatbots & assistants",
 * "Marketing & SEO" -> "marketing & SEO AI tools".
 * Plain toLowerCase() turned "AI" into "ai" in 29 meta descriptions.
 */
export const proseLabel = (name) => {
  const words = name.replace(/\b[A-Za-z][A-Za-z']*\b/g, (w) =>
    /^[A-Z]{2,}s?$/.test(w) ? w : w.toLowerCase(),
  );
  return `${words} ${suffixFor(name, true)}`.replace(/ {2,}/g, ' ').trim();
};
