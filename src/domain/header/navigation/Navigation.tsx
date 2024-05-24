import { NavLink } from 'react-router-dom';

import style from './_navigation.module.scss';
import { ROUTES } from '../../../constants/constants';
import icon from '../../../../public/assets/icons/astronaut-icon.jpg';

import type { NavLinkProps, NavigationProps } from './types';

export default function Navigation({
  links,
  isStatus,
  isNavOpen,
  handleClickLogOut,
  onClick,
  customerId,
}: NavigationProps): JSX.Element {
  return (
    <nav className={`${style.nav} ${isNavOpen ? style['nav-open'] : ''}`} data-testid="navigation">
      <ul className={style['nav-list']}>
        {links
          .filter(
            (link: NavLinkProps): boolean =>
              (!isStatus || (link.route !== ROUTES.SING_IN && link.route !== ROUTES.SING_UP)) &&
              link.route !== ROUTES.PROFILE,
          )
          .map(
            (link: NavLinkProps): JSX.Element => (
              <li key={link.title}>
                <NavLink to={link.route} onClick={onClick} className={style['nav-item']}>
                  {link.title}
                </NavLink>
              </li>
            ),
          )}
        {isStatus && (
          <li>
            <button type="button" onClick={handleClickLogOut} className={style['nav-button']}>
              Log Out
            </button>
          </li>
        )}
      </ul>
      <ul className={style['nav-list-user']}>
        {isStatus && (
          <NavLink to={`${ROUTES.PROFILE.replace(':customerId', customerId)}`} onClick={onClick}>
            <li className={style['nav-item-profile']} key={customerId}>
              <div className={style['profile-wrapper']}>
                <img src={icon} className={style['profile-icon']} alt="" />
              </div>
              <span className={style['profile-title']}>Profile</span>
            </li>
          </NavLink>
        )}
        <li className={style['nav-item-cart']}>
          <div className={style['cart-wrapper']} />
          <span className={style['cart-title']}>Cart</span>
        </li>
      </ul>
    </nav>
  );
}
