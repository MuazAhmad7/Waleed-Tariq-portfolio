'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ReducedMotionProvider, InteractionProvider } from '@/context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type TemplateProps = {
  children: React.ReactNode;
};

const Template: React.FC<TemplateProps> = ({ children }) => {
  const ref = useRef(null);

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

  // Temporarily disabled GSAP animation to fix navbar duplication
  // useGSAP(() => {
  //   if (ref.current) {
  //     gsap.to(ref.current, {
  //       opacity: 1,
  //       y: 0,
  //       filter: 'blur(0px)',
  //       duration: 0.5,
  //       ease: 'power2.inOut',
  //     });
  //   }
  // }, []);

  return (
    <ReducedMotionProvider>
      <InteractionProvider>
        <Navbar id={null} pages={pages} />
        <main ref={ref}>{children}</main>
        <Footer />
      </InteractionProvider>
    </ReducedMotionProvider>
  );
};

export default Template;
