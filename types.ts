import React from 'react';

export type Category = string;

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: Category;
  url: string;
  imageUrl: string;
  pricing: 'Free' | 'Freemium' | 'Paid';
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
  icon: React.ComponentType<any>;
  count: number;
}