import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin, ArrowRight, Check, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import Logo from './Logo';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'newsletter_emails'), {
        email: email,
        subscribedAt: serverTimestamp()
      });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] pt-16 pb-24 md:pb-8 mt-auto">
      <div className="container-custom max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <Logo showText={true} />
            </Link>
            <p className="text-[var(--color-text-secondary)] text-[15px] mb-8 leading-relaxed pr-4">
              Empowering creators and businesses with the best AI tools, curated and updated daily.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors" aria-label="GitHub"><Github size={20} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-6 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-4 text-[15px] text-[var(--color-text-secondary)]">
              <li><Link to="/prompts" className="hover:text-[var(--color-primary)] transition-colors">Prompt Library</Link></li>
              <li><Link to="/compare" className="hover:text-[var(--color-primary)] transition-colors">Compare AI</Link></li>
              <li><Link to="/find" className="hover:text-[var(--color-primary)] transition-colors">Find My Tool</Link></li>
              <li><Link to="/blog" className="hover:text-[var(--color-primary)] transition-colors">AI Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-6 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-4 text-[15px] text-[var(--color-text-secondary)]">
              <li><Link to="/discover#about" className="hover:text-[var(--color-primary)] transition-colors">About Us</Link></li>
              <li><Link to="/bookmarks" className="hover:text-[var(--color-primary)] transition-colors">My Favorites</Link></li>
              <li><Link to="/privacy" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-6 text-sm uppercase tracking-wider">Stay Updated</h3>
            <p className="text-[15px] text-[var(--color-text-secondary)] mb-4">
              Get the latest AI trends to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              {status === 'success' ? (
                <div className="w-full bg-green-50 border border-green-100 rounded-lg py-3 px-4 text-sm text-green-700 flex items-center gap-2">
                  <Check size={16} /> Subscribed!
                </div>
              ) : (
                <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    required
                    disabled={status === 'submitting'}
                    className={`w-full bg-[var(--color-background)] border ${status === 'error' ? 'border-red-300' : 'border-[var(--color-border)]'} rounded-xl py-3 px-4 text-[15px] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all pr-12 disabled:opacity-50`}
                  />
                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors disabled:opacity-50"
                    aria-label="Subscribe to newsletter"
                  >
                    {status === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                  </button>
                </div>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-xs mt-2">Failed to subscribe. Please try again.</p>
              )}
            </form>
          </div>
        </div>
        
        <div className="border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-[var(--color-text-secondary)] flex flex-col gap-2 text-center md:text-left">
            <p>© 2026 AI Master Tools. All rights reserved.</p>
            <p className="text-xs max-w-2xl">
              <strong>Affiliate Disclosure:</strong> Some of the links on this website are affiliate links. This means that if you click on the link and make a purchase, we may receive a commission at no additional cost to you.
            </p>
          </div>
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-[var(--color-background)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] border border-[var(--color-border)] transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowRight size={18} className="-rotate-90" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
