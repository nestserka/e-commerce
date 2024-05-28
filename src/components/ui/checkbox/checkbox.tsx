import styles from './_checkbox.module.scss';

interface InputCheckboxProps {
  name: string;
  id: string;
  label: string;
  isCheckBoxDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputCheckBox({
  name,
  id,
  label,
  onChange = (): void => {},
  isCheckBoxDisabled = false,
}: InputCheckboxProps): JSX.Element {
  return (
    <section className={styles['checkbox-wrapper']}>
      <input
        type="checkbox"
        id={id}
        name={name}
        className={styles.input}
        {...(isCheckBoxDisabled && { 'aria-disabled': 'true', checked: true })}
        onChange={onChange}
      />
      <label htmlFor={id} className={styles.label}>
        {label} <span className={styles.required} />
      </label>
    </section>
  );
}
