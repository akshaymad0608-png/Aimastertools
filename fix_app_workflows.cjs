const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

if (!code.includes('const WorkflowDetail = lazy')) {
  code = code.replace(
    /const Workflows = lazy\(\(\) => import\('\.\/pages\/Workflows'\)\);/g,
    `const Workflows = lazy(() => import('./pages/Workflows'));\nconst WorkflowDetail = lazy(() => import('./pages/WorkflowDetail'));`
  );
}

if (!code.includes('<Route path="/workflows/:id" element={<WorkflowDetail />} />')) {
  code = code.replace(
    /<Route path="\/workflows" element=\{<Workflows \/>\} \/>/g,
    `<Route path="/workflows" element={<Workflows />} />\n                    <Route path="/workflows/:id" element={<WorkflowDetail />} />`
  );
}

fs.writeFileSync('App.tsx', code, 'utf8');
console.log('Fixed App.tsx routes');
