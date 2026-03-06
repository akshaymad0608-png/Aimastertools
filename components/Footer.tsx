import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Twitter, Github, Linkedin, ChevronUp, ArrowRight, Mail, Check, Loader2, Users } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <footer className="bg-[var(--color-background)] border-t border-[var(--color-border)] pt-16 pb-8 md:pt-20 md:pb-10 mt-auto relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-secondary)]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container-custom mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[var(--color-primary)] p-2 rounded-lg shadow-[var(--shadow-neon)]">
                <BrainCircuit className="text-white" size={24} strokeWidth={2} />
              </div>
              <span className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight">
                AIMasterTools<span className="text-[var(--color-primary)]">.</span>
              </span>
            </div>
            <p className="text-[var(--color-text-secondary)] text-sm mb-8 leading-relaxed">
              Empowering businesses with cutting-edge AI solutions. We bridge the gap between imagination and reality.
            </p>
            <div className="flex gap-4">
              <button className="p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white transition-all text-[var(--color-text-secondary)]" aria-label="Twitter"><Twitter size={18} /></button>
              <button className="p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white transition-all text-[var(--color-text-secondary)]" aria-label="GitHub"><Github size={18} /></button>
              <button className="p-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white transition-all text-[var(--color-text-secondary)]" aria-label="LinkedIn"><Linkedin size={18} /></button>
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
              <li><Link to="/#about" className="hover:text-[var(--color-primary)] transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-[var(--color-primary)] transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</Link></li>
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
                <>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    required
                    disabled={status === 'submitting'}
                    className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg py-3 px-4 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors pr-12 disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[var(--color-primary)] rounded-md text-white hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
        
        <div className="border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-[var(--color-text-secondary)]">© 2026 AIMasterTools. All rights reserved.</p>
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
