import type { ProductCategorySlug, ProductQuery } from '../../types/shopping';
import { SHOPPING_CATEGORIES } from '../../data/shoppingCategories';

/**
 * Turn "gaming laptop under ₹60,000" into a query the catalogue understands.
 *
 * Deliberately not a model call. Budget and category are the two things that
 * decide the answer, and both are stated plainly in almost every real query —
 * a regex reads them correctly, instantly, offline, and for free. Sending that
 * to an LLM would be slower, cost money, need a key the site does not have, and
 * occasionally get "under 60k" wrong in a way a regex never does.
 *
 * The model earns its place on the part this cannot do: reading intent that is
 * not stated as a number, and writing the explanation of why a product fits.
 * That runs server-side in api/product-finder.ts and only when a key exists.
 *
 * Shared by both, so the client can parse before it asks and the server parses
 * the same way.
 */

/** "60,000" / "60k" / "60 thousand" / "1.5 lakh" -> a number. */
const parseAmount = (raw: string, unit?: string): number | null => {
  const n = Number(raw.replace(/[,\s]/g, ''));
  if (!Number.isFinite(n)) return null;
  const u = (unit || '').toLowerCase();
  if (u.startsWith('k') || u.startsWith('thousand')) return Math.round(n * 1_000);
  if (u.startsWith('l') || u.startsWith('lakh') || u.startsWith('lac')) return Math.round(n * 100_000);
  if (u.startsWith('cr')) return Math.round(n * 10_000_000);
  return Math.round(n);
};

const AMOUNT = String.raw`(?:₹|rs\.?|inr)?\s*([0-9][0-9,.\s]*)\s*(k\b|thousand|lakhs?|lacs?|crores?|cr\b)?`;

const UNDER = new RegExp(String.raw`(?:under|below|less than|upto|up to|within|budget of|max(?:imum)?)\s*${AMOUNT}`, 'i');
const OVER = new RegExp(String.raw`(?:over|above|more than|at least|min(?:imum)?)\s*${AMOUNT}`, 'i');
const BETWEEN = new RegExp(String.raw`between\s*${AMOUNT}\s*(?:and|-|to)\s*${AMOUNT}`, 'i');

/**
 * Words that point at a category. The category's own name is matched first;
 * these cover what people actually type instead of the formal name.
 */
const CATEGORY_HINTS: Record<ProductCategorySlug, string[]> = {
  smartphones: ['phone', 'phones', 'smartphone', 'mobile', 'iphone', 'android'],
  laptops: ['laptop', 'notebook', 'macbook', 'ultrabook'],
  'smart-tvs': ['tv', 'tvs', 'television', 'smart tv', 'oled', 'qled'],
  earbuds: ['earbud', 'earbuds', 'headphone', 'headphones', 'tws', 'earphones', 'anc'],
  smartwatches: ['smartwatch', 'watch', 'watches', 'fitness band', 'wearable'],
  gaming: ['console', 'playstation', 'ps5', 'xbox', 'nintendo', 'controller'],
  cameras: ['camera', 'cameras', 'dslr', 'mirrorless', 'lens'],
  'smart-home': ['smart home', 'smart bulb', 'smart plug', 'alexa', 'echo', 'doorbell'],
  'home-appliances': ['washing machine', 'refrigerator', 'fridge', 'microwave', 'ac', 'air conditioner', 'dishwasher'],
  'computer-accessories': ['keyboard', 'mouse', 'dock', 'hub', 'webcam'],
  'power-banks': ['power bank', 'powerbank', 'charger', 'adapter', 'gan'],
  monitors: ['monitor', 'monitors', 'display', 'ultrawide'],
  tablets: ['tablet', 'ipad', 'tab'],
  printers: ['printer', 'printers', 'scanner', 'inkjet'],
  networking: ['router', 'routers', 'mesh', 'wifi', 'wi-fi', 'extender'],
};

/** Use cases worth carrying through, because they change the recommendation. */
const USE_HINTS: Record<string, string[]> = {
  gaming: ['gaming', 'game', 'games', 'fps', 'esports'],
  coding: ['coding', 'code', 'programming', 'development', 'developer'],
  study: ['study', 'student', 'college', 'school'],
  photography: ['photography', 'photo', 'photos', 'camera quality'],
  video: ['video editing', 'editing', 'rendering', 'youtube'],
  travel: ['travel', 'portable', 'lightweight', 'commute'],
  work: ['work', 'office', 'business', 'meetings'],
  movies: ['movies', 'film', 'netflix', 'streaming'],
};

export interface ParsedIntent extends ProductQuery {
  /** What the reader typed, kept for the explanation. */
  raw: string;
  /** e.g. "gaming", "coding" — surfaced so the page can say what it assumed. */
  useCase?: string;
  /** True when nothing at all could be read out of the query. */
  isVague: boolean;
}

/**
 * Find the thing being bought.
 *
 * Two rules, and they pull in opposite directions, which is the whole
 * difficulty:
 *
 *   1. Qualifiers that follow the noun belong to it. "phone under ₹25,000 with
 *      a good camera" is a phone — the camera is a feature of it. Longest-match
 *      alone got this wrong and returned cameras, because "camera" is six
 *      letters and "phone" is five. So the earliest hint wins.
 *
 *   2. Qualifiers that precede the noun also belong to it. "camera phone" is a
 *      phone; "camera" modifies it. Earliest-match alone got THIS wrong and
 *      returned cameras again — the same wrong answer from the opposite
 *      mistake. English compounds put the modifier first and the head noun
 *      last, so in a run of adjacent nouns the LAST one is what is being
 *      bought.
 *
 * So: earliest wins, then walk forward through directly adjacent hints and take
 * the last of them. "Adjacent" means separated by at most two characters — a
 * space or a hyphen — which is tight enough that "phone ... with a good camera"
 * never chains, and loose enough that "camera phone" and "camera-phone" both do.
 *
 * Overlapping matches are not a compound: in "smart tv" both "smart tv" and
 * "tv" match, and the second starts inside the first. There the longer, more
 * specific phrase takes it.
 *
 * The reversed form, "phone camera", resolves to cameras by the same rule. That
 * is what the compound literally says, and it is the rarer query by a wide
 * margin; getting "best camera phone" right is worth it.
 */
const findFirst = (text: string, table: Record<string, string[]>): string | undefined => {
  const hits: { key: string; at: number; end: number; len: number }[] = [];

  for (const [key, words] of Object.entries(table)) {
    for (const word of words) {
      const re = new RegExp(`(^|[^a-z])${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`, 'i');
      const m = re.exec(text);
      if (!m) continue;
      // Skip whatever the leading boundary group captured.
      const at = m.index + (m[1] ? m[1].length : 0);
      hits.push({ key, at, end: at + word.length, len: word.length });
    }
  }

  if (!hits.length) return undefined;

  // Earliest first; where two start together the longer phrase is the more
  // specific one.
  hits.sort((a, b) => a.at - b.at || b.len - a.len);

  let head = hits[0];
  for (;;) {
    const next = hits.find((h) => h.at >= head.end && h.at - head.end <= 2);
    if (!next) return head.key;
    head = next;
  }
};

export const parseIntent = (raw: string): ParsedIntent => {
  const text = ` ${raw.toLowerCase().trim()} `;

  let minPrice: number | undefined;
  let maxPrice: number | undefined;

  const between = text.match(BETWEEN);
  if (between) {
    const a = parseAmount(between[1], between[2]);
    const b = parseAmount(between[3], between[4]);
    if (a !== null && b !== null) {
      minPrice = Math.min(a, b);
      maxPrice = Math.max(a, b);
    }
  } else {
    const under = text.match(UNDER);
    if (under) {
      const v = parseAmount(under[1], under[2]);
      if (v !== null) maxPrice = v;
    }
    const over = text.match(OVER);
    if (over) {
      const v = parseAmount(over[1], over[2]);
      if (v !== null) minPrice = v;
    }
  }

  /*
    The product noun decides the category, not the category name.

    "gaming laptop under ₹60,000" matched the Gaming category on its name and
    returned consoles, because the word "gaming" appears in it. But "gaming"
    there is a modifier and "laptop" is the thing being bought — the noun wins.
    Hints are product nouns, so they are checked first, and the formal name is
    the fallback for a query that names a category outright ("home appliances").
  */
  const byNoun = findFirst(text, CATEGORY_HINTS) as ProductCategorySlug | undefined;
  const byName = SHOPPING_CATEGORIES.find((c) => text.includes(` ${c.name.toLowerCase()} `));
  const category = byNoun ?? (byName?.slug as ProductCategorySlug | undefined);

  const rawUse = findFirst(text, USE_HINTS);
  // "gaming laptop" reads its use from the same word as its category, and
  // "gaming for gaming" is not a sentence.
  const useCase = rawUse && rawUse !== category ? rawUse : undefined;

  return {
    raw,
    category,
    minPrice,
    maxPrice,
    useCase,
    search: category ? undefined : raw.trim() || undefined,
    isVague: !category && minPrice === undefined && maxPrice === undefined && raw.trim().length < 3,
  };
};

/** A plain sentence describing what was understood, shown back to the reader. */
export const describeIntent = (intent: ParsedIntent): string => {
  const parts: string[] = [];
  const cat = intent.category ? SHOPPING_CATEGORIES.find((c) => c.slug === intent.category) : undefined;
  if (cat) parts.push(cat.name.toLowerCase());
  if (intent.useCase) parts.push(`for ${intent.useCase}`);
  if (intent.minPrice !== undefined && intent.maxPrice !== undefined) {
    parts.push(`between ₹${intent.minPrice.toLocaleString('en-IN')} and ₹${intent.maxPrice.toLocaleString('en-IN')}`);
  } else if (intent.maxPrice !== undefined) {
    parts.push(`under ₹${intent.maxPrice.toLocaleString('en-IN')}`);
  } else if (intent.minPrice !== undefined) {
    parts.push(`over ₹${intent.minPrice.toLocaleString('en-IN')}`);
  }
  return parts.length ? parts.join(' ') : 'anything';
};
