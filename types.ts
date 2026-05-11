import React from 'react';

export type Category = string;

export interface Tool {
  id: string;
  name: string;
  description: string;
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
}

export interface CategoryStat {
  id: Category;
  name: string;
  icon: string | any;
  imageUrl?: string;
  count: number;
  bg?: string;
  color?: string;
}