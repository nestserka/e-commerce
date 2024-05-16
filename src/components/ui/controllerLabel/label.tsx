import styles from '../input/_input.module.scss';

import type { ReactNode } from 'react';

interface ControllerLabelProps {
  control: ReactNode;
  label: string;
}

export default function ControllerLabel({ control, label }: ControllerLabelProps): JSX.Element {
  return (
    <section className={styles['input-wrapper']}>
      <label htmlFor="dateOfBirth" className={styles.label}>
        {label} <span className={styles.required}>*</span>
      </label>
      <div className={styles.input}>{control}</div>
    </section>
  );
}
