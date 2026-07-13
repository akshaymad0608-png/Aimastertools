import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = [], 
  image = 'https://picsum.photos/1200/630?random=seo', // Fallback image
  url,
  type = 'website',
  noindex = false,
  children
}) => {
  const siteTitle = 'AI Master Tools';
  // Clean URL for canonical if not explicitly provided
  const canonicalUrl = url || (typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '');
  const ogUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const fullTitle = title.includes(siteTitle) || title.includes('AIMasterTools') ? title : `${title} | ${siteTitle}`;

  const defaultKeywords = [
    'AI tools directory', 'compare AI tools', 'best AI software', 'AI tool suggestions', 'AI Master Tools', 'Akshay Mahajan',
    'Prompt Engineering', 'best AI tools list 2026', 'free AI tools', 'ChatGPT alternatives', 'generative AI tools',
    'AI productivity tools', 'top AI software'
  ];

  const mergedKeywords = Array.from(new Set([...defaultKeywords, ...keywords]));

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={mergedKeywords.join(', ')} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@AIMasterTools" />

      {/* Custom Tags */}
      {children}
    </Helmet>
  );
};

export default SEO;
