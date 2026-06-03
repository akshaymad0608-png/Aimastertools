import fs from 'fs';
import path from 'path';

// read constants.tsx
const constantsPath = path.resolve('constants.tsx');
let content = fs.readFileSync(constantsPath, 'utf-8');

const regex = /export const MOCK_TOOLS:\s*Tool\[\]\s*=\s*\[([\s\S]*?)\];/;
const match = content.match(regex);

if (!match) {
    console.error("No MOCK_TOOLS found");
    process.exit(1);
}

const mockToolsStr = '[' + match[1] + ']';
let MOCK_TOOLS;
try {
    MOCK_TOOLS = eval(`(${mockToolsStr})`);
} catch (e) {
    console.error("Eval failed", e);
    process.exit(1);
}

// 1. Clean duplicates by ID
// 2. Clean duplicates by Name
let uniqueIds = new Set();
let uniqueNames = new Set();
let cleanedTools = [];

for (const tool of MOCK_TOOLS) {
    // lowercase the ID and Name for comparison
    const searchId = String(tool.id).toLowerCase().trim();
    const searchName = String(tool.name).toLowerCase().trim();
    
    // Validate missing fields
    if (!tool.id || !tool.name || !tool.category) {
        continue; // skip invalid
    }
    
    if (!uniqueIds.has(searchId) && !uniqueNames.has(searchName)) {
        uniqueIds.add(searchId);
        uniqueNames.add(searchName);
        
        // fix specific text
        if (tool.imageUrl && tool.imageUrl.includes('auto=format&fit=crop')) {
            tool.imageUrl = tool.imageUrl.replace('auto=format&fit=crop', 'auto=format&fm=webp&fit=crop');
        }
        
        if (!tool.pricing) {
            tool.pricing = "Freemium";
        }
        if (!tool.tags) {
            tool.tags = [];
        }
        
        cleanedTools.push(tool);
    }
}

const numRemoved = MOCK_TOOLS.length - cleanedTools.length;
console.log(`Original count: ${MOCK_TOOLS.length}, Cleaned count: ${cleanedTools.length}, Removed: ${numRemoved}`);

const newToolsStr = JSON.stringify(cleanedTools, null, 2);
const newContent = content.replace(regex, `export const MOCK_TOOLS: Tool[] = ${newToolsStr};`);

fs.writeFileSync(constantsPath, newContent);
console.log("Written cleaned file.");
