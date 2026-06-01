const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

const newTools = [
  { name: "Consensus", domain: "consensus.app", category: "Research & Analysis", description: "AI search engine that extracts findings directly from scientific research.", color: "#000000" },
  { name: "ChatPRD", domain: "chatprd.ai", category: "Productivity & Automation", description: "The ultimate copilot for product managers to write PRDs and brainstorm.", color: "#2563EB" },
  { name: "Figma AI", domain: "figma.com", category: "UI/UX & Design Tools", description: "AI features woven into Figma to help you design faster and better.", color: "#F24E1E" },
  { name: "Framer", domain: "framer.com", category: "UI/UX & Design Tools", description: "Build stunning websites with AI speed and precision.", color: "#0055FF" },
  { name: "InVideo AI", domain: "invideo.io", category: "Video & Audio Tools", description: "Generate publish-worthy videos from text prompts natively with AI.", color: "#3B82F6" },
  { name: "Fiscal AI", domain: "fiscal.ai", category: "Business & Finance AI", description: "AI-powered financial modeling and reporting for modern finance teams.", color: "#10B981" },
  { name: "Koyfin", domain: "koyfin.com", category: "Business & Finance AI", description: "Financial data and analytics platform providing comprehensive insights.", color: "#2DD4BF" },
  { name: "Fathom HQ", domain: "fathomhq.com", category: "Business & Finance AI", description: "Financial analysis, management reporting and forecasting software.", color: "#8B5CF6" },
  { name: "Tailride", domain: "tailride.com", category: "Business & Finance AI", description: "Streamlined business solutions and analytics powered by AI.", color: "#475569" },
  { name: "Zoho Books", domain: "zoho.com", category: "Business & Finance AI", description: "Online accounting software that manages your finances and automates workflows.", color: "#F59E0B" },
  { name: "SmartScan.ai", domain: "smartscan.ai", category: "Business & Finance AI", description: "AI document scanning and data extraction for receipts and invoices.", color: "#EF4444" },
  { name: "Expensify", domain: "expensify.com", category: "Business & Finance AI", description: "Expense management software that uses AI to automate expense reporting.", color: "#3E4491" },
  { name: "Invoicer.ai", domain: "invoicer.ai", category: "Business & Finance AI", description: "Create professional invoices in seconds with AI-powered invoicing tools.", color: "#4F46E5" }
];

let output = "";
newTools.forEach((tool) => {
    const id = tool.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    output += "  },\n";
    output += "  {\n";
    output += "    id: '" + id + "',\n";
    output += "    name: '" + tool.name.replace(/'/g, "\\'") + "',\n";
    output += "    description: '" + tool.description.replace(/'/g, "\\'") + "',\n";
    output += "    category: '" + tool.category + "',\n";
    output += "    url: 'https://" + tool.domain + "',\n";
    output += "    domain: '" + tool.domain + "',\n";
    output += "    brandColor: '" + tool.color + "',\n";
    output += "    imageUrl: 'https://img.logo.dev/" + tool.domain + "?token=pk_Yy124-7wSK-z-Hym446V9A',\n";
    output += "    pricing: 'Freemium',\n";
    output += "    rating: " + (4.6 + Math.random() * 0.3).toFixed(1) + ",\n";
    output += "    featured: " + (Math.random() > 0.6) + ",\n";
    let day = String(10 + Math.floor(Math.random()*15)).padStart(2,'0');
    output += "    dateAdded: '2026-05-" + day + "T10:00:00.000Z',\n";
    output += "    tags: ['" + tool.category.split(' ')[0] + "', 'AI']\n";
});

const newToolsSnippet = output + "  }\n];";
const marker = "export const CATEGORIES";
const index = content.indexOf(marker);

if (index !== -1) {
    let before = content.substring(0, index);
    let after = content.substring(index);
    before = before.replace(/  \}\n\];\n*$/, newToolsSnippet + '\n\n');
    fs.writeFileSync('constants.tsx', before + after);
    console.log("Categories and tools added!");
} else {
    console.log("Failed to find marker");
}
