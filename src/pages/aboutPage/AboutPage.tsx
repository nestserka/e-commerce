import style from './_about.module.scss';

export default function AboutPage(): JSX.Element {
  return (
    <section className={style.about} data-testid="about">
      About
    </section>
  );
}
