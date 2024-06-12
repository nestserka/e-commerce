import styles from './_badge.module.scss';

interface BadgeProps {
  type: 'bestseller' | 'discount';
  text: string;
}

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
