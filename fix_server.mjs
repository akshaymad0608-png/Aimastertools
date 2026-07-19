import fs from 'fs';

let serverStr = fs.readFileSync('server.ts', 'utf8');

serverStr = serverStr.replace(
  "const __filename = fileURLToPath(import.meta.url);\nconst __dirname = path.dirname(__filename);\nconst _dirname = __dirname;",
  "const _dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath((typeof import.meta !== 'undefined' && import.meta.url) || 'file://' + process.cwd() + '/server.ts'));"
);

fs.writeFileSync('server.ts', serverStr, 'utf8');
console.log('Fixed server.ts');
