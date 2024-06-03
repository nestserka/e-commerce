import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import style from './_header.module.scss';
import Navigation from './navigation/Navigation';
import logo from '../../assets/images/ns-store-logo.svg';
import { NAV_LINKS, ROUTES } from '../../constants/constants';
import { useLoginData } from '../../core/state/userState';
import { logOut } from '../../utils/logOut';

export default function Header(): JSX.Element {
  const { isAuth, customerId } = useLoginData();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const onClickButton = (): void => {
    logOut();
    navigate(ROUTES.HOME);
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
        customerId={customerId}
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
