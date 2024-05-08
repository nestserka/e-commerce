import { Link } from 'react-router-dom';

import style from './_catalog.module.scss';

export default function CatalogPage(): JSX.Element {
  const elem = 'name-category';
  const elem2 = 'name-category2';
  const elem3 = 'name-category3';
  const elem4 = 'name-category4';

  return (
    <section className={style.catalog} data-testid="catalog">
      <Link to={`${elem}`}>Name Category</Link>
      <Link to={`${elem2}`}>Name Category2</Link>
      <Link to={`${elem3}`}>Name Category3</Link>
      <Link to={`${elem4}`}>Name Category4</Link>
    </section>
  );
}
