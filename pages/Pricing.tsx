import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Shield, Zap, CreditCard, X, Copy, CheckCircle2, ArrowRight, Star, Heart, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { usePro } from '../context/ProContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Pricing: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [paymentId, setPaymentId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [showManualVerify, setShowManualVerify] = useState(false);
  const [manualPaymentId, setManualPaymentId] = useState('');
  const [isVerifyingManual, setIsVerifyingManual] = useState(false);
  const navigate = useNavigate();
  const { isPro, setProStatus } = usePro();
  const { currentUser } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };
    loadRazorpay();
  }, []);

  const handlePayment = async (planName: string, amount: number) => {
    console.log('handlePayment called for:', planName, amount);
    if (isPro) {
      console.log('User is already Pro, returning');
      return;
    }
    
    if (!currentUser) {
      console.log('No current user, opening AuthModal');
      setIsAuthModalOpen(true);
      return;
    }

    console.log('Starting payment process for user:', currentUser.email);
    setSelectedPlan(planName);
    setIsProcessing(true);
    setErrorMessage('');

    try {
      if (typeof window.Razorpay === 'undefined') {
        console.error('Razorpay SDK not found on window object');
        throw new Error('Payment gateway (Razorpay) failed to load. Please check your internet connection or disable any ad-blockers and refresh the page.');
      }

      console.log('Creating order on server...');
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount, 
          planName,
          email: currentUser.email 
        })
      });

      console.log('Order creation response status:', response.status);
      let order;
      const text = await response.text();
      try {
        order = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error('Failed to parse order JSON:', text);
        throw new Error(`Server error (${response.status}): The server returned an invalid response. Please try again later.`);
      }

      if (!response.ok || order.error) {
        console.error('Order creation failed:', order.error || order.message);
        throw new Error(order.error || order.message || 'Failed to create order');
      }

      if (order.mock) {
        console.log('Mock payment mode active');
        setPaymentStatus('success');
        await setProStatus(true);
        
        await fetch('/api/send-purchase-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: currentUser.email,
            name: currentUser.displayName,
            planName: planName,
            amount: amount,
            paymentId: `mock_pay_${Date.now()}`
          })
        });
        
        setIsProcessing(false);
        return;
      }

      console.log('Order created successfully:', order.id);
      const options = {
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: "AI Master Tools",
        description: `Upgrade to ${planName}`,
        image: "https://lucide.dev/favicon.ico",
        order_id: order.id,
        handler: async (response: any) => {
          console.log('Razorpay payment success, verifying...', response.razorpay_payment_id);
          try {
            setIsProcessing(true);
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            });

            console.log('Verification response status:', verifyRes.status);
            let verifyData;
            const text = await verifyRes.text();
            try {
              verifyData = text ? JSON.parse(text) : {};
            } catch (e) {
              console.error('Failed to parse verification JSON:', text);
              throw new Error(`Server error (${verifyRes.status}): The server returned an invalid response. Please try again later.`);
            }

            if (!verifyRes.ok) {
              console.error('Verification failed:', verifyData.error || verifyData.message);
              throw new Error(verifyData.error || verifyData.message || 'Payment verification failed');
            }

            if (verifyData.success) {
              console.log('Payment verified successfully!');
              setPaymentStatus('success');
              await setProStatus(true);
              
              await fetch('/api/send-purchase-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: currentUser.email,
                  name: currentUser.displayName,
                  planName: planName,
                  amount: amount,
                  paymentId: response.razorpay_payment_id || order.id
                })
              });
            } else {
              console.error('Verification success was false:', verifyData.message);
              setErrorMessage(verifyData.message || 'Payment verification failed');
              setPaymentStatus('error');
            }
          } catch (err: any) {
            console.error('Verification error:', err);
            setErrorMessage(err.message || 'Payment verification failed');
            setPaymentStatus('error');
          } finally {
            setIsProcessing(false);
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
            console.log('Razorpay modal dismissed');
            setIsProcessing(false);
          }
        }
      };

      console.log('Opening Razorpay modal...');
      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        console.error('Razorpay payment failed event:', response.error);
        setErrorMessage(`Payment Failed: ${response.error.description}. Code: ${response.error.code}`);
        setPaymentStatus('error');
        setIsProcessing(false);
      });

      rzp.open();
    } catch (error: any) {
      console.error('Payment catch block error:', error);
      setErrorMessage(error.message || 'Failed to initiate payment. Please try again.');
      setPaymentStatus('error');
      setIsProcessing(false);
    }
  };

  const handleManualVerify = async () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!manualPaymentId.trim()) {
      setErrorMessage('Please enter your Payment ID');
      return;
    }

    setIsVerifyingManual(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/verify-payment-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId: manualPaymentId })
      });

      let data;
      const text = await response.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error('Failed to parse JSON:', text);
        throw new Error(`Server error (${response.status}): The server returned an invalid response. Please try again later.`);
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Verification failed. Please check your Payment ID.');
      }

      if (data.success) {
        setPaymentStatus('success');
        await setProStatus(true);
        setShowManualVerify(false);
        
        await fetch('/api/send-purchase-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: currentUser.email,
            name: currentUser.displayName,
            planName: 'Pro Plan (Manual Verification)',
            amount: data.amount || 99,
            paymentId: manualPaymentId
          })
        });
      } else {
        setErrorMessage(data.message || 'Verification failed. Please check your Payment ID.');
      }
    } catch (error: any) {
      console.error('Manual verification error:', error);
      setErrorMessage(error.message || 'Failed to verify. Please try again later.');
    } finally {
      setIsVerifyingManual(false);
    }
  };

  return (
    <>
      <SEO 
        title="Pricing | AI Master Tools" 
        description="Upgrade your AI Master Tools experience. Choose a plan that fits your needs with secure payment options including UPI, Netbanking, and Cards."
      />
      
      <div className="pt-24 pb-16 md:pt-32 md:pb-24 container-custom mx-auto px-6 relative min-h-screen overflow-hidden">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-10 rounded-full -z-10 pointer-events-none"></div>

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
            
            <button className="absolute top-6 right-6 text-red-500 hover:text-red-600 transition-transform hover:scale-110" aria-label="Favorite this plan">
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
                    <span>Processing...</span>
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

          {!isPro && (
            <div className="mt-16 text-center max-w-2xl mx-auto">
              <div className="p-8 glass-panel border border-blue-500/30 rounded-3xl bg-blue-500/5 shadow-2xl">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)]">Payment Stuck? Fix it Instantly</h3>
                </div>
                
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                  If you paid but your account is still basic, enter your **Payment ID** (from your SMS/Email) below to activate Pro instantly.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    value={manualPaymentId}
                    onChange={(e) => setManualPaymentId(e.target.value)}
                    placeholder="Enter Payment ID (e.g. pay_SQGYVzxgtUvW78)" 
                    className="flex-1 bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl px-5 py-4 text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono text-sm"
                  />
                  <button 
                    onClick={handleManualVerify}
                    disabled={isVerifyingManual}
                    className="btn-primary px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-blue-500/20"
                  >
                    {isVerifyingManual ? 'Verifying...' : 'Activate Pro Now'}
                  </button>
                </div>
                {errorMessage && (
                  <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <p className="text-red-400 text-xs font-medium">{errorMessage}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        </>
        )}
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Pricing;
