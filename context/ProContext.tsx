import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface ProContextType {
  isPro: boolean;
  setProStatus: (status: boolean) => Promise<void>;
  loading: boolean;
}

const ProContext = createContext<ProContextType | undefined>(undefined);

export const ProProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPro, setIsPro] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial check from localStorage for immediate UI feedback
    const storedStatus = localStorage.getItem('isPro');
    if (storedStatus === 'true') {
      setIsPro(true);
    }

    let unsubscribeDoc: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      // Clean up previous listener if it exists
      if (unsubscribeDoc) {
        unsubscribeDoc();
        unsubscribeDoc = null;
      }

      if (user) {
        // Listen to real-time updates from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        unsubscribeDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const proStatus = data.isPro || false;
            setIsPro(proStatus);
            localStorage.setItem('isPro', proStatus.toString());
          }
          setLoading(false);
        }, (error) => {
          // Ignore permission errors that happen during logout/cleanup
          if (error.code !== 'permission-denied') {
            console.error("Error listening to user doc:", error);
          }
          setLoading(false);
        });
      } else {
        setIsPro(false);
        localStorage.removeItem('isPro');
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) {
        unsubscribeDoc();
      }
    };
  }, []);

  const setProStatus = async (status: boolean) => {
    setIsPro(status);
    localStorage.setItem('isPro', status.toString());

    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userDocRef, { 
          isPro: status,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (error) {
        console.error("Error updating pro status in Firestore:", error);
      }
    }
  };

  return (
    <ProContext.Provider value={{ isPro, setProStatus, loading }}>
      {children}
    </ProContext.Provider>
  );
};

export const usePro = () => {
  const context = useContext(ProContext);
  if (context === undefined) {
    throw new Error('usePro must be used within a ProProvider');
  }
  return context;
};
