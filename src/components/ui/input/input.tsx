import { type InputHTMLAttributes, useId } from 'react';

import styles from './_input.module.scss';

interface InputProps {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  disabled?: boolean;
}

export default function Input({ inputProps, label, disabled }: InputProps): JSX.Element {
  const id = useId();
  const inputId = inputProps.id ?? id;

  return (
    <section className={styles['input-wrapper']}>
      <label htmlFor={inputId} className={styles.label}>
        {label} <span className={styles.required}>*</span>
      </label>
      <input {...inputProps} className={styles.input} disabled={disabled} />
    </section>
  );
}
