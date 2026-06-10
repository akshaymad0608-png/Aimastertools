const fs = require('fs');
const path = require('path');

const newTools = [
  {
    "id": "suno-ai",
    "name": "Suno AI",
    "description": "Groundbreaking music generation model capable of creating full songs with realistic vocals from text.",
    "longDescription": "Comprehensive review of Suno AI. Allows anyone to type a prompt and receive fully produced musical tracks featuring surprisingly human-sounding vocalists.",
    "category": "Video & Audio Generation",
    "url": "https://suno.com",
    "domain": "suno.com",
    "brandColor": "#000000",
    "imageUrl": "https://img.logo.dev/suno.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Freemium",
    "rating": 4.9,
    "featured": true,
    "dateAdded": new Date().toISOString(),
    "tags": ["Music", "Vocals", "Audio"],
    "useCases": ["Podcast intro music", "Personalized song creation"],
    "launchYear": 2023
  },
  {
    "id": "udio",
    "name": "Udio",
    "description": "High-fidelity AI music creator specializing in generating professional-grade tracks across all musical genres.",
    "longDescription": "Comprehensive review of Udio. Created by former DeepMind researchers, it produces astoundingly high quality, crisp musical outputs.",
    "category": "Video & Audio Generation",
    "url": "https://udio.com",
    "domain": "udio.com",
    "brandColor": "#FA4D2A",
    "imageUrl": "https://img.logo.dev/udio.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Freemium",
    "rating": 4.8,
    "featured": false,
    "dateAdded": new Date().toISOString(),
    "tags": ["Music", "Vocal Generation", "Beatmaking"],
    "useCases": ["Royalty-free background tracks", "Vocal sample generation"],
    "launchYear": 2024
  },
  {
    "id": "pika-art",
    "name": "Pika Labs",
    "description": "Powerful text-to-video platform ideal for creating realistic motion animations and cinematic clips.",
    "longDescription": "Comprehensive review of Pika Labs. Rapidly turning text and images into engaging 3D animations, cinematic sequences, and anime styling.",
    "category": "Video & Audio Generation",
    "url": "https://pika.art",
    "domain": "pika.art",
    "brandColor": "#000000",
    "imageUrl": "https://img.logo.dev/pika.art?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Freemium",
    "rating": 4.7,
    "featured": false,
    "dateAdded": new Date().toISOString(),
    "tags": ["Text to Video", "Animation", "Cinematic"],
    "useCases": ["Commercial video b-roll", "Animated storytelling"],
    "launchYear": 2023
  },
  {
    "id": "heygen",
    "name": "HeyGen",
    "description": "Generate professional business videos using highly realistic AI avatars speaking naturally in multiple languages.",
    "longDescription": "Comprehensive review of HeyGen. A premier avatar creation suite allowing brands to produce marketing videos without cameras or actors.",
    "category": "Video & Audio Generation",
    "url": "https://heygen.com",
    "domain": "heygen.com",
    "brandColor": "#5E35B1",
    "imageUrl": "https://img.logo.dev/heygen.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Freemium",
    "rating": 4.8,
    "featured": true,
    "dateAdded": new Date().toISOString(),
    "tags": ["Avatars", "Spokesperson", "Multi-lingual"],
    "useCases": ["Educational course recording", "Localized marketing campaigns"],
    "launchYear": 2020
  },
  {
    "id": "leonardo-ai",
    "name": "Leonardo.AI",
    "description": "Production-quality image generation suite designed for game assets, character design, and concept art.",
    "longDescription": "Comprehensive review of Leonardo AI. Offers an incredibly extensive set of fine-tuned models for specific aesthetic outputs alongside canvas editing tools.",
    "category": "Image & Art Generation",
    "url": "https://leonardo.ai",
    "domain": "leonardo.ai",
    "brandColor": "#0F172A",
    "imageUrl": "https://img.logo.dev/leonardo.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Freemium",
    "rating": 4.8,
    "featured": true,
    "dateAdded": new Date().toISOString(),
    "tags": ["Game Design", "Concept Art", "SDXL"],
    "useCases": ["RPG character sprites", "Visual novel backgrounds"],
    "launchYear": 2022
  },
  {
    "id": "freepik-pikaso",
    "name": "Freepik Pikaso",
    "description": "Real-time AI sketching and image generation tool built smoothly into Freepik's expansive asset catalog.",
    "longDescription": "Comprehensive review of Freepik Pikaso. Lets artists draw crude sketches and watch them render into photorealistic outputs in absolute real-time.",
    "category": "Image & Art Generation",
    "url": "https://freepik.com",
    "domain": "freepik.com",
    "brandColor": "#1273EB",
    "imageUrl": "https://img.logo.dev/freepik.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Freemium",
    "rating": 4.7,
    "featured": false,
    "dateAdded": new Date().toISOString(),
    "tags": ["Real-time", "Sketch to Image", "Assets"],
    "useCases": ["Rapid concept iteration", "Graphic design assets"],
    "launchYear": 2023
  },
  {
    "id": "ideogram",
    "name": "Ideogram AI",
    "description": "Cutting edge image generator that specializes in correctly rendering extremely complex, legible text within images.",
    "longDescription": "Comprehensive review of Ideogram. Solves the persistent AI problem of garbled text by allowing detailed typographic posters, logos, and signs.",
    "category": "Image & Art Generation",
    "url": "https://ideogram.ai",
    "domain": "ideogram.ai",
    "brandColor": "#000000",
    "imageUrl": "https://img.logo.dev/ideogram.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Freemium",
    "rating": 4.8,
    "featured": false,
    "dateAdded": new Date().toISOString(),
    "tags": ["Typography", "Text in Image", "Logos"],
    "useCases": ["T-shirt printing designs", "Typographic event posters"],
    "launchYear": 2023
  },
  {
    "id": "copy-ai",
    "name": "Copy.ai",
    "description": "An automated copywriting engine that generates marketing copy, emails, and social media posts efficiently.",
    "longDescription": "Comprehensive review of Copy.ai. Built specifically for marketers looking to overcome writer's block and scale their content marketing workflows.",
    "category": "Text & Writing",
    "url": "https://copy.ai",
    "domain": "copy.ai",
    "brandColor": "#132D2F",
    "imageUrl": "https://img.logo.dev/copy.ai?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Freemium",
    "rating": 4.7,
    "featured": true,
    "dateAdded": new Date().toISOString(),
    "tags": ["Copywriting", "Marketing", "Social Media"],
    "useCases": ["E-commerce product descriptions", "Email marketing sequences"],
    "launchYear": 2020
  },
  {
    "id": "quillbot",
    "name": "QuillBot",
    "description": "Advanced paraphrasing and summarizing tool used heavily by students and academic researchers.",
    "longDescription": "Comprehensive review of Quillbot. A reliable rewriting engine that alters sentence structure while maintaining the original tone and vocabulary complexity.",
    "category": "Text & Writing",
    "url": "https://quillbot.com",
    "domain": "quillbot.com",
    "brandColor": "#499557",
    "imageUrl": "https://img.logo.dev/quillbot.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Freemium",
    "rating": 4.8,
    "featured": false,
    "dateAdded": new Date().toISOString(),
    "tags": ["Paraphraser", "Academic", "Grammar"],
    "useCases": ["Academic essay rewriting", "Plagiarism prevention"],
    "launchYear": 2017
  },
  {
    "id": "surfer-seo",
    "name": "Surfer SEO",
    "description": "A powerful suite utilizing AI to audit existing pages and outline content mathematically optimized for Google.",
    "longDescription": "Comprehensive review of Surfer SEO. Correlates top-ranking pages against hundreds of on-page signals to construct highly optimized blog outlines.",
    "category": "SEO & Marketing Tools",
    "url": "https://surferseo.com",
    "domain": "surferseo.com",
    "brandColor": "#0F0F14",
    "imageUrl": "https://img.logo.dev/surferseo.com?token=pk_Yy124-7wSK-z-Hym446V9A",
    "pricing": "Paid",
    "rating": 4.8,
    "featured": true,
    "dateAdded": new Date().toISOString(),
    "tags": ["Content Audit", "SERP Tracker", "Keyword Density"],
    "useCases": ["Blog post optimization", "Competitor analysis benchmarking"],
    "launchYear": 2017
  }
];

const filePath = path.join(__dirname, 'data', 'tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Find the end of the MOCK_TOOLS array
const match = /export const MOCK_TOOLS: Tool\[\] = \[\s*([\s\S]*?)\];/g;
let lastMatch;
let m;
while ((m = match.exec(content)) !== null) {
  lastMatch = m;
}

if (lastMatch) {
  const innerContent = lastMatch[1];
  const stringifiedNewTools = newTools.map(t => JSON.stringify(t, null, 2)).join(',\n  ');
  
  const endBracketIndex = lastMatch.index + lastMatch[0].lastIndexOf(']');
  
  content = content.substring(0, endBracketIndex) + 
            (innerContent.trim() ? ',\n  ' : '') + 
            stringifiedNewTools + 
            '\n' + content.substring(endBracketIndex);
            
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Successfully appended new tools.");
} else {
  console.log("Could not find MOCK_TOOLS array.");
}
