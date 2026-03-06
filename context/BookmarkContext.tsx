import React, { createContext, useContext, useState, useEffect } from 'react';

interface BookmarkContextType {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
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
