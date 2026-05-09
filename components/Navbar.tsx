import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Monitor } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Directory', to: '/' },
    { name: 'Compare', to: '/compare' },
    { name: 'Blog', to: '/#blog' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm' : 'bg-white border-b border-gray-200'}`}>
      <nav className={`transition-all duration-300 ${scrolled ? 'py-3' : 'py-4'}`}>
        <div className="container-custom flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-3 group" 
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <Logo showText={true} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <Link 
                key={i} 
                to={link.to} 
                onClick={(e) => {
                  if (link.to.startsWith('/#')) {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      const id = link.to.replace('/#', '');
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else if (link.to === '/' && location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`text-[15px] font-normal transition-colors cursor-pointer ${location.pathname === link.to ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link 
              to="/submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-900 text-white font-semibold text-[14px] hover:bg-slate-800 transition-colors shadow-sm"
            >
              Submit Tool
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              className="text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0 border-transparent'}`}
        >
          <div className="p-4 flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <Link 
                key={i} 
                to={link.to} 
                className={`block p-3 rounded-xl font-medium transition-colors cursor-pointer ${location.pathname === link.to ? 'bg-gray-50 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  if (link.to.startsWith('/#')) {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      const id = link.to.replace('/#', '');
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else if (link.to === '/' && location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-2 mt-2 border-t border-gray-100">
              <Link 
                to="/submit" 
                className="flex items-center justify-center w-full py-3 rounded-xl font-semibold bg-slate-900 border border-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Submit Tool
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
