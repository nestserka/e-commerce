import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import style from './_category.module.scss';
import ProductList from '../../api/InteractionForProductList';

import type { Params } from 'react-router';
import type { Category, ClientResponse, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';

export default function CategoryPage(): JSX.Element {
  const { category }: Readonly<Params<string>> = useParams();
  const [subtree, setSubtree] = useState<Category[]>();
  const [productsList, setProductsList] = useState<ClientResponse<ProductProjectionPagedSearchResponse>>();
  const [subtreeList, setSubtreeList] = useState<string[]>();

  useEffect(() => {
    if (category) {
      ProductList.getOneCategory(category)
        .then((response: Category[] | undefined) => {
          setSubtree(response);
          const arrSubtreeNameList: string[] = [];
          response?.forEach((subtreeData: Category) => {
            arrSubtreeNameList.push(subtreeData.id);
          });
          setSubtreeList(arrSubtreeNameList);
          const str = arrSubtreeNameList.map((name) => `"${name}"`).join(', ')
          console.log(str, 'str');
          ProductList.filterByAttributes(str)
            .then((productListData: ClientResponse<ProductProjectionPagedSearchResponse>) => {
              setProductsList(productListData);
            })
            .catch(() => {});
        })
        .catch(() => {});

      // ProductList.returnProductsByCategoryKey(category)
      //   .then((responseCategory) => {
      //     console.log(responseCategory);
      //     // ProductList.filterByAttributes(`subtree("${responseCategory.body.id}")`)
      //     //   .then((productListData: ClientResponse<ProductProjectionPagedSearchResponse>) => {
      //     //     setProductsList(productListData);
      //     //   })
      //     //   .catch(() => {});
      //   })
      //   .catch(() => {});
    }
  }, [category]);

  // console.log(productsList);
  // console.log(subtreeList?.map((name) => `"${name}"`).join(','));

  return (
    <section className={style.category} data-testid={category}>
      <header className={style['category-header']}>
        <h1 className={style['category-title']}>{category}</h1>
        <input className={style['category-search']} type="text" placeholder="Search..." />
      </header>

      <main className={style.products}>
        <aside className={style['products-filters']}>
          {subtree?.map((subCategory) => (
            <div key={subCategory.name.en}>
              <input name="filterSubtree" type="checkbox" id={subCategory.name.en} />
              <label htmlFor={subCategory.name.en}>{subCategory.name.en}</label>
            </div>
          ))}
        </aside>
        <section className={style['products-block']}>
          <div className={style['products-block-card']}>Card</div>
        </section>
      </main>
    </section>
  );
}
