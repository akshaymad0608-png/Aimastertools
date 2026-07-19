import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Sparkles, Bookmark } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Directory', path: '/', icon: Home },
  { name: 'Categories', path: '/categories', icon: LayoutGrid },
  { name: 'Find', path: '/find', icon: Sparkles },
  { name: 'Saved', path: '/bookmarks', icon: Bookmark },
];

export default function MobileBottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Quick navigation"
      className="pb-safe fixed inset-x-0 bottom-0 z-[100] border-t border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-background)_92%,transparent)] backdrop-blur-xl md:hidden"
    >
      <ul className="flex h-[60px] items-stretch">
        {NAV_ITEMS.map((item) => {
          const isActive = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <li key={item.path} className="flex-1">
              <Link
                to={item.path}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex h-full flex-col items-center justify-center gap-1 transition-colors ${
                  isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-[30%] top-0 h-[2px] rounded-b-full bg-[var(--color-primary)]"
                  />
                )}
                <Icon size={20} strokeWidth={isActive ? 2.4 : 1.9} />
                <span className="text-[10.5px] font-medium">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
