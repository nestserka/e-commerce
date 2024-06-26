import style from './_formTitle.module.scss';
import icon from '../../assets/images/icons/icon-login.svg';

import type { FormTitleProps } from './types';

export default function FormTitle({ title, isIcon = true }: FormTitleProps): JSX.Element {
  return (
    <section className={style['form-title-wrapper']} data-testid="form-title">
      {isIcon && <img src={icon} className={style['form-icon']} alt="icon" />}
      <h1 className={style['form-title']}>{title}</h1>
    </section>
  );
}
