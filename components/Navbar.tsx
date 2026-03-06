import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrainCircuit, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled ? 'glass-panel border-[var(--color-border)] py-3 md:py-4 shadow-lg' : 'bg-transparent border-transparent py-4 md:py-6'}`}>
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="flex items-center gap-3 group" 
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              setIsMobileMenuOpen(false);
            }}
          >
            <div className="bg-[var(--color-primary)] p-2 rounded-lg shadow-[var(--shadow-neon)] group-hover:scale-105 transition-transform duration-300">
               <BrainCircuit className="text-white" size={24} strokeWidth={2} />
            </div>
            <span className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] tracking-tight">
              AIMasterTools<span className="text-[var(--color-primary)]">.</span>
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary)] transition-all group-hover:w-full"></span>
          </Link>
          {isHome ? (
            <>
              <button onClick={() => scrollToSection('categories')} className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">Solutions</button>
              <button onClick={() => scrollToSection('tools')} className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">Portfolio</button>
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">About</button>
            </>
          ) : (
            <>
              <Link to="/#categories" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">Solutions</Link>
              <Link to="/#tools" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">Portfolio</Link>
              <Link to="/#about" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">About</Link>
            </>
          )}
          
          <Link 
            to="/submit"
            className="btn-primary text-sm px-6 py-2.5 shadow-none hover:shadow-lg"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button className="text-[var(--color-text-primary)] p-2 rounded-lg hover:bg-[var(--color-surface)] transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[var(--color-background)] border-b border-[var(--color-border)] p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5">
          <Link to="/" className="text-lg font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)]" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          {isHome ? (
            <>
              <button onClick={() => scrollToSection('categories')} className="text-lg font-medium text-[var(--color-text-secondary)] text-left hover:text-[var(--color-primary)]">Solutions</button>
              <button onClick={() => scrollToSection('tools')} className="text-lg font-medium text-[var(--color-text-secondary)] text-left hover:text-[var(--color-primary)]">Portfolio</button>
              <button onClick={() => scrollToSection('about')} className="text-lg font-medium text-[var(--color-text-secondary)] text-left hover:text-[var(--color-primary)]">About</button>
            </>
          ) : (
            <>
              <Link to="/#categories" className="text-lg font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]" onClick={() => setIsMobileMenuOpen(false)}>Solutions</Link>
              <Link to="/#tools" className="text-lg font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</Link>
              <Link to="/#about" className="text-lg font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            </>
          )}
          <Link to="/submit" className="btn-primary text-center" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
