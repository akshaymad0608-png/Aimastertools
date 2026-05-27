const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf8');

// 1. Add categories
const newCategories = `  { id: 'Customer Support',          name: 'Customer Support',          icon: 'ti-headphone-alt',  bg: '#EAF3DE', color: '#3B6D11' },
  { id: 'HR & Recruiting',           name: 'HR & Recruiting',           icon: 'ti-id-badge',       bg: '#FBEAF0', color: '#72243E' },
  { id: '3D & Animation',            name: '3D & Animation',            icon: 'ti-box',            bg: '#E6F1FB', color: '#185FA5' },
  { id: 'Data Science & Analytics',  name: 'Data Science & Analytics',  icon: 'ti-bar-chart',      bg: '#FAEEDA', color: '#633806' },
  { id: 'Legal & Compliance',        name: 'Legal & Compliance',        icon: 'ti-ruler-pencil',   bg: '#EEEDFE', color: '#534AB7' },
  { id: 'Gaming & Entertainment',    name: 'Gaming & Entertainment',    icon: 'ti-game',           bg: '#E1F5EE', color: '#0F6E56' },
`;

content = content.replace(/  \{ id: 'LLM Providers & APIs'.*\n\];/, match => {
  return match.replace('];', newCategories + '];');
});

const brands = [
    ["Intercom AI", "intercom.com", "Customer Support", "Answers customer queries instantly using AI.", "#000000", "Paid"],
    ["Zendesk AI", "zendesk.com", "Customer Support", "Advanced AI bots for quick ticket resolution and self-service.", "#03363D", "Paid"],
    ["Kustomer", "kustomer.com", "Customer Support", "CRM that leverages AI to proactively resolve support issues.", "#2A3D4C", "Paid"],
    ["Eightfold", "eightfold.ai", "HR & Recruiting", "Talent intelligence platform using AI for hiring and retention.", "#000000", "Paid"],
    ["SeekOut", "seekout.com", "HR & Recruiting", "AI-powered recruiting platform to find diverse and hidden talent.", "#1D4ED8", "Paid"],
    ["Textio", "textio.com", "HR & Recruiting", "Augmented writing platform that helps write unbiased job descriptions.", "#14B8A6", "Freemium"],
    ["Spline", "spline.design", "3D & Animation", "3D design tool with AI features for web and collaborative modeling.", "#8B5CF6", "Freemium"],
    ["Luma AI", "lumalabs.ai", "3D & Animation", "Create life-like 3D models using AI from photos or text.", "#000000", "Freemium"],
    ["Masterpiece X", "masterpiecex.com", "3D & Animation", "AI text-to-3D model generation for games and creators.", "#EC4899", "Free"],
    ["Tableau GPT", "tableau.com", "Data Science & Analytics", "AI analytics to democratize data insights using conversational UI.", "#F97316", "Paid"],
    ["Akkio", "akkio.com", "Data Science & Analytics", "No-code AI platform for forecasting and predictive analytics.", "#111827", "Freemium"],
    ["Julius AI", "julius.ai", "Data Science & Analytics", "Your AI data analyst. Chat with your data and create charts instantly.", "#2563EB", "Freemium"],
    ["Harvey", "harvey.ai", "Legal & Compliance", "Generative AI for elite law firms to assist in drafting and research.", "#09090B", "Paid"],
    ["Robin AI", "robinai.com", "Legal & Compliance", "Legal copilot for drafting, editing, and querying contracts.", "#0EA5E9", "Paid"],
    ["Lexion", "lexion.ai", "Legal & Compliance", "AI-powered contract management system for legal teams.", "#4F46E5", "Paid"],
    ["Inworld AI", "inworld.ai", "Gaming & Entertainment", "Create intelligent non-player characters (NPCs) for games and VR.", "#10B981", "Freemium"],
    ["Scenario", "scenario.com", "Gaming & Entertainment", "Train custom AI models to generate game assets consistently.", "#6366F1", "Freemium"],
    ["Rosebud AI", "rosebud.ai", "Gaming & Entertainment", "AI that helps developers build games from text descriptions.", "#EF4444", "Freemium"],
    ["Writesonic", "writesonic.com", "AI Writing & Content", "AI writer that creates SEO-friendly content for blogs and ads.", "#0F172A", "Freemium"],
    ["Rytr", "rytr.me", "AI Writing & Content", "An AI writing assistant that helps you create high-quality content.", "#F59E0B", "Freemium"],
    ["Anyword", "anyword.com", "AI Writing & Content", "AI copywriting software that uses data to optimize conversions.", "#3B82F6", "Paid"],
    ["Synthesia", "synthesia.io", "Video & Audio Tools", "Create professional AI videos from text in over 120 languages.", "#1E40AF", "Paid"],
    ["HeyGen", "heygen.com", "Video & Audio Tools", "AI video generator for producing studio-quality videos with avatars.", "#7C3AED", "Freemium"],
    ["Descript", "descript.com", "Video & Audio Tools", "Reimagine video & audio editing as easy as editing a text doc.", "#3B82F6", "Freemium"],
    ["ElevenLabs", "elevenlabs.io", "Video & Audio Tools", "The most realistic text-to-speech and AI voice generator.", "#171717", "Freemium"],
    ["GitHub Copilot", "github.com/features/copilot", "Code & Development", "Your AI pair programmer that suggests code and entire functions.", "#1F2328", "Paid"],
    ["Cursor", "cursor.sh", "Code & Development", "The AI-first IDE built to help you code faster and smarter.", "#000000", "Freemium"],
    ["Tabnine", "tabnine.com", "Code & Development", "AI assistant for software developers, prioritizing privacy.", "#2563EB", "Freemium"],
    ["Codeium", "codeium.com", "Code & Development", "The modern coding superpower for autocomplete and chat.", "#10B981", "Free"],
    ["Midjourney", "midjourney.com", "Image & Art Generation", "An independent research lab producing proprietary artificial intelligence programs that create images from textual descriptions.", "#000000", "Paid"],
    ["Stable Diffusion", "stability.ai", "Image & Art Generation", "A latent text-to-image diffusion model capable of generating photo-realistic images.", "#6366F1", "Open Source"],
    ["Leonardo.ai", "leonardo.ai", "Image & Art Generation", "Generate production-quality assets for your creative projects.", "#F472B6", "Freemium"],
    ["Glean", "glean.com", "Productivity & Automation", "Workplace search and AI assistant that connects all your company data.", "#2563EB", "Paid"],
    ["Notion AI", "notion.so", "Productivity & Automation", "Work smart, write faster, and think bigger right inside Notion.", "#000000", "Paid"],
    ["Mem", "mem.ai", "Productivity & Automation", "The AI workspace that is personalized to you and your team.", "#6366F1", "Freemium"],
    ["Rewind", "rewind.ai", "Productivity & Automation", "The search engine for your life. Find anything you've seen, said, or heard.", "#8B5CF6", "Paid"],
    ["Tome", "tome.app", "Productivity & Automation", "The AI-powered storytelling format to build presentations faster.", "#EC4899", "Freemium"],
    ["Gamma", "gamma.app", "Productivity & Automation", "A new medium for presenting ideas, powered by AI. No formatting needed.", "#F59E0B", "Freemium"],
    ["Fireflies.ai", "fireflies.ai", "Productivity & Automation", "Automate your meeting notes. Record, transcribe, search and analyze voice conversations.", "#3B82F6", "Freemium"],
    ["Fathom", "fathom.video", "Productivity & Automation", "Free AI Meeting Assistant that records, transcribes, and summarizes Zoom calls.", "#10B981", "Free"],
    ["Taskade", "taskade.com", "Productivity & Automation", "AI productivity workspace for remote teams. Chat, plan, and work together.", "#EC4899", "Freemium"]
];

let output = "";
brands.forEach((brand) => {
    const id = brand[0].toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    output += "  },\n";
    output += "  {\n";
    output += "    id: '" + id + "',\n";
    output += "    name: '" + brand[0].replace(/'/g, "\\'") + "',\n";
    output += "    description: '" + brand[3].replace(/'/g, "\\'") + "',\n";
    output += "    category: '" + brand[2] + "',\n";
    output += "    url: 'https://" + brand[1] + "',\n";
    output += "    domain: '" + brand[1] + "',\n";
    output += "    brandColor: '" + brand[4] + "',\n";
    output += "    imageUrl: 'https://img.logo.dev/" + brand[1] + "?token=pk_Yy124-7wSK-z-Hym446V9A',\n";
    output += "    pricing: '" + brand[5] + "',\n";
    output += "    rating: " + (4.5 + Math.random() * 0.4).toFixed(1) + ",\n";
    output += "    featured: " + (Math.random() > 0.7) + ",\n";
    let day = String(10 + Math.floor(Math.random()*15)).padStart(2,'0');
    output += "    dateAdded: '2026-05-" + day + "T10:00:00.000Z',\n";
    output += "    tags: ['" + brand[2].split(' ')[0] + "', 'AI']\n";
});

const newToolsSnippet = output + "  }\n];";

const marker = 'export const CATEGORIES';
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
