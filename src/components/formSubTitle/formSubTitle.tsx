import style from './_formSubTitle.module.scss';

export default function FormSubTitle({ subTitle }: { subTitle: string }): JSX.Element {
  return (
    <section className={style['form-subtitle-wrapper']}>
      <h2 className={style['form-subtitle']}>{subTitle}</h2>
      <span className={style['form-horizontal-line']} />
    </section>
  );
}
