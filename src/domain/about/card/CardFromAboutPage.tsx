import { Link } from 'react-router-dom';

import GitHubLogo from '../../../assets/images/card/github-icon.svg';
import RSSLogo from '../../../assets/images/card/logo-rs.svg';
import styles from './_cardFromAboutPage.module.scss';

import type { CardFromAboutPageProps } from './types';

export default function CardFromAboutPage({ propsCard }: { propsCard: CardFromAboutPageProps }): JSX.Element {
  const { key, srcImg, firstDescription, secondDescription, linkForGitHub, handleClickForCard } = propsCard;

  return (
    <div className={styles['card-block']} key={key}>
      <button type="button" className={`${key === '2' ? styles.card2 : styles.card}`} onClick={handleClickForCard}>
        <img className={styles['card-block-img']} src={srcImg} alt="card" />
        <div>
          <div className={styles['card-block-list']}>{firstDescription}</div>
          <div className={styles['card-block-list']}>{secondDescription}</div>
          <Link
            className={styles['card-block-git-hub']}
            to={linkForGitHub}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <img src={GitHubLogo} alt="git-hub" />
          </Link>
        </div>
      </button>
      {key === '2' && (
        <div className={styles.logo}>
          <img src={RSSLogo} alt="logo" />
        </div>
      )}
    </div>
  );
}
