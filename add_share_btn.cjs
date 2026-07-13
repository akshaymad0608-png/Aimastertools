const fs = require('fs');
const filePath = 'components/Navbar.tsx';
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('Share2')) {
  content = content.replace(/import { Menu, X, Sun, Moon, ArrowUpRight, Code, Compass, Star, Grid, FileText, User, Sparkles, GitCompare, GitMerge } from 'lucide-react';/, "import { Menu, X, Sun, Moon, ArrowUpRight, Code, Compass, Star, Grid, FileText, User, Sparkles, GitCompare, GitMerge, Share2, Check } from 'lucide-react';");
}

const importToastRegex = /import { motion, AnimatePresence } from 'framer-motion';/;
if (!content.includes('import toast')) {
  content = content.replace(importToastRegex, "import { motion, AnimatePresence } from 'framer-motion';\nimport toast from 'react-hot-toast';");
}

const componentRegex = /const Navbar: React.FC = \(\) => {/;
if (!content.includes('const [isSharing, setIsSharing] = useState(false);')) {
  content = content.replace(componentRegex, `const Navbar: React.FC = () => {\n  const [isSharing, setIsSharing] = useState(false);\n  \n  const handleShare = async () => {\n    const shareData = {\n      title: 'AI Master Tools',\n      text: 'Find, compare, and review the best AI tools and software.',\n      url: window.location.origin,\n    };\n    \n    if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {\n      try {\n        await navigator.share(shareData);\n      } catch (err) {\n        console.error('Error sharing:', err);\n      }\n    } else {\n      try {\n        await navigator.clipboard.writeText(shareData.url);\n        setIsSharing(true);\n        toast?.success?.('Link copied to clipboard!') || alert('Link copied to clipboard!');\n        setTimeout(() => setIsSharing(false), 2000);\n      } catch (err) {\n        console.error('Failed to copy!', err);\n      }\n    }\n  };\n`);
}

const themeBtnRegex = /\{\/\* Theme Toggle Button \*\/\}/;
if (!content.includes('aria-label="Share Site"')) {
  const shareBtnHtml = `            {/* Share Site Button */}\n            <button\n              onClick={handleShare}\n              className="p-2.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-[var(--color-surface)]/50 backdrop-blur-sm hover:bg-[var(--color-border)] rounded-full border border-[var(--color-border)] cursor-pointer transition-all active:scale-95 flex items-center justify-center shadow-sm"\n              aria-label="Share Site"\n              title="Share AI Master Tools"\n            >\n              {isSharing ? <Check size={17} className="text-green-500" /> : <Share2 size={17} />}\n            </button>\n\n            {/* Theme Toggle Button */}`;
  content = content.replace(themeBtnRegex, shareBtnHtml);
}

const mobileActionsOverlayRegex = /\{\/\* Mobile Actions Overlay \*\/\}\n          <div className="md:hidden flex items-center gap-2">/;
if (!content.includes('aria-label="Share Site Mobile"')) {
  const mobileShareHtml = `{/* Mobile Actions Overlay */}\n          <div className="md:hidden flex items-center gap-2">\n            <button\n              onClick={handleShare}\n              className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] cursor-pointer"\n              aria-label="Share Site Mobile"\n            >\n              {isSharing ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}\n            </button>`;
  content = content.replace(mobileActionsOverlayRegex, mobileShareHtml);
}

fs.writeFileSync(filePath, content);
console.log('Added site sharing button.');
