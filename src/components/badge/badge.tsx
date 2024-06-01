import style from './_badge.module.scss';

interface BadgeProps {
  type: 'bestseller' | 'discount';
  text: string;
}

export default function Badge({ type, text }: BadgeProps): JSX.Element {
  let badgeClass = style.badge;

  if (type === 'bestseller') {
    badgeClass += ` ${style['badge-bestseller']}`;
  } else {
    badgeClass += ` ${style['badge-discount']}`;
  }

  return (
    <div className={badgeClass} data-testid="badge">
      {text}
    </div>
  );
}
