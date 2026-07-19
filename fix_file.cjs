const fs = require('fs');
let content = fs.readFileSync('pages/ToolDetail.tsx', 'utf8');
content = content.replace(/\{ label: "Ease of Use", score: 9.5 \}\n                    \{ label: "Features", score: 8.8 \}\n                    \{ label: "Pricing", score: 9.0 \}\n                    \{ label: "Support", score: 8.5 \}/g, `{ label: "Ease of Use", score: 9.5 },\n                    { label: "Features", score: 8.8 },\n                    { label: "Pricing", score: 9.0 },\n                    { label: "Support", score: 8.5 }`);
fs.writeFileSync('pages/ToolDetail.tsx', content);
