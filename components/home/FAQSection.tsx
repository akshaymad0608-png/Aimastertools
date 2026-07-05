import React from 'react';
import { HelpCircle } from 'lucide-react';

const FAQs = [
  { q: "Are all AI tools listed here free?", a: "No, our directory includes Free, Freemium, Paid, and Open Source tools. You can easily filter by pricing." },
  { q: "How often is the directory updated?", a: "We update our AI tools directory daily with the latest releases, ensuring you always have access to cutting-edge technology." },
  { q: "Can I submit my own AI tool?", a: "Yes! We welcome submissions. Just click on 'Submit Tool' (coming soon) to get your AI application featured." },
  { q: "Do you offer tutorials or prompts?", a: "Absolutely. We have a dedicated Prompt Library and a Blog with tutorials to help you master AI engineering." }
];

export const FAQSection: React.FC = () => {
  return (
    <section className="py-20 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <div className="container-custom max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold text-sm mb-4">
            <HelpCircle size={16} />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)]">Got Questions? We've Got Answers</h2>
        </div>
        <div className="space-y-4">
          {FAQs.map((faq, i) => (
            <div key={i} className="bg-[var(--color-cardBg)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{faq.q}</h3>
              <p className="text-[var(--color-text-secondary)]">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
