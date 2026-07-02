import React, { useState } from 'react';
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
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-12" style={{ background:'linear-gradient(135deg, rgba(6,78,59,0.6) 0%, rgba(8,51,68,0.5) 50%, rgba(30,27,75,0.4) 100%)', border:'1px solid rgba(16,185,129,0.2)', backdropFilter:'blur(16px)' }}>
        <div style={{ position:'absolute', right:'-8%', top:'-20%', width:'350px', height:'350px', borderRadius:'50%', background:'rgba(16,185,129,0.12)', filter:'blur(80px)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', left:'-5%', bottom:'-15%', width:'280px', height:'280px', borderRadius:'50%', background:'rgba(99,102,241,0.1)', filter:'blur(70px)', pointerEvents:'none' }} />
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest mb-5" style={{ background:'rgba(16,185,129,0.15)', border:'1px solid rgba(16,185,129,0.3)', color:'#34d399' }}><Sparkles size={11} /> Weekly AI Digest</span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3">Stay ahead of the AI curve.</h2>
            <p className="text-base font-medium leading-relaxed" style={{ color:'rgba(167,243,208,0.8)' }}>Get the top 5 AI tools, prompts, and breakthroughs delivered to your inbox every week. No noise — just signal.</p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-medium" style={{ color:'rgba(167,243,208,0.7)' }}>
              <div className="flex -space-x-2 mr-2">
                <img className="w-6 h-6 rounded-full border border-teal-900" src="https://i.pravatar.cc/100?img=1" alt="" />
                <img className="w-6 h-6 rounded-full border border-teal-900" src="https://i.pravatar.cc/100?img=2" alt="" />
                <img className="w-6 h-6 rounded-full border border-teal-900" src="https://i.pravatar.cc/100?img=3" alt="" />
                <div className="w-6 h-6 rounded-full border border-teal-900 bg-teal-800 flex items-center justify-center text-[8px] text-white font-bold">+100k</div>
              </div>
              {['New tools weekly','Exclusive prompts','AI news roundup'].map(item => (
                <span key={item} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background:'#10b981' }} />{item}</span>
              ))}
            </div>
          </div>
          <div>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:'rgba(167,243,208,0.5)' }} />
                <input type="email" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} placeholder="your@email.com" className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all" style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(16,185,129,0.25)', color:'white' }}
                  onFocus={e => (e.currentTarget.style.borderColor='rgba(16,185,129,0.6)')}
                  onBlur={e => (e.currentTarget.style.borderColor='rgba(16,185,129,0.25)')} />
              </div>
              <button type="submit" disabled={newsletterStatus==='submitting'} className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5 disabled:opacity-60 whitespace-nowrap" style={{ background:'linear-gradient(135deg,#10b981,#059669)', boxShadow:'0 6px 20px rgba(16,185,129,0.35)' }}>
                {newsletterStatus==='submitting' ? <Loader2 size={16} className="animate-spin" /> : <>Subscribe <ArrowRight size={15} /></>}
              </button>
            </form>
            <p className="mt-3 text-xs" style={{ color:'rgba(167,243,208,0.45)' }}>No spam, ever. Unsubscribe in one click.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
