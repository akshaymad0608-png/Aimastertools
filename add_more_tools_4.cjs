const fs = require('fs');
const file = 'constants.tsx';
let data = fs.readFileSync(file, 'utf8');

const regex = /export const MOCK_TOOLS: Tool\[\] = \[([\s\S]+?)\];\n\nexport const CATEGORIES/m;
const match = data.match(regex);
if (!match) {
  process.exit(1);
}

const newTools = [
  // 1. AI Chrome Extensions
  {name: "Monica", category: "AI Chrome Extensions", domain: "monica.im", color: "#3B82F6", initDesc: "Your AI copilot across the web.", url: "https://monica.im"},
  {name: "Sider", category: "AI Chrome Extensions", domain: "sider.ai", color: "#10B981", initDesc: "ChatGPT & Claude sidebar extension.", url: "https://sider.ai"},
  {name: "Harpa AI", category: "AI Chrome Extensions", domain: "harpa.ai", color: "#EC4899", initDesc: "Hybrid AI agent for web automation.", url: "https://harpa.ai"},
  {name: "WebChatGPT", category: "AI Chrome Extensions", domain: "webchatgpt.app", color: "#000000", initDesc: "Enhances ChatGPT with web access.", url: "https://chrome.google.com/webstore"},
  {name: "SciSpace Copilot", category: "AI Chrome Extensions", domain: "typeset.io", color: "#F59E0B", initDesc: "AI copilot for research papers.", url: "https://typeset.io"},

  // 2. 3D & Animation
  {name: "Luma AI", category: "3D & Animation", domain: "lumalabs.ai", color: "#000000", initDesc: "Unbelievable 3D AI generation.", url: "https://lumalabs.ai"},
  {name: "CSM", category: "3D & Animation", domain: "csm.ai", color: "#10B981", initDesc: "3D models from any image or video.", url: "https://csm.ai"},
  {name: "Kaedim", category: "3D & Animation", domain: "kaedim3d.com", color: "#3B82F6", initDesc: "2D to 3D models with AI.", url: "https://kaedim3d.com"},
  {name: "Masterpiece Studio", category: "3D & Animation", domain: "masterpiecestudio.com", color: "#8B5CF6", initDesc: "Generate 3D assets easily.", url: "https://masterpiecestudio.com"},
  {name: "Plask", category: "3D & Animation", domain: "plask.ai", color: "#EC4899", initDesc: "AI motion capture tool.", url: "https://plask.ai"},

  // 3. AI Healthcare Tools
  {name: "Hippocratic AI", category: "AI Healthcare Tools", domain: "hippocraticai.com", color: "#10B981", initDesc: "Safety-focused LLM for healthcare.", url: "https://hippocraticai.com"},
  {name: "Glass Health", category: "AI Healthcare Tools", domain: "glass.health", color: "#3B82F6", initDesc: "AI platform for doctors.", url: "https://glass.health"},
  {name: "Nabla", category: "AI Healthcare Tools", domain: "nabla.com", color: "#8B5CF6", initDesc: "AI copilot for practitioners.", url: "https://nabla.com"},
  {name: "Abridge", category: "AI Healthcare Tools", domain: "abridge.com", color: "#EC4899", initDesc: "Medical conversation AI.", url: "https://abridge.com"},

  // 4. Learning & Education
  {name: "Knewton", category: "Learning & Education", domain: "knewton.com", color: "#3B82F6", initDesc: "Adaptive learning platform.", url: "https://knewton.com"},
  {name: "Edurite", category: "Learning & Education", domain: "edurite.com", color: "#F59E0B", initDesc: "Smart educational tools.", url: "https://edurite.com"},
  {name: "Socratic", category: "Learning & Education", domain: "socratic.org", color: "#000000", initDesc: "Get unstuck with AI.", url: "https://socratic.org"},
  
  // 5. AI Website Builders
  {name: "Dora", category: "AI Website Builders", domain: "dora.run", color: "#000000", initDesc: "Design and publish 3D sites with AI.", url: "https://dora.run"},
  {name: "Hocoos", category: "AI Website Builders", domain: "hocoos.com", color: "#10B981", initDesc: "AI website builder.", url: "https://hocoos.com"},
  {name: "B12", category: "AI Website Builders", domain: "b12.io", color: "#3B82F6", initDesc: "Websites designed by AI.", url: "https://b12.io"}
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
