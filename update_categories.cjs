const fs = require('fs');
const path = require('path');

// 1. Read the tools array content
const toolsFilePath = path.join(__dirname, 'data', 'tools.ts');
let toolsContent = fs.readFileSync(toolsFilePath, 'utf8');

// Use regex to carefully extract just the tools array to eval it safely
// For safety, we can just require parsing the JSON... wait, the tools file is pure TS
// We'll write a small node script that uses regex or we can just count occurrences:
// Match all "category": "..." lines
const categoryMatch = toolsContent.match(/"category":\s*"([^"]+)"/g);
const categoryCounts = {};

if (categoryMatch) {
  categoryMatch.forEach(match => {
    const cat = match.replace(/"category":\s*"/, '').replace(/"$/, '');
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });
}

// 2. Read the categories file
const categoriesFilePath = path.join(__dirname, 'data', 'categories.ts');
let categoriesContent = fs.readFileSync(categoriesFilePath, 'utf8');

const updatedCategoriesContent = categoriesContent.replace(
  /name:\s*'([^']+)',\s*icon:\s*'([^']+)',\s*count:\s*(\d+)/g, 
  (match, name, icon, oldCount) => {
    const newCount = categoryCounts[name] || parseInt(oldCount, 10);
    return `name: '${name}', icon: '${icon}', count: ${newCount}`;
  }
);

fs.writeFileSync(categoriesFilePath, updatedCategoriesContent, 'utf8');
console.log("Updated categories counts!");
