import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Bookmark, Search } from 'lucide-react';

export default function MobileBottomNav() {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Prompts', path: '/prompts', icon: Compass },
    { name: 'Find', path: '/find', icon: Search },
    { name: 'Saved', path: '/bookmarks', icon: Bookmark },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-surface)] border-t border-[var(--color-border)] z-[100] shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex justify-around items-center h-16 pointer-events-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <div className={`relative flex items-center justify-center p-1 rounded-full ${isActive ? 'bg-[var(--color-primary)]/10' : ''}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'transform scale-110 transition-transform' : ''} />
              </div>
              <span className={`text-[10px] sm:text-xs ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
