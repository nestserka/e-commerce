import style from './_errorMessage.module.scss';
import icon from '../../assets/images/icons/icon-warn.svg';

export default function ErrorMessage({ message }: { message: string | undefined }): JSX.Element {
  return (
    <section className={style['error-message-wrapper']} data-testid="error-message">
      <img src={icon} className={style['error-message-icon']} alt="" />
      <span className={style['error-message-text']}>{message}</span>
    </section>
  );
}
