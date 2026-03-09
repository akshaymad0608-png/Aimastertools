import React, { useState, useEffect } from 'react';
import { Check, Loader2, Zap, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Submit: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [selectedPlan, setSelectedPlan] = useState<'Free' | 'Express' | 'Featured'>('Free');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmitTool = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      // Reset after showing success
      setTimeout(() => {
        setFormStatus('idle');
        (e.target as HTMLFormElement).reset();
      }, 4000);
    }, 1500);
  };

  const scrollToForm = (plan: 'Free' | 'Express' | 'Featured') => {
    setSelectedPlan(plan);
    const formElement = document.getElementById('submit-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <SEO 
        title="Submit Your AI Tool | AIMasterTools" 
        description="Submit your AI tool to AIMasterTools directory. Reach thousands of daily users, founders, and developers."
        keywords={['Submit AI Tool', 'AI Directory', 'Promote AI', 'Software Submission', 'Monetize AI']}
      />
      
      <div className="pt-32 pb-16 relative overflow-hidden bg-[var(--color-background)]">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
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

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
            {/* Basic Plan */}
            <div className={`glass-panel p-8 md:p-10 rounded-3xl border flex flex-col transition-all duration-300 ${selectedPlan === 'Free' ? 'border-[var(--color-primary)] shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/30'}`}>
              <h3 className="text-2xl font-bold mb-2 text-[var(--color-text-primary)]">Basic</h3>
              <p className="text-[var(--color-text-secondary)] mb-8 h-12">Standard listing in our directory for new startups.</p>
              <div className="text-5xl font-black mb-8 text-[var(--color-text-primary)]">Free</div>
              <ul className="space-y-5 mb-10 flex-grow">
                <li className="flex items-start gap-3"><Check size={20} className="text-green-500 shrink-0 mt-0.5" /> <span className="text-[var(--color-text-secondary)]">Standard Directory Listing</span></li>
                <li className="flex items-start gap-3"><Check size={20} className="text-green-500 shrink-0 mt-0.5" /> <span className="text-[var(--color-text-secondary)]">Category Placement</span></li>
                <li className="flex items-start gap-3 text-[var(--color-text-muted)]"><Check size={20} className="opacity-50 shrink-0 mt-0.5" /> <span>Review within 14-30 days</span></li>
                <li className="flex items-start gap-3 text-[var(--color-text-muted)]"><Check size={20} className="opacity-50 shrink-0 mt-0.5" /> <span>No-Follow Link</span></li>
              </ul>
              <button onClick={() => scrollToForm('Free')} className={`w-full py-4 rounded-xl border transition-all font-bold text-lg flex items-center justify-center gap-2 ${selectedPlan === 'Free' ? 'bg-[var(--color-surface)] border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-[var(--color-border)] hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]'}`}>
                Submit Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className={`glass-panel p-8 md:p-10 rounded-3xl border relative transform md:-translate-y-4 flex flex-col transition-all duration-300 ${selectedPlan === 'Express' ? 'border-[var(--color-primary)] shadow-[var(--shadow-glow)] bg-[var(--color-primary)]/10' : 'border-[var(--color-primary)]/50 bg-[var(--color-primary)]/5 hover:border-[var(--color-primary)]'}`}>
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
              <button onClick={() => scrollToForm('Express')} className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${selectedPlan === 'Express' ? 'btn-primary shadow-lg shadow-[var(--color-primary)]/30' : 'bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-primary)]/50 hover:bg-[var(--color-primary)] hover:text-white'}`}>
                Get Express Listing <ArrowRight size={18} />
              </button>
            </div>

            {/* Featured Plan */}
            <div className={`glass-panel p-8 md:p-10 rounded-3xl border flex flex-col relative overflow-hidden transition-all duration-300 ${selectedPlan === 'Featured' ? 'border-[var(--color-accent)] shadow-[0_0_20px_rgba(139,92,246,0.3)] bg-[var(--color-accent)]/10' : 'border-[var(--color-accent)]/50 hover:border-[var(--color-accent)]'}`}>
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
              <button onClick={() => scrollToForm('Featured')} className={`w-full py-4 rounded-xl transition-all font-bold text-lg flex items-center justify-center gap-2 ${selectedPlan === 'Featured' ? 'bg-[var(--color-accent)] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]' : 'bg-[var(--color-surface)] text-[var(--color-accent)] border border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)] hover:text-white'}`}>
                Become Featured <Shield size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <section id="submit-form" className="py-20 relative overflow-hidden bg-[var(--color-surface)]/30 border-t border-[var(--color-border)]">
        <div className="container-custom mx-auto px-6 relative z-10">
          <div className="glass-panel border border-[var(--color-border)] rounded-2xl p-8 md:p-12 max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center shadow-lg">
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[var(--color-text-primary)] tracking-tight mb-4">Complete Your Submission</h2>
                <p className="text-[var(--color-text-secondary)] text-base leading-relaxed">
                  You have selected the <strong className={selectedPlan === 'Free' ? 'text-[var(--color-text-primary)]' : selectedPlan === 'Express' ? 'text-[var(--color-primary)]' : 'text-[var(--color-accent)]'}>{selectedPlan}</strong> plan. Fill out the details below to get started.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                <p className="italic text-[var(--color-text-secondary)] text-sm mb-4">
                  "Submitting to AIMasterTools was the best growth hack for our launch. We got 500+ signups in the first week!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500" />
                  <div>
                    <p className="text-xs font-bold text-[var(--color-text-primary)]">Alex Chen</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">Founder, WriteFlow</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full bg-[var(--color-surface)]/50 p-8 rounded-xl border border-[var(--color-border)] min-h-[400px] flex flex-col justify-center">
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center text-center space-y-6"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 
                    }}
                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-400"
                  >
                    <Check size={40} strokeWidth={3} />
                  </motion.div>
                  <div className="space-y-2">
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl font-bold text-[var(--color-text-primary)]"
                    >
                      Submission Received!
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-[var(--color-text-secondary)] max-w-xs mx-auto"
                    >
                      Thank you for contributing. We will review your tool and get back to you shortly.
                    </motion.p>
                  </div>
                </motion.div>
              ) : (
                <form className="space-y-5 w-full" onSubmit={handleSubmitTool}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase mb-2">Tool Name</label>
                      <input required type="text" className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 outline-none transition-all placeholder-[var(--color-text-muted)]" placeholder="e.g. SuperAI" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase mb-2">Website URL</label>
                      <input required type="url" className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 outline-none transition-all placeholder-[var(--color-text-muted)]" placeholder="https://..." />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase mb-2">Contact Email</label>
                      <input required type="email" className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 outline-none transition-all placeholder-[var(--color-text-muted)]" placeholder="you@example.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase mb-2">Category</label>
                      <select required defaultValue="" className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 outline-none transition-all appearance-none">
                        <option value="" disabled>Select a category</option>
                        <option value="Writing">Writing</option>
                        <option value="Image">Image</option>
                        <option value="Video">Video</option>
                        <option value="Coding">Coding</option>
                        <option value="Audio">Audio</option>
                        <option value="Business">Business</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase mb-2">Pricing Model</label>
                      <select required defaultValue="" className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 outline-none transition-all appearance-none">
                        <option value="" disabled>Select pricing</option>
                        <option value="Free">Free</option>
                        <option value="Freemium">Freemium</option>
                        <option value="Paid">Paid</option>
                        <option value="Contact for Pricing">Contact for Pricing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase mb-2">Tags</label>
                      <input type="text" className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 outline-none transition-all placeholder-[var(--color-text-muted)]" placeholder="e.g. GPT-4, SEO, Automation" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase mb-2">Description</label>
                    <textarea required className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10 outline-none h-32 transition-all resize-none placeholder-[var(--color-text-muted)]" placeholder="Briefly describe your tool's key features and benefits..." />
                  </div>

                  <button 
                    disabled={formStatus === 'submitting'}
                    className={`w-full py-4 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center text-base tracking-wide ${selectedPlan === 'Free' ? 'bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-primary)] hover:text-white text-[var(--color-text-primary)]' : selectedPlan === 'Express' ? 'btn-primary' : 'bg-[var(--color-accent)] hover:bg-[#7c3aed] text-white'}`}
                  >
                    {formStatus === 'submitting' ? (
                      <><Loader2 className="animate-spin mr-2" size={20} /> Processing...</>
                    ) : (
                      selectedPlan === 'Free' ? 'Submit for Free' : `Proceed to Payment ($${selectedPlan === 'Express' ? '29' : '99'})`
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Submit;
