import style from './_badge.module.scss';

export default function Badge(type: string, text: string): JSX.Element {
  let badgeClass = style.badge;

  if (type === 'bestseller') {
    badgeClass += ` ${style['badge-bestseller']}`;
  } else if (type === 'discount') {
    badgeClass += ` ${style['badge-discount']}`;
  }

  return (
    <div className={badgeClass} data-testid="badge">
      {text}
    </div>
  );
}
