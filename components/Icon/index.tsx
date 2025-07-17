import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './Icon.module.scss';

type IconProps = {
  icon: IconDefinition;
  width?: number;
  height?: number;
};

const Icon = ({ icon, width = 20, height = 20 }: IconProps) => {
  return (
    <span className={styles.icon} style={{ width, height }}>
      <svg viewBox={`0 0 ${icon.icon[0]} ${icon.icon[1]}`} fill="currentColor">
        <path d={icon.icon[4] as string} />
      </svg>
    </span>
  );
};

export default Icon;
