import React from 'react';

export type Category = string;

export interface Tool {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: Category;
  url: string;
  domain?: string;
  brandColor?: string;
  /** Optional. Older records carry an unrelated stock photo; newer ones do not. */
  imageUrl?: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Open Source' | 'Usage Based';
  rating: number;
  featured: boolean;
  dateAdded: string; // ISO date string
  tags?: string[];
  useCases?: string[];
  features?: string[];
  launchYear?: number;

  /*
    Affiliate fields. All optional, and all empty today — a tool without them
    links to its own website and nothing about the page changes.

    A link goes in here only after the programme has issued it. Taking a
    vendor's URL and appending a referral parameter produces a link that either
    does not track or breaks the programme's terms, exactly as with an Amazon
    Special Link.

    Whether a tool earns money must never decide where it ranks, what it is
    rated, or whether it appears. If that ever stops being true the directory is
    worth nothing to a reader, and a reader who suspects it is worth nothing to
    an advertiser either. resolveToolLink() only chooses a URL and a rel; no
    sort, filter or score reads these fields.
  */

  /** Partner link, exactly as the programme issued it. Never built by hand. */
  affiliateUrl?: string;
  /** Our account id with that programme, kept so the link can be audited. */
  affiliateId?: string;
  /** Which programme or network issued it — 'impact', 'partnerstack', 'direct'. */
  affiliateProgram?: string;
  /** ISO date the link was last clicked through and confirmed to land correctly. */
  affiliateCheckedAt?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
  url: string;
  content?: string;
  category?: string;
  slug?: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  promptText: string;
  platform: 'ChatGPT' | 'Midjourney' | 'Claude' | 'General' | string;
  dateAdded?: string;
  exampleResultText?: string;
  exampleResultImage?: string;
}

export interface CategoryStat {
  id: Category;
  name: string;
  /** URL-safe identifier, e.g. "llm-providers-and-apis". */
  slug: string;
  icon: string | any;
  emoji?: string;
  imageUrl?: string;
  count: number;
  bg?: string;
  color?: string;
}

export interface CollectionFAQ {
  question: string;
  answer: string;
}

export interface SEOCollection {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  toolIds: string[];
  faqs: CollectionFAQ[];
  relatedCollectionIds?: string[];
  ctaText?: string;
  ctaUrl?: string;
}
