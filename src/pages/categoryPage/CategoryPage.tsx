import { useParams } from 'react-router';

import style from './_category.module.scss';

import type { Params } from 'react-router';

export default function CategoryPage(): JSX.Element {
  const { category }: Readonly<Params<string>> = useParams();

  return (
    <section className={style.category} data-testid={category}>
      {category}
    </section>
  );
}
