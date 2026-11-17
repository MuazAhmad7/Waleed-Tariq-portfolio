import styles from './page.module.scss';

// Content mirrors public/WaleedTariq-resume.pdf — update both together.

type Role = {
  years: string;
  org: string;
  /** Rendered as a small title line above `org` (e.g. a team within a school). */
  subtitle?: string;
  location: string;
  title: string;
  dates: string;
  summary?: string;
  achievements: string[];
};

type Education = {
  year: string;
  school: string;
  location: string;
  label: 'Degree' | 'Program';
  credential: string;
  note?: string;
  description?: string;
};

type Award = {
  year?: string;
  name: string;
  description: string;
};

const education: Education[] = [
  {
    year: '2027',
    school: 'Johns Hopkins University - Carey Business School',
    location: 'Baltimore, MD',
    label: 'Degree',
    credential:
      'Master of Business Administration in AI for Business, Finance and Marketing',
    note: 'Expected June 2027',
  },
  {
    year: 'Current',
    school: 'Harvard University',
    location: 'Cambridge, MA',
    label: 'Program',
    credential: 'Certification of Project Management & Information Technology',
    note: 'Currently Enrolled',
    description:
      'Advanced certification program focusing on strategic project management methodologies, IT infrastructure, and digital transformation leadership. Curriculum includes Agile/Scrum frameworks, risk management, and emerging technology integration.',
  },
  {
    year: '2021',
    school: 'Rutgers University',
    location: 'New Brunswick, NJ',
    label: 'Degree',
    credential:
      'Bachelor of Science in Biology & Business/Health Administration',
    note: 'May 2021',
  },
];

const professional: Role[] = [
  {
    years: '2026-Present',
    org: 'International Financial Group',
    location: 'Jersey City, NJ',
    title: 'IT Project Lead',
    dates: 'May 2026 - Present',
    achievements: [
      'Manage all work for an entire product workstream reporting directly to the Chairman, owning scope, timelines, and execution across engineering, QA, and business teams from intake through production release',
      'Lead IT Portfolio Reviews with C-Suite executives, presenting roadmap status, delivery risks, and resource tradeoffs to secure executive alignment on investment priorities',
      'Own product roadmap and delivery for SPRQ, prioritizing 7+ features and enhancements per quarter across underwriting, rating, document management, and policy workflows',
      'Analyze defects, production incidents, adoption trends, and workflow data to drive prioritized enhancements, contributing to a 40% reduction in recurring issues and manual processing',
    ],
  },
  {
    years: '2024-Present',
    org: 'GameGrid Technologies',
    location: 'Lewes, DE',
    title: 'Founder & Product Lead',
    dates: 'April 2024 - Present',
    summary:
      'Sports-tech startup building live stat tracking and league management tools for local leagues.',
    achievements: [
      'Own relationships across 100+ key stakeholders including team captains, league organizers, and internal operations leads, serving as the primary point of contact for onboarding, product adoption, and partner engagement',
      'Built AI trackers that reduce manual workload by 42% and enhance delivery of player insights across 7 partner leagues',
    ],
  },
  {
    years: '2024-2025',
    org: 'Quest Diagnostics',
    location: 'New York, NY',
    title: 'IT Project Manager (Contract)',
    dates: 'December 2024 - February 2025',
    achievements: [
      'Supported management of a $3.5B+ strategic accounts portfolio, partnering with account executives, payer clients (Cigna, UnitedHealthcare), and internal product and finance leadership',
    ],
  },
  {
    years: '2023-2024',
    org: 'Prudential Financial',
    location: 'Newark, NJ',
    title: 'Project Manager',
    dates: 'February 2023 - April 2024',
    achievements: [
      'Delivered $100M+ programs across 10+ fintech workstreams by directing execution across engineering teams, business stakeholders, and external technology partners',
      'Coordinated communication across 250+ stakeholders including product leaders, engineering teams, finance partners, and executive leadership to align on delivery timelines and platform enhancements',
      'Improved on-time delivery by ~20% by resolving planning bottlenecks across 15 partner teams and 8+ business units',
    ],
  },
  {
    years: '2021-2023',
    org: 'UnitedHealth Group',
    location: 'San Antonio, TX',
    title: 'Project Management Associate',
    dates: 'June 2021 - February 2023',
    achievements: [
      'Worked directly with 20+ vendors, healthcare providers, and internal ops teams to track auditory performance metrics',
      'Used AWS/Azure-backed datasets to better understand demand and improve forecasting across large datasets',
    ],
  },
];

const leadership: Role[] = [
  {
    years: '2023-Present',
    org: 'CJML Nonprofit',
    location: 'New Jersey',
    title: 'Founder',
    dates: 'May 2023 - Present',
    achievements: [
      'Scaled league participation to 1,500+ players in 3 seasons by building annual recruitment and competition frameworks',
      'Generated $80,000+ annually in charitable proceeds by securing 25+ sponsorships for recurring state-wide events',
    ],
  },
  {
    years: '2017-2021',
    subtitle: 'NCAA Division I Badminton',
    org: 'Rutgers University',
    location: 'New Brunswick, NJ',
    title: 'Head Captain',
    dates: 'September 2017 - June 2021',
    achievements: [
      'Led Rutgers to its first-ever Top 3 national finish, earning a Silver Medal at the 2019 Division I Eastern Collegiate Tournament',
    ],
  },
];

const skills: { category: string; items: React.ReactNode[] }[] = [
  {
    category: 'Technical',
    items: [
      'Excel (Pivot Tables, VLOOKUP)',
      'Tableau, Power BI',
      'Alteryx, KNIME',
      'Epic EHR, Figma',
      'Financial Modeling',
    ],
  },
  {
    category: 'Programming & Software',
    items: [
      'Java, Python, SQL',
      'Salesforce, SAP, NetSuite',
      'Git, Bitbucket, Apache Maven',
      'UML, Agile (Scrum, Jira)',
    ],
  },
  {
    category: 'Cloud Platforms',
    items: [
      'Microsoft Azure, Amazon Web Services',
      'Google Cloud, OCI',
      'Snowflake, Databricks',
    ],
  },
  {
    category: 'Languages',
    items: [
      <>
        <strong>Fluent:</strong> English, Urdu
      </>,
      <>
        <strong>Proficient:</strong> Arabic, French, Spanish
      </>,
    ],
  },
];

const awards: Award[] = [
  {
    year: '2019',
    name: 'Rutgers University Athlete of The Year',
    description:
      'Awarded for athletic performance and leadership as Head Captain of the NCAA Division I Badminton team.',
  },
  {
    name: 'UnitedHealth Group National Top 3 Analyst',
    description:
      'Ranked among the top 3 analysts nationally at UnitedHealth Group.',
  },
  {
    name: 'Deloitte Case Competition',
    description: 'Finalist.',
  },
  {
    name: 'Accenture Case Competition',
    description: '3rd Place.',
  },
  {
    name: 'Beta Gamma Sigma Honor Society',
    description: 'Top 10% rank.',
  },
];

function RoleItem({ role, className }: { role: Role; className: string }) {
  return (
    <li className={className}>
      <h3 className="dateYear">
        <span>{role.years}</span>
      </h3>
      <h4>
        {role.subtitle ? (
          <>
            <span className={styles.smallerTitle}>{role.subtitle}</span>
            <span>{role.org}</span>
          </>
        ) : (
          <>{role.org} </>
        )}
        <span>{role.location}</span>
      </h4>
      <div className="content">
        <div>
          <div>
            <h5>Role</h5>
            <p>
              <strong>{role.title}</strong>
            </p>
            <p>
              <em>{role.dates}</em>
            </p>
          </div>
        </div>
        {role.summary && <p>{role.summary}</p>}
        <h5>Key Achievements</h5>
        <div className={`three-up ${styles.keyAchievements}`}>
          {role.achievements.map((achievement) => (
            <p
              key={achievement}
              className={`${styles.achievement} ${styles.pulseOnHover}`}
            >
              {achievement}
            </p>
          ))}
        </div>
      </div>
    </li>
  );
}

export default function Page() {
  return (
    <div className={styles.experiencePage}>
      <section>
        <div className="content">
          <h2>Professional Experience</h2>
          <p>
            A comprehensive overview of my professional journey, education, and
            key achievements in IT project leadership, product delivery, and
            community building.
          </p>
        </div>
      </section>

      {/* Education Section */}
      <section
        className={`content ${styles.educationSection} ${styles.fadeInSection}`}
      >
        <h3>Education</h3>
        <ul className={`experience ${styles.experienceList}`}>
          {education.map((item) => (
            <li
              key={item.school}
              className={`${styles.experienceItem} ${styles.educationItem}`}
            >
              <h3 className="dateYear">
                <span>{item.year}</span>
              </h3>
              <h4>
                {item.school} <span>{item.location}</span>
              </h4>
              <div className="content">
                <div>
                  <div>
                    <h5>{item.label}</h5>
                    <p>
                      <strong>{item.credential}</strong>
                    </p>
                    {item.note && (
                      <p>
                        <em>{item.note}</em>
                      </p>
                    )}
                  </div>
                </div>
                {item.description && <p>{item.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Professional Experience Section */}
      <section
        data-print="true"
        className={`projects content ${styles.fadeInSection}`}
      >
        <h3>Professional Experience</h3>
        <ul className={`experience ${styles.experienceList}`}>
          {professional.map((role) => (
            <RoleItem
              key={role.org}
              role={role}
              className={styles.experienceItem}
            />
          ))}
        </ul>
      </section>

      {/* Leadership Experience Section */}
      <section
        className={`content ${styles.leadershipSection} ${styles.fadeInSection}`}
      >
        <h3>Leadership Experience</h3>
        <ul className={`experience ${styles.experienceList}`}>
          {leadership.map((role) => (
            <RoleItem
              key={role.org}
              role={role}
              className={`${styles.experienceItem} ${styles.leadershipItem}`}
            />
          ))}
        </ul>
      </section>

      {/* Skills Section */}
      <section
        className={`content ${styles.skillsSection} ${styles.fadeInSection}`}
      >
        <h3>Skills</h3>
        <div className={styles.skillsGrid}>
          {skills.map(({ category, items }) => (
            <div key={category} className={styles.skillCategory}>
              <h4>{category}</h4>
              <ul>
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Awards Section */}
      <section
        className={`content ${styles.awardsSection} ${styles.fadeInSection}`}
      >
        <h3>Awards & Recognition</h3>
        <ul className={`experience ${styles.experienceList}`}>
          {awards.map((award) => (
            <li
              key={award.name}
              className={`${styles.experienceItem} ${styles.awardItem}`}
            >
              <h3 className="dateYear">
                <span>{award.year ?? ''}</span>
              </h3>
              <h4>{award.name}</h4>
              <div className="content">
                <p>{award.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
