const fs = require('fs');
const filePath = 'components/ToolCard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('import toast from')) {
  content = content.replace("import { Bookmark, Check, Star, ExternalLink, Share2 } from 'lucide-react';", "import { Bookmark, Check, Star, ExternalLink, Share2 } from 'lucide-react';\nimport toast from 'react-hot-toast';");
}

if (!content.includes('toast.success')) {
  content = content.replace('setCopyFeedback(true);\n      setTimeout(() => setCopyFeedback(false), 2000);', 'setCopyFeedback(true);\n      toast.success("Link copied to clipboard!");\n      setTimeout(() => setCopyFeedback(false), 2000);');
}

fs.writeFileSync(filePath, content);
console.log('Patched ToolCard.tsx toast successfully');
