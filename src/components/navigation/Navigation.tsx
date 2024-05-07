import style from './_navigation.module.scss';
import { type NavLink } from './types.tsx';

export default function Navigation({ links }: { links: NavLink[] }): JSX.Element {
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
