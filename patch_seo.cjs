const fs = require('fs');
const filePath = 'components/SEO.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const oldKeywords = `  const defaultKeywords = [
    'AI tools directory', 'compare AI tools', 'best AI software', 'AI tool suggestions', 'AI Master Tools', 'Akshay Mahajan',
    'Prompt Engineering', 'best AI tools list 2026', 'free AI tools', 'ChatGPT alternatives', 'generative AI tools',
    'AI productivity tools', 'top AI software'
  ];`;

const newKeywords = `  const defaultKeywords = [
    'AI tools directory', 'best AI tools', 'free AI tools', 'compare AI tools', 'best AI software', 'AI tool suggestions',
    'AI Master Tools', 'Akshay Mahajan', 'Prompt Engineering', 'best AI tools list 2026', 'ChatGPT alternatives',
    'generative AI tools', 'AI productivity tools', 'top AI software', 'artificial intelligence tools', 'new AI tools',
    'AI tools for business', 'machine learning tools', 'AI image generators', 'AI writing tools', 'best AI tools for students'
  ];`;

content = content.replace(oldKeywords, newKeywords);
fs.writeFileSync(filePath, content);
console.log('Patched SEO component');
