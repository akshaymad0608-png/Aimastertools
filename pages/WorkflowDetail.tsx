import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { GitMerge, ArrowLeft, Clock, Layers, Star, ExternalLink, Play, CheckCircle2 } from 'lucide-react';
import { WORKFLOWS } from '../data/workflows';

const WorkflowDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const workflow = WORKFLOWS.find(w => w.id === id);
  
  useEffect(() => {
    if (!workflow) {
      navigate('/workflows');
    }
    window.scrollTo(0, 0);
  }, [workflow, navigate]);
  
  if (!workflow) return null;

  return (
    <div className="page-top pb-20 bg-[var(--color-background)] min-h-screen">
      <Helmet>
        <title>{workflow.title} - AI Workflow | AIMasterTools</title>
        <meta name="description" content={workflow.description} />
      </Helmet>

      <div className="container-custom max-w-4xl mx-auto px-4">
        {/* Back Link */}
        <Link 
          to="/workflows" 
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Workflows
        </Link>

        {/* Header */}
        <div className="glass-panel rounded-[var(--radius-lg)] p-8 md:p-12 mb-12 border border-[var(--color-border)] relative overflow-hidden">
          <div className="absolute inset-0 from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider">
                {workflow.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] text-xs font-bold uppercase tracking-wider">
                {workflow.difficulty}
              </span>
              <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-full text-[var(--color-accent)] text-xs font-bold">
                <Star size={12} className="fill-[var(--color-accent)]" /> {workflow.rating}
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 text-[var(--color-text-primary)]">
              {workflow.title}
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-8 font-medium leading-relaxed">
              {workflow.description}
            </p>

            <div className="pt-6 flex flex-wrap items-center gap-6 border-t border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {workflow.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] font-bold uppercase tracking-wider">Creator</p>
                  <p className="text-sm font-bold text-[var(--color-text-primary)]">{workflow.author}</p>
                </div>
              </div>
              
              <div className="h-8 w-px bg-[var(--color-border)] hidden sm:block"></div>
              
              <div>
                <p className="text-xs text-[var(--color-text-muted)] font-bold uppercase tracking-wider mb-1">Time</p>
                <p className="text-sm font-bold flex items-center gap-1.5"><Clock size={14} className="text-[var(--color-primary)]"/> {workflow.timeToImplement}</p>
              </div>

              <div className="h-8 w-px bg-[var(--color-border)] hidden sm:block"></div>
              
              <div>
                <p className="text-xs text-[var(--color-text-muted)] font-bold uppercase tracking-wider mb-1">Complexity</p>
                <p className="text-sm font-bold flex items-center gap-1.5"><Layers size={14} className="text-[var(--color-primary)]"/> {workflow.steps.length} Steps</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Used */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <GitMerge className="text-[var(--color-primary)]" /> Tools Required
          </h2>
          <div className="flex flex-wrap gap-4">
            {workflow.tools.map(tool => (
              <div key={tool} className="flex items-center gap-3 px-5 py-3 rounded-[var(--radius-sm)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm">
                <span className="font-bold text-[var(--color-text-primary)]">{tool}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div>
          <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
            <CheckCircle2 className="text-[var(--color-primary)]" /> Step-by-Step Guide
          </h2>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[var(--color-primary)] before:via-[var(--color-border)] before:to-transparent">
            {workflow.steps.map((step, index) => (
              <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[var(--color-background)] bg-[var(--color-primary)] text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
                  {index + 1}
                </div>
                
                {/* Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-panel p-6 rounded-[var(--radius-md)] border border-[var(--color-border)] shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/30 transition-all ml-4 md:ml-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="title-sm text-lg font-bold text-[var(--color-text-primary)]">{step.title}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                      {step.tool}
                    </span>
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default WorkflowDetail;
