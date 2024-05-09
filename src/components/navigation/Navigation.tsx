import { NavLink } from 'react-router-dom';

import style from './_navigation.module.scss';
import { type NavLinkProps } from './types';

export default function Navigation({ links }: { links: NavLinkProps[] }): JSX.Element {
  return (
    <nav className={style.nav} data-testid="navigation">
      <ul className={style['nav-list']}>
        {links.map(({ title, route }) => (
          <NavLink to={route} className={style['nav-item']}>
            {title}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}
