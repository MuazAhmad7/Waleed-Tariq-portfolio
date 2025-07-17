'use client';

import styles from './page.module.css';
import { faEnvelope, faPhone, faMapMarkerAlt, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Icon from '@/components/Icon';
import { InlineWidget } from 'react-calendly';

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Contact Me</h1>
          <p className={styles.subtitle}>
            Let's connect and discuss opportunities to work together
          </p>
        </header>

        <div className={styles.contactGrid}>
          <div className={styles.contactCard}>
            <div className={styles.iconWrapper}>
              <Icon icon={faEnvelope} />
            </div>
            <h3>Email</h3>
            <a href="mailto:wbtariq10@gmail.com" className={styles.contactLink}>
              wbtariq10@gmail.com
            </a>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.iconWrapper}>
              <Icon icon={faPhone} />
            </div>
            <h3>Phone</h3>
            <a href="tel:+17326983939" className={styles.contactLink}>
              732-698-3939
            </a>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.iconWrapper}>
              <Icon icon={faMapMarkerAlt} />
            </div>
            <h3>Location</h3>
            <p className={styles.contactText}>East Brunswick, NJ</p>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.iconWrapper}>
              <Icon icon={faLinkedin} />
            </div>
            <h3>LinkedIn</h3>
            <a 
              href="https://www.linkedin.com/in/waleedtariq1/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              Connect with me
            </a>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.iconWrapper}>
              <Icon icon={faCalendar} />
            </div>
            <h3>Schedule a Meeting</h3>
            <p className={styles.contactText}>Book a time that works for both of us</p>
          </div>
        </div>

        <div id="calendar" className={styles.schedulingSection}>
          <h2>Schedule a Meeting</h2>
          <p>
            Ready to discuss opportunities? Book a convenient time for us to connect and explore how we can work together.
          </p>
          <div className={styles.calendlyWrapper}>
            <InlineWidget 
              url="https://calendly.com/wbtariq10/30min" 
              styles={{
                height: '630px',
                width: '100%'
              }}
            />
          </div>
        </div>

        <div className={styles.ctaSection}>
          <h2>Prefer email?</h2>
          <p>
            If scheduling doesn't work for you right now, feel free to reach out directly via email.
          </p>
          <a href="mailto:wbtariq10@gmail.com" className={styles.primaryButton}>
            Send me an email
          </a>
        </div>
      </div>
    </div>
  );
} 