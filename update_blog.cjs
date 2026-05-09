const fs = require('fs');
let content = fs.readFileSync('pages/Home.tsx', 'utf8');

content = content.replace(/to=\{\`\/blog\/\$\{featured\.id\}\`\}/g, 'to={`/blog/${featured.slug || featured.id}`}');
content = content.replace(/to=\{\`\/blog\/\$\{post\.id\}\`\}/g, 'to={`/blog/${post.slug || post.id}`}');

const blogPostsRegex = /const blogPosts = \[\s*\{[\s\S]*?\];/;
content = content.replace(blogPostsRegex, "import { blogPosts } from '../data/blogs';");

fs.writeFileSync('pages/Home.tsx', content);
console.log("Updated Home.tsx successfully");
