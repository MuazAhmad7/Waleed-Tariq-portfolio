'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import Style from './swatches.module.scss';
import { useInteraction } from '@/context';
import { gsap } from 'gsap';
import { linearInterpolation } from '@/utils';
import { ImageSwatch } from './ImageSwatch';
import { testImagePalette } from './TestImagePalette';

// Overlay context for managing image overlay state
interface OverlayContextType {
  overlayImage: string | null;
  setOverlayImage: (image: string | null) => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

// Provider component
interface OverlayProviderProps {
  children: ReactNode;
}

export const OverlayProvider: React.FC<OverlayProviderProps> = ({ children }) => {
  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (overlayImage) {
      setIsVisible(true);
    }
  }, [overlayImage]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setOverlayImage(null), 300); // Wait for animation to complete
  };

  return (
    <OverlayContext.Provider value={{ overlayImage, setOverlayImage }}>
      {children}
      {overlayImage && (
        <div 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: `rgba(0, 0, 0, ${isVisible ? '0.4' : '0'})`,
            backdropFilter: `blur(${isVisible ? '4px' : '0px'})`,
            WebkitBackdropFilter: `blur(${isVisible ? '4px' : '0px'})`,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            zIndex: 99999,
            transition: 'background-color 0.3s ease-out, backdrop-filter 0.3s ease-out, -webkit-backdrop-filter 0.3s ease-out',
            margin: 0,
            padding: '0 0 15% 0'
          }}
          onClick={handleClose}
        >
          <div 
            className="relative" 
            style={{ 
              maxWidth: '250px', 
              maxHeight: '250px',
              margin: 'auto',
              transform: `scale(${isVisible ? '1' : '0.8'})`,
              opacity: isVisible ? 1 : 0,
              transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
              transformOrigin: 'center'
            }}
          >
            <img 
              src={overlayImage} 
              alt="CJML Basketball" 
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
            />
            <button 
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                width: '20px',
                height: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                zIndex: 100000,
                transition: 'all 0.2s ease',
                opacity: 0.8
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </OverlayContext.Provider>
  );
};

// Hook to use the overlay context
export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }
  return context;
};

// Main wave component with image swatches
const ImageSwatchWave = () => {
  const images = React.useMemo(() => testImagePalette, []);
  const gridRef = useRef<HTMLDivElement>(null);

  // Hold our quickTo functions in refs so they survive re-renders
  const toX = useRef<((x: number) => void)[]>([]);
  const toY = useRef<((y: number) => void)[]>([]);

  const { window: winsize, scroll, mouse } = useInteraction();

  // track if container is in view, if in view, allow animation
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    if (!gridRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      setIsInView(
        entries[0].isIntersecting && entries[0].intersectionRatio > 0.05
      );
    });
    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, [gridRef, scroll]);

  // 1) Once on mount: grab each swatch element and build its quickTo tweens
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const swatches = Array.from(grid.children) as HTMLElement[];
    toX.current = swatches.map((el) =>
      gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power1.out' })
    );
    toY.current = swatches.map((el) =>
      gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power1.out' })
    );
  }, []);

  // Animation loop for mouse movement
  useEffect(() => {
    if (!isInView) return;
    let frameId: number;
    const animate = () => {
      const grid = gridRef.current;
      if (!grid) return;
      const rect = grid.getBoundingClientRect();
      const { x, hasMouseMoved } = mouse;
      let interactionX: number;
      if (hasMouseMoved) {
        interactionX = x;
      } else {
        interactionX = rect.left + rect.width / 2 + (scroll.y * rect.width) / 2;
      }
      const mouseX = interactionX - rect.left - winsize.width;
      const mousePercent = mouseX / rect.width / 2;
      const mouseCenter = mouseX / rect.width;

      const amplitude = 256;
      const freq = 0.18; // Reduced frequency since we have fewer images

      toX.current.forEach((tweenFn, i) => {
        const sw = grid.children[i] as HTMLElement;
        const x = linearInterpolation(
          0,
          rect.width - sw.offsetWidth,
          mousePercent
        );
        tweenFn(x);
      });

      toY.current.forEach((tweenFn, i) => {
        const y = Math.sin(i * freq + mouseCenter * Math.PI) * amplitude;
        tweenFn(y);
      });
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [mouse, winsize.width, gridRef, scroll.y, isInView]);

  return (
    <div className={`${Style.gridContainer}`}>
      <div
        className={`${Style.colorSwatchContainer} ${Style.gridContent}`}
        ref={gridRef}
      >
        {images.map((imageData, i) => {
          const zIndex = 100 - i;
          return (
            <div key={i} className={Style.colorSwatch} style={{ zIndex }}>
              <ImageSwatch {...imageData} />
            </div>
          );
        })}
      </div>
      
      {/* Wave text section */}
      <div className={Style.waveTextSection}>
        <div className={Style.textContent}>
          <h2 className={Style.leagueTitle}>Central Jersey Muslim League</h2>
          <p className={Style.leagueDescription}>
            A thriving community of <strong>100+ players</strong> across <strong>12+ teams</strong>, bringing 
            together passion for basketball and building lasting friendships through sport.
          </p>
          <p className={Style.leagueQuote}>
            "More than just a game — it's where community comes alive."
          </p>
        </div>
      </div>
    </div>
  );
};

// Main component that was being imported
export const SwatchesImageTest: React.FC = () => {
  return (
    <OverlayProvider>
      <ImageSwatchWave />
    </OverlayProvider>
  );
};