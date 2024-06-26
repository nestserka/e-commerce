import styles from '../input/_input.module.scss';

import type { ControllerLabelProps } from './types';

export default function ControllerLabel({ control, label }: ControllerLabelProps): JSX.Element {
  return (
    <section className={styles['input-wrapper']}>
      <label htmlFor="form" className={styles.label}>
        {label} <span className={styles.required}>*</span>
      </label>
      {control}
    </section>
  );
}
