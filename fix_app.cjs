const fs = require('fs');

const path = './App.tsx';
let content = fs.readFileSync(path, 'utf8');

const importsToAdd = `
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const AlternativesPage = lazy(() => import('./pages/AlternativesPage'));
`;

const routesToAdd = `
                    <Route path="/category/:slug" element={<CategoryPage />} />
                    <Route path="/alternatives/:slug" element={<AlternativesPage />} />
`;

if (!content.includes('CategoryPage')) {
  content = content.replace('const NotFound = lazy(() => import(\'./pages/NotFound\'));', `const NotFound = lazy(() => import('./pages/NotFound'));${importsToAdd}`);
  content = content.replace('<Route path="*" element={<NotFound />} />', `${routesToAdd}                    <Route path="*" element={<NotFound />} />`);
  fs.writeFileSync(path, content, 'utf8');
  console.log("App.tsx updated");
} else {
  console.log("App.tsx already updated");
}
