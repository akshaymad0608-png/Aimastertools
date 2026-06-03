const fs = require('fs');
const file = 'constants.tsx';
let data = fs.readFileSync(file, 'utf8');

const regex = /export const MOCK_TOOLS: Tool\[\] = \[([\s\S]+?)\];\n\nexport const CATEGORIES/m;
const match = data.match(regex);
if (!match) {
  console.log("Could not find MOCK_TOOLS array!");
  process.exit(1);
}

const newTools = [
  // Image & Art Generation
  {name: "Midjourney", category: "Image & Art Generation", domain: "midjourney.com", color: "#FFFFFF", initDesc: "An independent research lab exploring new mediums of thought with AI image generation.", url: "https://midjourney.com"},
  {name: "DALL-E 3", category: "Image & Art Generation", domain: "openai.com", color: "#10A37F", initDesc: "OpenAI's latest text-to-image AI model, available in ChatGPT Plus.", url: "https://openai.com/dall-e-3"},
  {name: "Stable Diffusion", category: "Image & Art Generation", domain: "stability.ai", color: "#6C1D45", initDesc: "A powerful, open-source latent text-to-image diffusion model.", url: "https://stability.ai/"},
  {name: "Playground AI", category: "Image & Art Generation", domain: "playgroundai.com", color: "#2563EB", initDesc: "A free-to-use online AI image creator.", url: "https://playgroundai.com"},
  {name: "DeepDream", category: "Image & Art Generation", domain: "deepdreamgenerator.com", color: "#F59E0B", initDesc: "An AI image generator using deep learning algorithms.", url: "https://deepdreamgenerator.com"},
  {name: "NightCafe", category: "Image & Art Generation", domain: "nightcafe.studio", color: "#3B82F6", initDesc: "AI Art Generator App.", url: "https://creator.nightcafe.studio"},

  // Video & Audio Tools
  {name: "RunwayML", category: "Video & Audio Tools", domain: "runwayml.com", color: "#000000", initDesc: "AI magic tools for creators, including text-to-video capabilities.", url: "https://runwayml.com"},
  {name: "Descript", category: "Video & Audio Tools", domain: "descript.com", color: "#10B981", initDesc: "All-in-one audio and video editing, as easy as a doc.", url: "https://descript.com"},
  {name: "Mubert", category: "Video & Audio Tools", domain: "mubert.com", color: "#F59E0B", initDesc: "AI generative music for all your needs.", url: "https://mubert.com"},
  {name: "ElevenLabs", category: "Video & Audio Tools", domain: "elevenlabs.io", color: "#000000", initDesc: "Prime AI text to speech and voice cloning.", url: "https://elevenlabs.io"},
  {name: "Synthesia", category: "Video & Audio Tools", domain: "synthesia.io", color: "#2563EB", initDesc: "Create professional AI videos from text in 120+ languages.", url: "https://synthesia.io"},
  
  // Code & Development
  {name: "GitHub Copilot", category: "Code & Development", domain: "github.com", color: "#000000", initDesc: "Your AI pair programmer.", url: "https://github.com/features/copilot"},
  {name: "Cursor", category: "Code & Development", domain: "cursor.sh", color: "#000000", initDesc: "The AI-first code editor.", url: "https://cursor.sh"},
  {name: "Codeium", category: "Code & Development", domain: "codeium.com", color: "#10B981", initDesc: "Free AI code completion and chat.", url: "https://codeium.com"},
  {name: "Tabnine", category: "Code & Development", domain: "tabnine.com", color: "#3B82F6", initDesc: "AI assistant for software developers.", url: "https://tabnine.com"},
  {name: "Vercel v0", category: "Code & Development", domain: "v0.dev", color: "#000000", initDesc: "Generate UI with AI.", url: "https://v0.dev"},

  // Search Engines
  {name: "Perplexity", category: "AI Search Engines", domain: "perplexity.ai", color: "#00A389", initDesc: "Where knowledge begins: AI-powered search.", url: "https://perplexity.ai"},
  {name: "You.com", category: "AI Search Engines", domain: "you.com", color: "#2563EB", initDesc: "The AI search engine you control.", url: "https://you.com"},
  {name: "Andi", category: "AI Search Engines", domain: "andisearch.com", color: "#EC4899", initDesc: "Search for the next generation.", url: "https://andisearch.com"},
  {name: "Komo", category: "AI Search Engines", domain: "komo.ai", color: "#F59E0B", initDesc: "AI Search Engine for fast answers.", url: "https://komo.ai"},
  
  // Marketing & SEO
  {name: "Jasper", category: "Marketing & SEO", domain: "jasper.ai", color: "#2563EB", initDesc: "AI copilot for enterprise marketing teams.", url: "https://jasper.ai"},
  {name: "Copy.ai", category: "Marketing & SEO", domain: "copy.ai", color: "#10B981", initDesc: "Whatever you want to ask, our AI has the answer.", url: "https://copy.ai"},
  {name: "Surfer SEO", category: "Marketing & SEO", domain: "surferseo.com", color: "#3B82F6", initDesc: "SEO workflow that boosts organic traffic.", url: "https://surferseo.com"},
  {name: "Writesonic", category: "Marketing & SEO", domain: "writesonic.com", color: "#EC4899", initDesc: "Best AI Writer, Copywriting & Paraphrasing Tool.", url: "https://writesonic.com"},
  {name: "Mutiny", category: "Marketing & SEO", domain: "mutinyhq.com", color: "#000000", initDesc: "No-code AI platform that converts your website visitors.", url: "https://mutinyhq.com"}
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
