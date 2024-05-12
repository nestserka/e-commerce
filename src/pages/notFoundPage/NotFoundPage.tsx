import style from './_not-found-page.module.scss';

export default function NotFoundPage(): JSX.Element {
  return (
    <section className={style['not-found']} data-testid="not-found-page">
      NotFoundPage
    </section>
  );
}
