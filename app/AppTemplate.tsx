'use client';

import React from 'react';
import { ReducedMotionProvider, InteractionProvider } from '@/context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type TemplateProps = {
  children: React.ReactNode;
};

const Template: React.FC<TemplateProps> = ({ children }) => {
  /**
   * Top-level navigation pages for the main Navbar.
   * @type {{ name: string; path: string; admin: boolean }[]}
   */
  const pages = [
    { name: 'Experience', path: 'work', admin: false },
    { name: 'Community', path: 'blueprints', admin: false },
    { name: 'Certifications', path: 'tools', admin: false },
    { name: 'Contact Me', path: 'contact', admin: false },
  ];

  return (
    <ReducedMotionProvider>
      <InteractionProvider>
        <Navbar id={null} pages={pages} />
        <main>{children}</main>
        <Footer />
      </InteractionProvider>
    </ReducedMotionProvider>
  );
};

export default Template;
