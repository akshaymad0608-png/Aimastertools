const fs = require('fs');

const newTools = [
  {
    "id": "claude-3-5",
    "name": "Claude 3.5 Sonnet",
    "description": "Anthropic's latest AI model for fast and intelligent text generation and coding.",
    "category": "AI Chatbots & Assistants",
    "url": "https://claude.ai",
    "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.9,
    "featured": true,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "perplexity-ai-search",
    "name": "Perplexity AI",
    "description": "AI-powered answer engine that searches the web to provide real-time, cited answers.",
    "category": "AI Search Engines",
    "url": "https://perplexity.ai",
    "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.8,
    "featured": true,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "midjourney-v7",
    "name": "Midjourney",
    "description": "Advanced AI image generation tool running via Discord for high-quality art.",
    "category": "Image & Art Generation",
    "url": "https://midjourney.com",
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 4.9,
    "featured": true,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "github-copilot-x",
    "name": "GitHub Copilot",
    "description": "AI pair programmer that suggests code completions inside your IDE.",
    "category": "Code & Development",
    "url": "https://github.com/features/copilot",
    "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 4.7,
    "featured": true,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "runway-gen3",
    "name": "Runway Gen-3",
    "description": "Next-generation text-to-video and image-to-video generation model.",
    "category": "Video & Audio Tools",
    "url": "https://runwayml.com",
    "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 4.6,
    "featured": true,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "elevenlabs-voice",
    "name": "ElevenLabs",
    "description": "Realistic text-to-speech and voice cloning platform with immense emotion range.",
    "category": "Voice & Audio AI",
    "url": "https://elevenlabs.io",
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.8,
    "featured": true,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "tome-presentations",
    "name": "Tome",
    "description": "AI-powered storytelling format to generate presentations and outlines.",
    "category": "AI Presentation Tools",
    "url": "https://tome.app",
    "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.5,
    "featured": false,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "otter-ai",
    "name": "Otter.ai",
    "description": "AI meeting assistant that records, transcribes, and summarizes meetings.",
    "category": "AI Meeting Assistants",
    "url": "https://otter.ai",
    "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.7,
    "featured": true,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "chatpdf-plus",
    "name": "ChatPDF",
    "description": "Talk to any PDF document using AI. Great for students and researchers.",
    "category": "AI PDF & Document Tools",
    "url": "https://chatpdf.com",
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.6,
    "featured": false,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "superhuman-ai",
    "name": "Superhuman AI",
    "description": "Blazing fast email client with built-in AI for drafting and summarizing emails.",
    "category": "AI Email Assistants",
    "url": "https://superhuman.com",
    "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 4.8,
    "featured": false,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "kickresume-ai",
    "name": "Kickresume",
    "description": "AI resume builder with templates and auto-generated bullet points.",
    "category": "AI Resume & Career Tools",
    "url": "https://kickresume.com",
    "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.5,
    "featured": false,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "framer-ai",
    "name": "Framer AI",
    "description": "Design and publish stunning websites with AI generation.",
    "category": "AI Website Builders",
    "url": "https://framer.com",
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.7,
    "featured": true,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "taplio-ai",
    "name": "Taplio",
    "description": "AI-powered LinkedIn tool for growing your personal brand.",
    "category": "AI Social Media Tools",
    "url": "https://taplio.com",
    "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 4.4,
    "featured": false,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "darktrace-ai",
    "name": "Darktrace",
    "description": "Cybersecurity AI that detects and responds to cyber threats in real-time.",
    "category": "AI Cybersecurity Tools",
    "url": "https://darktrace.com",
    "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 4.8,
    "featured": false,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "glass-health",
    "name": "Glass Health",
    "description": "AI-assisted diagnosis and clinical knowledge management for doctors.",
    "category": "AI Healthcare Tools",
    "url": "https://glass.health",
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.6,
    "featured": false,
    "dateAdded": new Date().toISOString()
  }
];

let content = fs.readFileSync('data/tools.ts', 'utf8');
content = content.replace(/export const MOCK_TOOLS: Tool\[\] = \[\n/, 'export const MOCK_TOOLS: Tool[] = [\n' + newTools.map(t => '  ' + JSON.stringify(t, null, 4).replace(/\n/g, '\n  ') + ',').join('\n') + '\n');
fs.writeFileSync('data/tools.ts', content, 'utf8');

console.log('Added 15 new tools across various categories!');
