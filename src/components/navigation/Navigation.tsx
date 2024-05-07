import style from './_navigation.module.scss';

import type { NavigationLink } from './types';

export default function Navigation({ links }: { links: NavigationLink[] }): JSX.Element {
  return (
    <nav className={style.nav} data-testid="navigation">
      <ul className={style['nav-list']}>
        {links.map(({ linkTitle }) => (
          <li key={linkTitle} className={style['nav-item']}>
            {linkTitle}
          </li>
        ))}
      </ul>
    </nav>
  );
}
