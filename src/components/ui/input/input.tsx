import { useId } from 'react';

import styles from './_input.module.scss';

import type { InputProps } from './types';

export default function Input({ inputProps, label, isDisabled = false }: InputProps): JSX.Element {
  const id = useId();
  const inputId = inputProps.id ?? id;
  const key = id;

  return (
    <section className={styles['input-wrapper']}>
      <label htmlFor={inputId} className={styles.label}>
        {label} <span className={styles.required}>*</span>
      </label>
      <section className={styles['input-icon-wrapper']}>
        <input {...inputProps} className={styles.input} disabled={isDisabled} key={key} />
      </section>
    </section>
  );
}
