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
      className="page-top container-custom pb-16 md:pb-24"
    >
      <SEO 
        title="Privacy Policy | AI Master Tools" 
        description="Privacy Policy for AI Master Tools." 
      />

      <div className="max-w-3xl mx-auto prose prose-invert">
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-8">Privacy Policy</h1>
        
        <p className="text-[var(--color-text-secondary)] mb-6">Last updated: 29 September 2026</p>

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

        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mt-8 mb-4">4. Cookies and Local Storage</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          We store a few small items in your browser so the site works the way you left it: your theme
          choice, tools you have bookmarked and tools you viewed recently. These stay on your device and
          you can remove them at any time by clearing your browser's site data. Analytics and advertising
          services described below set their own cookies.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mt-8 mb-4">5. Analytics</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          We use Google Analytics and Google Tag Manager to understand which pages are useful. They record
          page views, approximate location, device and browser type, and the site that referred you. You can
          block them with a content blocker or opt out with the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" className="text-[var(--color-primary)] underline underline-offset-2" target="_blank" rel="noopener noreferrer">Google Analytics opt-out add-on</a>.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mt-8 mb-4">6. Advertising</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          We show ads through Google AdSense. Google and its partners, as third-party vendors, use cookies
          (including the DoubleClick cookie) to serve ads based on your visits to this and other websites.
          Google's use of advertising cookies enables it and its partners to serve ads to you based on your
          visit to our site and/or other sites on the Internet.
        </p>
        <ul className="list-disc pl-6 text-[var(--color-text-secondary)] mb-6 space-y-2">
          <li>
            You can opt out of personalised advertising in{' '}
            <a href="https://adssettings.google.com" className="text-[var(--color-primary)] underline underline-offset-2" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> or at{' '}
            <a href="https://www.aboutads.info" className="text-[var(--color-primary)] underline underline-offset-2" target="_blank" rel="noopener noreferrer">aboutads.info</a>.
          </li>
          <li>
            To learn how Google uses data from sites that use its services, see{' '}
            <a href="https://policies.google.com/technologies/partner-sites" className="text-[var(--color-primary)] underline underline-offset-2" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/partner-sites</a>.
          </li>
        </ul>
        <p className="text-[var(--color-text-secondary)] mb-6">
          Ads are kept separate from our tool listings and reviews, there is no paid placement in the
          directory, and we do not sell your personal data.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mt-8 mb-4">7. Third-Party Links and Services</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          AI Master Tools lists and links to third-party tools. Those sites have their own privacy practices
          and this policy does not cover them. If you subscribe to updates or contact us, we use your email
          address only to reply or send what you asked for. Some outbound links are affiliate links and are
          marked rel="sponsored"; if you buy through one, the seller may pay us a commission, and it does not
          change what you pay or how tools are ranked.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mt-8 mb-4">8. Data Security</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
        </p>

        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mt-8 mb-4">9. Contact Us</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          If you have any questions about this privacy policy or our privacy practices, please contact us at{' '}
          <a
            href="mailto:privacy@aimastertools.space"
            className="text-[var(--color-primary)] underline underline-offset-2"
          >
            privacy@aimastertools.space
          </a>
          .
        </p>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
