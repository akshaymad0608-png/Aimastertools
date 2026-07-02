const fs = require('fs');

const path = './App.tsx';
let content = fs.readFileSync(path, 'utf8');

// Ensure that paddingBottom isn't breaking things in App.tsx
if (content.includes('style={{ paddingBottom: \'calc(env(safe-area-inset-bottom) + 7rem)\' }}')) {
  content = content.replace(
    'style={{ paddingBottom: \'calc(env(safe-area-inset-bottom) + 7rem)\' }}',
    ''
  );
  fs.writeFileSync(path, content, 'utf8');
  console.log("App.tsx fixed");
} else {
  console.log("App.tsx is already clean");
}

const navPath = './components/MobileBottomNav.tsx';
let navContent = fs.readFileSync(navPath, 'utf8');

if (navContent.includes('style={{ paddingBottom: \'env(safe-area-inset-bottom)\' }}')) {
    navContent = navContent.replace(
      'style={{ paddingBottom: \'env(safe-area-inset-bottom)\' }}',
      'className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-surface)] border-t border-[var(--color-border)] z-[100] shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] pb-safe"'
    ).replace(
      'className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-surface)] border-t border-[var(--color-border)] z-[100] shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]"',
      '' // to prevent duplicate classes
    );
    fs.writeFileSync(navPath, navContent, 'utf8');
    console.log("MobileBottomNav.tsx fixed");
}

