const fs = require('fs');

const path = './data/tools.ts';
let content = fs.readFileSync(path, 'utf8');

// There are multiple "launchYear" properties in the objects.
// Let's remove the duplicate ones by parsing and stringifying the objects, or using regex.
console.log("Fixing duplicate properties in tools.ts...");

const match = /export const MOCK_TOOLS: Tool\[\] = \[\s*([\s\S]*?)\];/g;
let lastMatch;
let m;
while ((m = match.exec(content)) !== null) {
  lastMatch = m;
}

if (lastMatch) {
  const toolsString = lastMatch[1];
  
  // A simple but effective way is to just do string replacements for the specific duplicates.
  // The error shows multiple properties. Often it's duplicate "launchYear", "useCases", "category".
  
  // Let's just evaluate the tools string in a loose sandbox to let JS deduplicate the keys automatically, then stringify back.
  try {
     const toolsArray = eval(`[${toolsString}]`);
     const newToolsStr = toolsArray.map(t => "  " + JSON.stringify(t, null, 2).split('\n').join('\n  ')).join(",\n");
     const newArrayContent = "export const MOCK_TOOLS: Tool[] = [\n" + newToolsStr + "\n];";
     
     content = content.replace(lastMatch[0], newArrayContent);
     fs.writeFileSync(path, content, 'utf8');
     console.log("Successfully deduplicated properties via eval/stringify.");
  } catch (e) {
     console.error("Eval failed:", e);
  }
}
