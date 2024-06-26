import { Link } from 'react-router-dom';
import { useState } from 'react';

import styles from './_about.module.scss';
import FotoSecondCard from '../../assets/images/card/Katsyarina.png';
import FotoThereCard from '../../assets/images/card/ania.png';
import FotoFirstCard from '../../assets/images/card/Tasha.png';
import CardFromAboutPage from '../../domain/about/card/CardFromAboutPage';
import Logo from '../../assets/images/rs-logo.svg';
import AstronautLogo3 from '../../assets/images/icons/astronaut-1.svg';
import AstronautLogo1 from '../../assets/images/icons/astronaut-2.svg';
import AstronautLogo2 from '../../assets/images/icons/astronaut-3.svg';
import DescriptionBlock from '../../domain/about/descriptionBlock/DescriptionBlock';
import { useToggleModal } from '../../utils/useToggleModal';
import ModalFromAboutPage from '../../domain/about/modalAbout/ModalAbout';

import type { CardFromAboutPageProps, DescriptionData } from '../../domain/about/card/types';

export default function AboutPage(): JSX.Element {
  const descriptionData: DescriptionData[] = [
    {
      title: 'Natalia Grischenok',
      bio: 'In 2022, Natalia embarked on her programming journey fueled by enthusiasm and an insatiable thirst for knowledge. She was captivated by frontend development, recognizing its potential to create stunning and functional web interfaces. Despite facing formidable challenges, Natalia unwavering determination propelled her forward. Balancing full-time work with relentless studies, her dedication and growing expertise earned her the pivotal role of team lead in the project. Here, amidst her demanding schedule, she continues to inspire and lead the team with her fervent passion for crafting impactful digital experiences.',
      contribution: 'Catalog page, About us page, Project routing and configuration, Team Leader',
    },
    {
      title: 'Katsiaryna Nestserava',
      bio: 'Katsiaryna was born in Belarus but currently works as a backend developer in Seoul. Always passionate about learning new things, she decided to expand her skill set and transition to a full-stack developer. To achieve this, she enrolled as a student at RS School, where she is honing her skills in both backend and frontend development. Katsiaryna has a unique hobby: she collects vintage books from around the world, each one telling its own story of a different place and time. Her dream is to move to Canada and live in a small house surrounded by bears and dee',
      contribution: 'Profile page, Registration page, Home page, Backend customization',
    },
    {
      title: 'Ania Chebysheva',
      bio: 'Anna is a UX/UI designer with a passion for frontend development. To broaden her web knowledge and deepen her skills, she enrolled in the RS School JS/Frontend course in the summer of 2023 and successfully completed it. Looking ahead, she aims to integrate web development and coding in JS/TS into her professional career, as she finds it fascinating and believes it holds a touch of magic.',
      contribution: 'Product page, Cart page, Login page, Project design',
    },
  ];
  const [description, setDescription] = useState<JSX.Element>(
    <DescriptionBlock propsDescriptionBlock={descriptionData[0]} />,
  );
  const [isModal, openIsModal, closeIsModal] = useToggleModal();

  const handleClickFirstCard = (): void => {
    openIsModal();
    setDescription(<DescriptionBlock propsDescriptionBlock={descriptionData[0]} />);
  };

  const handleClickSecondCard = (): void => {
    openIsModal();
    setDescription(<DescriptionBlock propsDescriptionBlock={descriptionData[1]} />);
  };

  const handleClickThreeCard = (): void => {
    openIsModal();
    setDescription(<DescriptionBlock propsDescriptionBlock={descriptionData[2]} />);
  };

  const dataDevelop: CardFromAboutPageProps[] = [
    {
      key: '1',
      srcImg: FotoFirstCard,
      firstDescription: '/ team lead',
      secondDescription: '/ frontend',
      linkForGitHub: 'https://github.com/CRAFTSW0MAN',
      handleClickForCard: handleClickFirstCard,
    },
    {
      key: '2',
      srcImg: FotoSecondCard,
      firstDescription: '/ backend',
      secondDescription: '/ frontend',
      linkForGitHub: 'https://github.com/nestserka/',
      handleClickForCard: handleClickSecondCard,
    },
    {
      key: '3',
      srcImg: FotoThereCard,
      firstDescription: '/ frontend',
      secondDescription: '/ design',
      linkForGitHub: 'https://github.com/marblehands',
      handleClickForCard: handleClickThreeCard,
    },
  ];

  return (
    <section className={styles.about} data-testid="about">
      <h1 className={styles.title}>
        <div className={styles['title-line']}>
          <span className={styles['title-line-span']}>MEET</span>
          OUR <br />
          DREAM TEAM
        </div>
      </h1>
      <div className={styles['circle-block']}>
        <div className={styles.dot}>
          <span className={styles['dot-label']}>Natalia Grischenok</span>
        </div>
        <div className={styles.dot}>
          <span className={styles['dot-label']}>Katsiaryna Nestserava</span>
        </div>
        <div className={styles.dot}>
          <span className={styles['dot-label']}>Ania Chebysheva</span>
        </div>
        <div className={styles['card-blocks']}>
          {dataDevelop.map((dataCard) => (
            <CardFromAboutPage propsCard={dataCard} key={dataCard.key} />
          ))}
        </div>
        <button type="button" onClick={handleClickFirstCard} className={styles.planet1}>
          <img src={AstronautLogo1} alt="AstronautLogo1" />
        </button>
        <button type="button" className={styles.planet2} onClick={handleClickSecondCard}>
          <img src={AstronautLogo2} alt="AstronautLogo2" />
        </button>
        <button type="button" className={styles.planet3} onClick={handleClickThreeCard}>
          <img src={AstronautLogo3} alt="AstronautLogo3" />
        </button>
      </div>

      <div className={styles['desc-training-platform-block']}>
        <h3 className={styles.title2}>
          <div className={styles['title-line']}>
            <span className={styles['title-line-span']}>OUR TEAM BOOLEAN BABES</span>
          </div>
          <span className={styles['horizontal-line']} />
        </h3>
        <div className={styles['paragraph-block']}>
          <div className={styles.paragraph}>
            <h4 className={styles['paragraph-title']}>DREAM TEAM</h4>
            <div className={styles['paragraph-desc']}>
              We are the Boolean Babes team that designed the e-commerce store for the NASA. We learned, enjoyed, coped
              with difficulties and overcame them together, creating not just a website, but a whole spaceship, carrying
              on its boards dreams and technologies of the future.
            </div>
          </div>
          <div className={styles.paragraph}>
            <h4 className={styles['paragraph-title']}>LEARNING PLATFORM</h4>
            <div className={styles['paragraph-desc']}>
              This project is the final assignment of the learning platform RS School that prepares a highly qualified
              Frontend Developers. We would like to express our endless gratitude to our best ever mentors who helped
              and motivated us on this long challenging but unbelievable and fascinating journey 💙
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
      {isModal && <ModalFromAboutPage isOpen={closeIsModal}>{description}</ModalFromAboutPage>}
    </section>
  );
}
