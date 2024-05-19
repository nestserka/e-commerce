import { useState } from 'react';
import { Link } from 'react-router-dom';

import style from './_header.module.scss';
import Navigation from './navigation/Navigation';
import logo from '../../assets/images/ns-store-logo.svg';
import { LS_PREFIX, NAV_LINKS, ROUTES } from '../../constants/constants';
import { useLoginData } from '../../core/state/loginState';
import { api } from '../../api/Api';

import type { CustomerCredentials } from '../../core/state/types';

export default function Header(): JSX.Element {
  const { isAuth, setCustomerCredentials } = useLoginData();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const onClickButton = (): void => {
    const resetUser: CustomerCredentials = {
      customerId: '',
      isAuth: false,
      valuePassword: '',
      valueEmail: '',
    };
    setCustomerCredentials(resetUser);
    localStorage.removeItem(`isAuth-${LS_PREFIX}`);
    localStorage.removeItem(`customerId-${LS_PREFIX}`);
    api.switchClientBuilders();
    api.getAllProduct().catch(() => console.error);
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
