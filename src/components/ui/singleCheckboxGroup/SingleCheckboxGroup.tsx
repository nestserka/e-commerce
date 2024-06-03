
import styles from '../checkbox/_checkbox.module.scss';

export interface Option {
  label: string;
  value: string;
}

export default function SingleCheckboxGroup({
  selectedValue,
  options,
  onChange,
}: {
  selectedValue: string|null;
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element {
  return (
    <div>
      {options.map((option) => (
        <div className={styles['checkbox-wrapper']} key={option.value}>
          <input
            type="checkbox"
            id={option.value}
            value={option.value}
            className={styles.input}
            checked={selectedValue === option.value}
            onChange={onChange}
          />
          <label className={styles.label} htmlFor={option.value}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
