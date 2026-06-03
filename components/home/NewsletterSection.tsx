import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

interface NewsletterSectionProps {
  showToast: (type: 'success' | 'error', text: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ showToast }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      showToast('error', "Please enter an email address.");
      return;
    }

    setNewsletterStatus('submitting');
    try {
      await addDoc(collection(db, 'newsletter_emails'), {
        email: newsletterEmail,
        subscribedAt: serverTimestamp()
      });
      
      setNewsletterStatus('idle');
      setNewsletterEmail('');
      showToast('success', "Welcome to the future of AI!");
    } catch (error: any) {
      console.error("Error subscribing:", error);
      showToast('error', error.message || 'Failed to subscribe. Please try again.');
      setNewsletterStatus('idle');
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-purple-50 p-6 shadow-xl dark:border-white/10 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 md:p-10">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
              Weekly AI Digest
            </span>

            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white md:text-3xl">
              Never miss a new AI tool
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 md:text-base">
              Get weekly AI tool picks, comparisons, prompts, and workflow ideas in your inbox.
            </p>

            <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <span>✓ Weekly curated tools</span>
              <span>✓ No spam</span>
              <span>✓ Free forever</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/10">
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="h-12 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-950 dark:text-white"
              />
              <button 
                type="submit"
                disabled={newsletterStatus === 'submitting'}
                className="h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 flex items-center justify-center cursor-pointer whitespace-nowrap"
              >
                {newsletterStatus === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : 'Join Free'}
              </button>
            </form>

            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              🔒 Safe unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
