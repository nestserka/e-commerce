import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import style from './_category.module.scss';
import ProductList from '../../api/InteractionForProductList';

import type { Params } from 'react-router';
import type { Category } from '@commercetools/platform-sdk';

export default function CategoryPage(): JSX.Element {
  const { category }: Readonly<Params<string>> = useParams();
  const [subtree, setSubtree] = useState<Category[]>();

  useEffect(() => {
    if (category) {
      ProductList.getOneCategories(category)
        .then((response: Category[] | undefined) => {
          setSubtree(response);
        })
        .catch(() => {});
    }
  }, [category]);

  return (
    <section className={style.category} data-testid={category}>
      <div>{category}</div>
      {subtree?.map((subCategory) => (
        <div key={subCategory.name.en}>
          <input name="filterSubtree" type="checkbox" id={subCategory.name.en} />
          <label htmlFor={subCategory.name.en}>{subCategory.name.en}</label>
        </div>
      ))}
    </section>
  );
}
