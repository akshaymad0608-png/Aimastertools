const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf8');

// 1. Update CATEGORY_META to include Gen AI Creator Tools
if (!content.includes('Gen AI Creator Tools')) {
  content = content.replace(
    "{ id: 'Image & Art Generation',    name: 'Image & Art Generation'",
    "{ id: 'Gen AI Creator Tools',      name: 'Gen AI Creator Tools',      icon: 'ti-wand',         bg: '#EEEDFE', color: '#534AB7' },\n  { id: 'Image & Art Generation',    name: 'Image & Art Generation'"
  );
}

// 2. Add Gen AI Creator tools
const newTools = `  {
    "id": "runwayml",
    "name": "Runway",
    "description": "Advancing creativity with artificial intelligence. Offers Gen-3 Alpha for high-fidelity text-to-video and image-to-video generation.",
    "category": "Gen AI Creator Tools",
    "pricing": "Freemium",
    "imageUrl": "https://img.logo.dev/runwayml.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://runwayml.com", "domain": "runwayml.com", "brandColor": "#000000",
    "featured": true,
    "rating": 4.9,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Video Generation", "Generative AI", "Creative Suite"]
  },
  {
    "id": "luma-dream-machine",
    "name": "Luma Dream Machine",
    "description": "An AI model that makes high quality, realistic videos fast from text and images.",
    "category": "Gen AI Creator Tools",
    "pricing": "Freemium",
    "imageUrl": "https://img.logo.dev/lumalabs.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://lumalabs.ai/dream-machine", "domain": "lumalabs.ai", "brandColor": "#000000",
    "featured": true,
    "rating": 4.8,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Video Generation", "Text-to-Video", "Generative AI"]
  },
  {
    "id": "pika-labs",
    "name": "Pika",
    "description": "An idea-to-video platform that sets your creativity in motion. Generate videos from text, images, or existing videos.",
    "category": "Gen AI Creator Tools",
    "pricing": "Freemium",
    "imageUrl": "https://img.logo.dev/pika.art?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://pika.art", "domain": "pika.art", "brandColor": "#f8f9fb",
    "featured": false,
    "rating": 4.7,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Video Generation", "Animation", "Generative AI"]
  },
  {
    "id": "scenario-gg",
    "name": "Scenario",
    "description": "AI-generated game assets. Train your own AI models to generate consistent assets matching your game's art style.",
    "category": "Gen AI Creator Tools",
    "pricing": "Freemium",
    "imageUrl": "https://img.logo.dev/scenario.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://scenario.com", "domain": "scenario.com", "brandColor": "#0e1117",
    "featured": false,
    "rating": 4.6,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Game Development", "Assets", "Generative AI"]
  },
  {
    "id": "leonardo-ai-gen",
    "name": "Leonardo.Ai",
    "description": "Create production-quality visual assets with unprecedented quality, speed, and style-consistency.",
    "category": "Gen AI Creator Tools",
    "pricing": "Freemium",
    "imageUrl": "https://img.logo.dev/leonardo.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://leonardo.ai", "domain": "leonardo.ai", "brandColor": "#15181c",
    "featured": false,
    "rating": 4.8,
    "dateAdded": "2026-05-09T00:00:00Z",
    "tags": ["Image Generation", "Assets", "Generative AI"]
  },
`;

if (!content.includes('"id": "runwayml"')) {
  // Insert at start of MOCK_TOOLS array
  content = content.replace(
    "export const MOCK_TOOLS: Tool[] = [",
    "export const MOCK_TOOLS: Tool[] = [\n" + newTools
  );
}

fs.writeFileSync('constants.tsx', content);
console.log('Gen AI Creator Tools added to constants.tsx');
