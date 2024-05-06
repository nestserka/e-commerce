import style from './_navigation.module.scss';

export default function Navigation(): JSX.Element {
  return (
    <nav className={style.nav} data-testid="navigation">
      Navigation
    </nav>
  );
}
