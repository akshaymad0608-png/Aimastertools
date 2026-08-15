import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Add slight offset for mobile bottom nav
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 md:bottom-24 right-4 md:right-7 p-3 rounded-full bg-[var(--color-primary-fill)] text-white shadow-[var(--shadow-card)] hover:bg-[var(--color-primary-dark)] transition-all duration-300 z-50 flex items-center justify-center animate-fade-in-up md:hover:scale-110"
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </button>
  );
}
