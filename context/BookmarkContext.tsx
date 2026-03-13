import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePro } from './ProContext';

interface BookmarkContextType {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  bookmarkError: string | null;
  clearBookmarkError: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isPro } = usePro();
  const [bookmarkError, setBookmarkError] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      if (prev.includes(id)) {
        setBookmarkError(null);
        return prev.filter(b => b !== id);
      } else {
        if (!isPro && prev.length >= 5) {
          setBookmarkError('Free plan limit reached: You can only save up to 5 tools. Please upgrade to Pro for unlimited saves.');
          return prev;
        }
        setBookmarkError(null);
        return [...prev, id];
      }
    });
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);
  const clearBookmarkError = () => setBookmarkError(null);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked, bookmarkError, clearBookmarkError }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
