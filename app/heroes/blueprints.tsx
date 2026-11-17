'use client';
import React, { useState, useRef, useEffect } from 'react';
import Styles from './blueprints.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SvgIllustration from './svgIllustration';
import { useInteraction } from '@/context';
import { scrollDrivenX } from '@/utils';

gsap.registerPlugin(useGSAP);

const Blueprints: React.FC = () => {
  const { window: winsize, mouse } = useInteraction();
  const gridRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);

  const numRows = 9;
  const numCols = 12;
  const middleRowIndex = Math.floor(numRows / 2);

  const [svgs, setSvgs] = useState<string[]>([]);

  // Hold our quickTo functions in refs so they survive re-renders
  const toX = useRef<((x: number) => void)[]>([]);

  // 1) Once on mount or when grid changes: build quickTo tweens for each row
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const rows = Array.from(grid.children) as HTMLElement[];
    toX.current = rows.map((el) =>
      gsap.quickTo(el, 'x', { duration: 1.5, ease: 'power2.out' })
    );
  }, [svgs.length]);

  // Animation loop for mouse movement
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (!gridRef.current) return;
      const rows = Array.from(gridRef.current.children) as HTMLElement[];
      const distanceModifier = 0.2;
      const { x, hasMouseMoved } = mouse;
      const interactionX = hasMouseMoved
        ? x
        : scrollDrivenX(
            gridRef.current.getBoundingClientRect(),
            winsize.width,
            winsize.height
          );
      const normalizedMouseX = (interactionX / winsize.width) * 2 - 1;
      const targetTranslateX = normalizedMouseX * 12 * (winsize.width / 80);
      rows.forEach((row, index) => {
        const distanceFromMiddle = Math.abs(index - middleRowIndex);
        const factor = 1 - distanceModifier * distanceFromMiddle;
        const targetX = targetTranslateX * factor;
        const tweenFn = toX.current[index];
        if (tweenFn) tweenFn(targetX);
      });
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [mouse, winsize.width, winsize.height, gridRef, middleRowIndex, svgs.length]);

  useEffect(() => {
    const dsSprite = document.getElementById('DSSPRITE') as HTMLDivElement;
    if (dsSprite) {
      spriteRef.current = dsSprite;
      const symbols = Array.from(dsSprite.querySelectorAll('symbol'));
      setSvgs(symbols.map((symbol) => symbol.id));
    }
  }, []);

  return (
    <div className={Styles.gridContainer}>
      <div className={Styles.gridContent} ref={gridRef}>
        {svgs.length > 0 &&
          Array.from({ length: numRows }, (_, i) => (
            <div key={i} className={Styles.row}>
              {Array.from({ length: numCols }, (_, j) => (
                <div
                  key={j}
                  className={`${Styles.cell} ${
                    i === middleRowIndex && j === Math.floor(numCols / 2)
                      ? Styles.middleCell
                      : ''
                  }`}
                >
                  <SvgIllustration name={svgs[(i + j) % svgs.length]} />
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default React.memo(Blueprints);
