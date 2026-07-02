const fs = require('fs');

const path = './data/tools.ts';
let content = fs.readFileSync(path, 'utf8');

const newTools = [
  {
    id: "ai-tool-ui-path",
    name: "UiPath Autopilot",
    description: "Enterprise-grade AI automation that integrates Generative AI and specialized AI to automate complex workflows across legacy and modern systems.",
    url: "https://www.uipath.com/product/autopilot",
    pricing: "Enterprise",
    rating: 4.8,
    category: "AI Workflow Automation",
    tags: ["RPA", "Enterprise", "Workflow", "Integration"],
    featured: true,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    longDescription: "UiPath Autopilot leverages both generative AI and specialized AI to automate end-to-end workflows. It allows users to create automations via natural language, discover automation opportunities, and bridge legacy systems with modern cloud applications without extensive coding.",
    features: [
      "Natural language to automation",
      "Document understanding and extraction",
      "Seamless integration with legacy UI and APIs",
      "Enterprise security and governance"
    ],
    useCases: [
      "Invoice processing and data entry",
      "Customer onboarding workflows",
      "IT ticket resolution automation",
      "Cross-platform data migration"
    ]
  },
  {
    id: "ai-tool-copy-ai-workflows",
    name: "Copy.ai Workflows",
    description: "Automate your sales and marketing processes with AI workflows that connect to your CRM and generate personalized content at scale.",
    url: "https://www.copy.ai/workflows",
    pricing: "Freemium",
    rating: 4.7,
    category: "AI Workflow Automation",
    tags: ["Marketing", "Sales", "Content", "Workflow"],
    featured: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    longDescription: "Copy.ai Workflows transforms marketing and sales operations by automating the generation of personalized outreach, content briefs, and CRM updates. It seamlessly connects with tools like Salesforce and HubSpot to streamline the entire go-to-market motion.",
    features: [
      "Pre-built GTM automation templates",
      "CRM and email integration",
      "Bulk content generation",
      "Brand voice consistency"
    ],
    useCases: [
      "Automated personalized cold outreach",
      "Lead enrichment and summarization",
      "SEO content pipeline automation",
      "Social media scheduling and generation"
    ]
  },
  {
    id: "ai-tool-bland-ai",
    name: "Bland AI",
    description: "Hyper-realistic AI phone agents that can make and receive calls, automate customer support, and integrate directly with your existing software.",
    url: "https://www.bland.ai/",
    pricing: "Usage Based",
    rating: 4.9,
    category: "AI Agents & Automation",
    tags: ["Voice", "Agents", "Customer Support", "Sales"],
    featured: true,
    image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=800&q=80",
    longDescription: "Bland AI provides developers and businesses with an API to deploy hyper-realistic AI phone calling agents. These agents can handle complex conversations, book appointments, qualify leads, and perform API actions during the call based on user responses.",
    features: [
      "Ultra-low latency conversational voice AI",
      "Custom voice cloning and selection",
      "Mid-call API triggers",
      "Real-time call transcripts and analytics"
    ],
    useCases: [
      "Inbound customer support routing",
      "Outbound lead qualification calls",
      "Appointment scheduling and reminders",
      "Automated surveys and feedback collection"
    ]
  }
];

// Find the end of the MOCK_TOOLS array
const match = /export const MOCK_TOOLS: Tool\[\] = \[\s*([\s\S]*?)\];/g;
let lastMatch;
let m;
while ((m = match.exec(content)) !== null) {
  lastMatch = m;
}

if (lastMatch) {
  const toolsString = lastMatch[1];
  
  // Create the new string to append
  let addedToolsStr = "";
  for (const tool of newTools) {
    addedToolsStr += "  " + JSON.stringify(tool, null, 2).split('\n').join('\n  ') + ",\n";
  }

  const newArrayContent = "export const MOCK_TOOLS: Tool[] = [\n" + toolsString + "\n" + addedToolsStr + "];";
  const newContent = content.replace(lastMatch[0], newArrayContent);
  
  fs.writeFileSync(path, newContent, 'utf8');
  console.log("Successfully added automation tools to data/tools.ts");
} else {
  console.log("Could not find MOCK_TOOLS array.");
}
