import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Users, Activity, HelpCircle, Info, TrendingUp, Award } from 'lucide-react';
import SEO from '../components/SEO';
import { Link, useLocation } from 'react-router-dom';

const Discover: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <SEO 
        title="Discover More | AI Master Tools" 
        description="Learn more about AI Master Tools, read FAQs, testimonials, and discover featured AI spotlights and tutorials."
      />
      
      <div className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container-custom">
          
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-[var(--color-text-primary)] mb-6 tracking-tighter"
            >
              Discover <span className="text-gradient">More</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto"
            >
              Everything else you need to know about AI Master Tools, from our mission to user testimonials and live stats.
            </motion.p>
          </div>

          {/* Quick Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {[
              { id: 'about', icon: Info, label: 'About Us' },
              { id: 'stats', icon: Activity, label: 'Live Stats' },
              { id: 'spotlight', icon: Award, label: 'Featured Spotlight' },
              { id: 'testimonials', icon: Star, label: 'Testimonials' },
              { id: 'faq', icon: HelpCircle, label: 'FAQ' },
            ].map((btn, i) => (
              <motion.a
                key={btn.id}
                href={`#${btn.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all shadow-sm hover:shadow-md font-semibold"
              >
                <btn.icon size={18} />
                {btn.label}
              </motion.a>
            ))}
          </div>

          <div className="flex flex-col gap-24">
            
            {/* About Section */}
            <section id="about" className="scroll-mt-32">
              <div className="glass-panel p-8 md:p-12 rounded-3xl border border-[var(--color-border)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/10 blur-3xl rounded-full -z-10"></div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3"><Info className="text-[var(--color-primary)]" /> About AI Master Tools</h2>
                <div className="prose prose-invert max-w-none text-[var(--color-text-secondary)]">
                  <p className="text-lg leading-relaxed mb-4">
                    AI Master Tools was created with a single mission: to cut through the noise of the AI boom and provide a curated, high-quality directory of tools that actually work.
                  </p>
                  <p className="text-lg leading-relaxed mb-4">
                    Founded by Akshay Mahajan, an AI ML Engineer and Prompt Engineering expert, this platform serves as a bridge between complex AI technologies and everyday creators, developers, and businesses.
                  </p>
                  <p className="text-lg leading-relaxed">
                    We manually review and categorize every tool, ensuring that you only get the best recommendations for your specific use case.
                  </p>
                </div>
              </div>
            </section>

            {/* Live Stats */}
            <section id="stats" className="scroll-mt-32">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><Activity className="text-[var(--color-secondary)]" /> Platform Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Active Tools', value: '500+' },
                  { label: 'Daily Visitors', value: '12,000+' },
                  { label: 'Pro Members', value: '1,500+' },
                  { label: 'Categories', value: '45+' },
                ].map((stat, i) => (
                  <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 text-center hover:border-[var(--color-primary)]/50 transition-colors">
                    <div className="text-3xl md:text-4xl font-black text-gradient mb-2">{stat.value}</div>
                    <div className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Spotlight */}
            <section id="spotlight" className="scroll-mt-32">
              <div className="bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 border border-[var(--color-primary)]/30 rounded-3xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold uppercase tracking-widest mb-4">
                      <Award size={14} /> Tool of the Month
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">ChatGPT Advanced Data Analysis</h2>
                    <p className="text-lg text-[var(--color-text-secondary)] mb-6">
                      Transform how you interact with data. Upload spreadsheets, run Python code, and generate beautiful charts instantly using natural language.
                    </p>
                    <Link to="/tool/chatgpt" className="btn-primary inline-flex">View Details</Link>
                  </div>
                  <div className="w-full md:w-1/2 aspect-video bg-[var(--color-background)] rounded-2xl border border-[var(--color-border)] shadow-2xl overflow-hidden flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" alt="ChatGPT Spotlight" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="scroll-mt-32">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><Star className="text-yellow-500" /> What Users Say</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: 'Sarah Jenkins', role: 'Marketing Director', text: 'AI Master Tools saved me hours of research. I found the perfect copywriting AI in minutes.' },
                  { name: 'David Chen', role: 'Software Engineer', text: 'The categorization is spot on. It is my go-to directory whenever I need a new dev tool.' },
                  { name: 'Elena Rodriguez', role: 'Content Creator', text: 'I love the trending section! It helps me stay ahead of the curve with new video generation tools.' },
                ].map((t, i) => (
                  <div key={i} className="glass-panel p-6 rounded-2xl border border-[var(--color-border)]">
                    <div className="flex gap-1 mb-4">
                      {[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-yellow-500 text-yellow-500" />)}
                    </div>
                    <p className="text-[var(--color-text-secondary)] mb-6 italic">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{t.name}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-32">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><HelpCircle className="text-[var(--color-primary)]" /> Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { q: 'How often are new tools added?', a: 'We update our directory daily. Our team constantly monitors the AI landscape for new and innovative solutions.' },
                  { q: 'Can I submit my own AI tool?', a: 'Yes! You can use the "Submit AI Tool" button in the navigation bar to suggest a tool for our directory.' },
                  { q: 'Is AI Master Tools free to use?', a: 'Browsing the directory is completely free. We also offer a Pro membership for advanced features like saving favorites and removing ads.' },
                  { q: 'How do you rank the tools?', a: 'Tools are ranked based on user reviews, features, pricing value, and our internal testing metrics.' },
                ].map((faq, i) => (
                  <div key={i} className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)]">
                    <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                    <p className="text-[var(--color-text-secondary)]">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discover;
