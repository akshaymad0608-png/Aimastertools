const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

if (!code.includes('import(\'./pages/Categories\')')) {
  code = code.replace(
    /const Compare = lazy\(\(\) => import\('\.\/pages\/Compare'\)\);/,
    'const Compare = lazy(() => import(\'./pages/Compare\'));\nconst Categories = lazy(() => import(\'./pages/Categories\'));'
  );
  
  code = code.replace(
    /<Route path="\/bookmarks" element=\{<Bookmarks \/>\} \/>/,
    '<Route path="/categories" element={<Categories />} />\n                    <Route path="/bookmarks" element={<Bookmarks />} />'
  );
  
  fs.writeFileSync('App.tsx', code, 'utf8');
  console.log('Added /categories to App.tsx');
}
