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
import { useRef, useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import {
  MdHealthAndSafety,
  MdRocket,
  MdSchool,
  MdGpsFixed,
  MdFlashOn,
} from 'react-icons/md';

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

  const strategicSmoothX = useSpring(strategicMouseX, {
    stiffness: 500,
    damping: 30,
  });
  const strategicSmoothY = useSpring(strategicMouseY, {
    stiffness: 500,
    damping: 30,
  });
  const technicalSmoothX = useSpring(technicalMouseX, {
    stiffness: 500,
    damping: 30,
  });
  const technicalSmoothY = useSpring(technicalMouseY, {
    stiffness: 500,
    damping: 30,
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

  const handleStrategicMouseMove = (e: React.MouseEvent) => {
    if (!strategicRef.current) return;
    const rect = strategicRef.current.getBoundingClientRect();
    strategicMouseX.set(e.clientX - rect.left);
    strategicMouseY.set(e.clientY - rect.top);
  };

  const handleTechnicalMouseMove = (e: React.MouseEvent) => {
    if (!technicalRef.current) return;
    const rect = technicalRef.current.getBoundingClientRect();
    technicalMouseX.set(e.clientX - rect.left);
    technicalMouseY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    const updateStrategicMask = () => {
      if (strategicRef.current) {
        const maskReveal = strategicRef.current.querySelector(
          `.${styles.maskReveal}`
        ) as HTMLElement;
        const x = strategicSmoothX.get();
        const y = strategicSmoothY.get();

        if (maskReveal) {
          if (strategicHover) {
            maskReveal.style.webkitMaskImage = `radial-gradient(circle 120px at ${x}px ${y}px, black 100%, transparent 100%)`;
            maskReveal.style.maskImage = `radial-gradient(circle 120px at ${x}px ${y}px, black 100%, transparent 100%)`;
          } else {
            maskReveal.style.webkitMaskImage = `radial-gradient(circle 0px at ${x}px ${y}px, black 100%, transparent 100%)`;
            maskReveal.style.maskImage = `radial-gradient(circle 0px at ${x}px ${y}px, black 100%, transparent 100%)`;
          }
        }

        // Update cursor indicator position
        if (strategicRef.current) {
          strategicRef.current.style.setProperty('--cursor-x', `${x}px`);
          strategicRef.current.style.setProperty('--cursor-y', `${y}px`);
        }
      }
    };

    const updateTechnicalMask = () => {
      if (technicalRef.current) {
        const maskReveal = technicalRef.current.querySelector(
          `.${styles.maskReveal}`
        ) as HTMLElement;
        const x = technicalSmoothX.get();
        const y = technicalSmoothY.get();

        if (maskReveal) {
          if (technicalHover) {
            maskReveal.style.webkitMaskImage = `radial-gradient(circle 120px at ${x}px ${y}px, black 100%, transparent 100%)`;
            maskReveal.style.maskImage = `radial-gradient(circle 120px at ${x}px ${y}px, black 100%, transparent 100%)`;
          } else {
            maskReveal.style.webkitMaskImage = `radial-gradient(circle 0px at ${x}px ${y}px, black 100%, transparent 100%)`;
            maskReveal.style.maskImage = `radial-gradient(circle 0px at ${x}px ${y}px, black 100%, transparent 100%)`;
          }
        }

        // Update cursor indicator position
        if (technicalRef.current) {
          technicalRef.current.style.setProperty('--cursor-x', `${x}px`);
          technicalRef.current.style.setProperty('--cursor-y', `${y}px`);
        }
      }
    };

    const unsubscribeStrategicX =
      strategicSmoothX.onChange(updateStrategicMask);
    const unsubscribeStrategicY =
      strategicSmoothY.onChange(updateStrategicMask);
    const unsubscribeTechnicalX =
      technicalSmoothX.onChange(updateTechnicalMask);
    const unsubscribeTechnicalY =
      technicalSmoothY.onChange(updateTechnicalMask);

    return () => {
      unsubscribeStrategicX();
      unsubscribeStrategicY();
      unsubscribeTechnicalX();
      unsubscribeTechnicalY();
    };
  }, [
    strategicHover,
    technicalHover,
    strategicSmoothX,
    strategicSmoothY,
    technicalSmoothX,
    technicalSmoothY,
  ]);

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Portfolio',
    description: 'A portfolio showcasing design and development work.',
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
                <Typewriter
                  options={{
                    strings: [
                      'Project Manager',
                      'Co-Founder of GameGrid',
                      'Innovation Catalyst',
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 75,
                    deleteSpeed: 50,
                  }}
                />
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
                  cross-functional teams at companies like Prudential and
                  UnitedHealth Group
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
                        Cross-functional project management
                      </span>{' '}
                      across enterprise IT portfolios
                    </li>
                    <li>
                      <span className={styles.skillHighlight}>
                        Strategic pricing optimization
                      </span>{' '}
                      and financial modeling
                    </li>
                    <li>
                      <span className={styles.skillHighlight}>
                        Process automation
                      </span>{' '}
                      and operational analytics
                    </li>
                    <li>
                      <span className={styles.skillHighlight}>
                        Team leadership
                      </span>{' '}
                      and stakeholder alignment
                    </li>
                    <li>
                      <span className={styles.skillHighlight}>
                        Business process optimization
                      </span>{' '}
                      and workflow design
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
                          Led 15+ cross-functional teams
                        </span>{' '}
                        delivering $2M+ in cost savings
                      </li>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          Optimized pricing strategies
                        </span>{' '}
                        increasing margins by 18%
                      </li>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          Automated 40+ manual processes
                        </span>{' '}
                        saving 200+ hours/month
                      </li>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          Mentored 25+ team members
                        </span>{' '}
                        with 95% retention rate
                      </li>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          Streamlined workflows
                        </span>{' '}
                        reducing cycle time by 35%
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
                        Data Analysis:
                      </span>{' '}
                      SQL, Python, Excel, Power BI, Tableau
                    </li>
                    <li>
                      <span className={styles.skillHighlight}>
                        Enterprise Systems:
                      </span>{' '}
                      SAP S/4HANA, SAP PPM, Azure DevOps
                    </li>
                    <li>
                      <span className={styles.skillHighlight}>
                        Development:
                      </span>{' '}
                      Java, Git, Jira, API Development
                    </li>
                    <li>
                      <span className={styles.skillHighlight}>
                        Project Management:
                      </span>{' '}
                      Agile methodologies, UML, Maven
                    </li>
                    <li>
                      <span className={styles.skillHighlight}>
                        Database Management:
                      </span>{' '}
                      SQL Server, ETL processes
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
                          Processed 10TB+ datasets
                        </span>{' '}
                        with 99.9% accuracy
                      </li>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          Deployed enterprise solutions
                        </span>{' '}
                        for 50,000+ users
                      </li>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          Built APIs handling 1M+ requests/day
                        </span>{' '}
                        with &lt;2s response time
                      </li>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          Managed 200+ sprint cycles
                        </span>{' '}
                        with 98% on-time delivery
                      </li>
                      <li>
                        <span className={styles.skillHighlightRevealed}>
                          Optimized databases serving 100K+ queries/hour
                        </span>{' '}
                        efficiently
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
              <MdHealthAndSafety className={styles.projectIcon} />
              <h3 className={styles.projectTitle}>Quest Diagnostics</h3>
              <p className={styles.projectRole}>
                Senior Financial Analyst, Strategic Pricing
              </p>
              <p className={styles.projectDescription}>
                Leading strategic pricing initiatives for{' '}
                <span className={styles.highlight}>
                  $3.5B+ healthcare service portfolios
                </span>
                . Managing cross-functional teams to optimize payor contract
                strategies and implement
                <span className={styles.emphasis}>
                  {' '}
                  data-driven solutions
                </span>{' '}
                that improve operational efficiency.
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
              <p className={styles.projectRole}>
                Co-Founder & Managing Director
              </p>
              <p className={styles.projectDescription}>
                Building the future of{' '}
                <span className={styles.highlight}>sports technology</span>{' '}
                through API-first stat-tracking and scheduling systems. Growing
                our platform to{' '}
                <span className={styles.emphasis}>150+ active users</span> while
                leading product development and strategic partnerships.
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
              <h3 className={styles.projectTitle}>Continuous Learning</h3>
              <p className={styles.projectRole}>
                Harvard University - Project Management & IT
              </p>
              <p className={styles.projectDescription}>
                Currently expanding my expertise through{' '}
                <span className={styles.highlight}>advanced coursework</span> in
                project management and information technology, staying at the
                forefront of{' '}
                <span className={styles.emphasis}>industry best practices</span>
                and emerging technologies.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
