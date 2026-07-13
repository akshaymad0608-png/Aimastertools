const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
  if (filePath.includes('node_modules')) return;
  if (!fs.existsSync(filePath)) return;
  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    fs.readdirSync(filePath).forEach(file => checkFile(path.join(filePath, file)));
  } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let inComponent = false;
    let foundReturn = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.match(/const [A-Z][a-zA-Z0-9_]*.*=.*=> {/) || line.match(/function [A-Z][a-zA-Z0-9_]*\s*\(/)) {
        inComponent = true;
        foundReturn = false;
      }
      if (inComponent && line.includes('return ') && !line.includes('=> return') && !line.match(/return.*\(/)) {
        // rough heuristic for early return
        foundReturn = true;
      }
      if (inComponent && foundReturn && line.match(/\buse[A-Z]/)) {
        console.log(`Possible hook after return in ${filePath}:${i+1}: ${line}`);
      }
    }
  }
}

checkFile('pages');
checkFile('components');
checkFile('context');
