import React from 'react';
import { motion } from 'framer-motion';

const LegalNotice = () => {
  const isFirefox = typeof window !== 'undefined' && navigator.userAgent.toLowerCase().includes('firefox');

  return (
    <div className="container py-5 max-w-4xl">
      <motion.div
        initial={isFirefox ? {} : { opacity: 0, y: 20 }}
        animate={isFirefox ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="display-4 fw-black text-white mb-5 tracking-tighter text-uppercase">
          Privacy <span className="text-primary">Policy</span>
        </h1>

        <div className="prose-custom">
          <p>Last Updated: February 16, 2026</p>

          <h2>Introduction</h2>
          <p>
            Welcome to Skyblock Guides. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>

          <h2>Data Collection</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul>
            <li><strong>Usage Data:</strong> Includes information about how you use our website.</li>
            <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
          </ul>

          <h2>Cookies and Advertising</h2>
          <p>
            We use cookies and similar tracking technologies to track the activity on our service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
          </p>
          <p>
            This website uses Ezoic to provide personalization and analytical services. As such, Ezoic's privacy policy is in effect and can be reviewed here: <a href="https://www.ezoic.com/privacy-policy/" target="_blank" rel="noopener noreferrer">https://www.ezoic.com/privacy-policy/</a>.
          </p>
          <span id="ezoic-privacy-policy-embed"></span>

          <h2>How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2>Third-Party Links</h2>
          <p>
            This website may include links to third-party websites, plug-ins and applications (such as Discord). Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us through our Discord server.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LegalNotice;
