import React, { useState } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

interface NewsletterSectionProps {
  showToast: (type: 'success' | 'error', text: string) => void;
}

/**
 * No borrowed avatars, no "+100k subscribers" we cannot evidence. The offer
 * is stated plainly and the unsubscribe promise is the last thing read.
 */
export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ showToast }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('error', 'Enter an email address first.');
      return;
    }
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'newsletter_emails'), { email, subscribedAt: serverTimestamp() });
      setStatus('idle');
      setEmail('');
      showToast('success', "You're on the list. First issue lands Tuesday.");
    } catch (error: any) {
      showToast('error', error?.message || 'That did not save. Try again in a moment.');
      setStatus('idle');
    }
  };

  return (
    <section className="section-tight section-rule" aria-labelledby="newsletter-heading">
      <div className="container-custom">
        <div className="grid items-center gap-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-7 sm:p-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="eyebrow">One email, Tuesdays</p>
            <h2 id="newsletter-heading" className="display-md mt-3.5 text-[var(--color-text-primary)]">
              What changed in the index <em>this week</em>.
            </h2>
            <p className="mt-3.5 text-[15.5px] leading-relaxed text-[var(--color-text-secondary)]">
              New entries, price changes we caught, and anything that quietly shut down.
              Short enough to read standing up.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <label htmlFor="newsletter-email" className="label-mono mb-2.5 block">
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 w-full min-w-0 flex-1 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-background)] px-4 text-[15px] text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)]"
              />
              <button type="submit" disabled={status === 'submitting'} className="btn-primary h-12 shrink-0 px-6 disabled:opacity-60">
                {status === 'submitting' ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Subscribe <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
            <p className="mt-3 text-[12.5px] text-[var(--color-text-muted)]">
              No spam. One click to leave, and we do not sell the list.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
