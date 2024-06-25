import styles from './_checkbox.module.scss';

import type { InputCheckboxProps } from './types';

export default function InputCheckBox({
  name,
  id,
  label,
  onChange = (): void => {},
  isCheckBoxDisabled = false,
  isValue = false,
}: InputCheckboxProps): JSX.Element {
  return (
    <section className={styles['checkbox-wrapper']}>
      <input
        type="checkbox"
        id={id}
        name={name}
        className={styles.input}
        {...(isCheckBoxDisabled && { 'aria-disabled': 'true' })}
        onChange={onChange}
        checked={isValue}
      />
      <label htmlFor={id} className={styles.label}>
        {label} <span className={styles.required} />
      </label>
    </section>
  );
}
