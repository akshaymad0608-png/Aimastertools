const fs = require('fs');
let code = fs.readFileSync('data/blogs.ts', 'utf8');

const validImages = [
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1655635643532-fa9ba2648cbe?auto=format&fit=crop&q=80&w=800'
];

let i = 0;
code = code.replace(/'https:\/\/images\.unsplash\.com\/photo-[^']+'/g, (match) => {
  const replacement = `'${validImages[i % validImages.length]}'`;
  i++;
  return replacement;
});

fs.writeFileSync('data/blogs.ts', code, 'utf8');
console.log('Fixed blog images using known valid unsplash IDs');
