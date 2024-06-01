import style from './_badge.module.scss';

interface BadgeProps {
  type: 'bestseller' | 'discount';
  text: string;
}

export default function Badge({ type, text }: BadgeProps): JSX.Element {
  let badgeClass = style.badge;

  if (type === 'bestseller') {
    badgeClass += ` ${style['badge-bestseller']}`;
  }

  if (type === 'discount') {
    badgeClass += ` ${style['badge-discount']}`;
  }

  return (
    <span className={badgeClass} data-testid="badge">
      {text}
    </span>
  );
}
