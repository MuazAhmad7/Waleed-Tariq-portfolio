'use client';
import Styles from './Status.module.scss';

type StatusType = 'success' | 'error' | 'warning' | 'info';

type StatusProps = {
  status: StatusType;
  children: string;
  href?: string;
  hoverText?: string;
};

const Status: React.FC<StatusProps> = ({
  status,
  children,
  href,
  hoverText,
}) => {
  const renderAnimatedText = (text: string, isHover: boolean = false) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className={`${Styles.letter} ${isHover ? Styles.hoverLetter : Styles.defaultLetter}`}
        style={{ animationDelay: `${index * 0.03}s` }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const content = (
    <div
      className={`${Styles.status} ${Styles[status]} ${href ? Styles.clickable : ''}`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6.06974 1.35872C6.40266 0.51457 7.59734 0.51457 7.93026 1.35872L9.1034 4.33323C9.20504 4.59095 9.40905 4.79496 9.66677 4.8966L12.6413 6.06974C13.4854 6.40266 13.4854 7.59734 12.6413 7.93026L9.66677 9.1034C9.40905 9.20504 9.20504 9.40905 9.1034 9.66677L7.93026 12.6413C7.59734 13.4854 6.40266 13.4854 6.06974 12.6413L4.8966 9.66677C4.79496 9.40905 4.59095 9.20504 4.33323 9.1034L1.35872 7.93026C0.51457 7.59734 0.51457 6.40266 1.35872 6.06974L4.33323 4.8966C4.59095 4.79496 4.79496 4.59095 4.8966 4.33323L6.06974 1.35872Z" />
      </svg>

      <p>
        <span className={Styles.defaultText}>
          {renderAnimatedText(children)}
        </span>
        {hoverText && (
          <span className={Styles.hoverText}>
            {renderAnimatedText(hoverText, true)}
          </span>
        )}
      </p>
    </div>
  );

  if (href) {
    return (
      <a href={href} className={Styles.statusLink}>
        {content}
      </a>
    );
  }

  return content;
};

export default Status;
