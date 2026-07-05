const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

// Add Lazy Load components
const lazyCode = `const Discover = lazy(() => import('./pages/Discover'));`;
const newLazyCode = `const Discover = lazy(() => import('./pages/Discover'));\nconst Collections = lazy(() => import('./pages/Collections'));\nconst CollectionDetail = lazy(() => import('./pages/CollectionDetail'));`;

if (!code.includes('const Collections = lazy')) {
  code = code.replace(lazyCode, newLazyCode);
}

// Add routes
const routesCode = `<Route path="/discover" element={<Discover />} />`;
const newRoutesCode = `<Route path="/collections" element={<Collections />} />\n                    <Route path="/collections/:slug" element={<CollectionDetail />} />\n                    <Route path="/discover" element={<Discover />} />`;

if (!code.includes('path="/collections"')) {
  code = code.replace(routesCode, newRoutesCode);
}

fs.writeFileSync('App.tsx', code, 'utf8');
console.log('App.tsx routes updated');
