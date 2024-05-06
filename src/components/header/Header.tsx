import style from './_header.module.scss';
import Navigation from '../navigation/Navigation.tsx';
import logo from '../../assets/images/ns-store-logo.svg';

export default function Header(): JSX.Element {
  return (
    <header className={style.header} data-testid="header">
      <section>
        <img src={logo} className="ns-logo" alt="NASA Store logotype" />
      </section>
      <Navigation />
    </header>
  );
}
