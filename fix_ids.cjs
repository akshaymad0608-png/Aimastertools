const fs = require('fs');

function fixFile(filePath, prefix, isQuotes) {
  let content = fs.readFileSync(filePath, 'utf8');
  let counter = 1;
  const newContent = content.replace(/id:\s*['"]([^'"]+)['"]/g, (match, p1) => {
    // If we want to replace with string increment...
    // Actually, maybe I should just use regex replace?
    // Let's do it manually because some might have valid non-incrementing IDs?
    // Let's just give them totally unique IDs or re-index them all.
    return `id: '${prefix}${counter++}'`;
  }).replace(/"id":\s*"([^"]+)"/g, (match, p1) => {
    return `"id": "${prefix}${counter++}"`;
  });
  
  fs.writeFileSync(filePath, newContent, 'utf8');
}

fixFile('data/workflows.ts', 'wf-');
fixFile('data/blogs.ts', 'blog-');
