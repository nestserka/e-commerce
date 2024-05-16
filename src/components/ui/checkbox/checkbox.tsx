import styles from './_checkbox.module.scss';

interface InputProps {
  name: string;
  id: string;
  label: string;
  isCheckBoxDisabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputCheckBox({ name, id, label, isCheckBoxDisabled, onChange }: InputProps): JSX.Element {
  return (
    <section className={styles['checkbox-wrapper']}>
      <input type="checkbox" id={id} name={name} className={styles.input}  disabled={isCheckBoxDisabled} onChange={onChange} />
      <label htmlFor={id} className={styles.label}>
        {label} <span className={styles.required} />
      </label>
    </section>
  );
}
