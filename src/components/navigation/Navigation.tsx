import style from './_navigation.module.scss';

export default function Navigation(): JSX.Element {
  return (
    <nav className={style.nav} data-testid="navigation">
      <ul className={style['nav-list']}>
        <li className={style['nav-item']}>Home</li>
        <li className={style['nav-item']}>Sign In</li>
        <li className={style['nav-item']}>Sign Up</li>
        <li className={style['nav-item']}>Catalog</li>
        <li className={style['nav-item']}>About</li>
      </ul>
    </nav>
  );
}
