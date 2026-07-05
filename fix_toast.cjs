const fs = require('fs');

const fixFile = (path) => {
  let code = fs.readFileSync(path, 'utf8');
  if (code.includes('<NewsletterSection />')) {
    code = code.replace(/<NewsletterSection \/>/g, '<NewsletterSection showToast={() => {}} />');
    fs.writeFileSync(path, code, 'utf8');
    console.log(path + ' updated');
  }
};

fixFile('pages/Collections.tsx');
fixFile('pages/CollectionDetail.tsx');
