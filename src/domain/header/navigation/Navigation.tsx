import { NavLink } from 'react-router-dom';

import style from './_navigation.module.scss';
import { ROUTES } from '../../../constants/constants';

import type { NavLinkProps, NavigationProps } from './types';

export default function Navigation({
  links,
  isStatus,
  isNavOpen,
  handleClickLogOut,
  onClick,
}: NavigationProps): JSX.Element {
  return (
    <nav className={`${style.nav} ${isNavOpen ? style['nav-open'] : ''}`} data-testid="navigation">
      <ul className={style['nav-list']}>
        {links
          .filter(
            (link: NavLinkProps): boolean =>
              !isStatus || (link.route !== ROUTES.SING_IN && link.route !== ROUTES.SING_UP),
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
      {/* TODO:  to realize at the 3rd sprint */}
      {/* <ul className={style['nav-list-user']}>
        <li className={style['nav-item']}>Profile</li>
        <li className={style['nav-item']}>Cart</li>
      </ul> */}
    </nav>
  );
}
