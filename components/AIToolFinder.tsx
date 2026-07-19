import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Loader2, RefreshCw, Briefcase, Code, PenTool, Image as ImageIcon, LayoutDashboard, Brain, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_TOOLS } from '../data/tools';
import { Tool } from '../types';
import ToolLogo from './ToolLogo';
import { Link } from 'react-router-dom';

type Step = 'goal' | 'skill' | 'budget' | 'results';

export const AIToolFinder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('goal');
  const [isProcessing, setIsProcessing] = useState(false);
  const [answers, setAnswers] = useState({
    goal: '',
    skill: '',
    budget: ''
  });
  const [results, setResults] = useState<Tool[]>([]);

  const handleSelect = (key: keyof typeof answers, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep === 'goal') setCurrentStep('skill');
    else if (currentStep === 'skill') setCurrentStep('budget');
    else if (currentStep === 'budget') {
      setIsProcessing(true);
      setCurrentStep('results');
      
      // Simulate AI processing & matching
      setTimeout(() => {
        const matches = MOCK_TOOLS.filter(tool => {
          let score = 0;
          
          // Goal matching (loose)
          if (answers.goal === 'writing' && (tool.category.includes('Writing') || tool.category.includes('Copywriting'))) score += 3;
          if (answers.goal === 'coding' && (tool.category.includes('Code') || tool.category.includes('Development'))) score += 3;
          if (answers.goal === 'image' && (tool.category.includes('Image') || tool.category.includes('Video'))) score += 3;
          if (answers.goal === 'business' && (tool.category.includes('Business') || tool.category.includes('Marketing'))) score += 3;
          if (answers.goal === 'productivity' && (tool.category.includes('Productivity') || tool.category.includes('Automation'))) score += 3;
          
          // Budget matching
          if (answers.budget === 'free' && tool.pricing === 'Free') score += 2;
          if (answers.budget === 'freemium' && (tool.pricing === 'Free' || tool.pricing === 'Freemium' || tool.pricing === 'Open Source')) score += 2;
          
          // Fallback random score to ensure some results
          return score > 0 || Math.random() > 0.7;
        }).sort(() => Math.random() - 0.5).slice(0, 6); // Shuffle and take top 6
        
        setResults(matches.length > 0 ? matches : MOCK_TOOLS.slice(0, 3));
        setIsProcessing(false);
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentStep === 'skill') setCurrentStep('goal');
    else if (currentStep === 'budget') setCurrentStep('skill');
    else if (currentStep === 'results') setCurrentStep('budget');
  };

  const resetQuiz = () => {
    setAnswers({ goal: '', skill: '', budget: '' });
    setCurrentStep('goal');
    setResults([]);
  };

  const OptionCard = ({ icon: Icon, title, description, value, currentAnswer }: { icon: any, title: string, description: string, value: string, currentAnswer: string }) => {
    const isSelected = currentAnswer === value;
    return (
      <button
        onClick={() => handleSelect(currentStep as keyof typeof answers, value)}
        className={`flex flex-col items-center text-center p-6 rounded-[var(--radius-md)] border-2 transition-all ${
          isSelected 
            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-[var(--shadow-card)] shadow-[var(--color-primary)]/10' 
            : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-cardBg)]'
        }`}
      >
        <div className={`p-4 rounded-[var(--radius-sm)] mb-4 ${isSelected ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-cardBg)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'}`}>
          <Icon size={28} />
        </div>
        <h3 className={`font-bold text-lg mb-2 ${isSelected ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-primary)]'}`}>{title}</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
        
        {isSelected && (
          <div className="absolute top-4 right-4 text-[var(--color-primary)]">
            <CheckCircle2 size={20} className="fill-[var(--color-primary)] text-white" />
          </div>
        )}
      </button>
    );
  };

  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 relative">
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center mb-10 relative z-10">
        <h2 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight text-[var(--color-text-primary)]">
          AI Tool <span className="text-[var(--color-text-primary)]">Finder Quiz</span>
        </h2>
        <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto font-medium">
          Answer 3 quick questions and let our matching algorithm find the perfect AI tools for your workflow.
        </p>
      </div>

      <div className="bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-cardBg)] border border-[var(--color-border)] rounded-[32px] p-6 md:p-10 shadow-[var(--shadow-lift)] relative overflow-hidden z-10">
        
        {/* Progress Bar */}
        {currentStep !== 'results' && !isProcessing && (
          <div className="w-full h-2 bg-[var(--color-border)] rounded-full mb-10 overflow-hidden">
            <div 
              className="h-full bg-[var(--color-cardBg)] border border-[var(--color-border)] transition-all duration-500 ease-out"
              style={{ width: currentStep === 'goal' ? '33%' : currentStep === 'skill' ? '66%' : '100%' }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {currentStep === 'goal' && (
            <motion.div key="goal" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h3 className="text-2xl font-bold mb-6 text-center">What is your primary goal?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <OptionCard icon={PenTool} title="Content & Writing" description="Articles, copy, emails, and text generation." value="writing" currentAnswer={answers.goal} />
                <OptionCard icon={Code} title="Coding & Dev" description="Programming, debugging, and web development." value="coding" currentAnswer={answers.goal} />
                <OptionCard icon={ImageIcon} title="Image & Video" description="Generative art, video editing, and design." value="image" currentAnswer={answers.goal} />
                <OptionCard icon={Briefcase} title="Business" description="Marketing, sales, and analytics." value="business" currentAnswer={answers.goal} />
                <OptionCard icon={LayoutDashboard} title="Productivity" description="Note taking, automation, and scheduling." value="productivity" currentAnswer={answers.goal} />
                <OptionCard icon={Brain} title="Other / General" description="Research, general chatbots, and more." value="other" currentAnswer={answers.goal} />
              </div>
            </motion.div>
          )}

          {currentStep === 'skill' && (
            <motion.div key="skill" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h3 className="text-2xl font-bold mb-6 text-center">What is your technical skill level?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <OptionCard icon={CheckCircle2} title="Beginner" description="I want simple, ready-to-use tools without coding." value="beginner" currentAnswer={answers.skill} />
                <OptionCard icon={Briefcase} title="Intermediate" description="I can handle advanced settings and complex UI." value="intermediate" currentAnswer={answers.skill} />
                <OptionCard icon={Code} title="Advanced" description="I'm comfortable with APIs, coding, and deploying." value="advanced" currentAnswer={answers.skill} />
              </div>
            </motion.div>
          )}

          {currentStep === 'budget' && (
            <motion.div key="budget" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h3 className="text-2xl font-bold mb-6 text-center">What is your budget for AI tools?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <OptionCard icon={CheckCircle2} title="Free Only" description="I strictly want 100% free or open source tools." value="free" currentAnswer={answers.budget} />
                <OptionCard icon={Briefcase} title="Freemium" description="I want to try it for free, but might upgrade later." value="freemium" currentAnswer={answers.budget} />
                <OptionCard icon={Code} title="Willing to Pay" description="Show me the best tools, regardless of price." value="paid" currentAnswer={answers.budget} />
              </div>
            </motion.div>
          )}

          {isProcessing && (
            <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20">
              <Loader2 size={60} className="animate-spin text-[var(--color-primary)] mb-6" />
              <h3 className="text-2xl font-bold mb-2">Analyzing Millions of Data Points...</h3>
              <p className="text-[var(--color-text-secondary)]">Finding the absolute best tools for your specific workflow.</p>
            </motion.div>
          )}

          {currentStep === 'results' && !isProcessing && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-[var(--color-primary)] font-bold mb-4">
                  <CheckCircle2 size={18} />
                  Match Complete
                </div>
                <h3 className="text-3xl font-semibold mb-2">Your Perfect AI Arsenal</h3>
                <p className="text-[var(--color-text-secondary)]">Based on your goals and budget, we highly recommend these tools.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {results.map((tool, idx) => {
                  const matchScore = 99 - (idx * 2);
                  return (
                    <div key={tool.id} className="glass-panel rounded-[var(--radius-md)] p-6 flex flex-col md:flex-row gap-5 relative overflow-hidden group hover:border-[var(--color-primary)] transition-all">
                      <div className="absolute top-0 right-0 bg-[var(--color-cardBg)] border border-[var(--color-border)] text-white px-3 py-1 rounded-bl-xl font-bold text-xs shadow-[var(--shadow-card)] z-10">
                        {matchScore}% Match
                      </div>
                      
                      <div className="w-16 h-16 shrink-0 bg-[var(--color-cardBg)] rounded-[var(--radius-sm)] border border-[var(--color-border)] flex items-center justify-center shadow-sm">
                         <ToolLogo domain={tool.domain} brandColor={tool.brandColor} name={tool.name} className="w-10 h-10" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-xl mb-1 group-hover:text-[var(--color-primary)] transition-colors">{tool.name}</h4>
                        <div className="flex gap-2 mb-3">
                          <span className="text-xs font-bold text-[var(--color-text-secondary)] bg-[var(--color-background)] px-2 py-0.5 rounded-md border border-[var(--color-border)]">{tool.category}</span>
                          <span className="text-xs font-bold text-[var(--color-text-secondary)] bg-[var(--color-background)] px-2 py-0.5 rounded-md border border-[var(--color-border)]">{tool.pricing}</span>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-5 line-clamp-2">{tool.description}</p>
                        
                        <div className="flex gap-3">
                          <Link to={`/tool/${tool.id}`} className="flex-1 py-2 text-center rounded-lg text-sm font-bold bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                            Details
                          </Link>
                          <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center rounded-lg text-sm font-bold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors">
                            Visit Site
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 text-center">
                <button onClick={resetQuiz} className="flex items-center gap-2 mx-auto text-[var(--color-primary)] hover:opacity-80 font-bold transition-opacity">
                  <RefreshCw size={18} /> Retake Quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {currentStep !== 'results' && !isProcessing && (
          <div className="flex justify-between mt-10 pt-6 border-t border-[var(--color-border)]">
            <button
              onClick={handleBack}
              disabled={currentStep === 'goal'}
              className="px-6 py-3 font-bold rounded-[var(--radius-sm)] flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-all disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 'goal' && !answers.goal) || 
                (currentStep === 'skill' && !answers.skill) || 
                (currentStep === 'budget' && !answers.budget)
              }
              className="px-8 py-3 font-bold rounded-[var(--radius-sm)] flex items-center gap-2 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-all disabled:opacity-50 shadow-md hover:shadow-[var(--shadow-card)] disabled:hover:shadow-none"
            >
              {currentStep === 'budget' ? 'Show Results' : 'Next Step'} <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
