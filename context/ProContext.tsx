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
  const isPro = true;
  const loading = false;

  const setProStatus = async (status: boolean) => {
    // No-op
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
