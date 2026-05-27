const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

const newToolsSnippet = `  },
  {
    id: "answerthepublic",
    name: "AnswerThePublic",
    description: "Search listening tool for market, customer & content research. Get instant, raw search insights, direct from the minds of your customers.",
    category: "Marketing & SEO",
    url: "https://answerthepublic.com",
    domain: "answerthepublic.com",
    brandColor: "#FDB820",
    imageUrl: "https://img.logo.dev/answerthepublic.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Freemium",
    rating: 4.7,
    featured: true,
    dateAdded: "2026-05-26T18:32:00.000Z",
    tags: ["SEO", "Content Ideas", "Research", "Marketing"]
  },
  {
    id: "design-com",
    name: "Design.com",
    description: "Create professional logos, websites, and business cards in minutes using AI. The ultimate branding solution for your business.",
    category: "UI/UX & Design Tools",
    url: "https://www.design.com",
    domain: "design.com",
    brandColor: "#000000",
    imageUrl: "https://img.logo.dev/design.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: "2026-05-26T18:32:59.000Z",
    tags: ["Design", "Logo", "Branding", "Graphics"]
  }
];`;

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
