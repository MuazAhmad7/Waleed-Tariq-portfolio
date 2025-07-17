/**
 * Metadata for the /blueprints page.
 * @type {import('next').Metadata}
 */
export const metadata = {
  title: 'Community Impact | Waleed Tariq',
  description:
    'How sports and community engagement led to the creation of GameGrid - a live stat tracking app for local basketball leagues. Made by players, for players.',
  openGraph: {
    title: 'Community Impact | Waleed Tariq',
    description:
      'How sports and community engagement led to the creation of GameGrid - a live stat tracking app for local basketball leagues. Made by players, for players.',
    images: ['https://darianrosebrook.com/darianrosebrook.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Community Impact | Waleed Tariq',
    description:
      'How sports and community engagement led to the creation of GameGrid - a live stat tracking app for local basketball leagues. Made by players, for players.',
    images: ['https://darianrosebrook.com/darianrosebrook.jpg'],
  },
};
import styles from './page.module.scss';
import { SwatchesImageTest } from '../heroes/SwatchesImageTest';
import { GameGridLogo } from './GameGridLogo';
import Link from 'next/link';

const Page: React.FC = () => {
  return (
    <>
      <section className={`${styles.communityHero}`}>
        <div className={styles.heroContent}>
          <div className={styles.mainHeading}>
            <h1 className={`${styles.communityTitle} gooey`}>
              <span className={styles.titlePrimary}>Community</span>
              <span className={styles.titleSecondary}>Through Sports</span>
            </h1>
          </div>
          
          <div className={styles.storyGrid}>
            <div className={styles.storySection}>
              <div className={styles.quote}>
                <blockquote>
                  "Sports have always been more than just a game—they're a bridge that connects communities, 
                  builds lasting friendships, and creates opportunities for growth."
                </blockquote>
              </div>
              
              <div className={styles.narrative}>
                <p className={styles.leadText}>
                  My journey in community building began with the <strong>Central Jersey Muslim League (CJML)</strong>, 
                  a local basketball league that has grown into something extraordinary.
                </p>
                
                <div className={styles.statsHighlight}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>100+</span>
                    <span className={styles.statLabel}>Players</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>12+</span>
                    <span className={styles.statLabel}>Teams</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>1</span>
                    <span className={styles.statLabel}>Community</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.storySection}>
              <div className={styles.innovationStory}>
                <h3 className={styles.sectionHeading}>The Innovation Journey</h3>
                <p>
                  Managing statistics, schedules, and player performance for such a large league 
                  presented unique challenges. Traditional methods weren't cutting it—we needed 
                  something built specifically for local leagues, by people who understood the game.
                </p>
                
                <div className={styles.gameGridHighlight}>
                  <h4 className={styles.productName}>GameGrid</h4>
                  <p className={styles.tagline}>
                    <em>"Made by players, for players"</em>
                  </p>
                  <p className={styles.productDescription}>
                    A highly integrated live stat tracking app designed specifically for local basketball leagues. 
                    GameGrid transforms how communities engage with their local sports, providing real-time 
                    statistics, player profiles, and league management tools that bring the excitement of 
                    professional sports to grassroots basketball.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.impactStatement}>
            <h3 className={styles.impactHeading}>Community Impact</h3>
            <p className={styles.impactText}>
              Through CJML and GameGrid, I've witnessed how technology can amplify community connections. 
              What started as a solution for our local league has evolved into a platform that could 
              transform how communities across the country engage with local sports.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.hero} ${styles.tokens}`}>
        <div className={styles.heroImage}>
          <div className="backdropContainer">
            <SwatchesImageTest />
          </div>
        </div>

      </section>

      <section className={`${styles.hero}`}>
        <div className={styles.heroImage}>
          <div className="backdropContainer">
            <GameGridLogo />
          </div>
        </div>
        <div className={`${styles.headingHero} ${styles.leftAligned}`}>
          <h2 className="gooey">
            <span>GameGrid</span>
            <br />
            <span>
              <Link
                href="https://gamegridtech.com"
                className={styles.heroLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Check out the app →
              </Link>
            </span>
          </h2>
        </div>
      </section>
    </>
  );
};

export default Page;
