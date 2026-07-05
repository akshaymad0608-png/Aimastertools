const fs = require('fs');
let code = fs.readFileSync('components/Navbar.tsx', 'utf8');

code = code.replace(`import { Menu, X, Sun, Moon, ArrowUpRight, Code, Compass, Star, Grid, FileText, User, Sparkles, GitCompare } from 'lucide-react';`, `import { Menu, X, Sun, Moon, ArrowUpRight, Code, Compass, Star, Grid, FileText, User, Sparkles, GitCompare, GitMerge } from 'lucide-react';`);

fs.writeFileSync('components/Navbar.tsx', code, 'utf8');
console.log("Navbar.tsx updated with GitMerge import");
