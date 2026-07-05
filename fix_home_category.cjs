const fs = require('fs');
let code = fs.readFileSync('pages/Home.tsx', 'utf8');

code = code.replace(
  /const categoryExists = CATEGORIES\.some\(c => c\.id === categoryParam\);\s*if \(categoryExists\) {\s*setSelectedCategory\(categoryParam as Category\);/g,
  `const matchedCategory = CATEGORIES.find(c => c.id.toLowerCase() === categoryParam.toLowerCase());
      if (matchedCategory) {
        setSelectedCategory(matchedCategory.id as Category);`
);

fs.writeFileSync('pages/Home.tsx', code, 'utf8');
console.log('Fixed Home.tsx case-insensitive category matching');
