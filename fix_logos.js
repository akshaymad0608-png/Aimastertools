const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf8');

// replace imageUrls in objects that have a name property with a ui-avatars link
let inMockTools = false;
let updatedContent = content.split('\n').map(line => {
  if (line.includes('export const MOCK_TOOLS: Tool[] = [')) {
    inMockTools = true;
  }
  if (inMockTools && line.includes('imageUrl:')) {
    // we need to know the name. Assuming name is on previous lines, or just use regex.
    // Simpler: use a regex over the whole string.
  }
  return line;
}).join('\n');
