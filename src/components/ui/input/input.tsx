import { useState } from 'react';

import styles from './_input.module.scss';

interface InputProps {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type, name, id, placeholder, label, onChange }: InputProps): JSX.Element {
  return (
    <section className={styles['input-wrapper']}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input type={type} id={id} name={name} placeholder={placeholder} className={styles.input} onChange={onChange} />
    </section>
  );
}
