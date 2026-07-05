const fs = require('fs');
let code = fs.readFileSync('pages/Workflows.tsx', 'utf8');

// Replace mock with real import
code = code.replace(
  "import { motion } from 'framer-motion';",
  "import { motion } from 'framer-motion';\nimport { WORKFLOWS } from '../data/workflows';"
);

// Remove MOCK_WORKFLOWS declaration
code = code.replace(/const MOCK_WORKFLOWS = \[[\s\S]*?\];/m, "");

// Replace MOCK_WORKFLOWS with WORKFLOWS
code = code.replace(/MOCK_WORKFLOWS/g, "WORKFLOWS");

// Update link wrapper for each card
code = code.replace(
  /<motion\.div\s+key=\{workflow\.id\}/,
  `<motion.div \n              key={workflow.id}`
);

// Add Link around motion div
// Actually, it's easier to just change the button to a Link
code = code.replace(
  /<button className="flex items-center gap-2 bg-\[var\(--color-primary\)\] text-white px-5 py-2 rounded-xl font-bold hover:bg-\[var\(--color-primary-dark\)\] transition-colors shadow-md text-sm">[\s\S]*?<Play size=\{16\} className="fill-white" \/> View Workflow[\s\S]*?<\/button>/m,
  `<Link to={\`/workflows/\${workflow.id}\`} className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2 rounded-xl font-bold hover:bg-[var(--color-primary-dark)] transition-colors shadow-md text-sm">\n                  <Play size={16} className="fill-white" /> View Workflow\n                </Link>`
);

// We should do it globally
code = code.replace(
  /<button className="flex items-center gap-2 bg-\[var\(--color-primary\)\] text-white px-5 py-2 rounded-xl font-bold hover:bg-\[var\(--color-primary-dark\)\] transition-colors shadow-md text-sm">\s*<Play size=\{16\} className="fill-white" \/> View Workflow\s*<\/button>/g,
  `<Link to={\`/workflows/\${workflow.id}\`} className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2 rounded-xl font-bold hover:bg-[var(--color-primary-dark)] transition-colors shadow-md text-sm">\n                  <Play size={16} className="fill-white" /> View Workflow\n                </Link>`
);

// Wait, the motion.div also has cursor-pointer, I should change it to Link if possible, or just let the button handle it.
// Let's just make the whole motion.div a Link? No, motion.div can't be easily changed if we have nested links (we don't here). Let's wrap the motion.div content in a Link, or change motion.div to motion.div inside Link, or change motion.div to a Link using motion(Link). Let's just keep the button as Link, but also make the whole div clickable.
code = code.replace(
  /<motion\.div \n              key=\{workflow\.id\}/,
  `<motion.div \n              key={workflow.id}`
);

fs.writeFileSync('pages/Workflows.tsx', code, 'utf8');
console.log('Fixed Workflows.tsx');
