import styles from './_input.module.scss';

export interface InputProps {
  type: string;
  id: string;
  placeholder: string;
  label: string;
  autocomplete: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type, id, placeholder, label, autocomplete, onChange }: InputProps): JSX.Element {
  return (
    <section className={styles['input-wrapper']}>
      <label htmlFor={id} className={styles.label}>
        {label} <span className={styles.required}>*</span>
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        autoComplete={autocomplete}
        className={styles.input}
        onChange={onChange}
      />
    </section>
  );
}
