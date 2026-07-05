const fs = require('fs');
let code = fs.readFileSync('components/Navbar.tsx', 'utf8');

if (!code.includes('GitMerge')) {
  code = code.replace(`Bookmark } from 'lucide-react';`, `Bookmark, GitMerge } from 'lucide-react';`);
  fs.writeFileSync('components/Navbar.tsx', code, 'utf8');
  console.log("Navbar.tsx updated with GitMerge import");
}
