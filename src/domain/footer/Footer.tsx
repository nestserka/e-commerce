import { Link } from 'react-router-dom';

import style from './_footer.module.scss';
import logo from '../../assets/images/rs-logo.svg';
import { FOOTER_NAV_LINKS, ROUTES } from '../../constants/constants';
import nasaLogo from '../../assets/images/ns-store-logo.svg';
import FooterNavigation from './navigation/FooterNavigation';

export default function Footer(): JSX.Element {
  return (
    <footer className={style.footer} data-testid="footer">
      <section className={style.wrapper}>
      <section className={style['logo-wrapper']}>
        <Link to={ROUTES.HOME}>
          <img src={nasaLogo} className="ns-logo" alt="NASA Store logotype" />
        </Link>
      </section>
      <section className={style['navigation-wrapper']}>
        <FooterNavigation links={FOOTER_NAV_LINKS} />
      </section>
      </section>
      <section className={style.wrapper}>
        <p className={style['wrapper-text']}>
          © 2024 All materials were used for non-commercial and educational purposes   <br /> only and belong to it’s owners.
        </p>
        <a
          className={style['footer-section']}
          href="https://rs.school/courses/javascript-mentoring-program"
          target="_blank"
          rel="noreferrer"
        >
          <img src={logo} className="rs-logo" alt="RS School logotype" />
        </a>
      </section>
    </footer>
  );
}
