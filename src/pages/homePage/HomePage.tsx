import style from './_home.module.scss';

export default function HomePage(): JSX.Element {
  return (
    <section className={style.home} data-testid="home">
      Home Page
    </section>
  );
}
