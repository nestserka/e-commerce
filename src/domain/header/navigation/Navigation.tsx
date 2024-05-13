import { NavLink } from 'react-router-dom';

import style from './_navigation.module.scss';
import { ROUTES } from '../../../constants/constants';

import type { NavLinkProps, NavigationProps } from './types';

export default function Navigation({ links, isStatus, handleClickLogOut }: NavigationProps): JSX.Element {
  return (
    <nav className={style.nav} data-testid="navigation">
      <ul className={style['nav-list']}>
        {links
          .filter(
            (link: NavLinkProps): boolean =>
              !isStatus || (link.route !== ROUTES.SING_IN && link.route !== ROUTES.SING_UP),
          )
          .map(
            (link: NavLinkProps): JSX.Element => (
              <li key={link.title}>
                <NavLink to={link.route} className={style['nav-item']}>
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
        <li className={style['nav-item']}>Profile</li>
        <li className={style['nav-item']}>Cart</li>
      </ul>
    </nav>
  );
}
