const fs = require('fs');

const newTools = [
  {
    "id": "realty-ai",
    "name": "Realty AI",
    "description": "AI tool for real estate agents to generate property listings and insights.",
    "category": "AI Real Estate Tools",
    "url": "https://realty.ai",
    "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 4.5,
    "featured": false,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "shopify-magic",
    "name": "Shopify Magic",
    "description": "AI capabilities built into Shopify for merchants to generate product descriptions.",
    "category": "AI Ecommerce Tools",
    "url": "https://shopify.com/magic",
    "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 4.7,
    "featured": false,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "monica-ai",
    "name": "Monica",
    "description": "Your AI copilot Chrome extension powered by GPT-4 and Claude.",
    "category": "AI Chrome Extensions",
    "url": "https://monica.im",
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.8,
    "featured": true,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "zapier-ai",
    "name": "Zapier AI",
    "description": "Automate your workflows by connecting apps with AI-powered natural language.",
    "category": "AI Workflow Automation",
    "url": "https://zapier.com/ai",
    "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.6,
    "featured": true,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "jasper-ai",
    "name": "Jasper",
    "description": "AI writing assistant for marketing copy, blog posts, and more.",
    "category": "AI Writing & Content",
    "url": "https://jasper.ai",
    "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 4.7,
    "featured": true,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "surfer-seo",
    "name": "Surfer SEO",
    "description": "AI SEO tool that analyzes SERPs to help you write optimized content.",
    "category": "Marketing & SEO",
    "url": "https://surferseo.com",
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 4.8,
    "featured": false,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "voiceflow",
    "name": "Voiceflow",
    "description": "Build scalable AI agents and chatbots collaboratively.",
    "category": "Chatbot Creator Tools",
    "url": "https://voiceflow.com",
    "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.9,
    "featured": true,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "intercom-fin",
    "name": "Intercom Fin",
    "description": "AI customer service bot that resolves issues using your support history.",
    "category": "Customer Support",
    "url": "https://intercom.com/fin",
    "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 4.6,
    "featured": false,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "elicit-ai",
    "name": "Elicit",
    "description": "The AI research assistant that helps you find and analyze academic papers.",
    "category": "Research & Analysis",
    "url": "https://elicit.com",
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.8,
    "featured": true,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "pika-labs",
    "name": "Pika",
    "description": "An idea-to-video platform that brings your creativity to motion.",
    "category": "Gen AI Creator Tools",
    "url": "https://pika.art",
    "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.7,
    "featured": false,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "galileo-ai",
    "name": "Galileo AI",
    "description": "Generates UI designs from simple text prompts.",
    "category": "UI/UX & Design Tools",
    "url": "https://usegalileo.ai",
    "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.5,
    "featured": false,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "alpha-sense",
    "name": "AlphaSense",
    "description": "Market intelligence and search platform powered by AI.",
    "category": "Business & Finance AI",
    "url": "https://alpha-sense.com",
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 4.7,
    "featured": false,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "khanmigo",
    "name": "Khanmigo",
    "description": "AI guide for teachers and students from Khan Academy.",
    "category": "Learning & Education",
    "url": "https://khanacademy.org/khanmigo",
    "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 4.9,
    "featured": true,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "auto-gpt",
    "name": "AutoGPT",
    "description": "An experimental open-source attempt to make GPT-4 fully autonomous.",
    "category": "AI Agents & Automation",
    "url": "https://autogpt.net",
    "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
    "pricing": "Open Source",
    "rating": 4.5,
    "featured": false,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "openai-api",
    "name": "OpenAI API",
    "description": "Access cutting-edge models like GPT-4, DALL-E, and Whisper.",
    "category": "LLM Providers & APIs",
    "url": "https://platform.openai.com",
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "pricing": "Usage Based",
    "rating": 4.9,
    "featured": true,
    "dateAdded": new Date().toISOString()
  }
];

let content = fs.readFileSync('data/tools.ts', 'utf8');
content = content.replace(/export const MOCK_TOOLS: Tool\[\] = \[\n/, 'export const MOCK_TOOLS: Tool[] = [\n' + newTools.map(t => '  ' + JSON.stringify(t, null, 4).replace(/\n/g, '\n  ') + ',').join('\n') + '\n');
fs.writeFileSync('data/tools.ts', content, 'utf8');

console.log('Added 15 more new tools!');
