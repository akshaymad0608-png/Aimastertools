const fs = require('fs');

let code = fs.readFileSync('components/BlogSection.tsx', 'utf8');

// Replace background and text
code = code.replace(/className="relative bg-\[#0d1117\] py-20 dark:bg-\[#0d1117\]"/g, 'className="relative bg-slate-50 dark:bg-[#09090b] py-20"');
code = code.replace(/bg-indigo-900\/10/g, 'bg-blue-500/10 dark:bg-blue-900/20');
code = code.replace(/bg-purple-900\/10/g, 'bg-purple-500/10 dark:bg-purple-900/20');
code = code.replace(/text-purple-400/g, 'text-blue-600 dark:text-blue-400');
code = code.replace(/text-purple-350/g, 'text-blue-700 dark:text-blue-300');
code = code.replace(/<span className="text-white">Learn AI tools, workflows & comparisons<\/span>/g, '<span className="text-slate-900 dark:text-white">Learn AI tools, workflows & comparisons</span>');
code = code.replace(/text-slate-350/g, 'text-slate-600 dark:text-slate-400');

fs.writeFileSync('components/BlogSection.tsx', code, 'utf8');
console.log('Fixed BlogSection.tsx colors');
