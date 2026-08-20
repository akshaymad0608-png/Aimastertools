import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE, BRAND_KEYWORDS, absoluteUrl, clampDescription } from '../utils/seo';

interface SEOProps {
  title: string;
  description: string;
  /** Page-specific keywords. Put the page's own subject name first. */
  keywords?: string[];
  image?: string;
  /** Path or absolute URL. Falls back to the current location. */
  url?: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  /** One or more JSON-LD objects to attach to this page. */
  schema?: Record<string, any> | Record<string, any>[];
  /** Article-only fields. */
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  author?: string;
  children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  image = SITE.ogImage,
  url,
  type = 'website',
  noindex = false,
  schema,
  publishedTime,
  modifiedTime,
  section,
  author = SITE.author,
  children,
}) => {
  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/';

  const canonical = url ? absoluteUrl(url) : absoluteUrl(currentPath.split('?')[0]);
  const ogUrl = url ? absoluteUrl(url) : absoluteUrl(currentPath);

  /**
   * On a prerendered route the baked title wins over the one this component
   * would compute.
   *
   * prerender.mjs sizes every title to the 50-60 characters a result listing
   * shows, choosing from a ladder of phrasings per page. The templates here
   * were written separately and do not agree with it — the Poe alternatives
   * page shipped "8 Best Poe Alternatives and Competitors to Try" in the HTML
   * and then Helmet appended "12 Best Poe Alternatives (2026) — Free & Paid |
   * AI Master Tools" at 63 characters. Two titles in one document, and the
   * longer wrong one is what a renderer like Google reads.
   *
   * Reading the served title back makes the prerenderer the single source and
   * keeps this component authoritative for client-side navigation, where no
   * prerendered tag exists for the new route.
   */
  const prerenderedTitle =
    typeof document !== 'undefined'
      ? document.querySelector('title[data-prerendered="true"]')?.textContent?.trim()
      : undefined;

  const computedTitle =
    title.includes(SITE.name) || title.includes(SITE.shortName)
      ? title
      : `${title} | ${SITE.name}`;

  const fullTitle = prerenderedTitle || computedTitle;

  const metaDescription = clampDescription(description);

  // Page keywords lead; brand keywords fill in behind them.
  const mergedKeywords = Array.from(new Set([...keywords, ...BRAND_KEYWORDS])).slice(0, 25);

  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <html lang={SITE.lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={mergedKeywords.join(', ')} />
      <link rel="canonical" href={canonical} />
      <meta name="author" content={author} />

      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        }
      />

      <link rel="alternate" hrefLang="en" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content={SITE.locale} />

      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && (modifiedTime || publishedTime) && (
        <meta property="article:modified_time" content={modifiedTime || publishedTime} />
      )}
      {type === 'article' && section && <meta property="article:section" content={section} />}
      {type === 'article' && <meta property="article:author" content={author} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE.twitter} />
      <meta name="twitter:creator" content={SITE.twitter} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {schemas.map((s, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(s)}
        </script>
      ))}

      {children}
    </Helmet>
  );
};

export default SEO;
