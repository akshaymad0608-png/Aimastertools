import React, { useEffect, useState } from 'react';
import { Download, X, Share } from 'lucide-react';

const DISMISS_KEY = 'pwa-install-dismissed-v1';

const isIos = () =>
  typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent);

const isStandalone = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as any).standalone === true);

/**
 * Mobile "Add to Home Screen" prompt. On Android/desktop Chrome it uses the
 * native beforeinstallprompt; on iOS Safari (which has no such event) it shows
 * the manual Share → Add to Home Screen hint. Dismissible and remembered.
 */
const InstallPrompt: React.FC = () => {
  const [deferred, setDeferred] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isStandalone()) return;
    if (localStorage.getItem(DISMISS_KEY) === '1') return;
    if (window.innerWidth >= 768) return; // mobile only

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e);
      setIosHint(false);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);

    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isIos()) {
      timer = setTimeout(() => {
        setIosHint(true);
        setShow(true);
      }, 2600);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1');
    setShow(false);
  };

  const install = async () => {
    if (!deferred) return;
    deferred.prompt();
    try {
      await deferred.userChoice;
    } catch {
      /* ignore */
    }
    setDeferred(null);
    setShow(false);
    localStorage.setItem(DISMISS_KEY, '1');
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-3 bottom-[84px] z-[70] animate-fade-in-up md:hidden">
      <div className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-3 shadow-[var(--shadow-lift)]">
        <img
          src="/favicon-32.png"
          alt=""
          aria-hidden="true"
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-[var(--radius-md)] border border-[var(--color-border)]"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-bold leading-tight text-[var(--color-text-primary)]">
            Install AI Master Tools
          </p>
          {iosHint ? (
            <p className="mt-0.5 text-[12px] leading-snug text-[var(--color-text-secondary)]">
              Tap <Share size={12} className="inline align-[-1px]" aria-hidden="true" /> Share, then
              “Add to Home Screen”.
            </p>
          ) : (
            <p className="mt-0.5 text-[12px] leading-snug text-[var(--color-text-secondary)]">
              One-tap access, right from your home screen.
            </p>
          )}
        </div>

        {!iosHint && (
          <button onClick={install} className="btn-primary h-9 shrink-0 px-3.5 text-[13px]">
            <Download size={15} /> Install
          </button>
        )}
        <button
          onClick={dismiss}
          aria-label="Dismiss install prompt"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt;
