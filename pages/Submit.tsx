import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Submit: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

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

  return (
    <>
      <SEO 
        title="Submit Your AI Tool" 
        description="Submit your AI tool to AIMasterTools directory. Reach thousands of daily users and get featured."
        keywords={['Submit AI Tool', 'AI Directory', 'Promote AI', 'Software Submission']}
      />
      
      <section id="submit" className="py-32 relative overflow-hidden min-h-screen flex items-center bg-[var(--color-background)]">
        <div className="container-custom mx-auto px-6 relative z-10">
          <div className="glass-panel border border-[var(--color-border)] rounded-2xl p-8 md:p-12 max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center shadow-lg">
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-[var(--color-text-primary)] tracking-tight mb-4">Submit Your AI Tool</h2>
                <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
                  Join the fastest-growing AI directory. Showcase your innovation to thousands of daily users, investors, and tech enthusiasts.
                </p>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider">Why Submit?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="bg-green-500/20 p-2 rounded-full mt-1">
                      <Check size={16} className="text-green-400" strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-text-primary)]">Instant Visibility</h4>
                      <p className="text-sm text-[var(--color-text-secondary)]">Get discovered by early adopters and potential customers immediately.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-blue-500/20 p-2 rounded-full mt-1">
                      <Check size={16} className="text-blue-400" strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-text-primary)]">High-Quality Backlink</h4>
                      <p className="text-sm text-[var(--color-text-secondary)]">Boost your SEO with a do-follow link from our high-authority domain.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-purple-500/20 p-2 rounded-full mt-1">
                      <Check size={16} className="text-purple-400" strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-text-primary)]">Newsletter Feature</h4>
                      <p className="text-sm text-[var(--color-text-secondary)]">Top tools get featured in our weekly newsletter sent to 50k+ subscribers.</p>
                    </div>
                  </li>
                </ul>
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
                    className="w-full py-4 btn-primary font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center text-base tracking-wide"
                  >
                    {formStatus === 'submitting' ? (
                      <><Loader2 className="animate-spin mr-2" size={20} /> Submitting...</>
                    ) : (
                      'Submit Tool for Review'
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
