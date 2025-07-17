'use client';
import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Styles from './index.module.css';
import { horizontalLoop } from '@/utils';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon';
import Image from 'next/image';

type MarqueeProps = {
  title: string;
  icon: IconDefinition | string;
  url: string;
  isCustomImage?: boolean;
};

const Marquee: React.FC<MarqueeProps> = ({ title, icon, url, isCustomImage = false }) => {
  const marqueeRef = useRef(null); // Create a ref for the marquee element
  
  // Debug logging
  if (title === 'GameGrid') {
    console.log('GameGrid marquee props:', { title, icon, url, isCustomImage });
  }
  const clone = (index) => (
    <div className={Styles.box} key={index}>
      <p className={`heading-04 ${Styles.socialLinkTitle}`}>
        {title.toUpperCase()}
        {isCustomImage ? (
          <Image 
            src={icon as string} 
            alt={title} 
            width={48} 
            height={48} 
            style={{ 
              objectFit: 'contain',
              maxWidth: '48px',
              maxHeight: '48px',
              verticalAlign: 'middle'
            }} 
          />
        ) : (
          <Icon width={48} height={48} icon={icon as IconDefinition} />
        )}
      </p>
    </div>
  );
  const clones = Array(20).fill(clone);

  useGSAP(
    () => {
      const boxes = marqueeRef.current.querySelectorAll(`.${Styles.box}`);
      gsap.set(marqueeRef.current, { perspective: 500 });
      const loop = horizontalLoop(boxes, {
        repeat: -1,
        paused: false,
        speed: 1,
      });
      return loop;
    },
    { scope: marqueeRef.current }
  );
  return (
    <>
      <Link href={url} className={Styles.socialLink}>
        <h4 className={Styles.socialLinkTitle}>
          {title.toUpperCase()}
          <Icon width={48} height={48} icon={faArrowRight} />
        </h4>
        <div className={Styles.marquee} ref={marqueeRef}>
          {clones && clones.map((clone, index) => clone(index))}
        </div>
      </Link>
    </>
  );
};

export default Marquee;
