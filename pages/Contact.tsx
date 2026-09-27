import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SITE, absoluteUrl } from '../utils/seo';

const CONTACT_EMAIL = 'akshaymad0608@gmail.com';

const TOPICS = [
  'Suggest a tool to add',
  'Report an outdated entry',
  'Report a broken link',
  'Advertising / partnership',
  'Other',
];

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(form.topic)}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
      <SEO
        title="Contact AI Master Tools — Suggestions, Corrections and Enquiries"
        description="Suggest a tool, report an outdated entry, or ask about advertising. We read every message and reply to corrections and tool suggestions."
        url="/contact"
        keywords={[
          'contact AI Master Tools',
          'suggest AI tool',
          'report outdated entry',
          'AI tools directory contact',
        ]}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            '@id': `${absoluteUrl('/contact')}#contactpage`,
            name: `Contact ${SITE.name}`,
            url: absoluteUrl('/contact'),
          },
        ]}
      />

      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'Contact', path: '/contact' }]} />

        <PageHeader
          eyebrow="Contact"
          title="Get in touch"
          lede="Found a tool we missed, an entry that's gone stale, or a broken link? That's exactly what we want to hear. We read every message."
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <aside className="space-y-6 lg:col-span-1">
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-5">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[var(--color-accent)]" />
                <span className="label-mono">Email us directly</span>
              </div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-3 block text-[14.5px] text-[var(--color-accent)] underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-text-muted)]">
                We typically reply within 2 business days. Tool suggestions and corrections get
                priority.
              </p>
            </div>

            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-5">
              <p className="label-mono">What we respond to</p>
              <ul className="mt-3 space-y-2 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                <li>✓ Tool suggestions with a link</li>
                <li>✓ Entries with wrong pricing or status</li>
                <li>✓ Broken or redirected links</li>
                <li>✓ Advertising enquiries</li>
              </ul>
            </div>
          </aside>

          <section className="lg:col-span-2">
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-12 text-center">
                <Send size={32} className="text-[var(--color-accent)]" />
                <h2 className="mt-4 text-[18px] font-semibold text-[var(--color-text-primary)]">
                  Your email client should have opened
                </h2>
                <p className="mt-2 text-[14px] text-[var(--color-text-secondary)]">
                  If it didn&rsquo;t, email us directly at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--color-accent)] underline">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-6 space-y-5"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label-mono mb-1.5 block" htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2.5 text-[14px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="label-mono mb-1.5 block" htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2.5 text-[14px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)]"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="label-mono mb-1.5 block" htmlFor="topic">Topic</label>
                  <select
                    id="topic"
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2.5 text-[14px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)]"
                  >
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-mono mb-1.5 block" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2.5 text-[14px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] resize-none"
                    placeholder="Include a link if you're suggesting a tool or reporting an entry."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary h-11 px-6 text-[13px] flex items-center gap-2"
                >
                  <Send size={14} aria-hidden="true" />
                  Send message
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Contact;
