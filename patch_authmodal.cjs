const fs = require('fs');
const filePath = 'components/AuthModal.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Add MessageCircle to imports
if (!content.includes('MessageCircle')) {
  content = content.replace("import { X, Mail, Lock, User, LogIn, Github, Chrome, ArrowRight, AlertCircle } from 'lucide-react';", "import { X, Mail, Lock, User, LogIn, Github, Chrome, ArrowRight, AlertCircle, MessageCircle } from 'lucide-react';");
}

const googleButtonStr = `              <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-all flex items-center justify-center gap-3"
              >
                <Chrome size={20} className="text-blue-500" />
                Google Account (Popup)
              </button>`;

const whatsappButtonStr = `              <button 
                onClick={() => alert("WhatsApp login is currently under development and will be available soon!")}
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold border border-[#25D366]/20 bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[#25D366]/10 hover:border-[#25D366]/40 transition-all flex items-center justify-center gap-3 group"
              >
                <MessageCircle size={20} className="text-[#25D366] transition-transform group-hover:scale-110" />
                <span className="group-hover:text-[#25D366] transition-colors">WhatsApp (Coming Soon)</span>
              </button>`;

if (content.includes(googleButtonStr) && !content.includes('WhatsApp (Coming Soon)')) {
  content = content.replace(googleButtonStr, googleButtonStr + '\n' + whatsappButtonStr);
  fs.writeFileSync(filePath, content);
  console.log('Patched AuthModal to add WhatsApp button');
} else {
  console.log('Could not find Google button or WhatsApp button already added');
}
