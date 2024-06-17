import styles from './_about.module.scss';
import FotoSecondCard from '../../assets/images/card/Katerina.png';
import FotoThereCard from '../../assets/images/card/Anna.png';
import FotoFirstCard from '../../assets/images/card/Tasha.png';
import CardFromAboutPage from '../../domain/about/card/CardFromAboutPage';

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
      </div>
      <div className="view">
        <div className="plane main">
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
        </div>
      </div>
    </section>
  );
}
