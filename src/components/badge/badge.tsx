import styles from './_badge.module.scss';

import type { BadgeProps } from './types';

export default function Badge({ type, text }: BadgeProps): JSX.Element {
  let badgeClass = styles.badge;

  if (type === 'bestseller') {
    badgeClass += ` ${styles['badge-bestseller']}`;
  }

  if (type === 'discount') {
    badgeClass += ` ${styles['badge-discount']}`;
  }

  return (
    <span className={badgeClass} data-testid="badge">
      {text}
    </span>
  );
}
