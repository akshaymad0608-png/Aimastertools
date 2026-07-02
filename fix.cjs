const fs = require('fs');
let text = fs.readFileSync('data/tools.ts', 'utf8');
text = text.replace(/  "launchYear": 2024\n}  {/g, '  "launchYear": 2024\n},  {');
text = text.replace(/  "launchYear": 2024\n}\n  {/g, '  "launchYear": 2024\n},\n  {');
fs.writeFileSync('data/tools.ts', text, 'utf8');
