const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

const newToolsSnippet = `  },
  {
    id: "surferseo",
    name: "Surfer SEO",
    description: "AI-powered SEO tool that helps you research, write, and optimize content to rank higher on search engines.",
    category: "Marketing & SEO",
    url: "https://surferseo.com",
    domain: "surferseo.com",
    brandColor: "#7A3FF3",
    imageUrl: "https://img.logo.dev/surferseo.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2026-05-27T14:00:00.000Z",
    tags: ["SEO", "Content Editing", "Marketing"]
  },
  {
    id: "semrush",
    name: "Semrush",
    description: "Do SEO, content marketing, competitor research, PPC and social media marketing from just one platform.",
    category: "Marketing & SEO",
    url: "https://www.semrush.com",
    domain: "semrush.com",
    brandColor: "#FF642D",
    imageUrl: "https://img.logo.dev/semrush.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2026-05-27T14:01:00.000Z",
    tags: ["SEO", "Keyword Research", "Analytics"]
  },
  {
    id: "ahrefs",
    name: "Ahrefs",
    description: "An all-in-one SEO toolset for optimizing your website, analyzing competitors, studying what your customers are searching for, and tracking ranking progress.",
    category: "Marketing & SEO",
    url: "https://ahrefs.com",
    domain: "ahrefs.com",
    brandColor: "#F7652E",
    imageUrl: "https://img.logo.dev/ahrefs.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Paid",
    rating: 4.9,
    featured: true,
    dateAdded: "2026-05-27T14:02:00.000Z",
    tags: ["SEO", "Backlinks", "Keyword Research"]
  },
  {
    id: "clearscope",
    name: "Clearscope",
    description: "Clearscope simplifies SEO writing so you can create first-rate content that ranks.",
    category: "Marketing & SEO",
    url: "https://www.clearscope.io",
    domain: "clearscope.io",
    brandColor: "#10B981",
    imageUrl: "https://img.logo.dev/clearscope.io?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: "2026-05-27T14:03:00.000Z",
    tags: ["SEO", "Content Optimization"]
  },
  {
    id: "frase",
    name: "Frase",
    description: "Frase AI helps you research, write, and optimize high-quality SEO content in minutes instead of hours.",
    category: "Marketing & SEO",
    url: "https://www.frase.io",
    domain: "frase.io",
    brandColor: "#2F5DF1",
    imageUrl: "https://img.logo.dev/frase.io?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: "2026-05-27T14:04:00.000Z",
    tags: ["SEO", "Content Generation", "Marketing"]
  },
  {
    id: "jasper",
    name: "Jasper",
    description: "Meet Jasper, your AI copilot for enterprise marketing teams who want better outcomes, not just faster outputs.",
    category: "Marketing & SEO",
    url: "https://www.jasper.ai",
    domain: "jasper.ai",
    brandColor: "#000000",
    imageUrl: "https://img.logo.dev/jasper.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Paid",
    rating: 4.8,
    featured: true,
    dateAdded: "2026-05-27T14:05:00.000Z",
    tags: ["AI Writing", "Marketing", "Copywriting"]
  },
  {
    id: "copy-ai",
    name: "Copy.ai",
    description: "Write better marketing copy and content with AI. Copy.ai is an AI copywriter that generates high-quality copy for your business.",
    category: "Marketing & SEO",
    url: "https://www.copy.ai",
    domain: "copy.ai",
    brandColor: "#1A1919",
    imageUrl: "https://img.logo.dev/copy.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Freemium",
    rating: 4.7,
    featured: true,
    dateAdded: "2026-05-27T14:06:00.000Z",
    tags: ["AI Copywriting", "Marketing", "Social Media"]
  }
];`;

const marker = 'export const CATEGORIES';
const index = content.indexOf(marker);
if (index !== -1) {
    let before = content.substring(0, index);
    let after = content.substring(index);
    before = before.replace(/  \}\n\];\n*$/, newToolsSnippet + '\n\n');
    fs.writeFileSync('constants.tsx', before + after);
    console.log("Marketing tools added!");
} else {
    console.log("Failed to find marker");
}
