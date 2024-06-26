import { Link, useNavigate } from 'react-router-dom';

import styles from './_header.module.scss';
import Navigation from './navigation/Navigation';
import logo from '../../assets/images/ns-store-logo.svg';
import { NAV_LINKS, ROUTES } from '../../constants/constants';
import { useLoginData } from '../../core/state/userState';
import { logOut } from '../../utils/logOut';
import { useCatalogCheckAttributeState, useCatalogData } from '../../core/state/catalogState';
import { useToggleModal } from '../../utils/useToggleModal';

export default function Header(): JSX.Element {
  const { isAuth, customerId } = useLoginData();
  const [isNavOpen, setIsNavOpen, setIsNavClose] = useToggleModal();
  const { resetAttributes, resetSort } = useCatalogData();
  const { resetAttributesList, resetCheckedStatesAttributesList } = useCatalogCheckAttributeState();
  const navigate = useNavigate();

  const defaultValues = (): void => {
    resetAttributes();
    resetSort();
    resetAttributesList();
    resetCheckedStatesAttributesList();
  };

  const onClickButton = (): void => {
    logOut();

    if (isNavOpen) {
      defaultValues();
      setIsNavClose();
    }

    navigate(ROUTES.HOME);
  };

  const toggleNavTrue = (): void => {
    if (isNavOpen) {
      defaultValues();
      setIsNavClose();
    } else {
      defaultValues();
      setIsNavOpen();
    }
  };
  const toggleNavFalse = (): void => {
    defaultValues();
    setIsNavClose();
  };

  return (
    <header className={styles.header} data-testid="header">
      <section className={styles['logo-wrapper']}>
        <Link to={ROUTES.HOME} onClick={defaultValues}>
          <img src={logo} className="ns-logo" alt="NASA Store logotype" />
        </Link>
      </section>

      <Navigation
        links={NAV_LINKS}
        isStatus={isAuth}
        isNavOpen={isNavOpen}
        handleClickLogOut={onClickButton}
        onClick={toggleNavFalse}
        customerId={customerId}
      />

      <section className={styles['burger-wrapper']}>
        <button
          className={`${styles['burger-button']} ${styles.hidden}`}
          onClick={toggleNavTrue}
          aria-label="burger"
          type="button"
        >
          <span className={styles.dot} />
        </button>
      </section>
    </header>
  );
}
