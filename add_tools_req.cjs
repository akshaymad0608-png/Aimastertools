const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

// 1. Update Otter.ai
content = content.replace(
  'id: "otter-ai",\n    name: "Otter.ai",\n    description: "Record and transcribe lectures, meetings, and interviews in real-time. Generate AI summaries and notes automatically.",\n    category: "Student",',
  'id: "otter-ai",\n    name: "Otter.ai",\n    description: "Record and transcribe lectures, meetings, and interviews in real-time. Generate AI summaries and notes automatically.",\n    category: "Productivity & Automation",'
);

// 2. Add new tools at the very end of MOCK_TOOLS
const newTools = `  },
  {
    id: "snov-io",
    name: "Snov.io",
    description: "All-in-one cold outreach automation platform. Find, verify, and email leads with AI-powered features and seamless CRM integration.",
    category: "Marketing & SEO",
    url: "https://snov.io",
    domain: "snov.io",
    brandColor: "#7532FA",
    imageUrl: "https://img.logo.dev/snov.io?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2026-05-26T14:37:00.000Z",
    tags: ["Email", "Outreach", "Sales", "B2B"]
  },
  {
    id: "apollo-io",
    name: "Apollo.io",
    description: "The end-to-end sales engine. Find buyers, connect intelligently with AI-driven emails, and close more deals fast.",
    category: "Business & Finance AI",
    url: "https://www.apollo.io",
    domain: "apollo.io",
    brandColor: "#FFC24C",
    imageUrl: "https://img.logo.dev/apollo.io?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Freemium",
    rating: 4.9,
    featured: true,
    dateAdded: "2026-05-26T14:38:00.000Z",
    tags: ["Sales", "Prospecting", "CRM", "Leads"]
  },
  {
    id: "sparktoro",
    name: "SparkToro",
    description: "Audience research software that shows you exactly what your customers read, watch, listen to, and follow online.",
    category: "Marketing & SEO",
    url: "https://sparktoro.com",
    domain: "sparktoro.com",
    brandColor: "#000000",
    imageUrl: "https://img.logo.dev/sparktoro.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2026-05-26T14:39:00.000Z",
    tags: ["Audience Research", "Marketing", "SEO", "Analytics"]
  }
];`;

content = content.replace(/  \}\n\];/g, newTools);
fs.writeFileSync('constants.tsx', content);
console.log('Tools updated successfully.');
