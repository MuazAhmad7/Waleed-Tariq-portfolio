import { calculateContrast } from '@/utils/colorHelpers';
import Style from './swatches.module.scss';
import { useOverlay } from './SwatchesImageTest';

type ImageSwatchProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
};

export const ImageSwatch: React.FC<ImageSwatchProps> = ({
  imageSrc,
  imageAlt,
  title,
}) => {
  const { overlayImage, setOverlayImage } = useOverlay();
  const textColor = 'white'; // Use white text for better contrast over images
  const borderColor = 'rgba(255, 255, 255, 0.3)'; // Semi-transparent white border

  // Create unique pattern ID for each swatch
  const patternId = `pattern-${title.toLowerCase().replace(/\s+/g, '-')}`;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Set this image as the overlay image
    setOverlayImage(imageSrc);
  };

  return (
    <div 
      className={`${Style.isometricContainer} ${Style.imageSwatchHover}`}
      onClick={handleClick}
    >
      <svg
        width="142"
        height="265"
        viewBox="0 0 142 265"
        xmlns="http://www.w3.org/2000/svg"
        className={Style.isometricColorSwatch}
        style={{ stroke: borderColor }}
      >
        <defs>
          <pattern
            id={patternId}
            patternUnits="userSpaceOnUse"
            width="142"
            height="265"
            viewBox="0 0 142 265"
          >
            <image
              href={imageSrc}
              x="0"
              y="0"
              width="142"
              height="265"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        </defs>
        <use xlinkHref="#isometric" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}; 