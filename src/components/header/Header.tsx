import style from './_header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={style.header} data-testid="header">
      header
    </header>
  );
}
