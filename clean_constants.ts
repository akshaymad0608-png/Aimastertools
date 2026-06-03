import fs from 'fs';
import path from 'path';

const constantsPath = path.resolve('./constants.tsx');

let content = fs.readFileSync(constantsPath, 'utf-8');

// I will just use a simple regex replacing to remove duplicates if I can evaluate it.
// Actually, it's safer to extract it and rewrite it. But wait, it's a huge TS file.
// The easiest is just to find the start and end of MOCK_TOOLS and eval it, but since it has TS types like `as Category` it might crash.
// Let's use TS compiler API. Or simpler: regex to identify tool objects.
console.log("Reading MOCK_TOOLS array...");

const toolsRegex = /export const MOCK_TOOLS: Tool\[\] = \[([\s\S]*?)\];/;
const match = content.match(toolsRegex);
// Well it contains imports and other constants... this might be difficult to do string manipulation safely. Let me just use a quick deduplication script.
