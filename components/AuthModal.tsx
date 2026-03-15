import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, Lock, User, LogIn, Github, Chrome, ArrowRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { currentUser, login, loginWithRedirect, loginWithEmail, registerWithEmail } = useAuth();

  useEffect(() => {
    if (currentUser && isOpen) {
      onClose();
    }
  }, [currentUser, isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password, name);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await login();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRedirect = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithRedirect();
      // No need to close modal as page will redirect
    } catch (err: any) {
      setError(err.message || 'Redirect login failed');
      setLoading(false);
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative transform overflow-hidden rounded-2xl bg-[var(--color-background)] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md border border-[var(--color-border)] w-full"
              >
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors z-10 bg-[var(--color-background)] rounded-full"
                >
                  <X size={20} />
                </button>
                
                <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                {isLogin ? 'Login to access your AI tools' : 'Join the AI Master Tools community'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                  <input 
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl pl-12 pr-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  />
                </div>
              )}
              
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                <input 
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl pl-12 pr-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                <input 
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl pl-12 pr-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-border)]"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[var(--color-background)] px-4 text-[var(--color-text-muted)] font-medium tracking-wider">Or continue with</span>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-all flex items-center justify-center gap-3"
              >
                <Chrome size={20} className="text-blue-500" />
                Google Account (Popup)
              </button>

              {error && error.includes('closed') && (
                <button 
                  onClick={handleGoogleRedirect}
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-bold border border-blue-500/30 bg-blue-500/5 text-blue-500 hover:bg-blue-500/10 transition-all flex items-center justify-center gap-3 text-sm"
                >
                  <LogIn size={18} />
                  Use Redirect Instead
                </button>
              )}
            </div>

            <p className="mt-8 text-center text-sm text-[var(--color-text-secondary)]">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-[var(--color-primary)] font-bold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default AuthModal;
