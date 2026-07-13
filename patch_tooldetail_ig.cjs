const fs = require('fs');
const filePath = 'pages/ToolDetail.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const oldButton = `                  <button
                    onClick={() => setIsStoryModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-pink-500 border border-pink-500/20 rounded-lg py-3 transition-all hover:scale-[1.02]"
                  >
                    <Instagram size={18} />
                    <span className="font-semibold">Share to IG Story</span>
                  </button>`;

const newButton = `                  <button
                    onClick={() => setIsStoryModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 text-white rounded-lg py-3 transition-all hover:opacity-90 hover:scale-[1.02] shadow-md hover:shadow-pink-500/25 font-bold"
                  >
                    <Instagram size={18} />
                    <span>Share to IG Story</span>
                  </button>`;

if (content.includes('bg-gradient-to-r from-purple-500/10 to-pink-500/10')) {
  content = content.replace(oldButton, newButton);
  fs.writeFileSync(filePath, content);
  console.log('Patched IG button in ToolDetail');
} else {
  console.log('IG Button not found or already patched');
}
