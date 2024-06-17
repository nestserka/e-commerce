import { Link } from 'react-router-dom';

import style from './_footer.module.scss';
import logo from '../../assets/images/rs-logo.svg';
import instagramIcon from '../../assets/images/icons/icon-instagram.svg';
import facebookIcon from '../../assets/images/icons/icon-facebook.svg';
import { DYNAMIC_ROUTES, ROUTES } from '../../constants/constants';
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
        <section className={style['footer-navigation']}>
          <h4>
            The National Aeronautics and Space Administration <br /> Official merch online store
          </h4>
        </section>
      </section>
      <span className={style['footer-horizontal-line']} />
      <section className={style.wrapper}>
        <section className={style['logo-wrapper']}>
          <a
            className={style['footer-section']}
            href="https://maps.app.goo.gl/NvdgGvCwN9MESq549"
            target="_blank"
            rel="noreferrer"
          >
            <h5 className={style['footer-title']}>Location</h5>
            <p className={style['address-text']}>
              300 E. Street SW, Suite 5R30 <br /> Washington, DC 20546
            </p>
          </a>
        </section>
        <section className={style['footer-navigation']}>
          <section className={style.links}>
            <h5 className={style['footer-title']}>Main Links</h5>
            <div className={style.navigation}>
              <Link to={ROUTES.HOME} className={style['footer-link']}>
                Home
              </Link>
            </div>
            <div className={style.navigation}>
              <Link to={ROUTES.CATALOG_ALL} className={style['footer-link']}>
                Catalog
              </Link>
            </div>
            <div className={style.navigation}>
              <Link to={ROUTES.ABOUT} className={style['footer-link']}>
                About us
              </Link>
            </div>
          </section>
          <section className={style.links}>
            <h5 className={style['footer-title']}>popular categories</h5>
            <div className={style.navigation}>
              <Link to={`${DYNAMIC_ROUTES.CATALOG}space-food`} className={style['footer-link']}>
                space food
              </Link>

              <Link to={`${DYNAMIC_ROUTES.CATALOG}astronomical-equipment`} className={style['footer-link']}>
                EQUIPMENT
              </Link>
            </div>
            <div className={style.navigation}>
              <Link to={`${DYNAMIC_ROUTES.CATALOG}meteorite`} className={style['footer-link']}>
                meteorites
              </Link>

              <Link to={`${DYNAMIC_ROUTES.CATALOG}space-memorabilia`} className={style['footer-link']}>
                MEMORABILIA
              </Link>
            </div>
            <div className={style.navigation}>
              <Link to={`${DYNAMIC_ROUTES.CATALOG}space-suits`} className={style['footer-link']}>
                Space suits
              </Link>

              <Link to={`${DYNAMIC_ROUTES.CATALOG}space-photos-and-wall-art`} className={style['footer-link']}>
                wall art
              </Link>
            </div>
          </section>
          <section className={style.links}>
            <h5 className={style['footer-title']}>follow us</h5>
            <div className={style['social-media-links']}>
              <a href="https://www.instagram.com/nasa/" target="_blank" rel="noreferrer">
                <img src={instagramIcon} alt="Instagram" />
              </a>
              <a href="https://www.facebook.com/NASA/" target="_blank" rel="noreferrer">
                <img src={facebookIcon} alt="Facebook" />
              </a>
            </div>
          </section>
        </section>
      </section>
      <span className={style['footer-horizontal-line']} />
      <section className={style.wrapper}>
        <p className={style['wrapper-text']}>
          © 2024 All materials were used for non-commercial and educational purposes <br /> only and belong to it’s
          owners.
        </p>
        <a
          className={style['footer-section-rss']}
          href="https://rs.school/courses/javascript-mentoring-program"
          target="_blank"
          rel="noreferrer"
        >
          <img src={logo} className={style['rs-logo']} alt="RS School logotype" />
        </a>
      </section>
    </footer>
  );
}
