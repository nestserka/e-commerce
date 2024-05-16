import { useState } from 'react';
import { Link } from 'react-router-dom';

import style from './_header.module.scss';
import Navigation from './navigation/Navigation';
import logo from '../../assets/images/ns-store-logo.svg';
import { NAV_LINKS, ROUTES } from '../../constants/constants';
import { useLoginData } from '../../core/state/loginState';

export default function Header(): JSX.Element {
  const { isAuth, setAuthStatus } = useLoginData();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const onClickButton = (): void => {
    setAuthStatus(false);
  };

  const toggleNav = (): void => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className={style.header} data-testid="header">
      <section className={style['logo-wrapper']}>
        <Link to={ROUTES.HOME}>
          <img src={logo} className="ns-logo" alt="NASA Store logotype" />
        </Link>
      </section>

      <Navigation
        links={NAV_LINKS}
        isStatus={isAuth}
        isNavOpen={isNavOpen}
        handleClickLogOut={onClickButton}
        onClick={toggleNav}
      />

      <section className={style['burger-wrapper']}>
        <button
          className={`${style['burger-button']} ${style.hidden}`}
          onClick={toggleNav}
          aria-label="burger"
          type="button"
        >
          <span className={style.dot} />
        </button>
      </section>
    </header>
  );
}
