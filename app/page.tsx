'use client';

import Status from '@/components/Status';
import styles from './page.module.css';
import LogoMaruqee from '@/components/LogoMarquee';
import Blueprints from './heroes/blueprints';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import Image from 'next/image';
import Typewriter from 'typewriter-effect';
import { useRef, useState, useEffect, useCallback } from 'react';
import Tilt from 'react-parallax-tilt';
import {
  MdAccountBalance,
  MdRocket,
  MdSchool,
  MdGpsFixed,
  MdFlashOn,
} from 'react-icons/md';

// Kept outside the component: typewriter-effect v3 restarts typing whenever
// the options object changes, so it must stay referentially stable.
const TYPEWRITER_OPTIONS = {
  strings: [
    'IT Project Lead',
    'Founder of GameGrid',
    'MBA Candidate at Johns Hopkins',
  ],
  autoStart: true,
  loop: true,
  delay: 75,
  deleteSpeed: 50,
};

export default function Home() {
  const whoIAmRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const currentWorkRef = useRef<HTMLDivElement>(null);
  const strategicRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);

  const [strategicHover, setStrategicHover] = useState(false);
  const [technicalHover, setTechnicalHover] = useState(false);

  const strategicMouseX = useMotionValue(0);
  const strategicMouseY = useMotionValue(0);
  const technicalMouseX = useMotionValue(0);
  const technicalMouseY = useMotionValue(0);

  // Reduced spring settings for better performance
  const strategicSmoothX = useSpring(strategicMouseX, {
    stiffness: 300,
    damping: 40,
  });
  const strategicSmoothY = useSpring(strategicMouseY, {
    stiffness: 300,
    damping: 40,
  });
  const technicalSmoothX = useSpring(technicalMouseX, {
    stiffness: 300,
    damping: 40,
  });
  const technicalSmoothY = useSpring(technicalMouseY, {
    stiffness: 300,
    damping: 40,
  });

  const { scrollYProgress: whoIAmProgress } = useScroll({
    target: whoIAmRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: skillsProgress } = useScroll({
    target: skillsRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: currentWorkProgress } = useScroll({
    target: currentWorkRef,
    offset: ['start end', 'end start'],
  });

  const whoIAmY = useTransform(whoIAmProgress, [0, 1], [100, -100]);
  const skillsY = useTransform(skillsProgress, [0, 1], [150, -150]);
  const currentWorkY = useTransform(currentWorkProgress, [0, 1], [100, -100]);

  const handleStrategicMouseMove = useCallback((e: React.MouseEvent) => {
    if (!strategicRef.current) return;
    const rect = strategicRef.current.getBoundingClientRect();
    strategicMouseX.set(e.clientX - rect.left);
    strategicMouseY.set(e.clientY - rect.top);
  }, [strategicMouseX, strategicMouseY]);

  const handleTechnicalMouseMove = useCallback((e: React.MouseEvent) => {
    if (!technicalRef.current) return;
    const rect = technicalRef.current.getBoundingClientRect();
    technicalMouseX.set(e.clientX - rect.left);
    technicalMouseY.set(e.clientY - rect.top);
  }, [technicalMouseX, technicalMouseY]);

  // Optimized mask update functions with throttling
  const updateStrategicMask = useCallback(() => {
    if (strategicRef.current) {
      const maskReveal = strategicRef.current.querySelector(
        `.${styles.maskReveal}`
      ) as HTMLElement;
      const x = strategicSmoothX.get();
      const y = strategicSmoothY.get();

      if (maskReveal) {
        const radius = strategicHover ? '120px' : '0px';
        const maskImage = `radial-gradient(circle ${radius} at ${x}px ${y}px, black 100%, transparent 100%)`;
        maskReveal.style.webkitMaskImage = maskImage;
        maskReveal.style.maskImage = maskImage;
      }

      // Update cursor indicator position
      if (strategicRef.current) {
        strategicRef.current.style.setProperty('--cursor-x', `${x}px`);
        strategicRef.current.style.setProperty('--cursor-y', `${y}px`);
      }
    }
  }, [strategicHover, strategicSmoothX, strategicSmoothY]);

  const updateTechnicalMask = useCallback(() => {
    if (technicalRef.current) {
      const maskReveal = technicalRef.current.querySelector(
        `.${styles.maskReveal}`
      ) as HTMLElement;
      const x = technicalSmoothX.get();
      const y = technicalSmoothY.get();

      if (maskReveal) {
        const radius = technicalHover ? '120px' : '0px';
        const maskImage = `radial-gradient(circle ${radius} at ${x}px ${y}px, black 100%, transparent 100%)`;
        maskReveal.style.webkitMaskImage = maskImage;
        maskReveal.style.maskImage = maskImage;
      }

      // Update cursor indicator position
      if (technicalRef.current) {
        technicalRef.current.style.setProperty('--cursor-x', `${x}px`);
        technicalRef.current.style.setProperty('--cursor-y', `${y}px`);
      }
    }
  }, [technicalHover, technicalSmoothX, technicalSmoothY]);

  useEffect(() => {
    const unsubscribeStrategicX = strategicSmoothX.on('change', updateStrategicMask);
    const unsubscribeStrategicY = strategicSmoothY.on('change', updateStrategicMask);
    const unsubscribeTechnicalX = technicalSmoothX.on('change', updateTechnicalMask);
    const unsubscribeTechnicalY = technicalSmoothY.on('change', updateTechnicalMask);

    return () => {
      unsubscribeStrategicX();
      unsubscribeStrategicY();
      unsubscribeTechnicalX();
      unsubscribeTechnicalY();
    };
  }, [updateStrategicMask, updateTechnicalMask, strategicSmoothX, strategicSmoothY, technicalSmoothX, technicalSmoothY]);

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Waleed Tariq',
    description: 'IT Project Lead at International Financial Group, founder of GameGrid and CJML, and Johns Hopkins MBA candidate.',
    url: typeof window !== 'undefined' ? window.location.origin : '',
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <Blueprints />
          <div className={styles.cover}></div>
        </div>
        <div className={styles.headingHero}>
          <div className="gooey" style={{ textAlign: 'center' }}>
            <Status
              status="success"
              href="/contact#calendar"
              hoverText="Lets have a chat :)"
            >
              Available for opportunities
            </Status>
          </div>
          <h1 className="gooey" style={{ textAlign: 'center' }}>
            <span>Waleed Tariq - founder's manual</span>
            <br />
            <span style={{ fontSize: '0.81em' }}>
              From Idea to Impact &rarr; Leading Projects &amp;
            </span>
            <br />
            <span style={{ fontSize: '0.81em' }}>
              Powering the Future of Sports
            </span>
          </h1>
        </div>
      </section>
      <section className={styles.quip}>
        <LogoMaruqee />
      </section>

      {/* Who I Am Section */}
      <section className={styles.whoIAm} ref={whoIAmRef}>
        <div className={styles.sectionContent}>
          <div className={styles.textColumn}>
            <div className={styles.sectionHeader}>
              <motion.div
                className={styles.sectionNumber}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                01
              </motion.div>
              <motion.h2
                className={styles.sectionTitle}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Who I Am
              </motion.h2>
            </div>

            <div className={styles.typewriterContainer}>
              <motion.div
                className={styles.typewriterLabel}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Currently:
              </motion.div>
              <motion.div
                className={styles.typewriter}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <Typewriter options={TYPEWRITER_OPTIONS} />
              </motion.div>
            </div>

            <motion.div
              className={styles.mainDescription}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <p>
                I'm a{' '}
                <span className={styles.highlight}>
                  Project Manager by trade and a builder at heart
                </span>
                . I've spent the last few years leading
                <span className={styles.emphasis}>
                  {' '}
                  cross-functional teams at International Financial Group,
                  Prudential, and UnitedHealth Group
                </span>{' '}
                — managing timelines, aligning stakeholders, and making sure
                ideas actually ship.
              </p>
              <p>
                Outside the 9 to 5, I co-founded{' '}
                <span className={styles.highlight}>
                  GameGrid, a sports tech startup
                </span>{' '}
                built to power leagues across the country. What started as a way
                to simplify league management for our basketball community has
                grown into a full product used by organizers, players, and fans
                to run and follow live sports experiences. I handle everything
                from{' '}
                <span className={styles.emphasis}>
                  {' '}
                  product vision and growth strategy{' '}
                </span>
                to refining the experience for users on the ground.
              </p>
              <p>
                Whether I'm leading projects or building something from the
                ground up, I care most about{' '}
                <span className={styles.highlight}>
                  solving real problems, making things that matter, and working
                  with people who bring energy and purpose to the table
                </span>
                .
              </p>
            </motion.div>
          </div>

          <motion.div className={styles.imageColumn} style={{ y: whoIAmY }}>
            <motion.div
              className={styles.floatingImage}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <Image
                src="/dei2.JPG"
                alt="Professional presentation"
                width={400}
                height={300}
                className={styles.heroImage1}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={styles.skillsSection} ref={skillsRef}>
        <div className={styles.sectionContent}>
          <motion.div className={styles.imageColumn} style={{ y: skillsY }}>
            <div className={styles.stackedImages}>
              <motion.div
                className={styles.floatingImage}
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                style={{ y: useTransform(skillsY, [0, 1], [0, -50]) }}
              >
                <Tilt
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  perspective={1000}
                  scale={1.05}
                  transitionSpeed={1000}
                  glareEnable={true}
                  glareMaxOpacity={0.2}
                  glareColor="#ffffff"
                  glarePosition="all"
                  glareBorderRadius="12px"
                >
                  <Image
                    src="/dei1.png"
                    alt="Team collaboration"
                    width={400}
                    height={300}
                    className={styles.heroImage2}
                  />
                </Tilt>
              </motion.div>

              <motion.div
                className={`${styles.floatingImage} ${styles.stackedImage}`}
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
                style={{ y: useTransform(skillsY, [0, 1], [0, -80]) }}
              >
                <Tilt
                  tiltMaxAngleX={12}
                  tiltMaxAngleY={12}
                  perspective={800}
                  scale={1.08}
                  transitionSpeed={1200}
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  glareColor="#ffffff"
                  glarePosition="all"
                  glareBorderRadius="8px"
                >
                  <Image
                    src="/dei3.jpeg"
                    alt="Strategic planning"
                    width={350}
                    height={250}
                    className={styles.heroImage3}
                  />
                </Tilt>
              </motion.div>
            </div>
          </motion.div>

          <div className={styles.textColumn}>
            <div className={styles.sectionHeader}>
              <motion.div
                className={styles.sectionNumber}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                02
              </motion.div>
              <motion.h2
                className={styles.sectionTitle}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                How I Think &amp; What I Build
              </motion.h2>
            </div>

            <div className={styles.skillsContainer}>
              <motion.div
                className={styles.skillCategory}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div
                  className={styles.baseContent}
                  onMouseMove={handleStrategicMouseMove}
                  onMouseEnter={() => setStrategicHover(true)}
                  onMouseLeave={() => setStrategicHover(false)}
                  ref={strategicRef}
                >
                  <h3 className={styles.categoryTitle}>
                    <MdGpsFixed className={styles.categoryIcon} />
                    Gameplans That Scale
                  </h3>
                  <ul className={styles.skillList}>
                    <li>
                      <span className={styles.skillHighlight}>
                        Cross-functional delivery
                      </span>{' '}
                      across engineering, QA, and business teams
                    </li>
                    <li>
                      <span className={styles.skillHighlight}>
                        Product roadmaps
                      </span>{' '}
                      and feature prioritization
                    </li>
                    <li>
                      <span className={styles.skillHighlight}>
                        Executive portfolio reviews
                      </span>{' '}
                      and investment alignment
                    </li>
                    <li>
                      <span className={styles.skillHighlight}>
                        Stakeholder management
                      </span>{' '}
                      across partners, vendors, and leadership
                    </li>
                    <li>
                      <span className={styles.skillHighlight}>
                        Financial modeling
                      </span>{' '}
                      and forecasting
                    </li>
                  </ul>

                  <div className={styles.maskReveal}>
                    <h3 className={styles.categoryTitleRevealed}>
                      <MdGpsFixed className={styles.categoryIconRevealed} />
                      Big Picture Thinking
                    </h3>
                    <ul className={styles.skillListRevealed}>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          Delivered $100M+ programs
                        </span>{' '}
                        across 10+ fintech workstreams
                      </li>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          Led IT Portfolio Reviews
                        </span>{' '}
                        with C-Suite executives
                      </li>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          Improved on-time delivery by ~20%
                        </span>{' '}
                        across 15 partner teams
                      </li>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          Aligned 250+ stakeholders
                        </span>{' '}
                        from engineering to the executive team
                      </li>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          Supported a $3.5B+ accounts portfolio
                        </span>{' '}
                        with payers like Cigna and UnitedHealthcare
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className={styles.skillCategory}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div
                  className={styles.baseContent}
                  onMouseMove={handleTechnicalMouseMove}
                  onMouseEnter={() => setTechnicalHover(true)}
                  onMouseLeave={() => setTechnicalHover(false)}
                  ref={technicalRef}
                >
                  <h3 className={styles.categoryTitle}>
                    <MdFlashOn className={styles.categoryIcon} />
                    Building What Matters
                  </h3>
                  <ul className={styles.skillList}>
                    <li>
                      <span className={styles.skillHighlight}>
                        Data &amp; Analytics:
                      </span>{' '}
                      SQL, Python, Excel, Power BI, Tableau, Alteryx
                    </li>
                    <li>
                      <span className={styles.skillHighlight}>
                        Enterprise Systems:
                      </span>{' '}
                      SAP, Salesforce, NetSuite, Epic EHR
                    </li>
                    <li>
                      <span className={styles.skillHighlight}>
                        Development:
                      </span>{' '}
                      Java, Git, Bitbucket, Apache Maven
                    </li>
                    <li>
                      <span className={styles.skillHighlight}>
                        Project Management:
                      </span>{' '}
                      Agile (Scrum, Jira), UML
                    </li>
                    <li>
                      <span className={styles.skillHighlight}>
                        Cloud &amp; Data:
                      </span>{' '}
                      Azure, AWS, Google Cloud, Snowflake, Databricks
                    </li>
                  </ul>

                  <div className={styles.maskReveal}>
                    <h3 className={styles.categoryTitleRevealed}>
                      <MdFlashOn className={styles.categoryIconRevealed} />
                      Product in Motion
                    </h3>
                    <ul className={styles.skillListRevealed}>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          40% fewer recurring issues
                        </span>{' '}
                        through defect and workflow analysis
                      </li>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          Prioritize 7+ features per quarter
                        </span>{' '}
                        on the SPRQ roadmap
                      </li>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          Built AI trackers
                        </span>{' '}
                        cutting manual work 42% across 7 leagues
                      </li>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          Scaled CJML to 1,500+ players
                        </span>{' '}
                        in 3 seasons
                      </li>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          Raised $80,000+ a year
                        </span>{' '}
                        for charity through 25+ sponsorships
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* What I'm Doing Now Section */}
      <section className={styles.currentWork} ref={currentWorkRef}>
        <div className={styles.sectionContent}>
          <div className={styles.fullWidthHeader}>
            <div className={styles.sectionHeader}>
              <motion.div
                className={styles.sectionNumber}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                03
              </motion.div>
              <motion.h2
                className={styles.sectionTitle}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                What I'm Doing Now
              </motion.h2>
            </div>
          </div>

          <motion.div
            className={styles.projectsGrid}
            style={{ y: currentWorkY }}
          >
            <motion.div
              className={styles.projectCard}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <MdAccountBalance className={styles.projectIcon} />
              <h3 className={styles.projectTitle}>
                International Financial Group
              </h3>
              <p className={styles.projectRole}>IT Project Lead</p>
              <p className={styles.projectDescription}>
                Running a full product workstream that reports directly to the
                Chairman, and owning the{' '}
                <span className={styles.highlight}>SPRQ product roadmap</span>{' '}
                across underwriting, rating, document management, and policy
                workflows, with{' '}
                <span className={styles.emphasis}>
                  IT Portfolio Reviews for the C-Suite
                </span>
                .
              </p>
            </motion.div>

            <motion.div
              className={styles.projectCard}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <MdRocket className={styles.projectIcon} />
              <h3 className={styles.projectTitle}>GameGrid</h3>
              <p className={styles.projectRole}>Founder &amp; Product Lead</p>
              <p className={styles.projectDescription}>
                Building{' '}
                <span className={styles.highlight}>sports technology</span> for
                local leagues, working with 100+ captains, organizers, and
                partners. Built{' '}
                <span className={styles.emphasis}>AI trackers</span> that cut
                manual work by 42% across 7 partner leagues.
              </p>
            </motion.div>

            <motion.div
              className={styles.projectCard}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <MdSchool className={styles.projectIcon} />
              <h3 className={styles.projectTitle}>Johns Hopkins University</h3>
              <p className={styles.projectRole}>
                MBA, AI for Business, Finance &amp; Marketing
              </p>
              <p className={styles.projectDescription}>
                Pursuing an MBA at the{' '}
                <span className={styles.highlight}>Carey Business School</span>,
                focused on applying{' '}
                <span className={styles.emphasis}>
                  AI across business, finance, and marketing
                </span>
                . Expected June 2027.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
