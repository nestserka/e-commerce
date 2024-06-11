import { Link } from 'react-router-dom';

import chevronIcon from '../../../assets/images/icons/chevron-icon.svg';
import homeIcon from '../../../assets/images/icons/home-icon.svg';
import { ROUTES } from '../../../constants/constants';
import style from './breadCrumbsCatalog.module.scss';

import type { BreadCrumbsCatalogProps } from '../types';

export default function BreadCrumbsCatalog({
  nameSubtree,
  category,
  namePosition,
  handleClickForCatalog,
  handleClickForCategory,
}: BreadCrumbsCatalogProps): JSX.Element {
  return (
    <header className={style['category-header']}>
      <Link to={ROUTES.HOME} className={style['breadcrumbs-link']}>
        <img src={homeIcon} className="home-icon" alt="NASA Store Homepage" />
      </Link>
      <img src={chevronIcon} className="chevron-icon" alt="chevron" />
      <button className={style['category-header-link']} type="button" onClick={handleClickForCatalog}>
        All categories
      </button>
      {category !== 'all' && (
        <>
          <img src={chevronIcon} className="chevron-icon" alt="chevron" />
          <button className={style['category-header-link']} type="button" onClick={handleClickForCategory}>
            {namePosition}
          </button>
        </>
      )}
      {nameSubtree && (
        <>
          <img src={chevronIcon} className="chevron-icon" alt="chevron" />
          <span className={style['category-header-link']}>{nameSubtree}</span>
        </>
      )}
    </header>
  );
}
