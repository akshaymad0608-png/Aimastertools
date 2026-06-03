const fs = require('fs');
const file = 'constants.tsx';
let data = fs.readFileSync(file, 'utf8');

const regex = /export const MOCK_TOOLS: Tool\[\] = \[([\s\S]+?)\];\n\nexport const CATEGORIES/m;
const match = data.match(regex);
if (!match) {
  process.exit(1);
}

const newTools = [
  // 1. AI Meeting Assistants
  {name: "Otter.ai", category: "AI Meeting Assistants", domain: "otter.ai", color: "#2563EB", initDesc: "Provides meeting transcription and summaries.", url: "https://otter.ai"},
  {name: "Fireflies.ai", category: "AI Meeting Assistants", domain: "fireflies.ai", color: "#10B981", initDesc: "Automates meeting notes and transcripts.", url: "https://fireflies.ai"},
  {name: "Fathom", category: "AI Meeting Assistants", domain: "fathom.video", color: "#F59E0B", initDesc: "Free AI meeting assistant.", url: "https://fathom.video"},
  {name: "Krisp", category: "AI Meeting Assistants", domain: "krisp.ai", color: "#3B82F6", initDesc: "AI noise cancellation and meeting transcription.", url: "https://krisp.ai"},
  {name: "Supernormal", category: "AI Meeting Assistants", domain: "supernormal.com", color: "#EC4899", initDesc: "AI notes without a bot joining your meeting.", url: "https://supernormal.com"},
  
  // 2. AI Presentation Tools
  {name: "Tome", category: "AI Presentation Tools", domain: "tome.app", color: "#000000", initDesc: "AI format for shaping and sharing ideas.", url: "https://tome.app"},
  {name: "Gamma", category: "AI Presentation Tools", domain: "gamma.app", color: "#8B5CF6", initDesc: "A new medium for presenting ideas, powered by AI.", url: "https://gamma.app"},
  {name: "Beautiful.ai", category: "AI Presentation Tools", domain: "beautiful.ai", color: "#2563EB", initDesc: "Presentation software that designs for you.", url: "https://beautiful.ai"},
  {name: "Pitch", category: "AI Presentation Tools", domain: "pitch.com", color: "#10B981", initDesc: "Fast, collaborative presentation software.", url: "https://pitch.com"},
  {name: "SlidesAI", category: "AI Presentation Tools", domain: "slidesai.io", color: "#F59E0B", initDesc: "Create presentation slides with AI in seconds.", url: "https://slidesai.io"},
  
  // 3. Customer Support
  {name: "Intercom", category: "Customer Support", domain: "intercom.com", color: "#3B82F6", initDesc: "The AI-first customer service platform.", url: "https://intercom.com"},
  {name: "Zendesk AI", category: "Customer Support", domain: "zendesk.com", color: "#164A41", initDesc: "Intelligent customer service solutions.", url: "https://zendesk.com"},
  {name: "Gorgias", category: "Customer Support", domain: "gorgias.com", color: "#10B981", initDesc: "Ecommerce helpdesk connected to your store.", url: "https://gorgias.com"},
  {name: "Kustomer", category: "Customer Support", domain: "kustomer.com", color: "#8B5CF6", initDesc: "AI-powered CRM for modern customer service.", url: "https://kustomer.com"},
  {name: "Forethought", category: "Customer Support", domain: "forethought.ai", color: "#F59E0B", initDesc: "Generative AI for customer support.", url: "https://forethought.ai"},

  // 4. Data Science & Analytics
  {name: "Julius AI", category: "Data Science & Analytics", domain: "julius.ai", color: "#EC4899", initDesc: "Your intelligent data analyst.", url: "https://julius.ai"},
  {name: "Akkio", category: "Data Science & Analytics", domain: "akkio.com", color: "#2563EB", initDesc: "Generative BI and predictive AI for analysts.", url: "https://akkio.com"},
  {name: "Obviously AI", category: "Data Science & Analytics", domain: "obviously.ai", color: "#10B981", initDesc: "No-code AI for data prediction.", url: "https://obviously.ai"},
  {name: "Polymer", category: "Data Science & Analytics", domain: "polymersearch.com", color: "#3B82F6", initDesc: "Business Intelligence without the learning curve.", url: "https://polymersearch.com"},
  {name: "DataRobot", category: "Data Science & Analytics", domain: "datarobot.com", color: "#8B5CF6", initDesc: "The AI Cloud Leader.", url: "https://datarobot.com"},

  // 5. Research & Analysis
  {name: "Consensus", category: "Research & Analysis", domain: "consensus.app", color: "#10B981", initDesc: "AI search engine for scientific research.", url: "https://consensus.app"},
  {name: "Elicit", category: "Research & Analysis", domain: "elicit.com", color: "#3B82F6", initDesc: "The AI Research Assistant.", url: "https://elicit.com"},
  {name: "SciSpace", category: "Research & Analysis", domain: "typeset.io", color: "#F59E0B", initDesc: "Do hours of research in minutes.", url: "https://typeset.io"},
  {name: "ChatPDF", category: "Research & Analysis", domain: "chatpdf.com", color: "#EF4444", initDesc: "Chat with any PDF.", url: "https://chatpdf.com"},
  {name: "Mendeley", category: "Research & Analysis", domain: "mendeley.com", color: "#8B5CF6", initDesc: "Reference management software & researcher network.", url: "https://mendeley.com"}
];

let addedToolsStr = "";
for (let i = 0; i < newTools.length; i++) {
  const t = newTools[i];
  if (data.includes('"name": "' + t.name + '"')) {
    continue;
  }
  const toolObj = {
    id: t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    name: t.name,
    description: t.initDesc,
    longDescription: "Comprehensive review of " + t.name + ", including features, user experience, and key performance reviews in " + t.category + ".",
    category: t.category,
    url: t.url,
    domain: t.domain,
    brandColor: t.color,
    imageUrl: "https://img.logo.dev/" + t.domain + "?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Freemium",
    rating: parseFloat((4.5 + Math.random() * 0.4).toFixed(1)),
    featured: false,
    dateAdded: new Date().toISOString(),
    tags: [t.category.split(' ')[0], "AI", "Utility"],
    useCases: [
      "Accelerating workflows in standard operations",
      "Empowering startups containing remote collaborative units",
      "Automating complex daily checkups and documentation lists"
    ],
    launchYear: 2023
  };
  addedToolsStr += ",\n  " + JSON.stringify(toolObj, null, 2).replace(/\n/g, "\n  ");
}

let newData = data.replace(
  /export const MOCK_TOOLS: Tool\[\] = \[([\s\S]+?)\];\n\nexport const CATEGORIES/m,
  (match, p1) => {
    return "export const MOCK_TOOLS: Tool[] = [" + p1 + addedToolsStr + "\n];\n\nexport const CATEGORIES";
  }
);

newData = newData.replace(
  /export const CATEGORIES: CategoryStat\[\] = CATEGORY_META\.map\(meta => \(\{\n\s*\.\.\.meta,\n\s*count: MOCK_TOOLS\.filter\(tool => tool\.category === meta\.id\)\.length\n\}\)\)\.filter\(cat => cat\.count > 0\)\.sort\(\(a, b\) => b\.count - a\.count\);/m,
  "export const CATEGORIES: CategoryStat[] = CATEGORY_META.map(meta => ({\n" +
  "  ...meta,\n" +
  "  count: MOCK_TOOLS.filter(tool => tool.category === meta.id).length\n" +
  "})).filter(cat => cat.count > 0).sort((a, b) => b.count - a.count);"
);

fs.writeFileSync(file, newData);
console.log("Updated constants.tsx");
