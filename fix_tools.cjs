const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

// There are three injected newTools because there were multiple occurrences of `  }\n];`.
// We should restore constants.tsx to its state before injecting `newTools`,
// and then inject it only at the end of `MOCK_TOOLS`.

const newToolsSnippet = `  },
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

content = content.split(newToolsSnippet).join('  }\n];');

// Now inject only at the end of MOCK_TOOLS. 
// We can find the end of MOCK_TOOLS by looking for the closing bracket before `export const CATEGORIES`.
const marker = 'export const CATEGORIES';
const index = content.indexOf(marker);
if (index !== -1) {
    let before = content.substring(0, index);
    let after = content.substring(index);
    before = before.replace(/  \}\n\];\n*$/, newToolsSnippet + '\n\n');
    fs.writeFileSync('constants.tsx', before + after);
    console.log("Fixed!");
} else {
    console.log("Failed to find marker");
}
