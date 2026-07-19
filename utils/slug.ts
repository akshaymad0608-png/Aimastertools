/**
 * Category URLs were being built with `encodeURIComponent(category.id)`, which
 * produced `/category/Social%20Media%20Automation` — ugly in a search result,
 * and worse, ambiguous. The old CategoryPage reconstructed the name by
 * title-casing the slug, which quietly failed on any category containing an
 * ampersand or an acronym: "LLM Providers & APIs" came back as
 * "Llm Providers & Apis" and matched nothing.
 *
 * Slugs are now generated once and resolved by lookup, never by guessing the
 * original string back out of the URL.
 */
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/\+/g, ' plus ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * Accepts a slug, a legacy percent-encoded name, or the raw category name and
 * returns the matching item. Old URLs already in Google's index keep working.
 */
export const findBySlug = <T extends { id: string; name: string; slug?: string }>(
  items: T[],
  param: string | undefined,
): T | undefined => {
  if (!param) return undefined;
  const decoded = (() => {
    try {
      return decodeURIComponent(param);
    } catch {
      return param;
    }
  })();
  const target = slugify(decoded);
  return (
    items.find((i) => i.slug === target) ||
    items.find((i) => slugify(i.id) === target) ||
    items.find((i) => slugify(i.name) === target)
  );
};
