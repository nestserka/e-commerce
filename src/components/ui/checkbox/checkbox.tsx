import styles from './_checkbox.module.scss';

interface InputCheckboxProps {
  name: string;
  id: string;
  label: string;
  isCheckBoxDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValue?: boolean;
}

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
        // {...(isValue && { checked: true })}
        checked={isValue}
      />
      <label htmlFor={id} className={styles.label}>
        {label} <span className={styles.required} />
      </label>
    </section>
  );
}
