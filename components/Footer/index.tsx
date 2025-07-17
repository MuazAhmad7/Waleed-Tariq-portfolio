import { 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';
import { faFileAlt as faFileAltRegular, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import styles from './index.module.css';
import Marquee from './marquee';
const Footer = () => {
  const year = new Date().getFullYear();
  const currentYear = `2015 - ${year}`;
  const links = [
    {
      title: 'Resume',
      icon: faFileAltRegular,
      url: '/WaleedTariq-resume.pdf',
    },
    {
      title: 'LinkedIn',
      icon: faLinkedin,
      url: 'https://www.linkedin.com/in/waleedtariq1/',
    },
    {
      title: 'GameGrid',
      icon: '/gamegrid-logo.png',
      url: 'https://gamegridtech.com/',
      isCustomImage: true,
    },
    {
      title: 'Contact Me',
      icon: faEnvelope,
      url: 'mailto:wbtariq10@gmail.com',
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        <h2 className="light">Elsewhere</h2>
      </div>
      <ul>
        {Object.entries(links).map(([key, value]) => {
          return (
            <li key={key}>
              <Marquee {...value} />
            </li>
          );
        })}
      </ul>
      <div className={styles.copyRight}>
        <p>
          <small>&copy; {currentYear} Waleed Tariq.</small>
        </p>
        <p>
          <small> All rights reserved.</small>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
