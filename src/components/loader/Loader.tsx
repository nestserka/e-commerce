import style from './_loader.module.scss';

export default function Loader(): JSX.Element {
  return (
    <section className={style.wrapper} data-testid="loader">
      <h1>
        <span className="let let1">N</span>
        <span className="let let2">A</span>
        <span className="let let3">S</span>
        <span className="let let4">A</span>
      </h1>
    </section>
  );
}
