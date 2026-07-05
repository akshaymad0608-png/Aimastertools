const fs = require('fs');
let code = fs.readFileSync('components/AIToolFinder.tsx', 'utf8');

code = code.replace(
  "import { Search, ArrowRight, CheckCircle2, RotateCcw, Filter, Sparkles } from 'lucide-react';",
  "import { Search, ArrowRight, CheckCircle2, RotateCcw, Filter, Sparkles } from 'lucide-react';\nimport ToolLogo from './ToolLogo';"
);

code = code.replace(
  /\{tool\.imageUrl \? \([\s\S]*?<img src=\{tool\.imageUrl\} alt=\{tool\.name\} className="w-10 h-10 object-contain rounded-md" \/>[\s\S]*?\) : \([\s\S]*?<Sparkles size=\{24\} className="text-\[var\(--color-primary\)\]" \/>[\s\S]*?\)\}/,
  '<ToolLogo domain={tool.domain} brandColor={tool.brandColor} name={tool.name} className="w-10 h-10" />'
);

fs.writeFileSync('components/AIToolFinder.tsx', code, 'utf8');
console.log('Fixed AIToolFinder logo');
