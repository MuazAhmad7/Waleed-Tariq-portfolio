'use client';
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import styles from './GameGridLogo.module.scss';

export const GameGridLogo: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const gridLinesRef = useRef<SVGGElement>(null);
  const logoTextRef = useRef<SVGGElement>(null);

  // IntersectionObserver to trigger animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.3, // Trigger when 30% of the component is visible
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before fully visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Set initial hidden state
  useEffect(() => {
    if (!logoRef.current) return;

    // Set initial hidden state for grid lines
    gsap.set(gridLinesRef.current?.children || [], {
      strokeDasharray: '1000 1000',
      strokeDashoffset: 1000,
      opacity: 0,
    });

    // Set initial hidden state for text
    gsap.set(logoTextRef.current?.children || [], {
      y: 20,
      opacity: 0,
    });
  }, []);

  // Continuous looping animation when in view
  useEffect(() => {
    if (!logoRef.current) return;

    let loopTimeline: gsap.core.Timeline;

    if (isInView) {
      // Animate text in once and keep it visible - slower entrance
      const textTl = gsap.timeline({ delay: 0.5 });
      textTl.to(
        logoTextRef.current?.children || [],
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );

      // Create a looping timeline for grid lines only
      loopTimeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      loopTimeline
        // Build the grid
        .to(
          gridLinesRef.current?.children || [],
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power2.out',
          }
        )
        // Hold for a moment
        .to({}, { duration: 2 })
        // Fade out grid lines only
        .to(
          gridLinesRef.current?.children || [],
          {
            strokeDashoffset: 1000,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power2.in',
          }
        );
    } else {
      // Stop the loop and animate out when not in view
      if (loopTimeline) {
        loopTimeline.kill();
      }
      
      const exitTl = gsap.timeline();
      exitTl.to(
        logoTextRef.current?.children || [],
        {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.03,
          ease: 'power2.in',
        }
      )
        .to(
          gridLinesRef.current?.children || [],
          {
            strokeDashoffset: 1000,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power2.in',
          },
          '-=0.2'
        );
    }

    // Cleanup function
    return () => {
      if (loopTimeline) {
        loopTimeline.kill();
      }
    };
  }, [isInView]);

  return (
    <div className={styles.gameGridContainer} ref={containerRef}>
      <div className={styles.logoContainer}>
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
            <line
              x1="50"
              y1="80"
              x2="350"
              y2="80"
              stroke="var(--color-foreground-accent)"
              strokeWidth="2"
            />
            <line
              x1="50"
              y1="120"
              x2="350"
              y2="120"
              stroke="var(--color-foreground-accent)"
              strokeWidth="2"
            />
            <line
              x1="50"
              y1="160"
              x2="350"
              y2="160"
              stroke="var(--color-foreground-accent)"
              strokeWidth="2"
            />
            <line
              x1="50"
              y1="200"
              x2="350"
              y2="200"
              stroke="var(--color-foreground-accent)"
              strokeWidth="2"
            />

            {/* Vertical lines */}
            <line
              x1="80"
              y1="50"
              x2="80"
              y2="200"
              stroke="var(--color-foreground-accent)"
              strokeWidth="2"
            />
            <line
              x1="120"
              y1="50"
              x2="120"
              y2="200"
              stroke="var(--color-foreground-accent)"
              strokeWidth="2"
            />
            <line
              x1="160"
              y1="50"
              x2="160"
              y2="200"
              stroke="var(--color-foreground-accent)"
              strokeWidth="2"
            />
            <line
              x1="200"
              y1="50"
              x2="200"
              y2="200"
              stroke="var(--color-foreground-accent)"
              strokeWidth="2"
            />
            <line
              x1="240"
              y1="50"
              x2="240"
              y2="200"
              stroke="var(--color-foreground-accent)"
              strokeWidth="2"
            />
            <line
              x1="280"
              y1="50"
              x2="280"
              y2="200"
              stroke="var(--color-foreground-accent)"
              strokeWidth="2"
            />
            <line
              x1="320"
              y1="50"
              x2="320"
              y2="200"
              stroke="var(--color-foreground-accent)"
              strokeWidth="2"
            />
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
