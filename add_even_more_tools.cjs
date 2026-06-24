const fs = require('fs');
const path = require('path');

const userList = [
  { name: "Sora", category: "Video & Audio Generation" },
  { name: "Groq", category: "LLM Providers & APIs" },
  { name: "Claude 3.5 Sonnet", category: "LLM Providers & APIs" },
  { name: "Gemini 1.5 Pro", category: "LLM Providers & APIs" },
  { name: "Runway Gen-3 Alpha", category: "Video & Audio Generation" },
  { name: "Suno v3", category: "Video & Audio Generation" },
  { name: "Udio", category: "Video & Audio Generation" },
  { name: "Luma Dream Machine", category: "Video & Audio Generation" },
  { name: "Kling AI", category: "Video & Audio Generation" },
  { name: "Hailuo MiniMax", category: "Video & Audio Generation" },
  { name: "Vercel v0", category: "Code & Development" },
  { name: "Bolt.new", category: "Code & Development" },
  { name: "Lovable.dev", category: "Code & Development" },
  { name: "Windsurf", category: "Code & Development" },
  { name: "Perplexity Pro", category: "AI Search Engines" },
  { name: "Chatbox", category: "AI Chatbots & Assistants" },
  { name: "AnythingLLM", category: "AI Chatbots & Assistants" },
  { name: "Ollama", category: "Code & Development" },
  { name: "LM Studio", category: "Code & Development" },
  { name: "GPT4All", category: "Code & Development" },
  { name: "WebUI Forge", category: "Image & Art Generation" },
  { name: "ComfyUI", category: "Image & Art Generation" },
  { name: "Midjourney v6", category: "Image & Art Generation" },
  { name: "Flux.1", category: "Image & Art Generation" },
  { name: "Ideogram 2.0", category: "Image & Art Generation" },
  { name: "ElevenLabs Reader", category: "Video & Audio Generation" },
  { name: "Recraft v3", category: "Image & Art Generation" },
  { name: "Leonardo Phoenix", category: "Image & Art Generation" },
  { name: "Pika 1.5", category: "Video & Audio Generation" },
  { name: "HeyGen 2.0", category: "Video & Audio Generation" },
  { name: "ElevenLabs Voice Design", category: "Video & Audio Generation" },
  { name: "Napkin AI", category: "UI/UX & Design Tools" },
  { name: "Relume Library", category: "UI/UX & Design Tools" },
  { name: "Galileo AI", category: "UI/UX & Design Tools" },
  { name: "Uizard Autodesigner", category: "UI/UX & Design Tools" },
  { name: "Krea AI", category: "Image & Art Generation" },
  { name: "Magnific AI", category: "Image & Art Generation" },
  { name: "Topaz Video AI", category: "Video & Audio Generation" },
  { name: "Mendel", category: "Research & Analysis" },
  { name: "AlphaFold 3", category: "Research & Analysis" },
  { name: "Grok 2", category: "LLM Providers & APIs" },
  { name: "Meta Llama 3.1", category: "LLM Providers & APIs" },
  { name: "Mistral Large", category: "LLM Providers & APIs" },
  { name: "Cohere Command R+", category: "LLM Providers & APIs" },
  { name: "Qwen 2.5", category: "LLM Providers & APIs" }
];

const filePath = path.join(__dirname, 'data', 'tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Simple parser to extract existing tool names
const existingNames = new Set(
  [...content.matchAll(/name:\s*["']([^"']+)["']/g)]
  .map(match => match[1].toLowerCase().replace(/[^a-z0-9]/g, ''))
);

const newTools = [];

userList.forEach(item => {
  const normName = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!existingNames.has(normName) && !existingNames.has(normName.replace('ai', ''))) {
    const id = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const cleanName = item.name;
    const cleanDomain = objName => objName.toLowerCase().replace(/[^a-z0-9]+/g, '') + '.com';
    
    newTools.push({
      id,
      name: cleanName,
      description: `The leading ${cleanName} platform using advanced AI.`,
      longDescription: `Comprehensive overview of ${cleanName}. It provides powerful AI capabilities for ${item.category}.`,
      category: item.category,
      url: `https://${cleanDomain(cleanName)}`,
      domain: cleanDomain(cleanName),
      brandColor: "#000000",
      imageUrl: `https://img.logo.dev/${cleanDomain(cleanName)}?token=pk_Yy124-7wSK-z-Hym446V9A`,
      pricing: "Freemium",
      rating: 4.5 + (Math.random() * 0.4),
      featured: false,
      dateAdded: new Date().toISOString(),
      tags: [item.category.split(' ')[0], "AI Tool"],
      useCases: ["Automation", "Efficiency"],
      launchYear: 2024
    });
    existingNames.add(normName);
  }
});

const match = /export const MOCK_TOOLS: Tool\[\] = \[\s*([\s\S]*?)\];/g;
let lastMatch;
let m;
while ((m = match.exec(content)) !== null) {
  lastMatch = m;
}

if (lastMatch && newTools.length > 0) {
  const innerContent = lastMatch[1];
  const stringifiedNewTools = newTools.map(t => JSON.stringify(t, null, 2)).join(',\\n  ');
  
  const endBracketIndex = lastMatch.index + lastMatch[0].lastIndexOf(']');
  
  content = content.substring(0, endBracketIndex) + 
            (innerContent.trim() ? ',\\n  ' : '') + 
            stringifiedNewTools + 
            '\\n' + content.substring(endBracketIndex);
            
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully appended ${newTools.length} new tools.`);
} else {
  console.log("No new tools to add or could not find array.");
}
