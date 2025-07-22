'use client';
import { useRef, useEffect, useState } from 'react';
import Styles from './index.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { horizontalLoop } from '@/utils';
import LogoSprite from './LogoSprite';

const LogoMarquee: React.FC = () => {
  const logoMarqueeRef = useRef(null);
  const spriteRef = useRef(null);
  const [boxes, setBoxes] = useState(null);
  const [isBoxesReady, setIsBoxesReady] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const loopRef = useRef(null);

  const box = (svg, index) => (
    <div className={Styles.box} key={`${svg.id}-${index}`}>
      <svg className={Styles.logo}>
        <use href={`#${svg.id}`} />
      </svg>
    </div>
  );

  // Intersection Observer to pause/resume animation based on visibility
  useEffect(() => {
    if (!logoMarqueeRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
        
        // Pause/resume animation based on visibility
        if (loopRef.current) {
          if (entry.isIntersecting) {
            loopRef.current.resume();
          } else {
            loopRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(logoMarqueeRef.current);
    
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!isBoxesReady) return;
      const boxElements = logoMarqueeRef.current.children;
      gsap.set(logoMarqueeRef.current, { perspective: 500 });
      
      const loop = horizontalLoop(boxElements, {
        repeat: -1,
        paused: !isInView, // Start paused if not in view
        speed: 1,
        paddingRight: 100,
      });
      
      loopRef.current = loop;
      
      return () => {
        if (loop) loop.kill();
        loopRef.current = null;
      };
    },
    {
      scope: logoMarqueeRef,
      dependencies: [isBoxesReady],
    }
  );

  useEffect(() => {
    const LOGOSPRITE = document.getElementById('LOGOSPRITE');
    if (LOGOSPRITE) {
      spriteRef.current = LOGOSPRITE;
      const children = LOGOSPRITE.children;
      
      // Reduce to 2 sets for better performance while maintaining seamless loop
      const logoSet = Array.from(children);
      const newBoxes = [];
      const numSets = 2;
      
      for (let setIndex = 0; setIndex < numSets; setIndex++) {
        logoSet.forEach((child, logoIndex) => {
          newBoxes.push(box(child, `${setIndex}-${logoIndex}`));
        });
      }
      
      setBoxes(newBoxes);
      setIsBoxesReady(true);
    }
  }, []);

  return (
    <div className={Styles.marqueeContainer}>
      <LogoSprite />
      <div className={Styles.marquee} ref={logoMarqueeRef}>
        {boxes && boxes.map((boxElement) => boxElement)}
      </div>
      <div className={Styles.cover}></div>
    </div>
  );
};

export default LogoMarquee;
