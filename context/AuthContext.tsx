import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signInWithRedirect, signOut, User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider } from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
  login: () => Promise<void>;
  loginWithRedirect: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const sendWelcome = async (user: User) => {
    try {
      await fetch('/api/send-welcome-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName
        })
      });
    } catch (err) {
      console.error('Failed to send welcome email', err);
    }
  };

  const login = async () => {
    if (loading) return;
    
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ 
        prompt: 'select_account',
        display: 'popup'
      });
      
      const result = await signInWithPopup(auth, provider);
      sendWelcome(result.user).catch(err => console.error('Background welcome email failed', err));
    } catch (error: any) {
      console.error('Google login failed:', error);
      
      const errorMap: Record<string, string> = {
        'auth/popup-blocked': 'Login popup was blocked by your browser. Please allow popups for this site and try again.',
        'auth/popup-closed-by-user': 'The login window was closed before completion. If this keeps happening, try the "Use Redirect" option.',
        'auth/cancelled-by-user': 'Login was cancelled.',
        'auth/network-request-failed': 'Network error. Please check your internet connection.',
        'auth/internal-error': 'An internal error occurred. Please try again later.',
        'auth/operation-not-allowed': 'Google login is not enabled for this project.',
      };

      const message = errorMap[error.code] || error.message || 'Google login failed. Please try again.';
      throw new Error(message);
    }
  };

  const loginWithRedirect = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
      console.error('Redirect login failed:', error);
      throw error;
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      await sendWelcome(result.user);
    } catch (error) {
      console.error('Email login failed:', error);
      throw error;
    }
  };

  const registerWithEmail = async (email: string, pass: string, name: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(result.user, { displayName: name });
      await sendWelcome(result.user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, loginWithRedirect, loginWithEmail, registerWithEmail, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
