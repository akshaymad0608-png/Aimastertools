const fs = require('fs');
let code = fs.readFileSync('data/tools.ts', 'utf8');

// replace all "imageUrl": "https://img.logo.dev/..." with "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
// Actually let's use a nice tech abstract image for the screenshots
code = code.replace(
  /"imageUrl":\s*"https:\/\/img\.logo\.dev\/[^"]+"/g,
  '"imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"'
);

fs.writeFileSync('data/tools.ts', code, 'utf8');
console.log('Fixed tools.ts images');
