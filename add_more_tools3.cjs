const fs = require('fs');

const newTools = [
  {
    "id": "eightfold-ai",
    "name": "Eightfold AI",
    "description": "Talent intelligence platform to hire and retain talent using AI.",
    "category": "HR & Recruiting",
    "url": "https://eightfold.ai",
    "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 4.6,
    "featured": false,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "lumalabs-ai",
    "name": "Luma AI",
    "description": "Create photorealistic 3D assets and environments using AI.",
    "category": "3D & Animation",
    "url": "https://lumalabs.ai",
    "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.7,
    "featured": true,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "julius-ai",
    "name": "Julius AI",
    "description": "Your AI data analyst. Chat with your data and create visualizations.",
    "category": "Data Science & Analytics",
    "url": "https://julius.ai",
    "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    "pricing": "Freemium",
    "rating": 4.8,
    "featured": true,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "harvey-ai",
    "name": "Harvey",
    "description": "Custom LLM solutions for elite law firms.",
    "category": "Legal & Compliance",
    "url": "https://harvey.ai",
    "imageUrl": "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 4.9,
    "featured": false,
    "dateAdded": new Date().toISOString()
  },
  {
    "id": "inworld-ai",
    "name": "Inworld",
    "description": "Platform for creating AI-driven non-player characters for games.",
    "category": "Gaming & Entertainment",
    "url": "https://inworld.ai",
    "imageUrl": "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
    "pricing": "Paid",
    "rating": 4.7,
    "featured": true,
    "dateAdded": new Date().toISOString()
  }
];

let content = fs.readFileSync('data/tools.ts', 'utf8');
content = content.replace(/export const MOCK_TOOLS: Tool\[\] = \[\n/, 'export const MOCK_TOOLS: Tool[] = [\n' + newTools.map(t => '  ' + JSON.stringify(t, null, 4).replace(/\n/g, '\n  ') + ',').join('\n') + '\n');
fs.writeFileSync('data/tools.ts', content, 'utf8');

console.log('Added 5 more new tools!');
