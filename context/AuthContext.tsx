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
    try {
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
