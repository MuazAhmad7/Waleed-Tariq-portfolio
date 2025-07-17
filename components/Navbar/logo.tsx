import Image from 'next/image';
import { useState } from 'react';

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transformOrigin: 'center',
        transform: isHovered
          ? 'rotateZ(-15deg) scale(1.1) scaleY(-1)'
          : 'rotateZ(0deg) scale(1) scaleY(-1)',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="/shuttlecock1.png"
        alt="Shuttlecock Logo"
        width={32}
        height={32}
        style={{
          filter: isHovered
            ? 'brightness(1.3) saturate(1.2)'
            : 'brightness(1.2)',
          transition: 'filter 0.3s ease',
        }}
      />
    </div>
  );
};
export default Logo;
