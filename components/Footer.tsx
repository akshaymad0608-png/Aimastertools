import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Twitter, Github, Linkedin, ChevronUp, ArrowRight, Mail, Check, Loader2, Users } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import Logo from './Logo';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [imageError, setImageError] = useState(false);

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
    <footer className="bg-[var(--color-background)] border-t border-[var(--color-border)] pt-12 pb-8 md:pt-20 md:pb-10 mt-auto relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-[120px] pointer-events-none will-change-transform transform-gpu"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-secondary)]/5 rounded-full blur-[120px] pointer-events-none will-change-transform transform-gpu"></div>

      <div className="container-custom mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6 group">
              {!imageError ? (
                <img 
                  src="/logo.png" 
                  alt="AIMasterTools Logo" 
                  className="h-10 sm:h-12 w-auto object-contain flex-shrink-0 group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex flex-col justify-center">
                  <span className="text-xl sm:text-2xl font-black tracking-tight leading-none flex items-center">
                    <span className="text-[#0ea5e9]">AI</span>
                    <span className="text-[var(--color-text-primary)]">MasterTools</span>
                  </span>
                  <div className="flex items-center gap-1 w-full mt-1">
                    <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-[#f97316] rounded-full"></div>
                    <span className="text-[0.55rem] sm:text-[0.65rem] font-bold text-[#f97316] tracking-wider leading-none">
                      .Space
                    </span>
                    <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-[#f97316] rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-[var(--color-text-secondary)] text-sm mb-8 leading-relaxed">
              Empowering businesses with cutting-edge AI solutions. We bridge the gap between imagination and reality.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white transition-all text-[var(--color-text-secondary)]" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white transition-all text-[var(--color-text-secondary)]" aria-label="GitHub"><Github size={18} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white transition-all text-[var(--color-text-secondary)]" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-[var(--color-text-primary)] mb-6 text-lg">Solutions</h4>
            <ul className="space-y-4 text-sm text-[var(--color-text-secondary)]">
              <li><Link to="/?category=Business" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[var(--color-primary)] rounded-full"></span> Business Automation</Link></li>
              <li><Link to="/?category=Content" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[var(--color-primary)] rounded-full"></span> Content Creation</Link></li>
              <li><Link to="/?category=Data" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[var(--color-primary)] rounded-full"></span> Data Analytics</Link></li>
              <li><Link to="/?category=Development" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[var(--color-primary)] rounded-full"></span> Custom Development</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[var(--color-text-primary)] mb-6 text-lg">Company</h4>
            <ul className="space-y-4 text-sm text-[var(--color-text-secondary)]">
              <li><Link to="/discover#about" className="hover:text-[var(--color-primary)] transition-colors">About Us</Link></li>
              <li><Link to="/discover#faq" className="hover:text-[var(--color-primary)] transition-colors">FAQ</Link></li>
              <li><Link to="/discover#testimonials" className="hover:text-[var(--color-primary)] transition-colors">Testimonials</Link></li>
              <li><Link to="/careers" className="hover:text-[var(--color-primary)] transition-colors">Careers</Link></li>
              <li><Link to="/privacy" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[var(--color-text-primary)] mb-6 text-lg">Newsletter</h4>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Subscribe to get the latest AI trends and updates.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              {status === 'success' ? (
                <div className="w-full bg-green-500/20 border border-green-500/30 rounded-lg py-3 px-4 text-sm text-green-400 flex items-center gap-2">
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
                    className={`w-full bg-[var(--color-surface)] border ${status === 'error' ? 'border-red-500' : 'border-[var(--color-border)]'} rounded-lg py-3 px-4 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors pr-12 disabled:opacity-50`}
                  />
                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[var(--color-primary)] rounded-md text-white hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
        
        <div className="border-t border-[var(--color-border)] pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-[var(--color-text-secondary)] flex flex-col gap-2 text-center md:text-left">
            <p>© 2026 AIMasterTools. All rights reserved.</p>
            <p className="text-xs opacity-70 max-w-2xl">
              <strong>Affiliate Disclosure:</strong> Some of the links on this website are affiliate links. This means that if you click on the link and make a purchase, we may receive a commission at no additional cost to you. This helps support our directory and keeps it free for users.
            </p>
          </div>
          <button 
            onClick={scrollToTop}
            className="p-3 bg-[var(--color-surface)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-all text-[var(--color-text-secondary)] shadow-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] group"
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
