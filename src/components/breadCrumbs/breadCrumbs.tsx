import { Link } from 'react-router-dom';

import style from './_breadCrumbs.module.scss';
import homeIcon from '../../assets/images/icons/home-icon.svg';
import chevronIcon from '../../assets/images/icons/chevron-icon.svg';
import { ROUTES } from '../../constants/constants';

interface BreadcrumbsProps {
  links: { label: string; route: string }[];
}

export default function Breadcrumbs({ links }: BreadcrumbsProps): JSX.Element {
  return (
    <section className={style['breadcrumbs-wrapper']}>
      <Link to={ROUTES.HOME} className={style['breadcrumbs-link']}>
        <img src={homeIcon} className="home-icon" alt="NASA Store Homepage" />
      </Link>

      {[...links].map((link) => (
        <>
          <img src={chevronIcon} className="chevron-icon" alt="" />
          <Link to={link.route} className={style['breadcrumbs-link']}>
            {link.label}
          </Link>
        </>
      ))}
    </section>
  );
}
