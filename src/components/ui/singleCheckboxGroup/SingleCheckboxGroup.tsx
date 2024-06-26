import styles from './_singleCheckboxGroup.module.scss';

import type { OptionsFromSelect } from '../../../pages/categoryPage/types';

export default function SingleCheckboxGroup({
  selectedValue,
  options,
  onChange,
}: {
  selectedValue: string | null;
  options: OptionsFromSelect[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element {
  return (
    <div>
      {options.map((option) => (
        <div className={styles['checkbox-wrapper']} key={option.value}>
          <input
            type="checkbox"
            data-id={option.key}
            id={option.label}
            value={option.value}
            className={styles.input}
            checked={selectedValue === option.key}
            onChange={onChange}
          />
          <label className={styles.label} htmlFor={option.label}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
