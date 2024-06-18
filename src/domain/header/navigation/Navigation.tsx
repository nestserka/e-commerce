import { NavLink } from 'react-router-dom';

import styles from './_navigation.module.scss';
import { DYNAMIC_ROUTES, ROUTES } from '../../../constants/constants';
import icon from '../../../../public/assets/icons/astronaut-icon.jpg';

import type { NavLinkProps, NavigationProps } from './types';
import { useCartData } from '../../../core/state/cartState';
import { useEffect, useState } from 'react';

export default function Navigation({
  links,
  isStatus,
  isNavOpen,
  handleClickLogOut,
  onClick,
  customerId,
}: NavigationProps): JSX.Element {
  const { itemsInCart } = useCartData();
  const [itemsInOrder, setItemsInOrder] = useState<number | undefined>(itemsInCart?.length);

  useEffect(() => {
    if (itemsInCart) {
      setItemsInOrder(itemsInCart.reduce((acum, item) => acum + item.quantity, 0));
    }
  }, [itemsInCart]);

  return (
    <nav className={`${styles.nav} ${isNavOpen ? styles['nav-open'] : ''}`} data-testid="navigation">
      <ul className={styles['nav-list']}>
        {links
          .filter(
            (link: NavLinkProps): boolean =>
              (!isStatus || (link.route !== ROUTES.SING_IN && link.route !== ROUTES.SING_UP)) &&
              link.route !== ROUTES.PROFILE,
          )
          .map(
            (link: NavLinkProps): JSX.Element => (
              <li key={link.title}>
                <NavLink to={link.route} onClick={onClick} className={styles['nav-item']}>
                  {link.title}
                </NavLink>
              </li>
            ),
          )}
        {isStatus && (
          <li>
            <button type="button" onClick={handleClickLogOut} className={styles['nav-button']}>
              Log Out
            </button>
          </li>
        )}
      </ul>
      <ul className={styles['nav-list-user']}>
        {isStatus && customerId && (
          <NavLink to={`${DYNAMIC_ROUTES.PROFILE}${customerId}`} onClick={onClick}>
            <li className={styles['nav-item-profile']} key={customerId}>
              <div className={styles['profile-wrapper']}>
                <img src={icon} className={styles['profile-icon']} alt="" />
              </div>
              <span className={styles['profile-title']}>Profile</span>
            </li>
          </NavLink>
        )}
        <NavLink to={`${DYNAMIC_ROUTES.CART}`} onClick={onClick}>
          <li className={styles['nav-item-cart']}>
            <div className={styles['cart-wrapper']} />
            <span className={styles['cart-items']}>{itemsInOrder ? itemsInOrder : 0}</span>
            <span className={styles['cart-title']}>Cart</span>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
}
