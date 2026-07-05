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
  imageUrl: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Open Source' | 'Usage Based';
  rating: number;
  featured: boolean;
  dateAdded: string; // ISO date string
  tags?: string[];
  useCases?: string[];
  features?: string[];
  launchYear?: number;
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
}

export interface CategoryStat {
  id: Category;
  name: string;
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
