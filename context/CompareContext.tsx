import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Tools picked for comparison, from anywhere on the site.
 *
 * /compare has always been able to open with a set — it reads `?tools=a,b,c`
 * on mount — but nothing could put one together. The compare control on every
 * tool card linked to `?tool1={id}`, a parameter that page has never read, so
 * it landed on an empty picker and the tool you were looking at was gone.
 *
 * Three at a time, because that is what the comparison table renders.
 */

const KEY = 'compare-tools';
const MAX = 3;

interface CompareContextType {
  /** Ids currently picked, in the order they were added. */
  compare: string[];
  isComparing: (id: string) => boolean;
  toggleCompare: (id: string) => void;
  removeCompare: (id: string) => void;
  clearCompare: () => void;
  /** True when adding another would exceed what /compare can show. */
  isFull: boolean;
  max: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compare, setCompare] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed.slice(0, MAX).filter((x) => typeof x === 'string') : [];
    } catch {
      // A corrupted entry should cost the reader an empty tray, not a blank page.
      return [];
    }
  });

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(compare)); } catch { /* private mode */ }
  }, [compare]);

  const isComparing = useCallback((id: string) => compare.includes(id), [compare]);

  const toggleCompare = useCallback((id: string) => {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX) return prev;
      return [...prev, id];
    });
  }, []);

  const removeCompare = useCallback((id: string) => {
    setCompare((prev) => prev.filter((x) => x !== id));
  }, []);

  const clearCompare = useCallback(() => setCompare([]), []);

  const value = useMemo(
    () => ({ compare, isComparing, toggleCompare, removeCompare, clearCompare, isFull: compare.length >= MAX, max: MAX }),
    [compare, isComparing, toggleCompare, removeCompare, clearCompare],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
};

export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used inside CompareProvider');
  return ctx;
};
