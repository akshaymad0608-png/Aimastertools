import React, { useEffect } from 'react';
import { Check, Zap, Shield, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const SubmitTool: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <SEO 
        title="Submit Your AI Tool | AIMasterTools" 
        description="List your AI tool on our directory and reach thousands of users, founders, and developers." 
      />
      
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-sm font-bold uppercase tracking-wider mb-6">
            <Zap size={16} /> Grow Your Audience
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-[var(--color-text-primary)]">
            Reach Thousands of <br />
            <span className="text-gradient">AI Enthusiasts</span>
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
            Get your AI tool in front of our highly engaged audience. Choose a plan that fits your growth goals and start driving high-quality traffic today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-[var(--color-border)] flex flex-col hover:border-[var(--color-primary)]/30 transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-2 text-[var(--color-text-primary)]">Basic</h3>
            <p className="text-[var(--color-text-secondary)] mb-8 h-12">Standard listing in our directory for new startups.</p>
            <div className="text-5xl font-black mb-8 text-[var(--color-text-primary)]">Free</div>
            <ul className="space-y-5 mb-10 flex-grow">
              <li className="flex items-start gap-3"><Check size={20} className="text-green-500 shrink-0 mt-0.5" /> <span className="text-[var(--color-text-secondary)]">Standard Directory Listing</span></li>
              <li className="flex items-start gap-3"><Check size={20} className="text-green-500 shrink-0 mt-0.5" /> <span className="text-[var(--color-text-secondary)]">Category Placement</span></li>
              <li className="flex items-start gap-3 text-[var(--color-text-muted)]"><Check size={20} className="opacity-50 shrink-0 mt-0.5" /> <span>Review within 14-30 days</span></li>
              <li className="flex items-start gap-3 text-[var(--color-text-muted)]"><Check size={20} className="opacity-50 shrink-0 mt-0.5" /> <span>No-Follow Link</span></li>
            </ul>
            <button className="w-full py-4 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] transition-all font-bold text-lg flex items-center justify-center gap-2">
              Submit Free
            </button>
          </div>

          {/* Pro Plan */}
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-[var(--color-primary)] relative transform md:-translate-y-4 shadow-[var(--shadow-glow)] flex flex-col bg-[var(--color-primary)]/5">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-6 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
              <Zap size={16} className="fill-white" /> Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2 text-[var(--color-primary)]">Express</h3>
            <p className="text-[var(--color-text-secondary)] mb-8 h-12">Skip the queue and get listed fast with SEO benefits.</p>
            <div className="text-5xl font-black mb-8 text-[var(--color-text-primary)]">$29 <span className="text-lg text-[var(--color-text-muted)] font-normal">/one-time</span></div>
            <ul className="space-y-5 mb-10 flex-grow">
              <li className="flex items-start gap-3"><Check size={20} className="text-[var(--color-primary)] shrink-0 mt-0.5" /> <span className="text-[var(--color-text-primary)] font-medium">24-Hour Expedited Review</span></li>
              <li className="flex items-start gap-3"><Check size={20} className="text-[var(--color-primary)] shrink-0 mt-0.5" /> <span className="text-[var(--color-text-primary)] font-medium">Do-Follow Backlink (SEO)</span></li>
              <li className="flex items-start gap-3"><Check size={20} className="text-[var(--color-primary)] shrink-0 mt-0.5" /> <span className="text-[var(--color-text-secondary)]">Social Media Shoutout</span></li>
              <li className="flex items-start gap-3"><Check size={20} className="text-[var(--color-primary)] shrink-0 mt-0.5" /> <span className="text-[var(--color-text-secondary)]">Permanent Listing</span></li>
            </ul>
            <button className="btn-primary w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-primary)]/30">
              Get Express Listing <ArrowRight size={18} />
            </button>
          </div>

          {/* Featured Plan */}
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-[var(--color-accent)]/50 flex flex-col relative overflow-hidden hover:border-[var(--color-accent)] transition-colors duration-300">
            <div className="absolute -right-12 top-8 bg-[var(--color-accent)] text-white px-14 py-1.5 rotate-45 text-xs font-bold tracking-widest shadow-lg">PREMIUM</div>
            <h3 className="text-2xl font-bold mb-2 text-[var(--color-accent)]">Featured</h3>
            <p className="text-[var(--color-text-secondary)] mb-8 h-12">Maximum visibility, traffic, and premium placement.</p>
            <div className="text-5xl font-black mb-8 text-[var(--color-text-primary)]">$99 <span className="text-lg text-[var(--color-text-muted)] font-normal">/month</span></div>
            <ul className="space-y-5 mb-10 flex-grow">
              <li className="flex items-start gap-3"><Check size={20} className="text-[var(--color-accent)] shrink-0 mt-0.5" /> <span className="text-[var(--color-text-primary)] font-bold">Homepage Spotlight</span></li>
              <li className="flex items-start gap-3"><Check size={20} className="text-[var(--color-accent)] shrink-0 mt-0.5" /> <span className="text-[var(--color-text-primary)] font-medium">Pinned at Top of Category</span></li>
              <li className="flex items-start gap-3"><Check size={20} className="text-[var(--color-accent)] shrink-0 mt-0.5" /> <span className="text-[var(--color-text-primary)] font-medium">Newsletter Feature (10k+ subs)</span></li>
              <li className="flex items-start gap-3"><Check size={20} className="text-[var(--color-accent)] shrink-0 mt-0.5" /> <span className="text-[var(--color-text-secondary)]">"Sponsored" Badge</span></li>
              <li className="flex items-start gap-3"><Check size={20} className="text-[var(--color-accent)] shrink-0 mt-0.5" /> <span className="text-[var(--color-text-secondary)]">Everything in Express</span></li>
            </ul>
            <button className="w-full py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[#7c3aed] text-white transition-all font-bold text-lg shadow-[0_0_20px_rgba(139,92,246,0.4)] flex items-center justify-center gap-2">
              Become Featured <Shield size={18} />
            </button>
          </div>
        </div>
        
        {/* FAQ or Trust Section */}
        <div className="mt-24 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Why list with AIMasterTools?</h3>
          <p className="text-[var(--color-text-secondary)] mb-8">
            We are one of the fastest-growing AI directories. Our users are actively looking for tools to improve their workflows, making it the perfect place to acquire high-intent users and early adopters.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] flex items-center justify-center border border-[var(--color-border)]">
                <span className="text-xl font-bold text-[var(--color-primary)]">100k</span>
              </div>
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">Monthly<br/>Visitors</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] flex items-center justify-center border border-[var(--color-border)]">
                <span className="text-xl font-bold text-[var(--color-secondary)]">15k</span>
              </div>
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">Newsletter<br/>Subscribers</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] flex items-center justify-center border border-[var(--color-border)]">
                <span className="text-xl font-bold text-[var(--color-accent)]">45%</span>
              </div>
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">Click-through<br/>Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitTool;
