import React from 'react';
import { Plus } from 'lucide-react';
import { TOOL_COUNT, CATEGORY_COUNT, FREE_TOOL_COUNT } from '../../utils/stats';

/**
 * Answers written to be true rather than promotional — these are also the
 * strings emitted as FAQPage structured data, and Google penalises schema
 * that overstates. Exported so the Home page can serialise them once.
 */
export const HOME_FAQS = [
  {
    question: 'Is AI Master Tools free to use?',
    answer:
      `Yes. Browsing, searching and comparing all ${TOOL_COUNT} entries is free and needs no account. ` +
      'Some tools we link to pay us a referral fee if you subscribe, which is how the site is funded. ' +
      'That fee never changes where a tool ranks or what its listing says.',
  },
  {
    question: 'Are all the AI tools listed here free?',
    answer:
      `No. The catalogue covers every pricing model — free, freemium, paid, usage-based and open source. ` +
      `${FREE_TOOL_COUNT} of the ${TOOL_COUNT} entries cost nothing to start with, and you can filter the ` +
      'directory down to only those.',
  },
  {
    question: 'How often is the directory updated?',
    answer:
      'New tools are added continuously and every outbound link is re-checked weekly, so dead pages and ' +
      'shut-down products get removed rather than left to rot. Pricing is reviewed whenever a tool announces a change.',
  },
  {
    question: 'How do you decide which AI tools are featured?',
    answer:
      'Featured entries are chosen by hand on three things: whether the tool does what it claims, whether ' +
      'its pricing is legible before you sign up, and whether it is still actively maintained. Nobody can buy a featured slot.',
  },
  {
    question: 'Can I compare two AI tools side by side?',
    answer:
      'Yes. Every listing has a compare button, and the comparison page puts pricing, ratings, categories and ' +
      'best use cases into the same columns so you are reading like for like.',
  },
  {
    question: 'How many categories of AI tools are there?',
    answer:
      `The index is split into ${CATEGORY_COUNT} categories, from writing and image generation to workflow ` +
      'automation and developer tooling. Every tool sits in exactly one category and carries tags for cross-referencing.',
  },
  {
    question: 'Can I submit my own AI tool to the directory?',
    answer:
      'Yes — submissions are welcome and free. Tools are reviewed manually before they appear, and a submission ' +
      'is not a guarantee of listing.',
  },
];

export const FAQSection: React.FC = () => {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section className="section section-alt" aria-labelledby="faq-heading">
      <div className="container-custom">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 id="faq-heading" className="display-md mt-4 text-[var(--color-text-primary)]">
              The things people ask <em>first</em>.
            </h2>
            <p className="section-head__lede">
              If something here is not answered, the answer is probably that we do not know yet —
              and we would rather say so.
            </p>
          </div>

          <div>
            {HOME_FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.question} className="accordion-item">
                  <h3>
                    <button
                      type="button"
                      className="accordion-trigger"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span>{faq.question}</span>
                      <Plus size={18} className="accordion-icon" aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    hidden={!isOpen}
                    className="accordion-panel text-[15px]"
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
