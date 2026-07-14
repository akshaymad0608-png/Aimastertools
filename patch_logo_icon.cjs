const fs = require('fs');
const filePath = 'components/Logo.tsx';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace("import { Hexagon, Zap } from 'lucide-react';", "import { Brain, Sparkles } from 'lucide-react';");
content = content.replace('<Hexagon size={isSmall ? 32 : 40} className="absolute text-indigo-500 fill-indigo-500/10 stroke-[1.5]" />', '<Brain size={isSmall ? 28 : 36} className="absolute text-indigo-500 stroke-[1.5]" />');
content = content.replace('<Zap size={isSmall ? 16 : 20} className="absolute text-purple-500 fill-purple-500/80 drop-shadow-sm" />', '<Sparkles size={isSmall ? 14 : 18} className="absolute text-purple-500 fill-purple-500/80 drop-shadow-sm -top-1 -right-1" />');

fs.writeFileSync(filePath, content);
console.log('Patched Logo Icon');
