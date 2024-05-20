import style from './_formTitle.module.scss';
import icon from '../../assets/images/icons/icon-login.svg';

export default function FormTitle({ title }: { title: string }): JSX.Element {
  return (
    <section className={style['form-title-wrapper']} data-testid="form-title">
      <img src={icon} className={style['form-icon']} alt="" />
      <h1 className={style['form-title']}>{title}</h1>
    </section>
  );
}
