const fs = require('fs');
let code = fs.readFileSync('components/BlogSection.tsx', 'utf8');

code = code.replace(
  /to=\{\`\/blog\/\$\{post\.slug\}\`\}/g,
  'to={`/blog/${post.slug || post.id}`}'
);

fs.writeFileSync('components/BlogSection.tsx', code, 'utf8');

let blogsCode = fs.readFileSync('data/blogs.ts', 'utf8');
blogsCode = blogsCode.replace(/id: '(\d+)',\s+title: '([^']+)'/g, (match, id, title) => {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `id: '${id}',\n    slug: '${slug}',\n    title: '${title}'`;
});
fs.writeFileSync('data/blogs.ts', blogsCode, 'utf8');

console.log('Fixed slugs');
