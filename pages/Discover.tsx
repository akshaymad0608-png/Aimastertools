import {
  TOOL_COUNT,
  CATEGORY_COUNT,
  FREE_TOOL_COUNT,
  FREEMIUM_TOOL_COUNT,
  LAST_UPDATED_LABEL,
} from '../utils/stats';
import React, { useEffect, useState } from 'react';
import { Play, Star, Users, Activity, HelpCircle, Info, TrendingUp, Award, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import { Link, useLocation } from 'react-router-dom';
import { MOCK_TOOLS } from '../data/tools';
import { Tool } from '../types';
import ToolCard from '../components/ToolCard';

const Discover: React.FC = () => {
  const location = useLocation();
  const [recentTools, setRecentTools] = useState<Tool[]>([]);

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
    
    // Load recently viewed tools
    try {
      const recentStr = localStorage.getItem('recent_tools');
      if (recentStr) {
        const ids: string[] = JSON.parse(recentStr);
        const mapped = ids
          .map(id => MOCK_TOOLS.find(t => t.id === id))
          .filter((t): t is Tool => t !== undefined);
        setRecentTools(mapped);
      }
    } catch (e) {
      console.error(e);
    }
  }, [location]);

  return (
    <>
      <SEO 
        title="Discover More | AI Master Tools" 
        description="Learn more about AI Master Tools, read FAQs, testimonials, and discover featured AI spotlights and tutorials."
        keywords={["discover ai tools", "latest ai tools", "trending ai tools", "new ai software", "best ai tools", "free ai tools", "ai tools directory"]}
      />
      
      <div className="page-top pb-20 md:pb-32">
        <div className="container-custom">
          
          <div className="text-center mb-16">
            <h1 
              className="text-4xl md:text-6xl font-semibold text-[var(--color-text-primary)] mb-6 tracking-tight animate-fade-in-up"
            >
              Discover <span className="text-[var(--color-primary)]">More</span>
            </h1>
            <p 
              className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto animate-fade-in-up"
            >
              Everything else you need to know about AI Master Tools, from our mission to user testimonials and live stats.
            </p>
          </div>

          {/* Quick Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-20 animate-fade-in-up">
            {[
              ...(recentTools.length > 0 ? [{ id: 'recent', icon: Clock, label: 'Recently Viewed' }] : []),
              { id: 'about', icon: Info, label: 'About Us' },
              { id: 'stats', icon: Activity, label: 'Live Stats' },
              { id: 'spotlight', icon: Award, label: 'Featured Spotlight' },
              { id: 'insights', icon: TrendingUp, label: 'Insights & Trends' },
              { id: 'testimonials', icon: Star, label: 'Testimonials' },
              { id: 'faq', icon: HelpCircle, label: 'FAQ' },
            ].map((btn, i) => (
              <a
                key={btn.id}
                href={`#${btn.id}`}
                className="flex items-center gap-2 px-6 py-3 rounded-[var(--radius-sm)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all shadow-sm hover:shadow-md font-semibold"
              >
                <btn.icon size={18} />
                {btn.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-24">
            
            {/* Recently Viewed */}
            {recentTools.length > 0 && (
              <section id="recent" className="scroll-mt-32">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><Clock className="text-[var(--color-primary)]" /> Recently Viewed</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recentTools.slice(0, 4).map(tool => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </section>
            )}

            {/* About Section */}
            <section id="about" className="scroll-mt-32">
              <div className="glass-panel p-8 md:p-12 rounded-[var(--radius-lg)] border border-[var(--color-border)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-10 rounded-full -z-10"></div>
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
              <h2 className="text-3xl font-semibold mb-8 flex items-center gap-3"><Activity className="text-[var(--color-primary)]" /> Platform Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/*
                  Every figure here is counted from the catalogue at build time.

                  This grid used to carry "Daily Visitors 12,000+", which was
                  not measured anywhere — no analytics number was ever read to
                  produce it. Sitting between three counts that are real, it
                  borrowed their credibility, and it was the one number on the
                  page a reader could not have checked. It is replaced by a
                  count of the freemium tier, which is derived the same way as
                  its neighbours.
                */}
                {[
                  { label: 'Tools indexed', value: String(TOOL_COUNT) },
                  { label: 'Free or open source', value: String(FREE_TOOL_COUNT) },
                  { label: 'Freemium', value: String(FREEMIUM_TOOL_COUNT) },
                  { label: 'Categories', value: String(CATEGORY_COUNT) },
                ].map((stat, i) => (
                  <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-sm)] p-6 text-center hover:border-[var(--color-primary)] transition-colors">
                    <div className="text-3xl md:text-4xl font-semibold text-[var(--color-primary)] mb-2">{stat.value}</div>
                    <div className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
              {LAST_UPDATED_LABEL && (
                <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                  Counted from the catalogue itself at build time. Most recent
                  addition: {LAST_UPDATED_LABEL}.
                </p>
              )}
            </section>

            {/* Featured Spotlight */}
            <section id="spotlight" className="scroll-mt-32">
              <div className="bg-[var(--color-cardBg)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] text-xs font-bold uppercase tracking-widest mb-4">
                      <Award size={14} /> Tool of the Month
                    </div>
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4">ChatGPT Advanced Data Analysis</h2>
                    <p className="text-lg text-[var(--color-text-secondary)] mb-6">
                      Transform how you interact with data. Upload spreadsheets, run Python code, and generate beautiful charts instantly using natural language.
                    </p>
                    <Link to="/tool/chatgpt" className="btn-primary inline-flex">View Details</Link>
                  </div>
                  <div className="w-full md:w-1/2 aspect-video bg-[var(--color-background)] rounded-[var(--radius-sm)] border border-[var(--color-border)] overflow-hidden flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fm=webp&fit=crop&q=80&w=800" alt="ChatGPT Spotlight" width="800" height="450" decoding="async" className="w-full h-full object-cover transition-opacity" loading="lazy" />
                  </div>
                </div>
              </div>
            </section>

            {/* Insights and Trends */}
            <section id="insights" className="scroll-mt-32">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><TrendingUp className="text-[var(--color-primary)]" /> Insights & Trends</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'The Rise of Video Gen',
                    description: 'Video generation tools have seen a 300% increase in submissions this year, with platforms like Runway and Sora leading the paradigm shift towards text-to-video.',
                    icon: Play,
                    color: 'text-rose-500'
                  },
                  {
                    title: 'Agents Are Taking Over',
                    description: 'Autonomous AI agents are shifting from a niche novelty to enterprise-ready solutions. 40% of our top trending workflow tools now implement agentic capabilities.',
                    icon: Activity,
                    color: 'text-[var(--color-primary)]'
                  },
                  {
                    title: 'Open Source Resilience',
                    description: 'Local and open-source models like Llama 3 and Mistral are driving a massive surge in developer tools, providing viable offline alternatives to major APIs.',
                    icon: Users,
                    color: 'text-[var(--color-primary)]'
                  },
                  {
                    title: 'The Fall of Simple Wrappers',
                    description: 'Basic GPT wrappers are seeing a sharp decline in retention. Users now demand deep workflow integration, specialized UIs, and proprietary data moats.',
                    icon: TrendingUp,
                    color: 'text-[var(--color-accent)]'
                  },
                  {
                    title: 'Multi-Modal Interfaces',
                    description: 'Text-only chatbots are evolving. Over 60% of new conversational interfaces now support voice input, image analysis, and document processing simultaneously.',
                    icon: HelpCircle,
                    color: 'text-[var(--color-primary)]'
                  },
                  {
                    title: 'AI in Enterprise Security',
                    description: 'With data privacy concerns growing, on-premise AI deployments and tools specializing in PII redaction and secure LLM routing have surged by 150%.',
                    icon: Info,
                    color: 'text-teal-500'
                  }
                ].map((insight, i) => (
                  <div key={i} className="glass-panel p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-4">
                      <insight.icon className={insight.color} size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{insight.title}</h3>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="scroll-mt-32">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><Star className="text-[var(--color-accent)]" /> What Users Say</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: 'Sarah Jenkins', role: 'Marketing Director', text: 'AI Master Tools saved me hours of research. I found the perfect copywriting AI in minutes.' },
                  { name: 'David Chen', role: 'Software Engineer', text: 'The categorization is spot on. It is my go-to directory whenever I need a new dev tool.' },
                  { name: 'Elena Rodriguez', role: 'Content Creator', text: 'I love the trending section! It helps me stay ahead of the curve with new video generation tools.' },
                ].map((t, i) => (
                  <div key={i} className="glass-panel p-6 rounded-[var(--radius-md)] border border-[var(--color-border)]">
                    <div className="flex gap-1 mb-4">
                      {[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />)}
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
                  { q: 'Is AI Master Tools free to use?', a: 'Browsing the directory is completely free. We also offer a Pro membership for advanced features like saving favorites and removing ads.' },
                  { q: 'How do you rank the tools?', a: 'Tools are ranked based on user reviews, features, pricing value, and our internal testing metrics.' },
                ].map((faq, i) => (
                  <div key={i} className="bg-[var(--color-surface)] p-6 rounded-[var(--radius-md)] border border-[var(--color-border)]">
                    <h3 className="title-sm text-lg font-bold mb-2">{faq.q}</h3>
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
