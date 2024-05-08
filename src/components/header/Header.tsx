import style from './_header.module.scss';
import Navigation from '../navigation/Navigation';
import logo from '../../assets/images/ns-store-logo.svg';

import type { HeaderProps } from '../../types/interfaces';

export default function Header({ links, children }: HeaderProps): JSX.Element {
  return (
    <header className={style.header} data-testid="header">
      <section>
        <img src={logo} className="ns-logo" alt="NASA Store logotype" />
      </section>
      <Navigation links={links} />
      <section className={style['icon-placeholder']}>
        <span className={style.dot}>pop</span>
      </section>
      {children}
    </header>
  );
}
