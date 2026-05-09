const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf8');

// 1. Update CATEGORY_META to include Voice Creator Tools
if (!content.includes('Voice Creator Tools')) {
  content = content.replace(
    "{ id: 'Video & Audio Tools',       name: 'Video & Audio Tools'",
    "{ id: 'Voice Creator Tools',       name: 'Voice Creator Tools',       icon: 'ti-microphone',     bg: '#FBEAF0', color: '#72243E' },\n  { id: 'Video & Audio Tools',       name: 'Video & Audio Tools'"
  );
}

// 2. Add Voice tools
const newTools = `  {
    "id": "playht",
    "name": "PlayHT",
    "description": "Ultra-realistic text-to-speech voice generation. Clone your voice or choose from hundreds of languages and accents.",
    "category": "Voice Creator Tools",
    "price": "Freemium",
    "image": "https://img.logo.dev/play.ht?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://play.ht", "domain": "play.ht", "brandColor": "#0c0c0c",
    "isFeatured": true,
    "rating": 4.8,
    "reviewCount": 3120,
    "features": ["Voice Cloning", "API Access", "Multiple Languages"],
    "tags": ["TTS", "Voiceover", "Audio"]
  },
  {
    "id": "murf-ai",
    "name": "Murf AI",
    "description": "Create studio-quality voiceovers in minutes. Features pitch control, emphasis, and audio sync.",
    "category": "Voice Creator Tools",
    "price": "Freemium",
    "image": "https://img.logo.dev/murf.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://murf.ai", "domain": "murf.ai", "brandColor": "#0a1f44",
    "isFeatured": true,
    "rating": 4.7,
    "reviewCount": 2400,
    "features": ["Video Editor", "120+ Voices", "Team Collaboration"],
    "tags": ["Voiceover", "Presentation", "Audio"]
  },
  {
    "id": "speechify-voice",
    "name": "Speechify",
    "description": "Listen to docs, articles, PDF, email, and various other formats. Also offers a robust text-to-speech creation tool.",
    "category": "Voice Creator Tools",
    "price": "Freemium",
    "image": "https://img.logo.dev/speechify.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://speechify.com", "domain": "speechify.com", "brandColor": "#1d6afa",
    "isFeatured": false,
    "rating": 4.9,
    "reviewCount": 8500,
    "features": ["Reading Assistant", "AI Voiceovers", "Chrome Extension"],
    "tags": ["TTS", "Accessibility", "Voice"]
  },
  {
    "id": "lovo-ai",
    "name": "Lovo.ai",
    "description": "Award-winning AI Voice Generator and text to speech platform with 500+ voices in 100 languages.",
    "category": "Voice Creator Tools",
    "price": "Freemium",
    "image": "https://img.logo.dev/lovo.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://lovo.ai", "domain": "lovo.ai", "brandColor": "#8d43ff",
    "isFeatured": false,
    "rating": 4.6,
    "reviewCount": 1850,
    "features": ["Genny Editor", "Video Dubbing", "Emotion Control"],
    "tags": ["TTS", "Video Creation", "Audio"]
  },
  {
    "id": "resemble-ai",
    "name": "Resemble AI",
    "description": "Generate AI voices for your games, videos, and applications. Offers real-time voice cloning APIs.",
    "category": "Voice Creator Tools",
    "price": "Paid",
    "image": "https://img.logo.dev/resemble.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "url": "https://resemble.ai", "domain": "resemble.ai", "brandColor": "#0b1521",
    "isFeatured": false,
    "rating": 4.5,
    "reviewCount": 920,
    "features": ["API", "Deepfake Detection", "Low Latency"],
    "tags": ["Voice Cloning", "Developers", "Audio"]
  },
`;

if (!content.includes('"id": "playht"')) {
  // Insert at start of MOCK_TOOLS array
  content = content.replace(
    "export const MOCK_TOOLS: Tool[] = [",
    "export const MOCK_TOOLS: Tool[] = [\n" + newTools
  );
}

fs.writeFileSync('constants.tsx', content);
console.log('Voice Creator Tools added to constants.tsx');
