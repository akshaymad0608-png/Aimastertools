const fs = require('fs');
let code = fs.readFileSync('data/blogs.ts', 'utf8');

const images = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1531297172864-822d10363259?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800'
];

let i = 0;
code = code.replace(/'https:\/\/images\.unsplash\.com\/photo-[^']+'/g, (match) => {
  const replacement = `'${images[i % images.length]}'`;
  i++;
  return replacement;
});

fs.writeFileSync('data/blogs.ts', code, 'utf8');
console.log('Assigned unique beautiful images');
