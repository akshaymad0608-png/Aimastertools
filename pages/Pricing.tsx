import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Shield, Zap, CreditCard, X, Copy, CheckCircle2, Smartphone, ArrowRight, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { usePro } from '../context/ProContext';
import { useAuth } from '../context/AuthContext';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Pricing: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showVerification, setShowVerification] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const navigate = useNavigate();
  const { isPro, setProStatus } = usePro();
  const { currentUser, login } = useAuth();

  const handlePayment = async (planName: string, amount: number) => {
    if (isPro) return; // Prevent payment if already pro
    
    // Require login before payment
    if (!currentUser) {
      try {
        await login();
      } catch (error) {
        setErrorMessage('You must be logged in to purchase a plan.');
        return;
      }
    }

    setSelectedPlan(planName);
    setIsProcessing(true);
    // Open Razorpay in a new tab
    window.open('https://razorpay.me/@aimastertools', '_blank');
    
    // Show verification step after a short delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowVerification(true);
    }, 1500);
  };

  const handleVerify = async () => {
    if (!paymentId.trim()) {
      setErrorMessage('Please enter a valid Payment ID');
      return;
    }
    setIsProcessing(true);
    setErrorMessage('');
    
    // Simulate verification
    setTimeout(async () => {
      setIsProcessing(false);
      setShowVerification(false);
      setPaymentStatus('success');
      setProStatus(true);

      // Send purchase email if user is logged in
      if (currentUser) {
        try {
          await fetch('/api/send-purchase-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: currentUser.email,
              name: currentUser.displayName,
              planName: selectedPlan || 'Pro Plan'
            })
          });
        } catch (err) {
          console.error('Failed to send purchase email', err);
        }
      }
    }, 2000);
  };

  return (
    <>
      <SEO 
        title="Pricing | AI Master Tools" 
        description="Upgrade your AI Master Tools experience. Choose a plan that fits your needs with secure payment options including UPI, Netbanking, and Cards."
      />
      
      <div className="pt-24 pb-16 md:pt-32 md:pb-24 container-custom mx-auto px-6 relative min-h-screen overflow-hidden">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4 md:mb-6 tracking-tight">Simple, Transparent Pricing</h1>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed px-4 md:px-0">
            Unlock premium features and get the most out of AI Master Tools. Pay securely with UPI, Netbanking, or Credit/Debit Cards.
          </p>
        </div>

        {paymentStatus === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-12 bg-[var(--color-surface)] border border-green-500/30 rounded-2xl p-10 text-center shadow-2xl shadow-green-500/10"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-green-500 w-10 h-10" />
            </div>
            <h3 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Payment Successful!</h3>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              Thank you for upgrading to Pro. Your account has been successfully updated with premium features.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="px-8 py-4 rounded-xl font-semibold btn-primary inline-flex items-center gap-2"
            >
              Explore Pro Features <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        ) : showVerification ? (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-12 bg-[var(--color-surface)] border border-[var(--color-primary)]/30 rounded-2xl p-10 text-center shadow-2xl shadow-[var(--color-primary)]/10"
          >
            <div className="w-20 h-20 bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="text-[var(--color-primary)] w-10 h-10" />
            </div>
            <h3 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Verify Your Payment</h3>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              Please pay exactly <strong>₹99</strong> on the Razorpay page, then enter the Payment ID shown on the success screen to activate your Pro features.
            </p>
            <div className="max-w-md mx-auto space-y-4">
              <input 
                type="text" 
                value={paymentId}
                onChange={(e) => setPaymentId(e.target.value)}
                placeholder="e.g. pay_SQGYVzxgtUvW78" 
                className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] text-center font-mono"
              />
              {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}
              <button 
                onClick={handleVerify}
                disabled={isProcessing}
                className="w-full py-4 rounded-xl font-semibold btn-primary flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Verifying...' : 'Verify Payment'}
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {paymentStatus === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto mb-12 bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center"
              >
                <h3 className="text-xl font-bold text-red-400 mb-2">Payment Failed</h3>
                <p className="text-red-300/80">{errorMessage}</p>
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
          <div className="glass-panel border border-[var(--color-border)] rounded-2xl p-8 flex flex-col">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Basic</h3>
              <p className="text-[var(--color-text-muted)] h-12">Essential features for exploring AI tools.</p>
              <div className="mt-6 flex items-baseline text-5xl font-extrabold text-[var(--color-text-primary)]">
                ₹0
                <span className="ml-1 text-xl font-medium text-[var(--color-text-muted)]">/mo</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                'Browse 1000+ AI Tools',
                'Read Community Reviews',
                'Basic Search & Filtering',
                'Save up to 5 Favorite Tools',
                'Submit 1 Tool per month'
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                  <Check className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link to="/" className="w-full py-4 rounded-xl font-semibold bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors text-center block">
              Start Browsing
            </Link>
          </div>

          {/* Pro Plan */}
          <div className={`glass-panel border-2 ${isPro ? 'border-green-500' : 'border-[var(--color-primary)]'} rounded-2xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-2xl ${isPro ? 'shadow-green-500/20' : 'shadow-[var(--color-primary)]/20'}`}>
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isPro ? 'bg-green-500' : 'bg-[var(--color-primary)]'} text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase`}>
              {isPro ? 'Active Plan' : 'Most Popular'}
            </div>
            
            <button className="absolute top-6 right-6 text-red-500 hover:text-red-600 transition-transform hover:scale-110" aria-label="Love this plan">
              <Heart className="w-6 h-6 fill-red-500" />
            </button>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                Pro <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </h3>
              <p className="text-[var(--color-text-muted)] h-12">Advanced features for AI professionals and power users.</p>
              <div className="mt-6 flex items-baseline text-5xl font-extrabold text-[var(--color-text-primary)]">
                ₹99
                <span className="ml-1 text-xl font-medium text-[var(--color-text-muted)]">/mo</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                'Everything in Basic, plus:',
                'Unlimited Tool Saves & Collections',
                'Advanced AI-Powered Search',
                'Side-by-Side Tool Comparisons',
                'Priority Tool Submissions (No wait)',
                'Exclusive Discounts on AI Tools',
                'Ad-free Experience'
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                  <Check className={`w-5 h-5 ${isPro ? 'text-green-500' : 'text-[var(--color-primary)]'} shrink-0 mt-0.5`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            {isPro ? (
              <button 
                disabled
                className="w-full py-4 rounded-xl font-semibold bg-green-500/10 text-green-500 border border-green-500/20 flex items-center justify-center gap-2 cursor-default"
              >
                <Star className="w-5 h-5 fill-green-500" />
                Pro Plan Active
              </button>
            ) : (
              <button 
                onClick={() => handlePayment('Pro Plan', 99)}
                disabled={isProcessing}
                className="w-full py-4 rounded-xl font-semibold btn-primary shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pay ₹99 to Upgrade
                  </>
                )}
              </button>
            )}
            {!isPro && (
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[var(--color-text-muted)]">
                <Shield className="w-4 h-4" />
                <span>Secured Payment. Supports UPI, Cards & Netbanking.</span>
              </div>
            )}
          </div>
        </div>
        </>
        )}
      </div>
    </>
  );
};

export default Pricing;
