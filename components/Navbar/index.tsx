'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './index.module.css';
import Logo from './logo';
import React, { useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from '@/context';
import Popover from '../Popover/Popover';
import Button from '../Button';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Icon from '@/components/Icon';
import ToggleSwitch from '../ToggleSwitch';

type NavbarProps = {
  pages: { name: string; path: string; admin: boolean }[];
  id: string;
};

export default function Navbar({ pages }: NavbarProps) {
  const [slider, setSlider] = useState(false);
  const [theme, setTheme] = useState('dark');
  const pathname = usePathname();

  const { prefersReducedMotion, setPrefersReducedMotion } = useReducedMotion();
  
  const handlePrefersReducedMotion = (e) => {
    const enabled = e.target.checked;
    setPrefersReducedMotion(enabled);
  };
  
  const handleTheme = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const enabled = e.target.checked;
      setSlider(enabled);
      const body = document.querySelector('body');
      if (enabled) {
        body.classList.add(theme);
      } else {
        body.classList.remove(theme);
      }
    },
    [theme]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersColorSchemeDarkQuery = window?.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    const body = document.querySelector('body');
    if (prefersColorSchemeDarkQuery.matches) {
      setTheme('light');
    }
    
    const handleColorSchemeChange = (e: MediaQueryListEvent) => {
      setSlider(false);
      setTheme(e.matches ? 'light' : 'dark');
      body?.classList.remove(theme);
    };
    
    prefersColorSchemeDarkQuery.addEventListener('change', handleColorSchemeChange);
    
    return () => {
      prefersColorSchemeDarkQuery.removeEventListener('change', handleColorSchemeChange);
    };
  }, [theme]);

  return (
    <header className={styles.navContainer}>
      <nav className={styles.nav}>
        <Link href="/" className="logoLink">
          <div className={styles.logoContainer}>
            <Logo />
            <h1 className="medium logo">{`Waleed Tariq`}</h1>
          </div>
        </Link>
        <ul className={styles.navLinks}>
          {pages &&
            pages.map((page) => (
              <li key={page.name}>
                <Link
                  href={`/${page.path}`}
                  className={pathname === `/${page.path}` ? styles.active : ''}
                >
                  {page.name}
                </Link>
              </li>
            ))}
          <li>
            <Popover>
              <Popover.Trigger>
                <Button variant="tertiary" size="small">
                  <Icon icon={faBars} />
                </Button>
              </Popover.Trigger>
              <Popover.Content>
                <div
                  style={{
                    background: 'var(--color-background-secondary)',
                    color: 'var(--color-foreground-primary)',
                    padding: '1.5rem',
                    fontSize: '16px',
                    borderRadius: '8px',
                  }}
                >
                  {/* Navigation Links */}
                  {pages &&
                    pages.map((page) => (
                      <div
                        key={`mobile-${page.name}`}
                        style={{
                          padding: '12px 0',
                          margin: '4px 0',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <Link
                          href={`/${page.path}`}
                          style={{
                            color: 'var(--color-foreground-accent)',
                            textDecoration: 'none',
                            display: 'block',
                            fontWeight:
                              pathname === `/${page.path}` ? '600' : '400',
                            fontFamily: 'var(--font-nohemi)',
                            fontSize: '16px',
                            transition: 'color 0.2s ease',
                            opacity: pathname === `/${page.path}` ? '1' : '0.8',
                          }}
                        >
                          {page.name}
                        </Link>
                      </div>
                    ))}

                  {/* Separator */}
                  <div
                    style={{
                      height: '1px',
                      background: 'var(--color-border-subtle)',
                      margin: '1.5rem 0',
                    }}
                  ></div>

                  {/* Settings */}
                  <div
                    style={{
                      padding: '8px 0',
                      margin: '8px 0',
                    }}
                  >
                    <ToggleSwitch
                      checked={prefersReducedMotion}
                      onChange={handlePrefersReducedMotion}
                    >
                      Reduce motion
                    </ToggleSwitch>
                  </div>

                  <div
                    style={{
                      padding: '8px 0',
                      margin: '8px 0',
                    }}
                  >
                    <ToggleSwitch checked={slider} onChange={handleTheme}>
                      Use {theme} theme
                    </ToggleSwitch>
                  </div>
                </div>
              </Popover.Content>
            </Popover>
          </li>
        </ul>
      </nav>
    </header>
  );
}
