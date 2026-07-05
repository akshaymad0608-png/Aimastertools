const fs = require('fs');
let code = fs.readFileSync('pages/NotFound.tsx', 'utf8');

code = code.replace(
  /src="https:\/\/illustrations\.popsy\.co\/amber\/falling\.svg"/g,
  'src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=600"'
);

fs.writeFileSync('pages/NotFound.tsx', code, 'utf8');
console.log('Fixed NotFound image');
