import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const Careers: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container-custom py-12 md:py-20"
    >
      <Helmet>
        <title>Careers | AI Master Tools</title>
        <meta name="description" content="Join the AI Master Tools team and help build the future of AI." />
      </Helmet>

      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6">Join Our Team</h1>
        <p className="text-xl text-[var(--color-text-secondary)]">
          We're on a mission to organize the world's AI tools and make them accessible to everyone. 
          Come help us build the future.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 md:p-12 text-center">
          <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🚀</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">No Open Positions</h2>
          <p className="text-[var(--color-text-secondary)] mb-8 max-w-lg mx-auto">
            We currently don't have any open positions, but we're always looking for talented individuals. 
            Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <a 
            href="mailto:careers@aimastertools.com"
            className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            Send Resume
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Careers;
