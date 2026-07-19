const fs = require('fs');

function fixDuplicates(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  const idRegex = /(["']?)id\1\s*:\s*(["'])(.+?)\2/g;
  const seenIds = new Set();
  
  const newContent = content.replace(idRegex, (match, q1, q2, idValue) => {
    let finalId = idValue;
    let counter = 2;
    while (seenIds.has(finalId)) {
      finalId = `${idValue}-${counter}`;
      counter++;
    }
    seenIds.add(finalId);
    return `${q1 || ''}id${q1 || ''}: ${q2}${finalId}${q2}`;
  });

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Fixed duplicates in ${filePath}`);
  }
}

fixDuplicates('data/tools.ts');
fixDuplicates('data/prompts.ts');
fixDuplicates('data/workflows.ts');
fixDuplicates('data/blogs.ts');
fixDuplicates('data/categories.ts');
