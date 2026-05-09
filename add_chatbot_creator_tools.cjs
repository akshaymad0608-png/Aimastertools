const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf8');

// 1. Update CATEGORY_META to include Chatbot Creator Tools
if (!content.includes('Chatbot Creator Tools')) {
  content = content.replace(
    "{ id: 'AI Chatbots & Assistants',  name: 'AI Chatbots & Assistants'",
    "{ id: 'Chatbot Creator Tools',     name: 'Chatbot Creator Tools',     icon: 'ti-messages',     bg: '#EAF3DE', color: '#3B6D11' },\n  { id: 'AI Chatbots & Assistants',  name: 'AI Chatbots & Assistants'"
  );
}

// 2. Add Chatbot Creator tools
const newTools = `  {
    "id": "voiceflow",
    "name": "Voiceflow",
    "description": "Collaborative AI agent builder. Design, test, and launch conversational assistants and chatbots.",
    "category": "Chatbot Creator Tools",
    "pricing": "Freemium",
    "imageUrl": "https://img.logo.dev/voiceflow.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://voiceflow.com", "domain": "voiceflow.com", "brandColor": "#0b5bff",
    "featured": true,
    "rating": 4.8,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Chatbots", "AI Agents", "No-Code"]
  },
  {
    "id": "botpress",
    "name": "Botpress",
    "description": "The first OpenAI-powered generative AI platform for building ChatGPT-like bots for your business.",
    "category": "Chatbot Creator Tools",
    "pricing": "Freemium",
    "imageUrl": "https://img.logo.dev/botpress.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://botpress.com", "domain": "botpress.com", "brandColor": "#292e35",
    "featured": true,
    "rating": 4.7,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Chatbots", "Customer Service", "GPT-4"]
  },
  {
    "id": "chatbase",
    "name": "Chatbase",
    "description": "Custom ChatGPT for your data. Upload documents or add a link to your website and get a chatbot that answers questions about it.",
    "category": "Chatbot Creator Tools",
    "pricing": "Paid",
    "imageUrl": "https://img.logo.dev/chatbase.co?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://chatbase.co", "domain": "chatbase.co", "brandColor": "#000000",
    "featured": false,
    "rating": 4.6,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Chatbots", "Data", "Knowledge Base"]
  },
  {
    "id": "dante-ai",
    "name": "Dante AI",
    "description": "Create custom AI chatbots powered by GPT-4 trained on your own data in minutes with zero coding.",
    "category": "Chatbot Creator Tools",
    "pricing": "Freemium",
    "imageUrl": "https://img.logo.dev/dante-ai.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://dante-ai.com", "domain": "dante-ai.com", "brandColor": "#534AB7",
    "featured": false,
    "rating": 4.5,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Chatbots", "No-Code", "AI Agents"]
  },
  {
    "id": "stack-ai",
    "name": "Stack AI",
    "description": "No-code AI platform to build, deploy, and scale enterprise-grade AI applications and chatbots.",
    "category": "Chatbot Creator Tools",
    "pricing": "Paid",
    "imageUrl": "https://img.logo.dev/stack-ai.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://stack-ai.com", "domain": "stack-ai.com", "brandColor": "#0f172a",
    "featured": false,
    "rating": 4.7,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Chatbots", "Enterprise", "Workflow"]
  },
`;

if (!content.includes('"id": "voiceflow"')) {
  // Insert at start of MOCK_TOOLS array
  content = content.replace(
    "export const MOCK_TOOLS: Tool[] = [",
    "export const MOCK_TOOLS: Tool[] = [\n" + newTools
  );
}

fs.writeFileSync('constants.tsx', content);
console.log('Chatbot Creator Tools added to constants.tsx');
