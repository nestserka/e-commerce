import { Link } from 'react-router-dom';

import styles from './_about.module.scss';
import FotoSecondCard from '../../assets/images/card/Katerina.png';
import FotoThereCard from '../../assets/images/card/Anna.png';
import FotoFirstCard from '../../assets/images/card/Tasha.png';
import CardFromAboutPage from '../../domain/about/card/CardFromAboutPage';
import Logo from '../../assets/images/rs-logo.svg';
import AstronautLogo3 from '../../assets/images/icons/astronaut.png';
import AstronautLogo1 from '../../assets/images/icons/astronaut2.png';
import AstronautLogo2 from '../../assets/images/icons/astronaut3.png';

import type { CardFromAboutPageProps } from '../../domain/about/card/types';

export default function AboutPage(): JSX.Element {
  const dataDevelop: CardFromAboutPageProps[] = [
    {
      key: '1',
      srcImg: FotoFirstCard,
      firstDescription: '/ team lead',
      secondDescription: '/ frontend',
      linkForGitHub: 'https://github.com/CRAFTSW0MAN',
    },
    {
      key: '2',
      srcImg: FotoSecondCard,
      firstDescription: '/ backend',
      secondDescription: '/ frontend',
      linkForGitHub: 'https://github.com/nestserka/',
    },
    {
      key: '3',
      srcImg: FotoThereCard,
      firstDescription: '/ design',
      secondDescription: '/ frontend',
      linkForGitHub: 'https://github.com/marblehands',
    },
  ];

  return (
    <section className={styles.about} data-testid="about">
      <h1 className={styles.title}>
        <div className={styles['title-line']}>
          <span className={styles['title-line-span']}>MEET</span>OUR
        </div>
        <div className={styles['title-line']}>DREAM TEAM</div>
      </h1>
      <div className={styles['circle-block']}>
        <div className={styles.dot}>
          <span className={styles['dot-label']}>Katsiaryna Nestserava</span>
        </div>
        <div className={styles.dot}>
          <span className={styles['dot-label']}>Ania Chebysheva</span>
        </div>
        <div className={styles.dot}>
          <span className={styles['dot-label']}>Natalia Grischenok</span>
        </div>
        <div className={styles['card-blocks']}>
          {dataDevelop.map((dataCard) => (
            <CardFromAboutPage propsCard={dataCard} />
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            console.log('pop');
          }}
          className={styles.planet1}
        >
          <img src={AstronautLogo1} alt="AstronautLogo1" />
        </button>
        <button
          type="button"
          className={styles.planet2}
          onClick={() => {
            console.log('pop');
          }}
        >
          <img src={AstronautLogo2} alt="AstronautLogo2" />
        </button>
        <button
          type="button"
          className={styles.planet3}
          onClick={() => {
            console.log('pop');
          }}
        >
          <img src={AstronautLogo3} alt="AstronautLogo3" />
        </button>
      </div>

      <div className={styles['desc-training-platform-block']}>
        <h3 className={styles.title2}>
          <div className={styles['title-line']}>
            OUR TEAM <span className={styles['title-line-span']}>BOOLEAN BABES</span>
          </div>
          <span className={styles['horizontal-line']} />
        </h3>
        <div className={styles['paragraph-block']}>
          <div className={styles.paragraph}>
            <h4 className={styles['paragraph-title']}>DREAM TEAM</h4>
            <div className={styles['paragraph-desc']}>
              We are the POP team that designed the store for WE. We learned, enjoyed, coped with difficulties and
              overcame them together, creating not just a website, but a whole spaceship, carrying on its boards dreams
              and technologies of the future.
            </div>
          </div>
          <div className={styles.paragraph}>
            <h4 className={styles['paragraph-title']}>LEARNING PLATFORM</h4>
            <div className={styles['paragraph-desc']}>
              This project is the final assignment of a learning platform RS-School, that prepares a highly qualified
              Frontend of Developers.
            </div>
            <Link
              className={styles['paragraph-link']}
              to="https://rs.school"
              target="_blank"
              rel="noreferrer"
              aria-label="RSS"
            >
              <img src={Logo} className="rs-logo" alt="RS School logotype" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
