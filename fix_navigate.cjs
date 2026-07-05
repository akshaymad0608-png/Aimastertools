const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

code = code.replace(
  /import \{ BrowserRouter as Router, Routes, Route, useNavigate \} from 'react-router-dom';/,
  'import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from \'react-router-dom\';'
);

fs.writeFileSync('App.tsx', code, 'utf8');
console.log('Fixed Navigate import');
