const fs = require('fs');
const filePath = 'components/Navbar.tsx';
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('import toast from')) {
  content = content.replace("import { motion, AnimatePresence } from 'framer-motion';", "import { motion, AnimatePresence } from 'framer-motion';\nimport toast from 'react-hot-toast';");
}

if (!content.includes('toast.success')) {
  content = content.replace('setIsSharing(true);\n        setTimeout', 'setIsSharing(true);\n        toast.success("Link copied to clipboard!");\n        setTimeout');
}

fs.writeFileSync(filePath, content);
console.log('Patched Navbar.tsx toast successfully');
