import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function FabSubmit() {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Hide on scroll down, show on scroll up (for better mobile UX, it gives space)
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Don't show FAB on submit page
  if (location.pathname === '/submit') return null;

  return (
    <Link
      to="/submit"
      className={`md:hidden fixed bottom-[140px] right-4 bg-[#534AB7] text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
      aria-label="Submit a new tool"
    >
      <Plus size={24} strokeWidth={2.5} />
    </Link>
  );
}
