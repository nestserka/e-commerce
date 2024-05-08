import { Link } from 'react-router-dom';

import style from './_catalog.module.scss';

export default function CatalogPage(): JSX.Element {
  const elem = 'eat';

  return (
    <section className={style.catalog} data-testid="catalog">
      <Link to={`${elem}`}>EAT</Link>
    </section>
  );
}
