const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

if (!code.includes('<Route path="/blogs"')) {
  code = code.replace(
    /<Route path="\/blog" element=\{<BlogIndex \/>\} \/>/,
    '<Route path="/blog" element={<BlogIndex />} />\n                    <Route path="/blogs" element={<Navigate to="/blog" replace />} />'
  );
  
  if (!code.includes('Navigate')) {
    code = code.replace(
      /import \{ BrowserRouter as Router, Routes, Route, useLocation \} from 'react-router-dom';/,
      'import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from \'react-router-dom\';'
    );
  }
  
  fs.writeFileSync('App.tsx', code, 'utf8');
  console.log('Added /blogs redirect');
}
