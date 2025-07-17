import { 
  faCertificate, 
  faGraduationCap, 
  faCode, 
  faProjectDiagram, 
  faCodeBranch
} from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.scss';

/**
 * Metadata for the /tools page (now Certifications).
 * @type {import('next').Metadata}
 */
export const metadata = {
  title: 'Certifications | Waleed Tariq',
  description:
    'Professional certifications in software development, including Apache Maven, Git, UML, and Object-Oriented Programming.',
  openGraph: {
    title: 'Certifications | Waleed Tariq',
    description:
      'Professional certifications in software development, including Apache Maven, Git, UML, and Object-Oriented Programming.',
    images: ['https://darianrosebrook.com/darianrosebrook.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certifications | Waleed Tariq',
    description:
      'Professional certifications in software development, including Apache Maven, Git, UML, and Object-Oriented Programming.',
    images: ['https://darianrosebrook.com/darianrosebrook.jpg'],
  },
};

/**
 * Certifications page.
 *
 * This page showcases professional certifications earned in software development and related technologies.
 * @returns {JSX.Element}
 */
const CertificationsPage = () => {
  const certifications = [
    {
      icon: faGraduationCap,
      title: 'Apache Maven Certification',
      status: (
        <span className={`${styles.badge} ${styles.completed}`}>
          Completed
        </span>
      ),
      desc: (
        <>
          Comprehensive certification covering <span style={{ color: 'var(--color-foreground-accent)', fontWeight: '600' }}>Apache Maven</span> build automation tool, including project structure, dependency management, build lifecycle, and plugin configuration for <span style={{ color: 'var(--color-foreground-accent)', fontWeight: '600' }}>Java projects</span>.
        </>
      ),
      note: 'Demonstrates proficiency in Maven for enterprise Java development, including multi-module projects, dependency resolution, and build optimization.',
      viewLink: '/Certifications/Apache Maven Certification (1).pdf',
    },
    {
      icon: faGraduationCap,
      title: 'Apache Maven Introduction Starter Certification',
      status: (
        <span className={`${styles.badge} ${styles.completed}`}>
          Completed
        </span>
      ),
      desc: (
        <>
          Foundational certification covering <span style={{ color: 'var(--color-foreground-accent)', fontWeight: '600' }}>Maven basics</span>, project setup, basic commands, and core concepts for <span style={{ color: 'var(--color-foreground-accent)', fontWeight: '600' }}>Java build automation</span>.
        </>
      ),
      note: 'Certification establishing fundamental understanding of Maven build tool and its role in Java development workflows.',
      viewLink: '/Certifications/Apache Maven Introduction Starter Certifcation.pdf',
    },
    {
      icon: faCodeBranch,
      title: 'Git Essentials, Bitbucket and Sourcetree Certification',
      status: (
        <span className={`${styles.badge} ${styles.completed}`}>
          Completed
        </span>
      ),
      desc: (
        <>
          Comprehensive certification covering <span style={{ color: 'var(--color-foreground-accent)', fontWeight: '600' }}>Git version control</span> fundamentals, <span style={{ color: 'var(--color-foreground-accent)', fontWeight: '600' }}>Bitbucket</span> repository management, and <span style={{ color: 'var(--color-foreground-accent)', fontWeight: '600' }}>Sourcetree GUI</span> operations for effective code collaboration.
        </>
      ),
      note: 'Covers essential Git workflows, branching strategies, merge conflicts, and team collaboration using Atlassian tools.',
      viewLink: '/Certifications/Git Essentials, Bitbucket and Sourcetree Certification.pdf',
    },
    {
      icon: faProjectDiagram,
      title: 'Object Oriented Analysis, Design & Programming with UML Certification',
      status: (
        <span className={`${styles.badge} ${styles.completed}`}>
          Completed
        </span>
      ),
      desc: (
        <>
          Advanced certification covering <span style={{ color: 'var(--color-foreground-accent)', fontWeight: '600' }}>object-oriented analysis</span> and design principles, <span style={{ color: 'var(--color-foreground-accent)', fontWeight: '600' }}>UML modeling</span>, and practical application in software development projects.
        </>
      ),
      note: 'Demonstrates expertise in OOP concepts, design patterns, UML diagrams, and systematic approach to software architecture and design.',
      viewLink: '/Certifications/Object Oriented Analysis, Design & Programming with UML Certification.pdf',
    },
    {
      icon: faCode,
      title: 'UML and Object-Oriented Design Foundations Certification',
      status: (
        <span className={`${styles.badge} ${styles.completed}`}>
          Completed
        </span>
      ),
      desc: (
        <>
          Foundational certification in <span style={{ color: 'var(--color-foreground-accent)', fontWeight: '600' }}>Unified Modeling Language (UML)</span> and object-oriented design principles, covering <span style={{ color: 'var(--color-foreground-accent)', fontWeight: '600' }}>class diagrams</span>, use cases, and design methodology.
        </>
      ),
      note: 'Establishes core understanding of UML notation, object-oriented design principles, and systematic approach to software modeling.',
      viewLink: '/Certifications/UML and Object-Oriented Design Foundations Certification.pdf',
    },
    {
      icon: faGraduationCap,
      title: 'Certification of Project Management & Information Technology',
      status: (
        <span className={`${styles.badge} ${styles['in-progress']}`}>
          In Progress
        </span>
      ),
      desc: (
        <>
          Advanced certification program focusing on strategic <span style={{ color: 'var(--color-foreground-accent)', fontWeight: '600' }}>project management methodologies</span>, IT infrastructure, and <span style={{ color: 'var(--color-foreground-accent)', fontWeight: '600' }}>digital transformation leadership</span>. Curriculum includes <span style={{ color: 'var(--color-foreground-accent)', fontWeight: '600' }}>Agile/Scrum frameworks</span>, risk management, and emerging technology integration.
        </>
      ),
      note: (
        <>
          Currently enrolled in this <span style={{ color: 'var(--color-foreground-accent)', fontWeight: '600' }}>Harvard University</span> program, developing expertise in modern project management and IT leadership practices.
        </>
      ),
      viewLink: null,
    },
  ];

  return (
    <section className="content">
      <h1 className="heading-01">
        Professional Certifications
      </h1>
      <p>
        A collection of professional certifications earned in software development, 
        build automation, version control, and object-oriented design. These certifications 
        demonstrate proficiency in essential tools and methodologies used in modern 
        software development practices.
      </p>
      <div className={styles['tool-grid']}>
        {certifications.map((cert) => (
          <div className={styles['tool-card']} key={cert.title}>
            <div className={styles['tool-header']}>{cert.status}</div>
            <h3 style={{ margin: 0 }}>{cert.title}</h3>
            <div></div>
            <div style={{ marginBottom: '1rem', width: '100%', lineHeight: '1.6' }}>
              {cert.desc}
            </div>
            <blockquote style={{ 
              opacity: 0.9, 
              width: '100%', 
              marginBottom: '1rem',
              padding: '0.75rem',
              backgroundColor: 'var(--color-background-tertiary)',
              borderLeft: '3px solid var(--color-foreground-accent)',
              borderRadius: '0.25rem',
              fontStyle: 'italic'
            }}>
              {cert.note}
            </blockquote>
            {cert.viewLink && (
              <a 
                href={cert.viewLink} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  color: 'var(--color-foreground-accent)',
                  textDecoration: 'none',
                  fontWeight: '500',
                  marginTop: 'auto'
                }}
              >
                View Certificate →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificationsPage;
