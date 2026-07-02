const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, 'data', 'tools.ts');
let content = fs.readFileSync(toolsPath, 'utf8');

const newTools = [
  {
    id: "magical-ai",
    name: "Magical",
    description: "AI-powered text expander and autofill tool that automates repetitive typing and data entry.",
    longDescription: "Magical is a free productivity app that uses AI to speed up your everyday tasks like messaging, data entry, and sourcing. It works where you work, filling sheets and messages instantly.",
    category: "AI Workflow Automation",
    url: "https://getmagical.com",
    domain: "getmagical.com",
    brandColor: "#000000",
    imageUrl: "https://img.logo.dev/getmagical.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Freemium",
    rating: 4.8,
    featured: false,
    dateAdded: new Date().toISOString(),
    tags: ["Text Expander", "Data Entry", "Productivity"],
    useCases: ["Customer support replies", "Sales outreach", "Data extraction"],
    launchYear: 2020
  },
  {
    id: "phantombuster",
    name: "Phantombuster",
    description: "Automate any action on the web. Extract data and generate leads on autopilot.",
    longDescription: "Phantombuster provides a suite of automation tools for generating leads, scraping data, and automating actions on social networks like LinkedIn, Twitter, and more.",
    category: "AI Workflow Automation",
    url: "https://phantombuster.com",
    domain: "phantombuster.com",
    brandColor: "#3F3D56",
    imageUrl: "https://img.logo.dev/phantombuster.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Paid",
    rating: 4.6,
    featured: false,
    dateAdded: new Date().toISOString(),
    tags: ["Lead Generation", "Scraping", "Social Media"],
    useCases: ["LinkedIn automation", "Lead extraction", "CRM enrichment"],
    launchYear: 2016
  },
  {
    id: "mindos",
    name: "MindOS",
    description: "Build autonomous AI agents for your business workflows.",
    longDescription: "MindOS allows users to create customized AI agents capable of reasoning, using tools, and executing complex workflows without coding.",
    category: "AI Agents & Automation",
    url: "https://mindos.com",
    domain: "mindos.com",
    brandColor: "#6366F1",
    imageUrl: "https://img.logo.dev/mindos.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Freemium",
    rating: 4.5,
    featured: false,
    dateAdded: new Date().toISOString(),
    tags: ["Custom Agents", "Workflow", "No-Code"],
    useCases: ["Customer service automation", "Internal data query", "Process automation"],
    launchYear: 2023
  },
  {
    id: "bland-ai",
    name: "Bland AI",
    description: "Automate phone calls with ultra-realistic AI voice agents.",
    longDescription: "Bland AI provides infrastructure to build, test, and scale AI phone calling agents for customer support, sales, and operations.",
    category: "Voice & Audio AI",
    url: "https://bland.ai",
    domain: "bland.ai",
    brandColor: "#000000",
    imageUrl: "https://img.logo.dev/bland.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Usage Based",
    rating: 4.8,
    featured: true,
    dateAdded: new Date().toISOString(),
    tags: ["Voice", "Phone Calls", "Sales Automation"],
    useCases: ["Inbound customer support", "Outbound sales", "Appointment scheduling"],
    launchYear: 2023
  },
  {
    id: "airtable-ai",
    name: "Airtable AI",
    description: "Integrate AI into your workflows and apps to categorize, summarize, and translate data.",
    longDescription: "Airtable AI helps teams harness the power of generative AI directly in their workflows. It can draft content, summarize records, and translate text instantly.",
    category: "AI Workflow Automation",
    url: "https://airtable.com/product/ai",
    domain: "airtable.com",
    brandColor: "#F82B60",
    imageUrl: "https://img.logo.dev/airtable.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    pricing: "Paid",
    rating: 4.7,
    featured: false,
    dateAdded: new Date().toISOString(),
    tags: ["Databases", "Productivity", "Workflow"],
    useCases: ["Data categorization", "Content drafting", "Record summarization"],
    launchYear: 2023
  }
];

const newToolsJson = newTools.map(t => JSON.stringify(t, null, 2)).join(',\n');

if (content.endsWith('];\n') || content.endsWith('];')) {
  content = content.replace(/\];?$/, `,\n${newToolsJson}\n];\n`);
  fs.writeFileSync(toolsPath, content, 'utf8');
  console.log("Added new tools successfully.");
} else {
  console.log("Could not find the end of the array.");
}

