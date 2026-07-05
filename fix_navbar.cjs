const fs = require('fs');
let code = fs.readFileSync('components/Navbar.tsx', 'utf8');

const navLinksCode = `const navLinks = [
    { name: 'Directory', to: '/', icon: Compass },
    { name: 'Categories', to: '/category/writing', icon: Grid },
    { name: 'AI Prompts', to: '/prompts', icon: Code },
    { name: 'Compare', to: '/compare', icon: GitCompare },
    { name: 'Find Tool', to: '/find', icon: Sparkles },
    { name: 'Blog', to: '/blog', icon: FileText },
  ];`;
  
code = code.replace(/const navLinks = \[([\s\S]*?)\];/, navLinksCode);
code = code.replace(/bg-\[var\(--color-surface\)\]\/50 backdrop-blur-md/g, 'glass-nav');

fs.writeFileSync('components/Navbar.tsx', code, 'utf8');
