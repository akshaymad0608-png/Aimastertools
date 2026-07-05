const fs = require('fs');
let code = fs.readFileSync('components/BlogCoverImage.tsx', 'utf8');

code = code.replace(
  '<img \n          src={imageUrl} \n          alt={alt || title} \n          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"\n          onError={() => setImgError(true)}\n          loading="lazy"\n        />',
  '<img \n          src={imageUrl} \n          alt={alt || title} \n          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"\n          onError={() => setImgError(true)}\n          loading="lazy"\n          referrerPolicy="no-referrer"\n        />'
);

// If the regex replacement didn't work exactly, just replace 'loading="lazy"'
code = code.replace(
  'loading="lazy"',
  'loading="lazy"\n          referrerPolicy="no-referrer"'
);

fs.writeFileSync('components/BlogCoverImage.tsx', code, 'utf8');
console.log('Fixed BlogCoverImage');
