const fs = require('fs');
let code = fs.readFileSync('types.ts', 'utf8');

if (!code.includes('SEOCollection')) {
code += `

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
`;
  fs.writeFileSync('types.ts', code, 'utf8');
  console.log('types.ts updated');
}
