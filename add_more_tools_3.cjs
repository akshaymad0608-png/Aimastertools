const fs = require('fs');
const file = 'constants.tsx';
let data = fs.readFileSync(file, 'utf8');

const regex = /export const MOCK_TOOLS: Tool\[\] = \[([\s\S]+?)\];\n\nexport const CATEGORIES/m;
const match = data.match(regex);
if (!match) {
  process.exit(1);
}

const newTools = [
  // 1. AI Real Estate Tools
  {name: "Epique", category: "AI Real Estate Tools", domain: "epiquerealty.com", color: "#000000", initDesc: "First AI-based real estate brokerage.", url: "https://epiquerealty.com"},
  {name: "Restb.ai", category: "AI Real Estate Tools", domain: "restb.ai", color: "#10B981", initDesc: "Computer vision for real estate.", url: "https://restb.ai"},
  {name: "Hyro", category: "AI Real Estate Tools", domain: "hyro.ai", color: "#3B82F6", initDesc: "Conversational AI for real estate.", url: "https://hyro.ai"},
  {name: "Rechat", category: "AI Real Estate Tools", domain: "rechat.com", color: "#F59E0B", initDesc: "AI-powered real estate CRM.", url: "https://rechat.com"},
  {name: "Localize", category: "AI Real Estate Tools", domain: "localize.city", color: "#EC4899", initDesc: "AI home hunting platform.", url: "https://localize.city"},

  // 2. AI Workflow Automation
  {name: "Make", category: "AI Workflow Automation", domain: "make.com", color: "#8B5CF6", initDesc: "Automate anything across apps.", url: "https://make.com"},
  {name: "Zapier", category: "AI Workflow Automation", domain: "zapier.com", color: "#FF4A00", initDesc: "Automate your workflows easily.", url: "https://zapier.com"},
  {name: "n8n", category: "AI Workflow Automation", domain: "n8n.io", color: "#EA4335", initDesc: "Workflow automation tool.", url: "https://n8n.io"},
  {name: "Tray.io", category: "AI Workflow Automation", domain: "tray.io", color: "#000000", initDesc: "AI-powered automation platform.", url: "https://tray.io"},
  {name: "Workato", category: "AI Workflow Automation", domain: "workato.com", color: "#10B981", initDesc: "Enterprise automation platform.", url: "https://workato.com"},

  // 3. Legal & Compliance
  {name: "Harvey", category: "Legal & Compliance", domain: "harvey.ai", color: "#000000", initDesc: "AI for legal work.", url: "https://harvey.ai"},
  {name: "CoCounsel", category: "Legal & Compliance", domain: "casetext.com", color: "#3B82F6", initDesc: "AI legal assistant.", url: "https://casetext.com"},
  {name: "Spellbook", category: "Legal & Compliance", domain: "spellbook.legal", color: "#10B981", initDesc: "Draft contracts 10x faster with AI.", url: "https://spellbook.legal"},
  {name: "Luminance", category: "Legal & Compliance", domain: "luminance.com", color: "#8B5CF6", initDesc: "AI for legal process automation.", url: "https://luminance.com"},
  {name: "Robin AI", category: "Legal & Compliance", domain: "robinai.co.uk", color: "#F59E0B", initDesc: "AI contract copilot.", url: "https://robinai.co.uk"},

  // 4. Gaming & Entertainment
  {name: "Inworld AI", category: "Gaming & Entertainment", domain: "inworld.ai", color: "#000000", initDesc: "AI characters for games.", url: "https://inworld.ai"},
  {name: "Scenario", category: "Gaming & Entertainment", domain: "scenario.com", color: "#10B981", initDesc: "AI-generated game assets.", url: "https://scenario.com"},
  {name: "Leonardo.ai", category: "Gaming & Entertainment", domain: "leonardo.ai", color: "#3B82F6", initDesc: "Asset generation for games.", url: "https://leonardo.ai"},
  {name: "Ludo.ai", category: "Gaming & Entertainment", domain: "ludo.ai", color: "#EC4899", initDesc: "AI platform for game research and design.", url: "https://ludo.ai"},
  {name: "Rosebud AI", category: "Gaming & Entertainment", domain: "rosebud.ai", color: "#F59E0B", initDesc: "AI-powered game creation.", url: "https://rosebud.ai"},

  // 5. AI Cybersecurity Tools
  {name: "Darktrace", category: "AI Cybersecurity Tools", domain: "darktrace.com", color: "#000000", initDesc: "Self-learning AI for cybersecurity.", url: "https://darktrace.com"},
  {name: "CrowdStrike", category: "AI Cybersecurity Tools", domain: "crowdstrike.com", color: "#FF0000", initDesc: "AI-native endpoint security.", url: "https://crowdstrike.com"},
  {name: "SentinelOne", category: "AI Cybersecurity Tools", domain: "sentinelone.com", color: "#8B5CF6", initDesc: "Autonomous AI endpoint security.", url: "https://sentinelone.com"},
  {name: "Vectra AI", category: "AI Cybersecurity Tools", domain: "vectra.ai", color: "#10B981", initDesc: "AI-driven threat detection.", url: "https://vectra.ai"},
  {name: "Cylance", category: "AI Cybersecurity Tools", domain: "blackberry.com", color: "#000000", initDesc: "Predictive cybersecurity powered by AI.", url: "https://blackberry.com/cylance"},

  // 6. AI Ecommerce Tools
  {name: "Octane AI", category: "AI Ecommerce Tools", domain: "octaneai.com", color: "#3B82F6", initDesc: "AI quizzes and insights for Shopify.", url: "https://octaneai.com"},
  {name: "Tidio", category: "AI Ecommerce Tools", domain: "tidio.com", color: "#10B981", initDesc: "Customer service chatbot for ecommerce.", url: "https://tidio.com"},
  {name: "Klevu", category: "AI Ecommerce Tools", domain: "klevu.com", color: "#F59E0B", initDesc: "AI search and discovery for ecommerce.", url: "https://klevu.com"},
  {name: "Syte", category: "AI Ecommerce Tools", domain: "syte.ai", color: "#EC4899", initDesc: "Visual AI for ecommerce discovery.", url: "https://syte.ai"},
  {name: "Dynamic Yield", category: "AI Ecommerce Tools", domain: "dynamicyield.com", color: "#8B5CF6", initDesc: "Experience optimization for ecommerce.", url: "https://dynamicyield.com"}
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
