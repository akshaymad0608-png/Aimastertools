import React, { createContext, useState, useEffect, useContext } from 'react';

interface ProContextType {
  isPro: boolean;
  setProStatus: (status: boolean) => void;
}

const ProContext = createContext<ProContextType | undefined>(undefined);

export const ProProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPro, setIsPro] = useState<boolean>(false);

  useEffect(() => {
    const storedStatus = localStorage.getItem('isPro');
    if (storedStatus === 'true') {
      setIsPro(true);
    }
  }, []);

  const setProStatus = (status: boolean) => {
    setIsPro(status);
    localStorage.setItem('isPro', status.toString());
  };

  return (
    <ProContext.Provider value={{ isPro, setProStatus }}>
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
