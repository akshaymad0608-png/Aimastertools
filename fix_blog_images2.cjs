const fs = require('fs');
let code = fs.readFileSync('data/blogs.ts', 'utf8');

code = code.replace(
  /'https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+\?auto=format&fit=crop&q=80&w=800'/g,
  "'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'"
);

fs.writeFileSync('data/blogs.ts', code, 'utf8');
console.log('Fixed blog images to high quality tech');
