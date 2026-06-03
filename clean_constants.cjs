const fs = require('fs');

let content = fs.readFileSync('constants.tsx', 'utf-8');

// The file exports MOCK_TOOLS and CATEGORIES. 
// We will extract MOCK_TOOLS string, evaluate it, clean it, and put it back.
try {
  let mockToolsMatch = content.match(/export const MOCK_TOOLS: Tool\[\] = \[([\s\S]*?)\];/);
  if (!mockToolsMatch) {
    console.error("Could not find MOCK_TOOLS");
    process.exit(1);
  }

  // Very hacky but easiest way to parse the TS objects in JS:
  // Convert it into a module and require it.
} catch(e) {
  console.log(e);
}
