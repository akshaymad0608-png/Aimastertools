const fs = require('fs');
const code = `import React, { useState } from 'react';
import { Loader2, Mail, Sparkles, ArrowRight } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

interface NewsletterSectionProps {
  showToast: (type: 'success' | 'error', text: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ showToast }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) { showToast('error', 'Please enter an email address.'); return; }
    setNewsletterStatus('submitting');
    try {
      await addDoc(collection(db, 'newsletter_emails'), { email: newsletterEmail, subscribedAt: serverTimestamp() });
      setNewsletterStatus('idle'); setNewsletterEmail('');
      showToast('success', 'Welcome to the future of AI!');
    } catch (error: any) {
      showToast('error', error.message || 'Failed to subscribe. Please try again.');
      setNewsletterStatus('idle');
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-gradient-premium text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-white opacity-[0.15] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 rounded-full bg-black opacity-20 blur-3xl pointer-events-none" />
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest mb-5 bg-white/20 text-white border border-white/30 backdrop-blur-sm shadow-sm">
              <Sparkles size={11} /> Weekly AI Digest
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3">Stay ahead of the AI curve.</h2>
            <p className="text-base font-medium leading-relaxed text-white/90">Get the top 5 AI tools, prompts, and breakthroughs delivered to your inbox every week. No noise — just signal.</p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-medium text-white/90">
              <div className="flex -space-x-2 mr-2">
                <img className="w-6 h-6 rounded-full border border-[var(--color-primary)]" src="https://i.pravatar.cc/100?img=1" alt="" />
                <img className="w-6 h-6 rounded-full border border-[var(--color-primary)]" src="https://i.pravatar.cc/100?img=2" alt="" />
                <img className="w-6 h-6 rounded-full border border-[var(--color-primary)]" src="https://i.pravatar.cc/100?img=3" alt="" />
                <div className="w-6 h-6 rounded-full border border-[var(--color-primary)] bg-black/40 flex items-center justify-center text-[8px] text-white font-bold backdrop-blur-md shadow-sm">+100k</div>
              </div>
              {['New tools weekly','Exclusive prompts','AI news roundup'].map(item => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />{item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 group">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/60 group-focus-within:text-white transition-colors" />
                <input 
                  type="email" 
                  value={newsletterEmail} 
                  onChange={e => setNewsletterEmail(e.target.value)} 
                  placeholder="your@email.com" 
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all bg-black/20 border border-white/20 text-white placeholder-white/60 focus:bg-black/30 focus:border-white/50 shadow-inner"
                />
              </div>
              <button 
                type="submit" 
                disabled={newsletterStatus==='submitting'} 
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[var(--color-primary)] bg-white transition-all hover:bg-gray-50 hover:-translate-y-0.5 disabled:opacity-60 whitespace-nowrap shadow-md"
              >
                {newsletterStatus==='submitting' ? <Loader2 size={16} className="animate-spin" /> : <>Subscribe <ArrowRight size={15} /></>}
              </button>
            </form>
            <p className="mt-3 text-xs text-white/70 font-medium">No spam, ever. Unsubscribe in one click.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
`;
fs.writeFileSync('components/home/NewsletterSection.tsx', code, 'utf8');
console.log('Updated newsletter color scheme.');
