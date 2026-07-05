const fs = require('fs');
let code = fs.readFileSync('data/blogs.ts', 'utf8');

code = code.replace(
  "imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fm=webp&fit=crop&q=80&w=800'",
  "imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fm=webp&fit=crop&q=80&w=800'"
);

fs.writeFileSync('data/blogs.ts', code, 'utf8');
console.log('Fixed image url in data/blogs.ts');
