import { Link } from 'react-router-dom';

import styles from './_homeNavItem.module.scss';

export default function HomeNavItem({
  title,
  index,
  icon,
  route,
  linkLabel,
}: {
  title: string;
  index: number;
  icon: string;
  linkLabel: string;
  route: string;
}): JSX.Element {
  return (
    <Link to={route} className={styles['nav-item-link']}>
      <section className={styles['nav-item-wrapper']} data-testid="nav-item-component">
        <div className={styles['text-wrapper']}>
          <p className={styles['index-text']}>/0{index}</p>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles['link-wrapper']}>
          <span className={styles.link}>{linkLabel}</span>
          <img src={icon} className={styles['nav-item-icon']} alt="" />
        </div>
      </section>
    </Link>
  );
}
