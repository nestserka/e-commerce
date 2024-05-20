import { Link } from 'react-router-dom';

import style from './_homeNavItem.module.scss';

export default function HomeNavItem({
  title,
  index,
  icon,
  route,
  linkLabel,
}: {
  title: string;
  index: number;
  icon: string;
  linkLabel: string;
  route: string;
}): JSX.Element {
  return (
    <Link to={route} className={style['nav-item-link']}>
      <section className={style['nav-item-wrapper']} data-testid="nav-item-component">
        <div className={style['text-wrapper']}>
          <p className={style['index-text']}>/0{index}</p>
          <h2 className={style.title}>{title}</h2>
        </div>
        <div className={style['link-wrapper']}>
          <span className={style.link}>{linkLabel}</span>
          <img src={icon} className={style['nav-item-icon']} alt="" />
        </div>
      </section>
    </Link>
  );
}
