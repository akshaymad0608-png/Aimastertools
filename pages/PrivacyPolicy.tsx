import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => {
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
      <SEO 
        title="Privacy Policy | AI Master Tools" 
        description="Privacy Policy for AI Master Tools." 
      />

      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-8">Privacy Policy</h1>
        
        <p className="text-[var(--color-text-secondary)] mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mt-8 mb-4">1. Introduction</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          Welcome to AI Master Tools. We respect your privacy and are committed to protecting your personal data. 
          This privacy policy will inform you as to how we look after your personal data when you visit our website 
          and tell you about your privacy rights and how the law protects you.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mt-8 mb-4">2. Data We Collect</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
        </p>
        <ul className="list-disc pl-6 text-[var(--color-text-secondary)] mb-6 space-y-2">
          <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
          <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
          <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mt-8 mb-4">3. How We Use Your Data</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul className="list-disc pl-6 text-[var(--color-text-secondary)] mb-6 space-y-2">
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          <li>Where we need to comply with a legal obligation.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mt-8 mb-4">4. Data Security</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mt-8 mb-4">5. Contact Us</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@aimastertools.com.
        </p>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
