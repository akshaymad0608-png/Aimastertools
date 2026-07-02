const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, 'data', 'tools.ts');
let content = fs.readFileSync(toolsPath, 'utf8');

const newTools = [
  {
    id: "taskade-ai",
    name: "Taskade AI",
    description: "Automate your workflows, generate tasks, and collaborate with AI agents.",
    longDescription: "Taskade provides an all-in-one collaborative workspace powered by AI agents. Users can build workflows, auto-generate task lists, and coordinate team actions seamlessly.",
    category: "AI Agents & Automation",
    url: "https://taskade.com",
    domain: "taskade.com",
    brandColor: "#FF1F6D",
    imageUrl: "https://img.logo.dev/taskade.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: new Date().toISOString(),
    tags: ["Productivity", "Automation", "Agents", "Workspaces"],
    useCases: ["Team collaboration", "Workflow automation", "Task generation"],
    launchYear: 2023
  },
  {
    id: "cheatlayer",
    name: "CheatLayer",
    description: "Build custom automation using natural language to control your browser.",
    longDescription: "CheatLayer acts as a custom AI agent that can script and automate business processes directly inside the browser using GPT-4 and custom local models.",
    category: "AI Workflow Automation",
    url: "https://cheatlayer.com",
    domain: "cheatlayer.com",
    brandColor: "#000000",
    imageUrl: "https://img.logo.dev/cheatlayer.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: new Date().toISOString(),
    tags: ["Browser Automation", "Scripting", "No-Code"],
    useCases: ["Web scraping", "Data entry automation", "Social media posting"],
    launchYear: 2021
  },
  {
    id: "browse-ai",
    name: "Browse AI",
    description: "The easiest way to extract and monitor data from any website without coding.",
    longDescription: "Train a robot in minutes to extract data or monitor websites. Browse AI lets you scrape websites using point-and-click and integrates with Google Sheets, Zapier, and more.",
    category: "AI Workflow Automation",
    url: "https://browse.ai",
    domain: "browse.ai",
    brandColor: "#3B82F6",
    imageUrl: "https://img.logo.dev/browse.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: new Date().toISOString(),
    tags: ["Scraping", "Data Extraction", "Automation"],
    useCases: ["Market research", "Lead generation", "Price monitoring"],
    launchYear: 2021
  },
  {
    id: "axiom-ai",
    name: "Axiom.ai",
    description: "Browser automation without code. Use AI to build bots.",
    longDescription: "Axiom lets users automate repetitive browser tasks, data entry, and scraping using an intuitive Chrome extension and AI-assisted bot builder.",
    category: "AI Agents & Automation",
    url: "https://axiom.ai",
    domain: "axiom.ai",
    brandColor: "#14B8A6",
    imageUrl: "https://img.logo.dev/axiom.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Freemium",
    rating: 4.7,
    featured: false,
    dateAdded: new Date().toISOString(),
    tags: ["Browser Extension", "Robotic Process Automation", "Scraping"],
    useCases: ["E-commerce automation", "Form filling", "Data migration"],
    launchYear: 2020
  },
  {
    id: "lindy-ai",
    name: "Lindy.ai",
    description: "Your autonomous AI employee. Automate your work with an AI assistant.",
    longDescription: "Lindy is a highly autonomous assistant that can act on your behalf across your tools, scheduling meetings, drafting emails, and managing your calendar.",
    category: "AI Agents & Automation",
    url: "https://lindy.ai",
    domain: "lindy.ai",
    brandColor: "#8B5CF6",
    imageUrl: "https://img.logo.dev/lindy.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Freemium",
    rating: 4.8,
    featured: true,
    dateAdded: new Date().toISOString(),
    tags: ["Virtual Assistant", "Scheduling", "Email Management"],
    useCases: ["Calendar management", "Email drafting", "Meeting coordination"],
    launchYear: 2023
  }
];

const newToolsJson = newTools.map(t => JSON.stringify(t, null, 2)).join(',\n');

if (content.endsWith('];\n') || content.endsWith('];')) {
  // Replace the last ]; with , \n ...newToolsJson \n ];
  content = content.replace(/\];?$/, `,\n${newToolsJson}\n];\n`);
  fs.writeFileSync(toolsPath, content, 'utf8');
  console.log("Added new tools successfully.");
} else {
  console.log("Could not find the end of the array.");
}

