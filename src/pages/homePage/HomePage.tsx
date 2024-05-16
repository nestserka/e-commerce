import { NavLink } from 'react-router-dom';

import style from './_home.module.scss';
import { ROUTES } from '../../constants/constants';

export default function HomePage(): JSX.Element {
  return (
    <section className={style.home} data-testid="home">
      <div className={style['links-wrapper']}>
        <div className={style.left}>
          <span>/01</span>
          <h2 className={style.title}>Create an Account</h2>
          <div className={style.circle} />
          <NavLink to={ROUTES.SING_UP} className={style['button-secondary']}>
            Sign Up
          </NavLink>
        </div>
        <div className={style.center}>
          <span>/02</span>
          <h2 className={style.title}>Enter Your Profile</h2>
          <div className={style.circle} />
          <NavLink to={ROUTES.SING_IN} className={style['button-secondary']}>
            Sign In
          </NavLink>
        </div>
        <div className={style.right}>
          <span>/03</span>
          <h2 className={style.title}>Who We Are</h2>
          <div className={style.circle} />
          <NavLink to={ROUTES.ABOUT} className={style['button-secondary']}>
            About Us
          </NavLink>
        </div>
      </div>
    </section>
  );
}
