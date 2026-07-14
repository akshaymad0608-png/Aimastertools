const fs = require('fs');
const filePath = 'components/Logo.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const oldSubtitle = `<div 
          className="text-[9px] font-bold text-gray-500 tracking-[0.22em] uppercase mt-0.5 group-hover:text-indigo-400 transition-colors"
        >
          Discover &middot; Compare &middot; Master
        </div>`;

const newSubtitle = `{!isSmall && (
          <div 
            className="text-[9px] font-bold text-gray-500 tracking-[0.22em] uppercase mt-0.5 group-hover:text-indigo-400 transition-colors hidden sm:block"
          >
            Discover &middot; Compare &middot; Master
          </div>
        )}`;

content = content.replace(oldSubtitle, newSubtitle);

// Also let's just make sure we are correctly matching the code exactly.
// Let's do it with regex to be safer.
