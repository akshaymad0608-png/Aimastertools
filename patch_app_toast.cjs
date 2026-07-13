const fs = require('fs');
const filePath = 'App.tsx';
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('import { Toaster }')) {
  content = content.replace("import { TopBanner } from './components/TopBanner';", "import { TopBanner } from './components/TopBanner';\nimport { Toaster } from 'react-hot-toast';");
}

if (!content.includes('<Toaster ')) {
  content = content.replace('<GlobalToast />', '<GlobalToast />\n              <Toaster position="bottom-right" toastOptions={{ style: { background: \'var(--color-surface)\', color: \'var(--color-text-primary)\', border: \'1px solid var(--color-border)\' } }} />');
}

fs.writeFileSync(filePath, content);
console.log('Patched App.tsx successfully');
