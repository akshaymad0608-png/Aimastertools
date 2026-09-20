import React, { createContext, useState, useEffect, useContext } from 'react';

interface ProContextType {
  isPro: boolean;
  setProStatus: (status: boolean) => Promise<void>;
  loading: boolean;
}

const ProContext = createContext<ProContextType | undefined>(undefined);

/*
  Pro is a stub. Billing was removed deliberately (see `refactor: remove pro
  tier constraints and billing`), so every visitor is treated as Pro and nothing
  is gated on it.

  This file used to import firebase/auth and firebase/firestore to read a
  per-user isPro flag. Those imports stayed behind after the refactor with no
  remaining reader, which meant the Firebase SDK was pulled in on behalf of a
  value that is now a constant. Removed.

  If Pro ever comes back, the Firestore rules that guard the flag are still in
  firestore.rules — a client must not be able to grant itself Pro, so the write
  has to happen server-side after payment verification.
*/
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
