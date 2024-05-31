import { useState } from 'react';
import { Link } from 'react-router-dom';

import style from './_header.module.scss';
import Navigation from './navigation/Navigation';
import logo from '../../assets/images/ns-store-logo.svg';
import { LS_PREFIX, NAV_LINKS, ROUTES } from '../../constants/constants';
import { useCustomerInfo, useLoginData } from '../../core/state/userState';
import { tokenCache } from '../../api/token/NasaTokenCache';
import getAllProducts from '../../api/products/getAllProducts';

import type { CustomerCredentials } from '../../core/state/types';

export default function Header(): JSX.Element {
  const { isAuth, customerId, setCustomerCredentials } = useLoginData();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const onClickButton = async (): Promise<void> => {
    const resetUser: CustomerCredentials = {
      customerId: '',
      isAuth: false,
      valuePassword: '',
      valueEmail: '',
    };
    setCustomerCredentials(resetUser);
    useCustomerInfo.getState().reset();
    localStorage.removeItem(`isAuth-${LS_PREFIX}`);
    localStorage.removeItem(`customerId-${LS_PREFIX}`);
    tokenCache.clear();

    await getAllProducts().catch((error) => {
      console.error('Error fetching products:', error);
    });
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
