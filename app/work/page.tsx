import styles from './page.module.scss';

export default function Page() {
  return (
    <div className={styles.experiencePage}>
      <section>
        <div className="content">
          <h2>Professional Experience</h2>
          <p>
            A comprehensive overview of my professional journey, education, and
            key achievements in business analysis, project management, and
            strategic leadership.
          </p>
        </div>
      </section>

      {/* Education Section */}
      <section
        className={`content ${styles.educationSection} ${styles.fadeInSection}`}
      >
        <h3>Education</h3>
        <ul className={`experience ${styles.experienceList}`}>
          <li className={`${styles.experienceItem} ${styles.educationItem}`}>
            <h3 className="dateYear">
              <span>Current</span>
            </h3>
            <h4>
              Harvard University <span>Cambridge, MA</span>
            </h4>
            <div className="content">
              <div>
                <div>
                  <h5>Program</h5>
                  <p>
                    <strong>
                      Certification of Project Management & Information
                      Technology
                    </strong>
                  </p>
                  <p>
                    <em>Currently Enrolled</em>
                  </p>
                </div>
              </div>
              <p>
                Advanced certification program focusing on strategic project
                management methodologies, IT infrastructure, and digital
                transformation leadership. Curriculum includes Agile/Scrum
                frameworks, risk management, and emerging technology
                integration.
              </p>
            </div>
          </li>
          <li className={`${styles.experienceItem} ${styles.educationItem}`}>
            <h3 className="dateYear">
              <span>2021</span>
            </h3>
            <h4>
              Rutgers University <span>New Brunswick, NJ</span>
            </h4>
            <div className="content">
              <div>
                <div>
                  <h5>Degree</h5>
                  <p>
                    <strong>
                      Bachelor of Science in Biology & Business/Health
                      Administration
                    </strong>
                  </p>
                </div>
              </div>
              <p>
                Dual-concentration program combining scientific rigor with
                business acumen, specializing in healthcare administration and
                strategic management. Graduated with honors while serving as
                Head Captain of NCAA Division I Badminton team.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* Professional Experience Section */}
      <section
        data-print="true"
        className={`projects content ${styles.fadeInSection}`}
      >
        <h3>Professional Experience</h3>
        <ul className={`experience ${styles.experienceList}`}>
          <li className={styles.experienceItem}>
            <h3 className="dateYear">
              <span>2024-2025</span>
            </h3>
            <h4>
              Quest Diagnostics <span>New York, NY</span>
            </h4>
            <div className="content">
              <div>
                <div>
                  <h5>Role</h5>
                  <p>
                    <strong>
                      Senior Financial Analyst, Strategic Pricing (Contract)
                    </strong>
                  </p>
                  <p>
                    <em>December 2024 - March 2025</em>
                  </p>
                </div>
              </div>
              <h5>Key Achievements</h5>
              <div className={`three-up ${styles.keyAchievements}`}>
                <p className={`${styles.achievement} ${styles.pulseOnHover}`}>
                  Spearheaded pricing optimization for a $3.5B+ healthcare
                  service portfolio, improving gross margin by 18%
                </p>
                <p className={`${styles.achievement} ${styles.pulseOnHover}`}>
                  Automated financial data pipelines via ETL integrations,
                  reducing reporting turnaround by 81%
                </p>
                <p className={`${styles.achievement} ${styles.pulseOnHover}`}>
                  Enhanced Power BI dashboard performance, increasing user
                  engagement by 40%
                </p>
              </div>
              <p>
                Led pricing optimization initiatives for a multi-billion dollar
                healthcare service portfolio, leveraging SQL and SAP S/4HANA to
                build sophisticated multi-scenario financial models.
                Collaborated cross-functionally with Product, Legal, and
                Go-to-Market teams to align payor contract strategy with
                alternative reimbursement models and value-based care metrics.
              </p>
              <p>
                Identified and resolved backend processing bottlenecks in Power
                BI dashboards that were causing significant delays in analytics
                requests. Implemented SAP and ETL automation solutions to
                streamline data pipelines, dramatically reducing turnaround
                times and improving user experience across the organization.
              </p>
            </div>
          </li>
          <li className={styles.experienceItem}>
            <h3 className="dateYear">
              <span>2023-2024</span>
            </h3>
            <h4>
              Prudential Financial <span>Newark, NJ</span>
            </h4>
            <div className="content">
              <div>
                <div>
                  <h5>Role</h5>
                  <p>
                    <strong>Project Manager</strong>
                  </p>
                  <p>
                    <em>February 2023 - April 2024</em>
                  </p>
                </div>
              </div>
              <h5>Key Achievements</h5>
              <div className={`three-up ${styles.keyAchievements}`}>
                <p className={`${styles.achievement} ${styles.pulseOnHover}`}>
                  Directed strategic initiatives across enterprise IT portfolio
                  supporting 250+ internal clients
                </p>
                <p className={`${styles.achievement} ${styles.pulseOnHover}`}>
                  Implemented compliance automation via SAP GRC, reducing manual
                  updates by 35%
                </p>
                <p className={`${styles.achievement} ${styles.pulseOnHover}`}>
                  Applied operational analytics to optimize annual IT investment
                  planning and eliminate redundant workflows
                </p>
              </div>
              <p>
                Led strategic initiatives across enterprise IT portfolio using
                SAP PPM and Azure DevOps, providing comprehensive project
                management support for over 250 internal clients. Focused on
                aligning IT strategy with business objectives through
                data-driven decision making and process optimization.
              </p>
              <p>
                Implemented compliance automation solutions via SAP GRC to
                improve audit-readiness and streamline policy management.
                Successfully reduced manual updates in TRID policies by 35%,
                significantly improving operational efficiency and reducing
                compliance risk.
              </p>
              <p>
                Applied operational analytics to identify inefficiencies in
                annual IT investment planning processes. Developed strategic
                recommendations that eliminated redundant workflows and better
                aligned technology investments with organizational priorities.
              </p>
            </div>
          </li>
          <li className={styles.experienceItem}>
            <h3 className="dateYear">
              <span>2021-2023</span>
            </h3>
            <h4>
              United Health Group <span>San Antonio, TX</span>
            </h4>
            <div className="content">
              <div>
                <div>
                  <h5>Role</h5>
                  <p>
                    <strong>Business Process/Strategy Analyst</strong>
                  </p>
                  <p>
                    <em>June 2021 - February 2023</em>
                  </p>
                </div>
              </div>
              <h5>Key Achievements</h5>
              <div className={`three-up ${styles.keyAchievements}`}>
                <p className={`${styles.achievement} ${styles.pulseOnHover}`}>
                  Developed custom financial forecasting model in SAP S/HANA,
                  improving forecasting precision by 25%
                </p>
                <p className={`${styles.achievement} ${styles.pulseOnHover}`}>
                  Embedded with operations and actuarial teams to identify and
                  eliminate operational bottlenecks
                </p>
                <p className={`${styles.achievement} ${styles.pulseOnHover}`}>
                  Utilized SAP Signavio Process Intelligence to optimize
                  workflows and reduce redundancies
                </p>
              </div>
              <p>
                Developed a custom financial forecasting model in SAP S/HANA to
                address systemic inaccuracies in revenue projections,
                significantly improving forecasting precision and supporting
                better business decision-making across the organization.
              </p>
              <p>
                Embedded directly with operations and actuarial teams to conduct
                comprehensive analysis of existing workflows and processes.
                Identified critical operational bottlenecks and developed
                strategic recommendations to eliminate redundancies and improve
                efficiency.
              </p>
              <p>
                Leveraged SAP Signavio Process Intelligence to map, analyze, and
                optimize business processes, resulting in streamlined operations
                and reduced operational costs across multiple business units.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* Leadership Experience Section */}
      <section
        className={`content ${styles.leadershipSection} ${styles.fadeInSection}`}
      >
        <h3>Leadership Experience</h3>
        <ul className={`experience ${styles.experienceList}`}>
          <li className={`${styles.experienceItem} ${styles.leadershipItem}`}>
            <h3 className="dateYear">
              <span>2025-Present</span>
            </h3>
            <h4>
              Game Grid <span>Lewes, DE</span>
            </h4>
            <div className="content">
              <div>
                <div>
                  <h5>Role</h5>
                  <p>
                    <strong>Co-Founder & Managing Director</strong>
                  </p>
                  <p>
                    <em>February 2025 - Present</em>
                  </p>
                </div>
              </div>
              <h5>Key Achievements</h5>
              <div className={`three-up ${styles.keyAchievements}`}>
                <p className={`${styles.achievement} ${styles.pulseOnHover}`}>
                  Launched sports-tech startup with API-first stat-tracking and
                  scheduling engine for amateur leagues
                </p>
                <p className={`${styles.achievement} ${styles.pulseOnHover}`}>
                  Grew to 150+ active users in under one year using Firebase,
                  SQL, and role-based admin controls
                </p>
                <p className={`${styles.achievement} ${styles.pulseOnHover}`}>
                  Designed MVP stat-tracking system enabling real-time data
                  input across 16 basketball teams
                </p>
              </div>
              <p>
                Co-founded and launched Game Grid, a comprehensive sports-tech
                startup providing API-first stat-tracking and scheduling
                solutions for amateur leagues. Built the platform using modern
                technologies including Firebase and SQL with sophisticated
                role-based admin controls.
              </p>
              <p>
                Led UX strategy development for a gamified "My Player" system
                featuring dynamic dashboards, comprehensive player KPIs, and
                detailed matchup history to enhance user engagement and
                retention.
              </p>
              <p>
                Designed and launched GameGrid's MVP stat-tracking system from
                the ground up, enabling real-time data input, live score
                updates, and automated team/player analytics, successfully
                serving 16 basketball teams with seamless performance.
              </p>
            </div>
          </li>
          <li className={`${styles.experienceItem} ${styles.leadershipItem}`}>
            <h3 className="dateYear">
              <span>2017-2021</span>
            </h3>
            <h4>
              <span style={{ whiteSpace: 'nowrap' }}>NCAA Division I</span>{' '}
              Badminton, Rutgers University <span>New Brunswick, NJ</span>
            </h4>
            <div className="content">
              <div>
                <div>
                  <h5>Role</h5>
                  <p>
                    <strong>Head Captain</strong>
                  </p>
                  <p>
                    <em>September 2017 - June 2021</em>
                  </p>
                </div>
              </div>
              <h5>Key Achievements</h5>
              <div className={`three-up ${styles.keyAchievements}`}>
                <p className={`${styles.achievement} ${styles.pulseOnHover}`}>
                  Led Rutgers to Historic 1st ever Top 3 Placement at National
                  Tournaments
                </p>
                <p className={`${styles.achievement} ${styles.pulseOnHover}`}>
                  Silver Medal: 2019 National Division I Eastern Collegiate
                  Tournament
                </p>
                <p className={`${styles.achievement} ${styles.pulseOnHover}`}>
                  Trained a team of 18 players with 5am sessions, endurance
                  conditioning, and team rapport building
                </p>
              </div>
              <p>
                Served as Head Captain for Rutgers University's NCAA Division I
                Badminton team, leading the program to unprecedented success
                including their first-ever Top 3 placement at National
                Tournaments.
              </p>
              <p>
                Achieved historic Silver Medal at the 2019 National Division I
                Eastern Collegiate Tournament, marking a significant milestone
                in the program's competitive history and establishing new
                standards of excellence.
              </p>
              <p>
                Developed and implemented comprehensive training programs for 18
                team members, including rigorous 5am training sessions,
                specialized endurance conditioning, and team-building
                initiatives that built resilience and fostered strong team
                rapport.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* Skills Section */}
      <section
        className={`content ${styles.skillsSection} ${styles.fadeInSection}`}
      >
        <h3>Skills</h3>
        <div className="three-up">
          <div className={styles.skillCategory}>
            <h4>Data Analysis & Visualization</h4>
            <ul>
              <li>Excel (Advanced: Pivot Tables, VLOOKUP, Macros)</li>
              <li>Power BI & Tableau</li>
              <li>Microsoft Access</li>
              <li>SAP S/4HANA</li>
            </ul>
          </div>
          <div className={styles.skillCategory}>
            <h4>Programming & Software</h4>
            <ul>
              <li>Java, Python, SQL</li>
              <li>Salesforce, Jira, Git, Bitbucket</li>
              <li>UML, Apache Maven</li>
              <li>Epic Systems</li>
            </ul>
          </div>
          <div className={styles.skillCategory}>
            <h4>Languages</h4>
            <ul>
              <li>
                <strong>Fluent:</strong> English, Urdu
              </li>
              <li>
                <strong>Proficient:</strong> Arabic, French, Spanish
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section
        className={`content ${styles.awardsSection} ${styles.fadeInSection}`}
      >
        <h3>Awards & Recognition</h3>
        <ul className={`experience ${styles.experienceList}`}>
          <li className={`${styles.experienceItem} ${styles.awardItem}`}>
            <h3 className="dateYear">
              <span>2021</span>
            </h3>
            <h4>Top 5 UnitedHealth Group Central Regional Analyst</h4>
            <div className="content">
              <p>
                Recognized as one of the top 5 performing analysts in the
                Central Regional division for exceptional performance in
                business analysis, strategic insights, and operational
                excellence.
              </p>
            </div>
          </li>
          <li className={`${styles.experienceItem} ${styles.awardItem}`}>
            <h3 className="dateYear">
              <span>2019-2021</span>
            </h3>
            <h4>Rutgers University Athlete of The Year</h4>
            <div className="content">
              <p>
                Awarded Rutgers University Athlete of The Year for outstanding
                athletic performance, leadership, and contribution to the
                university's sports programs during tenure as Head Captain of
                the NCAA Division I Badminton team.
              </p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}
