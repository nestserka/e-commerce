import { Link } from 'react-router-dom';

import style from './_footerNavigation.module.scss';

import type { NavLinkProps } from '../../header/navigation/types';

interface NavigationProps {
  links: NavLinkProps[];
}

export default function FooterNavigation({ links }: NavigationProps): JSX.Element {
  return (
    <nav className={style.nav} data-testid="footer-navigation">
      <ul className={style['nav-list']}>
        {links.map(
          (link: NavLinkProps): JSX.Element => (
            <li key={link.title}>
              <Link to={link.route} className={style['footer-nav-item']}>
                {link.title}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
