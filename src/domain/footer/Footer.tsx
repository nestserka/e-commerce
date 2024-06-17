import { Link } from 'react-router-dom';

import style from './_footer.module.scss';
import logo from '../../assets/images/rs-logo.svg';
import gitLogo from '../../assets/images/icons/icon-git.svg';
import gmailLogo from '../../assets/images/icons/icon-gmail.svg';
import { ROUTES } from '../../constants/constants';
import nasaLogo from '../../assets/images/ns-store-logo.svg';

export default function Footer(): JSX.Element {
  return (
    <footer className={style.footer} data-testid="footer">
      <section className={style.wrapper}>
        <section className={style['logo-wrapper']}>
          <Link to={ROUTES.HOME}>
            <img src={nasaLogo} className="ns-logo" alt="NASA Store logotype" />
          </Link>
        </section>
        <section className={style['address-wrapper']}>
          <a
            className={style['footer-section']}
            href="https://maps.app.goo.gl/NvdgGvCwN9MESq549"
            target="_blank"
            rel="noreferrer"
          >
            <h4>Location</h4>
            <p className={style['address-text']}>
              Mary W. Jackson NASA Headquarters <br /> 300 E. Street SW, Suite 5R30 <br /> Washington, DC 20546
            </p>
          </a>
        </section>
        <p className={style['wrapper-text']}>
          © 2024 All materials were used for non-commercial and educational purposes <br /> only and belong to it’s
          owners.
        </p>
      </section>
      <section className={`${style.wrapper} ${style.contact}`}>
        <a
          className={style['footer-section-rss']}
          href="https://rs.school/courses/javascript-mentoring-program"
          target="_blank"
          rel="noreferrer"
        >
          <img src={logo} className="rs-logo" alt="RS School logotype" />
        </a>
        <h4 className={style['contact-title']}>Contact us</h4>
        <section className={style['contact-information']}>
          <a
            className={style['footer-section']}
            href="https://rs.school/courses/javascript-mentoring-program"
            target="_blank"
            rel="noreferrer"
          >
            <img src={gitLogo} className={style['contact-logo']} alt="Github" />
          </a>
          <a
            className={style['footer-section']}
            href="https://rs.school/courses/javascript-mentoring-program"
            target="_blank"
            rel="noreferrer"
          >
            <img src={gmailLogo} className={style['contact-logo']} alt="Gmail" />
          </a>
          <h4 className={style['address-text']}>Tasha Grischenok</h4>
        </section>
        <section className={style['contact-information']}>
          <a
            className={style['footer-section']}
            href="https://rs.school/courses/javascript-mentoring-program"
            target="_blank"
            rel="noreferrer"
          >
            <img src={gitLogo} className={style['contact-logo']} alt="Github" />
          </a>
          <a
            className={style['footer-section']}
            href="https://rs.school/courses/javascript-mentoring-program"
            target="_blank"
            rel="noreferrer"
          >
            <img src={gmailLogo} className={style['contact-logo']} alt="Gmail" />
          </a>
          <h4 className={style['address-text']}>Ania Chebysheva</h4>
        </section>
        <section className={style['contact-information']}>
          <a
            className={style['footer-section']}
            href="https://rs.school/courses/javascript-mentoring-program"
            target="_blank"
            rel="noreferrer"
          >
            <img src={gitLogo} className={style['contact-logo']} alt="Github" />
          </a>
          <a
            className={style['footer-section']}
            href="https://rs.school/courses/javascript-mentoring-program"
            target="_blank"
            rel="noreferrer"
          >
            <img src={gmailLogo} className={style['contact-logo']} alt="Gmail" />
          </a>
          <h4 className={style['address-text']}>Katsia Nestserava</h4>
        </section>
      </section>
    </footer>
  );
}
