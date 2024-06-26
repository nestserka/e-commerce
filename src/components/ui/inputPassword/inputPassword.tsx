import { useId, useState } from 'react';

import stylesInput from '../input/_input.module.scss';
import iconVisible from '../../../assets/images/icons/icon-visible.svg';
import iconInvisible from '../../../assets/images/icons/icon-invisible.svg';

import type { InputPropsPassword } from './types';

export default function InputPassword({ inputProps, label }: InputPropsPassword): JSX.Element {
  const id = useId();
  const inputId = inputProps.id ?? id;
  const [show, setShow] = useState(false);

  const handleShow = (): void => {
    setShow(!show);
  };

  return (
    <section className={stylesInput['input-wrapper']}>
      <label htmlFor={inputId} className={stylesInput.label}>
        {label} <span className={stylesInput.required}>*</span>
      </label>
      <section className={stylesInput['input-icon-wrapper']}>
        <input {...inputProps} className={stylesInput.input} type={show ? 'text' : 'password'} />

        <button type="button" aria-label="Show password" onClick={handleShow} className={stylesInput['btn-eye-icon']}>
          {show ? (
            <img src={iconVisible} className={stylesInput['eye-icon']} alt="" />
          ) : (
            <img src={iconInvisible} className={stylesInput['eye-icon']} alt="" />
          )}
        </button>
      </section>
    </section>
  );
}
