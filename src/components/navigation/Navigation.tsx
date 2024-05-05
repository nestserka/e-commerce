import style from './_navigation.module.scss';

export default function Navigation(): JSX.Element {
  return (
    <nav className={style.nav} data-testid="navigation">
      <ul className={style.navlist}>
        <li>Home</li>
        <li>Sign In</li>
        <li>Sign Up</li>
        <li>Catalog</li>
        <li>About</li>
      </ul>
    </nav>
  );
}
