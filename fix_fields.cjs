const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf8');

// remove "reviewCount" and "features"
content = content.replace(/"reviewCount": \d+,/g, '');
content = content.replace(/"features": \[.*?\],/g, 'dateAdded: "2026-05-09T00:00:00Z",');

fs.writeFileSync('constants.tsx', content);
console.log('Fixed extra fields');
