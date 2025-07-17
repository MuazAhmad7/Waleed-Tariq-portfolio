'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ReducedMotionProvider, InteractionProvider } from '@/context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User } from '@supabase/supabase-js';

type TemplateProps = {
  children: React.ReactNode;
  user: User;
};

const Template: React.FC<TemplateProps> = ({ children, user }) => {
  const ref = useRef(null);
  const handleSelectionChange = useRef(null);

  const id = user?.id || null;
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
  useEffect(() => {
    if (!handleSelectionChange.current) {
      handleSelectionChange.current = () => {
        const selection = document.getSelection();
        if (selection && '' === selection.toString()) {
          const rootElement = document.body;
          let isDarkTheme = window.matchMedia(
            '(prefers-color-scheme: dark)'
          ).matches;
          const bodyClassOverride = rootElement.classList;
          if (bodyClassOverride.contains('light')) {
            isDarkTheme = false;
          }
          if (bodyClassOverride.contains('dark')) {
            isDarkTheme = true;
          }

          const colors = [
            'red',
            'orange',
            'yellow',
            'green',
            'teal',
            'blue',
            'violet',
          ];
          const newColorIndex = Math.floor(Math.random() * colors.length);
          const color = colors[newColorIndex];
          const val = isDarkTheme ? ['200', '700'] : ['700', '200'];
          const foreground = `var(--color-core-${color}-${val[0]})`;
          const background = `var(--color-core-${color}-${val[1]})`;
          rootElement.style.setProperty(
            '--color-foreground-highlight',
            foreground
          );
          rootElement.style.setProperty(
            '--color-background-highlight',
            background
          );
        }
      };
    }
    document.addEventListener('selectionchange', handleSelectionChange.current);

    return () => {
      document.removeEventListener(
        'selectionchange',
        handleSelectionChange.current
      );
    };
  }, []);

  useGSAP(() => {
    gsap.to(ref.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'power2.inOut',
    });
  }, []);

  return (
    <ReducedMotionProvider>
      <InteractionProvider>
        <Navbar id={id} pages={pages} />
        <main ref={ref}>{children}</main>
        <Footer />
      </InteractionProvider>
    </ReducedMotionProvider>
  );
};

export default Template;
