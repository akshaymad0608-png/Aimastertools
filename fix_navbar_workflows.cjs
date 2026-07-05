const fs = require('fs');
let code = fs.readFileSync('components/Navbar.tsx', 'utf8');

const navLinksCode = `const navLinks = [
    { name: 'Directory', to: '/', icon: Compass },
    { name: 'Categories', to: '/category/writing', icon: Grid },
    { name: 'Prompts', to: '/prompts', icon: Code },
    { name: 'Workflows', to: '/workflows', icon: GitMerge },
    { name: 'Find Tool', to: '/find', icon: Sparkles },
    { name: 'Blog', to: '/blog', icon: FileText },
  ];`;
  
code = code.replace(/const navLinks = \[([\s\S]*?)\];/, navLinksCode);
code = code.replace(`import { Search, Menu, X, Moon, Sun, Monitor, User, LogOut, ChevronDown, Compass, FileText, Grid, Sparkles, Code, GitCompare, Bookmark } from 'lucide-react';`, `import { Search, Menu, X, Moon, Sun, Monitor, User, LogOut, ChevronDown, Compass, FileText, Grid, Sparkles, Code, GitCompare, Bookmark, GitMerge } from 'lucide-react';`);

fs.writeFileSync('components/Navbar.tsx', code, 'utf8');
