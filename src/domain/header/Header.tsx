import { Link } from 'react-router-dom';

import style from './_header.module.scss';
import Navigation from './navigation/Navigation';
import logo from '../../assets/images/ns-store-logo.svg';
import { NAV_LINKS, ROUTES } from '../../constants/constants';
import { useLoginData } from '../../core/state/loginState';

export default function Header(): JSX.Element {
  const { isAuth, setAuthStatus } = useLoginData();

  const onClickButton = (): void => {
    setAuthStatus(false);
  };

  return (
    <header className={style.header} data-testid="header">
      <Link to={ROUTES.HOME}>
        <img src={logo} className="ns-logo" alt="NASA Store logotype" />
      </Link>
      <Navigation links={NAV_LINKS} isStatus={isAuth} handleClickLogOut={onClickButton} />
    </header>
  );
}
