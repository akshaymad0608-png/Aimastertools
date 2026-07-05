const fs = require('fs');
let code = fs.readFileSync('data/blogs.ts', 'utf8');

code = code.replace(
  /'https:\/\/images\.unsplash\.com\/photo-1677442136019-21780ecad995\?auto=format&fm=webp&fit=crop&q=80&w=800'/g,
  "'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800'"
);

code = code.replace(
  /'https:\/\/images\.unsplash\.com\/photo-1676299081847-824916de030a\?auto=format&fm=webp&fit=crop&q=80&w=800'/g,
  "'https://images.unsplash.com/photo-1655635643532-fa9ba2648cbe?auto=format&fit=crop&q=80&w=800'"
);

code = code.replace(
  /'https:\/\/images\.unsplash\.com\/photo-1618005182384-a83a8bd57fbe\?auto=format&fm=webp&fit=crop&q=80&w=800'/g,
  "'https://images.unsplash.com/photo-1684369175836-932f91a5db4e?auto=format&fit=crop&q=80&w=800'"
);

fs.writeFileSync('data/blogs.ts', code, 'utf8');
console.log('Fixed blog images');
