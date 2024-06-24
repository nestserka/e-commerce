import { Link } from 'react-router-dom';
import React from 'react';

import style from './_breadCrumbs.module.scss';
import homeIcon from '../../assets/images/icons/home-icon.svg';
import chevronIcon from '../../assets/images/icons/chevron-icon.svg';
import { ROUTES } from '../../constants/constants';

import type { BreadcrumbsProps } from './types';

export default function Breadcrumbs({ links }: BreadcrumbsProps): JSX.Element {
  return (
    <section className={style['breadcrumbs-wrapper']}>
      <Link to={ROUTES.HOME} className={style['breadcrumbs-link']}>
        <img src={homeIcon} className="home-icon" alt="NASA Store Homepage" />
      </Link>

      {[...links].map((link) => (
        <React.Fragment key={link.route}>
          <img src={chevronIcon} className="chevron-icon" alt="" />
          <Link to={link.route} className={style['breadcrumbs-link']}>
            {link.label}
          </Link>
        </React.Fragment>
      ))}
    </section>
  );
}
