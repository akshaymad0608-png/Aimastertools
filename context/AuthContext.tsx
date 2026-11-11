import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { loadFirebaseApp, loadFirebaseAuth, loaded } from '../lib/firebaseLazy';

/** Both modules, from cache when already loaded. */
const fb = async () => {
  const [app, authMod] = await Promise.all([loadFirebaseApp(), loadFirebaseAuth()]);
  return { auth: app.auth, googleProvider: app.googleProvider, ...authMod };
};

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
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;
    const start = () => {
      fb()
        .then(({ auth, onAuthStateChanged }) => {
          if (cancelled) return;
          unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
          });
        })
        .catch((err) => {
          console.error('Firebase failed to load', err);
          if (!cancelled) setLoading(false);
        });
    };
    // Wait until the page has settled so the Firebase chunk never competes with
    // the first paint. A visitor who signs in sooner just loads it on demand.
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const handle = w.requestIdleCallback ? w.requestIdleCallback(start, { timeout: 3000 }) : window.setTimeout(start, 1500);
    return () => {
      cancelled = true;
      unsubscribe?.();
      if (w.requestIdleCallback && (window as any).cancelIdleCallback) (window as any).cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  const sendWelcome = async (user: User) => {
    try {
      const res = await fetch('/api/send-welcome-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName
        })
      });
      
      if (!res.ok) {
        const text = await res.text();
        console.error('Failed to send welcome email. Server responded with:', res.status, text);
      }
    } catch (err) {
      console.error('Failed to send welcome email', err);
    }
  };

  const login = async () => {
    try {
      // Use the already-loaded modules when we have them so the popup opens
      // inside the click; the provider kicks the load off at mount.
      const { auth, googleProvider, signInWithPopup } =
        loaded.app && loaded.auth
          ? { auth: loaded.app.auth, googleProvider: loaded.app.googleProvider, signInWithPopup: loaded.auth.signInWithPopup }
          : await fb();
      const result = await signInWithPopup(auth, googleProvider);
      sendWelcome(result.user).catch(err => console.error('Background welcome email failed', err));
    } catch (error: any) {
      console.error('Google login failed:', error);
      
      // Handle Firebase error codes or string messages
      const errorCode = error.code || '';
      const errorMessage = error.message || '';
      
      if (
        errorCode === 'auth/popup-closed-by-user' || 
        errorMessage.includes('auth/popup-closed-by-user')
      ) {
        throw new Error('The login window was closed before completion. Please try again or use the Redirect option below.');
      } else if (
        errorCode === 'auth/popup-blocked' || 
        errorMessage.includes('auth/popup-blocked')
      ) {
        throw new Error('Login popup was blocked by your browser. Please allow popups for this site and try again.');
      } else if (errorCode === 'auth/cancelled-popup-request' || errorMessage.includes('auth/cancelled-popup-request')) {
        throw new Error('A login popup is already open. Please complete or close the existing popup before trying again.');
      } else if (errorCode === 'auth/cancelled-by-user' || errorMessage.includes('auth/cancelled-by-user')) {
        throw new Error('Login was cancelled.');
      } else if (errorCode === 'auth/network-request-failed' || errorMessage.includes('auth/network-request-failed')) {
        throw new Error('Network error. Please check your internet connection.');
      } else if (errorCode === 'auth/internal-error' || errorMessage.includes('auth/internal-error')) {
        throw new Error('An internal error occurred. Please try again later.');
      } else if (errorCode === 'auth/operation-not-allowed' || errorMessage.includes('auth/operation-not-allowed')) {
        throw new Error('Google login is not enabled for this project.');
      } else if (errorCode === 'auth/unauthorized-domain' || errorMessage.includes('auth/unauthorized-domain')) {
        throw new Error('This domain is not authorized for Firebase Auth. Please add it in the Firebase Console under Authentication > Settings > Authorized domains.');
      }

      throw new Error(errorMessage || 'Google login failed. Please try again.');
    }
  };

  const loginWithRedirect = async () => {
    try {
      const { auth, googleProvider, signInWithRedirect } = await fb();
      await signInWithRedirect(auth, googleProvider);
    } catch (error: any) {
      console.error('Redirect login failed:', error);
      const errorCode = error.code || '';
      const errorMessage = error.message || '';
      if (errorCode === 'auth/unauthorized-domain' || errorMessage.includes('auth/unauthorized-domain')) {
        throw new Error('This domain is not authorized for Firebase Auth. Please add it in the Firebase Console under Authentication > Settings > Authorized domains.');
      }
      throw error;
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      const { auth, signInWithEmailAndPassword } = await fb();
      const result = await signInWithEmailAndPassword(auth, email, pass);
      await sendWelcome(result.user);
    } catch (error) {
      console.error('Email login failed:', error);
      throw error;
    }
  };

  const registerWithEmail = async (email: string, pass: string, name: string) => {
    try {
      const { auth, createUserWithEmailAndPassword, updateProfile } = await fb();
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
      const { auth, signOut } = await fb();
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, loginWithRedirect, loginWithEmail, registerWithEmail, logout, loading }}>
      {children}
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
