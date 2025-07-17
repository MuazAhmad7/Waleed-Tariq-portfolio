'use client';
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import styles from './GameGridLogo.module.scss';

export const GameGridLogo: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const logoRef = useRef<SVGSVGElement>(null);
  const gridLinesRef = useRef<SVGGElement>(null);
  const logoTextRef = useRef<SVGGElement>(null);


  useEffect(() => {
    if (!logoRef.current) return;

    const tl = gsap.timeline({ paused: true });

    // Animate grid lines building up
    tl.fromTo(
      gridLinesRef.current?.children || [],
      { 
        strokeDasharray: '1000 1000',
        strokeDashoffset: 1000,
        opacity: 0 
      },
      { 
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out'
      }
    )
    // Animate text appearing
    .fromTo(
      logoTextRef.current?.children || [],
      { 
        y: 20,
        opacity: 0 
      },
      { 
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out'
      },
      '-=0.2'
    );

    if (isHovered) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [isHovered]);

    return (
    <div className={styles.gameGridContainer}>
      <div 
        className={styles.logoContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg
          ref={logoRef}
          width="400"
          height="300"
          viewBox="0 0 400 300"
          className={styles.logo}
        >
          {/* Grid Lines */}
          <g ref={gridLinesRef}>
            {/* Horizontal lines */}
            <line x1="50" y1="80" x2="350" y2="80" stroke="var(--color-foreground-accent)" strokeWidth="2" />
            <line x1="50" y1="120" x2="350" y2="120" stroke="var(--color-foreground-accent)" strokeWidth="2" />
            <line x1="50" y1="160" x2="350" y2="160" stroke="var(--color-foreground-accent)" strokeWidth="2" />
            <line x1="50" y1="200" x2="350" y2="200" stroke="var(--color-foreground-accent)" strokeWidth="2" />
            
            {/* Vertical lines */}
            <line x1="80" y1="50" x2="80" y2="200" stroke="var(--color-foreground-accent)" strokeWidth="2" />
            <line x1="120" y1="50" x2="120" y2="200" stroke="var(--color-foreground-accent)" strokeWidth="2" />
            <line x1="160" y1="50" x2="160" y2="200" stroke="var(--color-foreground-accent)" strokeWidth="2" />
            <line x1="200" y1="50" x2="200" y2="200" stroke="var(--color-foreground-accent)" strokeWidth="2" />
            <line x1="240" y1="50" x2="240" y2="200" stroke="var(--color-foreground-accent)" strokeWidth="2" />
            <line x1="280" y1="50" x2="280" y2="200" stroke="var(--color-foreground-accent)" strokeWidth="2" />
            <line x1="320" y1="50" x2="320" y2="200" stroke="var(--color-foreground-accent)" strokeWidth="2" />
          </g>

          {/* Logo Text */}
          <g ref={logoTextRef}>
            <text
              x="200"
              y="260"
              textAnchor="middle"
              fill="var(--color-foreground-primary)"
              fontSize="24"
              fontWeight="bold"
              fontFamily="Inter, sans-serif"
            >
              GameGrid
            </text>
            <text
              x="200"
              y="280"
              textAnchor="middle"
              fill="var(--color-foreground-secondary)"
              fontSize="14"
              fontFamily="Inter, sans-serif"
            >
               Built for the grind. Made for the game.
            </text>
          </g>
        </svg>
      </div>
      
      <div className={styles.appImageContainer}>
        <img 
          src="/gamegridex.png" 
          alt="GameGrid App Screenshots" 
          className={styles.appImage}
        />
      </div>
    </div>
  );
}; 