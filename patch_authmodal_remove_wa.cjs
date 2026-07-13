const fs = require('fs');
const filePath = 'components/AuthModal.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Remove MessageCircle import if present
content = content.replace("import { X, Mail, Lock, User, LogIn, Github, Chrome, ArrowRight, AlertCircle, MessageCircle } from 'lucide-react';", "import { X, Mail, Lock, User, LogIn, Github, Chrome, ArrowRight, AlertCircle } from 'lucide-react';");

const whatsappButtonStr = `              <button 
                onClick={() => alert("WhatsApp login is currently under development and will be available soon!")}
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold border border-[#25D366]/20 bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[#25D366]/10 hover:border-[#25D366]/40 transition-all flex items-center justify-center gap-3 group"
              >
                <MessageCircle size={20} className="text-[#25D366] transition-transform group-hover:scale-110" />
                <span className="group-hover:text-[#25D366] transition-colors">WhatsApp (Coming Soon)</span>
              </button>`;

if (content.includes(whatsappButtonStr)) {
  content = content.replace(whatsappButtonStr + '\n', ''); // Try with newline
  content = content.replace(whatsappButtonStr, ''); // Try without newline
  fs.writeFileSync(filePath, content);
  console.log('Removed WhatsApp button from AuthModal');
} else {
  console.log('WhatsApp button not found');
}
