const fs = require('fs');

let content = fs.readFileSync('data/tools.ts', 'utf8');

// Extract the MOCK_TOOLS array
const match = content.match(/export const MOCK_TOOLS: Tool\[\] = (\[[\s\S]*?\]);\n/);
if (match) {
  let tools = eval(match[1]);
  tools = tools.map(tool => {
    if (!tool.domain && tool.url) {
      try {
        const url = new URL(tool.url);
        tool.domain = url.hostname.replace('www.', '');
      } catch(e) {
        tool.domain = '';
      }
    }
    if (!tool.brandColor) {
      tool.brandColor = "var(--color-primary)";
    }
    return tool;
  });

  const toolsStr = 'export const MOCK_TOOLS: Tool[] = [\n' + tools.map(t => '  ' + JSON.stringify(t, null, 4).replace(/\n/g, '\n  ')).join(',\n') + '\n];\n';
  
  content = content.replace(/export const MOCK_TOOLS: Tool\[\] = \[[\s\S]*?\];\n/, toolsStr);
  fs.writeFileSync('data/tools.ts', content, 'utf8');
  console.log('Fixed domains');
} else {
  console.log('Match not found');
}
