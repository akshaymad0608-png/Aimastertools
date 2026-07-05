import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { GitMerge, ArrowRight, Play, Copy, Clock, Layers, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { WORKFLOWS } from '../data/workflows';



const Workflows: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Content Creation', 'Sales', 'Productivity', 'Marketing', 'Development', 'Customer Support', 'Video Production', 'HR & Recruiting', 'Design & UI/UX', 'Finance & Accounting'];

  const filteredWorkflows = activeCategory === 'All' 
    ? WORKFLOWS 
    : WORKFLOWS.filter(w => w.category === activeCategory);

  return (
    <div className="pt-24 pb-20 bg-[var(--color-background)] min-h-screen">
      <Helmet>
        <title>AI Workflows Library - Automate Your Tasks | AIMasterTools</title>
        <meta name="description" content="Discover powerful AI workflows and automations. Learn how to connect different AI tools to save hours of manual work." />
        <meta name="keywords" content="AI workflows, AI automation, connect AI tools, Make.com workflows, Zapier AI, business automation" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_50%)] opacity-10 blur-3xl"></div>
        <div className="container-custom relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold text-sm mb-6">
            <GitMerge size={16} />
            Automation Library
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-[var(--color-text-primary)]">
            Automate Everything with <span className="text-gradient-premium">AI Workflows</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 font-medium text-[var(--color-text-secondary)]">
            Stop doing manual work. Discover step-by-step guides on how to connect multiple AI tools together and build powerful automated pipelines.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom max-w-6xl mx-auto px-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${
                activeCategory === cat
                  ? 'bg-[var(--color-primary)] text-white shadow-md'
                  : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-text-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredWorkflows.map((workflow, idx) => (
            <motion.div 
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel rounded-2xl p-6 lg:p-8 flex flex-col group hover:border-[var(--color-primary)]/50 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  {workflow.category}
                </span>
                <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-full text-amber-500 text-xs font-bold">
                  <Star size={12} className="fill-amber-500" /> {workflow.rating}
                </div>
              </div>
              
              <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                {workflow.title}
              </h3>
              
              <p className="text-[var(--color-text-secondary)] mb-6 flex-grow">
                {workflow.description}
              </p>
              
              {/* Connected Tools Visualizer */}
              <div className="flex items-center gap-2 mb-6 p-4 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)]">
                {workflow.tools.map((tool, i) => (
                  <React.Fragment key={tool}>
                    <div className="text-xs font-bold bg-[var(--color-surface)] border border-[var(--color-border)] px-3 py-1.5 rounded-lg whitespace-nowrap shadow-sm">
                      {tool}
                    </div>
                    {i < workflow.tools.length - 1 && (
                      <ArrowRight size={14} className="text-[var(--color-text-muted)] shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              {/* Footer Meta */}
              <div className="flex flex-wrap items-center justify-between pt-5 border-t border-[var(--color-border)] gap-4">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)]">
                    <Clock size={16} /> {workflow.timeToImplement}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)]">
                    <Layers size={16} /> {workflow.steps.length} Steps
                  </div>
                </div>
                
                <Link to={`/workflows/${workflow.id}`} className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2 rounded-xl font-bold hover:bg-[var(--color-primary-dark)] transition-colors shadow-md text-sm">
                  <Play size={16} className="fill-white" /> View Workflow
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Workflows;
