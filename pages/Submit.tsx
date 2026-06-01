import React, { useState, useEffect } from 'react';
import { Check, Loader2, Zap, Shield, ArrowRight, Star, Type, Globe, Mail, LayoutGrid, Banknote, Hash, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { usePro } from '../context/ProContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Submit: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'verifying' | 'success'>('idle');
  const [selectedPlan, setSelectedPlan] = useState<'Premium'>('Premium');
  const [paymentId, setPaymentId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const { isPro } = usePro();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmitTool = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    setFormStatus('submitting');
    setErrorMessage('');
    
    // Process form
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 1500);
  };

  const scrollToForm = () => {
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-10 rounded-full -z-10 pointer-events-none"></div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-xs md:text-sm font-bold uppercase tracking-wider mb-4 md:mb-6">
              <Zap size={16} /> Grow Your Audience
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tight text-[var(--color-text-primary)]">
              Submit Your <br />
              <span className="text-gradient">AI Tool</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed px-4 md:px-0">
              Join the fastest-growing directory of AI tools completely free. Get your product in front of thousands of daily visitors looking for the next innovative solution.
            </p>
            <button onClick={scrollToForm} className="mt-10 btn-primary px-8 py-4 text-base font-bold shadow-lg shadow-[var(--color-primary)]/20 animate-fade-in-up">
              Complete Your Submission Now <ArrowRight size={18} className="ml-2 inline" />
            </button>
          </div>
        </div>
      </div>
      
      <section id="submit-form" className="py-16 md:py-20 relative overflow-hidden bg-[var(--color-surface)]/30 border-t border-[var(--color-border)]">
        <div className="container-custom mx-auto px-4 md:px-6 relative z-10">
          <div className="glass-panel border border-[var(--color-border)] rounded-2xl p-6 md:p-12 max-w-4xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center shadow-lg">
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[var(--color-text-primary)] tracking-tight mb-4">Complete Your Submission</h2>
                <p className="text-[var(--color-text-secondary)] text-base leading-relaxed">
                  Fill out the details below to get started.
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
            <div className="flex-1 w-full bg-[var(--color-surface)]/50 p-5 sm:p-8 rounded-xl border border-[var(--color-border)] min-h-[300px] sm:min-h-[400px] flex flex-col justify-center">
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
                <form ref={formRef} className="space-y-6 w-full" onSubmit={handleSubmitTool}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-1.5"><Type size={14} className="text-[var(--color-primary)]" /> Tool Name <span className="text-red-500">*</span></label>
                      <input required type="text" className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all placeholder-[var(--color-text-muted)] font-medium" placeholder="e.g. WriteFlow AI" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-1.5"><Globe size={14} className="text-[var(--color-primary)]" /> Website URL <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input required type="url" className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all placeholder-[var(--color-text-muted)] font-medium" placeholder="https://..." />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-1.5"><Mail size={14} className="text-[var(--color-primary)]" /> Contact Email <span className="text-red-500">*</span></label>
                      <input required type="email" className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all placeholder-[var(--color-text-muted)] font-medium" placeholder="founder@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-1.5"><LayoutGrid size={14} className="text-[var(--color-primary)]" /> Primary Category <span className="text-red-500">*</span></label>
                      <select required defaultValue="" className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all appearance-none cursor-pointer font-medium">
                        <option value="" disabled>Select category...</option>
                        <option value="Writing">Writing & Content</option>
                        <option value="Image">Image Generation</option>
                        <option value="Video">Video Production</option>
                        <option value="Coding">Coding & Development</option>
                        <option value="Audio">Audio & Voice</option>
                        <option value="Business">Business & Finance</option>
                        <option value="Marketing">Marketing & SEO</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-1.5"><Banknote size={14} className="text-[var(--color-primary)]" /> Pricing Model <span className="text-red-500">*</span></label>
                      <select required defaultValue="" className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all appearance-none cursor-pointer font-medium">
                        <option value="" disabled>Select pricing...</option>
                        <option value="Free">Completely Free</option>
                        <option value="Freemium">Freemium (Has free tier)</option>
                        <option value="Paid">Paid / Subscription</option>
                        <option value="Contact for Pricing">Contact for Pricing</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-1.5"><Hash size={14} className="text-[var(--color-primary)]" /> Search Tags</label>
                      <input type="text" className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all placeholder-[var(--color-text-muted)] font-medium" placeholder="e.g. SEO, Automation, GPT-4" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-1.5"><FileText size={14} className="text-[var(--color-primary)]" /> Short Description <span className="text-red-500">*</span></label>
                    <textarea required className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none h-28 transition-all resize-none placeholder-[var(--color-text-muted)] font-medium" placeholder="Briefly describe what your tool does in 1-2 sentences..." />
                  </div>

                  <button 
                    disabled={formStatus === 'submitting'}
                    className="w-full py-4 mt-6 font-bold rounded-xl shadow-[0_4px_14px_rgba(83,74,183,0.3)] hover:shadow-[0_6px_20px_rgba(83,74,183,0.4)] transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex justify-center items-center text-lg tracking-wide text-white bg-[#534AB7] group"
                  >
                    {formStatus === 'submitting' ? (
                      <><Loader2 className="animate-spin mr-2" size={20} /> Processing Submission...</>
                    ) : (
                      <>Submit Tool for Review <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Submit;
