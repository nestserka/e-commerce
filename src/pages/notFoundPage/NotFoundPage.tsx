import { NavLink } from 'react-router-dom';

import styles from './_not-found-page.module.scss';
import icon from '../../assets/images/icons/icon-404.svg';
import { ROUTES } from '../../constants/constants';

export default function NotFoundPage(): JSX.Element {
  return (
    <main className={styles['not-found']} data-testid="not-found-page">
      <section className={styles['content-wrapper']}>
        <section className={styles['title-wrapper']}>
          <img src={icon} alt="" className={styles.icon} />
          <h1 className={styles.title}>
            Oops...
            <br />
            Page not found
          </h1>
        </section>
        <p>
          Looks like you&apos;ve been sucked into a cosmic 404 black hole! While we rescue you, why not check out our
          stellar NASA merch?
        </p>
        <NavLink to={ROUTES.HOME} className="button-primary button-primary-s">
          Go Home
        </NavLink>
      </section>
    </main>
  );
}
