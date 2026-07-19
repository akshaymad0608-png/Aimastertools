/**
 * Central SEO helpers for AI Master Tools.
 *
 * Everything that decides a title, a canonical URL, a keyword set or a
 * structured-data block lives here so the whole site stays consistent.
 */

import type { Tool, BlogPost, CategoryStat, SEOCollection } from '../types';

/* ------------------------------------------------------------------ */
/* Site constants                                                      */
/* ------------------------------------------------------------------ */

export const SITE = {
  name: 'AI Master Tools',
  shortName: 'AIMasterTools',
  url: 'https://aimastertools.space',
  locale: 'en_US',
  lang: 'en',
  twitter: '',
  author: 'Akshay Mahajan',
  tagline: 'Find, compare and review the best AI tools',
  description:
    'Search 630+ hand-checked AI tools by name, category and price. Compare features side by side, read honest reviews and find the right tool in under a minute.',
  ogImage: 'https://aimastertools.space/og-cover.png',
  logo: 'https://aimastertools.space/icon-512.png',
} as const;

export const ORG_ID = `${SITE.url}/#organization`;
export const SITE_ID = `${SITE.url}/#website`;

/** Build an absolute, canonical URL from any path. */
export const absoluteUrl = (path = '/'): string => {
  if (!path) return SITE.url + '/';
  if (path.startsWith('http')) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${clean}`.replace(/\/+$/, clean === '/' ? '/' : '');
};

/** Trim a description to a length search engines will actually show. */
export const clampDescription = (text: string, max = 158): string => {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, max - 1).replace(/[\s,.;:-]+\S*$/, '')}…`;
};

const CURRENT_YEAR = new Date().getFullYear();

/* ------------------------------------------------------------------ */
/* Keyword generation — every page is led by its own tool/topic name   */
/* ------------------------------------------------------------------ */

/** Keywords that belong on every page: the brand itself. */
export const BRAND_KEYWORDS = [
  SITE.name,
  SITE.shortName,
  'AI tools directory',
  `best AI tools ${CURRENT_YEAR}`,
  'free AI tools',
  'compare AI tools',
  'AI tool finder',
];

/**
 * Long-tail keyword set built from a single tool name.
 * This is what makes each tool page rank for its own name rather than
 * competing with every other page for the same generic phrases.
 */
export const toolKeywords = (tool: Pick<Tool, 'name' | 'category' | 'pricing'> & { tags?: string[] }): string[] => {
  const n = tool.name;
  return [
    n,
    `${n} review`,
    `${n} pricing`,
    `${n} alternatives`,
    `${n} vs`,
    `is ${n} free`,
    `how to use ${n}`,
    `${n} features`,
    `${n} ${CURRENT_YEAR}`,
    `${tool.category} AI tools`,
    `best ${tool.category} AI tools ${CURRENT_YEAR}`,
    `${tool.pricing} AI tools`,
    ...(tool.tags ?? []).map((t) => `${t} AI tool`),
    ...BRAND_KEYWORDS,
  ].filter(Boolean);
};

export const categoryKeywords = (categoryName: string): string[] => [
  `${categoryName} AI tools`,
  `best ${categoryName} AI tools`,
  `best ${categoryName} AI tools ${CURRENT_YEAR}`,
  `free ${categoryName} AI tools`,
  `top ${categoryName} software`,
  `${categoryName} AI software comparison`,
  ...BRAND_KEYWORDS,
];

export const blogKeywords = (post: Pick<BlogPost, 'title' | 'category'>): string[] => [
  post.title,
  post.category ? `${post.category} AI guide` : '',
  `AI guide ${CURRENT_YEAR}`,
  'AI tutorial',
  ...BRAND_KEYWORDS,
].filter(Boolean) as string[];

/* ------------------------------------------------------------------ */
/* Title + description writers                                         */
/* ------------------------------------------------------------------ */

export const toolTitle = (tool: Pick<Tool, 'name' | 'category'>): string =>
  `${tool.name} Review, Pricing & Alternatives (${CURRENT_YEAR})`;

export const toolDescription = (tool: Pick<Tool, 'name' | 'description' | 'pricing' | 'rating' | 'category'>): string =>
  clampDescription(
    `${tool.name} is a ${tool.pricing.toLowerCase()} ${tool.category.toLowerCase()} AI tool rated ${tool.rating.toFixed(
      1,
    )}/5. ${tool.description}`,
  );

export const categoryTitle = (name: string, count: number): string =>
  `${count} Best ${name} AI Tools (${CURRENT_YEAR}) — Compared & Ranked`;

export const categoryDescription = (name: string, count: number): string =>
  clampDescription(
    `Browse ${count} ${name.toLowerCase()} AI tools with pricing, ratings and honest reviews. Filter by free, freemium or paid and compare any two side by side.`,
  );

/* ------------------------------------------------------------------ */
/* Structured data (JSON-LD)                                           */
/* ------------------------------------------------------------------ */

type Json = Record<string, any>;

export const organizationSchema = (): Json => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.name,
  url: `${SITE.url}/`,
  logo: { '@type': 'ImageObject', url: SITE.logo, width: 512, height: 512 },
  founder: { '@type': 'Person', name: SITE.author },
});

export const websiteSchema = (): Json => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${SITE.url}/`,
  name: SITE.name,
  description: SITE.description,
  inLanguage: SITE.lang,
  publisher: { '@id': ORG_ID },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/?search={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
});

/** Breadcrumbs. Pass the trail without "Home" — it is prepended for you. */
export const breadcrumbSchema = (items: { label: string; path?: string }[]): Json => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
    ...items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: item.label,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  ],
});

/** A single tool, marked up as a rated software application. */
export const toolSchema = (tool: Tool, reviewCount = 0): Json => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${absoluteUrl(`/tool/${tool.id}`)}#software`,
  name: tool.name,
  description: tool.longDescription || tool.description,
  url: absoluteUrl(`/tool/${tool.id}`),
  sameAs: tool.url,
  image: tool.imageUrl,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: tool.category,
  operatingSystem: 'Web',
  ...(tool.launchYear ? { datePublished: `${tool.launchYear}-01-01` } : {}),
  offers: {
    '@type': 'Offer',
    price: tool.pricing === 'Free' || tool.pricing === 'Open Source' ? '0' : undefined,
    priceCurrency: 'USD',
    category: tool.pricing,
    availability: 'https://schema.org/OnlineOnly',
    url: tool.url,
  },
  ...(reviewCount > 0
    ? {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: tool.rating.toFixed(1),
          bestRating: '5',
          worstRating: '1',
          ratingCount: reviewCount,
        },
      }
    : {}),
  publisher: { '@id': ORG_ID },
});

/** A ranked list of tools — powers "top 10" style rich results. */
export const itemListSchema = (tools: Pick<Tool, 'id' | 'name'>[], listName: string): Json => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: listName,
  numberOfItems: tools.length,
  itemListOrder: 'https://schema.org/ItemListOrderDescending',
  itemListElement: tools.map((tool, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: tool.name,
    url: absoluteUrl(`/tool/${tool.id}`),
  })),
});

/** FAQ blocks. Answers must be plain text, no markup. */
export const faqSchema = (faqs: { question: string; answer: string }[]): Json => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer.replace(/<[^>]+>/g, '') },
  })),
});

export const articleSchema = (post: BlogPost): Json => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${absoluteUrl(`/blog/${post.slug || post.id}`)}#article`,
  headline: post.title,
  description: post.excerpt,
  image: post.imageUrl,
  datePublished: post.date,
  dateModified: post.date,
  articleSection: post.category,
  author: { '@type': 'Person', name: SITE.author, url: `${SITE.url}/discover#about` },
  publisher: { '@id': ORG_ID },
  mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/blog/${post.slug || post.id}`) },
  inLanguage: SITE.lang,
});

export const collectionSchema = (collection: SEOCollection, tools: Pick<Tool, 'id' | 'name'>[]): Json => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: collection.metaTitle || collection.title,
  description: collection.metaDescription,
  url: absoluteUrl(`/collections/${collection.slug}`),
  isPartOf: { '@id': SITE_ID },
  mainEntity: itemListSchema(tools, collection.title),
});

export const categorySchema = (category: CategoryStat, tools: Pick<Tool, 'id' | 'name'>[]): Json => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: categoryTitle(category.name, tools.length),
  description: categoryDescription(category.name, tools.length),
  url: absoluteUrl(`/category/${String(category.id).toLowerCase().replace(/\s+/g, '-')}`),
  isPartOf: { '@id': SITE_ID },
  mainEntity: itemListSchema(tools, `Best ${category.name} AI Tools`),
});

/** Compare pages: two named tools, one head-to-head page. */
export const comparisonSchema = (a: Tool, b: Tool): Json => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `${a.name} vs ${b.name} — Feature and Pricing Comparison`,
  url: absoluteUrl(`/compare?tool1=${a.id}&tool2=${b.id}`),
  isPartOf: { '@id': SITE_ID },
  about: [toolSchema(a), toolSchema(b)],
});
