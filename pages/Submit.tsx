import React, { useState, useEffect } from 'react';
import { Check, Loader2, Zap, Shield, ArrowRight, Star } from 'lucide-react';
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
    
    if (isPro) {
      // Pro users skip payment
      setTimeout(() => {
        setFormStatus('success');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }, 1500);
      return;
    }

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: 99, 
          planName: 'Premium Tool Listing',
          email: currentUser.email 
        })
      });

      let order;
      const text = await response.text();
      try {
        order = text ? JSON.parse(text) : {};
      } catch (e) {
        throw new Error(`Server error (${response.status})`);
      }

      if (!response.ok || order.error) {
        throw new Error(order.error || order.message || 'Failed to create order');
      }

      if (order.mock) {
        setFormStatus('success');
        setTimeout(() => {
          navigate('/');
        }, 3000);
        return;
      }

      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Payment gateway failed to load. Please refresh the page.');
      }

      const options = {
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: "AI Master Tools",
        description: "Premium Tool Listing",
        image: "https://lucide.dev/favicon.ico",
        order_id: order.id,
        handler: async (response: any) => {
          try {
            setFormStatus('verifying');
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            });

            let verifyData;
            const text = await verifyRes.text();
            try {
              verifyData = text ? JSON.parse(text) : {};
            } catch (e) {
              throw new Error(`Server error (${verifyRes.status})`);
            }

            if (!verifyRes.ok) {
              throw new Error(verifyData.error || verifyData.message || 'Payment verification failed');
            }

            if (verifyData.success) {
              setFormStatus('success');
              setTimeout(() => {
                navigate('/');
              }, 3000);
            } else {
              setErrorMessage(verifyData.message || 'Payment verification failed');
              setFormStatus('idle');
            }
          } catch (err: any) {
            setErrorMessage(err.message || 'Payment verification failed');
            setFormStatus('idle');
          }
        },
        prefill: {
          name: currentUser.displayName || '',
          email: currentUser.email || '',
        },
        theme: {
          color: "#3B82F6",
        },
        modal: {
          ondismiss: () => {
            setFormStatus('idle');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        setErrorMessage(`Payment Failed: ${response.error.description}`);
        setFormStatus('idle');
      });

      rzp.open();
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to initiate payment. Please try again.');
      setFormStatus('idle');
    }
  };

  const handleVerify = async () => {
    if (!paymentId.trim()) {
      setErrorMessage('Please enter a valid Payment ID');
      return;
    }
    setFormStatus('submitting');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/verify-payment-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId })
      });

      let data;
      const text = await response.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        throw new Error(`Server error (${response.status})`);
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Verification failed. Please check your Payment ID.');
      }

      if (data.success) {
        setFormStatus('success');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setErrorMessage(data.message || 'Verification failed. Please check your Payment ID.');
        setFormStatus('verifying');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to verify. Please try again later.');
      setFormStatus('verifying');
    }
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
              Reach Thousands of <br />
              <span className="text-gradient">AI Enthusiasts</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed px-4 md:px-0">
              Get your AI tool in front of our highly engaged audience. Choose a plan that fits your growth goals and start driving high-quality traffic today.
            </p>
          </div>

          <div className="max-w-lg mx-auto mb-24">
            {/* Premium Listing Plan */}
            <div className={`glass-panel p-8 md:p-10 rounded-3xl border ${isPro ? 'border-green-500' : 'border-[var(--color-primary)]'} shadow-[var(--shadow-glow)] ${isPro ? 'bg-green-500/10' : 'bg-[var(--color-primary)]/10'} flex flex-col relative transition-all duration-300`}>
              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${isPro ? 'bg-green-500' : 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]'} text-white px-6 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg whitespace-nowrap`}>
                {isPro ? <><Star size={16} className="fill-white" /> Pro Benefit</> : <><Zap size={16} className="fill-white" /> One-Time Payment</>}
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${isPro ? 'text-green-500' : 'text-[var(--color-primary)]'} text-center`}>Premium Listing</h3>
              <p className="text-[var(--color-text-secondary)] mb-8 h-12 text-center">Get your AI tool in front of thousands of potential users.</p>
              <div className="text-5xl font-black mb-8 text-[var(--color-text-primary)] text-center">
                {isPro ? 'Free' : '₹99'} <span className="text-lg text-[var(--color-text-muted)] font-normal">{isPro ? 'for Pro Members' : '/lifetime'}</span>
              </div>
              <ul className="space-y-5 mb-10 flex-grow">
                <li className="flex items-start gap-3"><Check size={20} className={`${isPro ? 'text-green-500' : 'text-[var(--color-primary)]'} shrink-0 mt-0.5`} /> <span className="text-[var(--color-text-primary)] font-medium">Permanent Do-Follow Link</span></li>
                <li className="flex items-start gap-3"><Check size={20} className={`${isPro ? 'text-green-500' : 'text-[var(--color-primary)]'} shrink-0 mt-0.5`} /> <span className="text-[var(--color-text-primary)] font-medium">Featured in our Weekly Newsletter</span></li>
                <li className="flex items-start gap-3"><Check size={20} className={`${isPro ? 'text-green-500' : 'text-[var(--color-primary)]'} shrink-0 mt-0.5`} /> <span className="text-[var(--color-text-secondary)]">Priority Review (Under 24 hours)</span></li>
                <li className="flex items-start gap-3"><Check size={20} className={`${isPro ? 'text-green-500' : 'text-[var(--color-primary)]'} shrink-0 mt-0.5`} /> <span className="text-[var(--color-text-secondary)]">Reach 10,000+ AI Enthusiasts</span></li>
                <li className="flex items-start gap-3"><Check size={20} className={`${isPro ? 'text-green-500' : 'text-[var(--color-primary)]'} shrink-0 mt-0.5`} /> <span className="text-[var(--color-text-secondary)]">SEO Optimized Tool Page</span></li>
              </ul>
              <button onClick={scrollToForm} className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${isPro ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30' : 'btn-primary shadow-lg shadow-[var(--color-primary)]/30'}`}>
                {isPro ? 'Submit Tool Now' : 'Pay ₹99 to Submit'} <ArrowRight size={18} />
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
                  Fill out the details below to get started with your Premium Listing.
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
              ) : formStatus === 'verifying' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center text-[var(--color-primary)]">
                    <Shield size={40} strokeWidth={2} />
                  </div>
                  <div className="space-y-2 w-full max-w-sm">
                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">Verify Payment</h3>
                    <p className="text-[var(--color-text-secondary)] text-sm mb-6">
                      Please pay exactly <strong>₹99</strong> on the Razorpay page, then enter the Payment ID shown on the success screen to complete your submission.
                    </p>
                    <input 
                      type="text" 
                      value={paymentId}
                      onChange={(e) => setPaymentId(e.target.value)}
                      placeholder="e.g. pay_SQGYVzxgtUvW78" 
                      className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] text-center font-mono mb-2"
                    />
                    {errorMessage && <p className="text-red-400 text-xs mb-4">{errorMessage}</p>}
                    <button 
                      onClick={handleVerify}
                      className="w-full py-3 rounded-xl font-bold text-base btn-primary mt-4"
                    >
                      Verify & Submit Tool
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form ref={formRef} className="space-y-5 w-full" onSubmit={handleSubmitTool}>
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
                    className={`w-full py-4 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center text-base tracking-wide ${isPro ? 'bg-green-500 hover:bg-green-600 text-white' : 'btn-primary'}`}
                  >
                    {formStatus === 'submitting' ? (
                      <><Loader2 className="animate-spin mr-2" size={20} /> Processing...</>
                    ) : (
                      isPro ? 'Submit Tool' : 'Proceed to Payment (₹99)'
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
