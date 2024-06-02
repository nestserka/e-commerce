import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import style from './_category.module.scss';
import Card from '../../components/cards/card/Card';
import { useCatalogData } from '../../core/state/catalogState';
import { getAttributesCategory, getSubCategory } from './utils';

import type { Params } from 'react-router';
import type {
  AttributeDefinition,
  Category,
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';

export default function CategoryPage(): JSX.Element {
  const { category }: Readonly<Params<string>> = useParams();
  const [subtree, setSubtree] = useState<Category[]>([]);
  const [attributesList, setAttributesList] = useState<AttributeDefinition[]>([]);
  const [productsList, setProductsList] = useState<ClientResponse<ProductProjectionPagedSearchResponse>>();
  // const [subtreeList, setSubtreeList] = useState<string[]>();

  const { categoriesData, productTypesAttributes } = useCatalogData();

  useEffect(() => {
    if (category) {
      setSubtree(getSubCategory(categoriesData, category));
      setAttributesList(getAttributesCategory(productTypesAttributes, category));
    }

    // if (category) {
    //   ProductList.getOneCategory(category)
    //     .then((response: Category[] | undefined) => {
    //       if (response) {
    //         setSubtree(response);
    //       }

    //       ProductList.getProductTypeSizeAttribute()
    //         .then((response) => {
    //           console.log(response , '1');
    //         })
    //         .catch(() => {});

    //       // const arrSubtreeNameList: string[] = [];
    //       // response?.forEach((subtreeData: Category) => {
    //       //   arrSubtreeNameList.push(subtreeData.id);
    //       // });
    //       // setSubtreeList(arrSubtreeNameList);
    //       // const str = arrSubtreeNameList.map((name) => `"${name}"`).join(', ');
    //       // console.log(str, 'str');
    //       // ProductList.filterByAttributes(str)
    //       //   .then((productListData: ClientResponse<ProductProjectionPagedSearchResponse>) => {
    //       //     setProductsList(productListData);
    //       //   })
    //       //   .catch(() => {});
    //       // ProductList.filterByAttributes(`subtree("${responseCategory.body.id}")`)
    //       //   .then((productListData: ClientResponse<ProductProjectionPagedSearchResponse>) => {
    //       //     setProductsList(productListData);
    //       //   })
    //       //   .catch(() => {});
    //     })
    //     .catch(() => {});

    //   // ProductList.returnProductsByCategoryKey(category)
    //   //   .then((responseCategory) => {
    //   //      console.log(responseCategory);
    //   //     ProductList.filterByAttributes(`subtree("${responseCategory.body.id}")`)
    //   //       .then((productListData: ClientResponse<ProductProjectionPagedSearchResponse>) => {
    //   //         setProductsList(productListData);
    //   //       })
    //   //       .catch(() => {});

    //   //   })
    //   //   .catch(() => {});
    // }
  }, [categoriesData, category, productTypesAttributes]);

  // console.log(productsList?.body.results);
  // console.log(subtreeList?.map((name) => `"${name}"`).join(','));

  return (
    <section className={style.category} data-testid={category}>
      <header className={style['category-header']}>
        <h1 className={style['category-title']}>{category}</h1>
        <input className={style['category-search']} type="text" placeholder="Search..." />
      </header>

      <main className={style.products}>
        <aside className={style['products-filters']}>
          {subtree.map((subCategory) => (
            <div key={subCategory.name.en}>
              <input name="filterSubtree" type="checkbox" id={subCategory.name.en} />
              <label htmlFor={subCategory.name.en}>{subCategory.name.en}</label>
            </div>
          ))}

          {attributesList.map((attribute: AttributeDefinition) => (
            <div key={attribute.name}>
              <input name="filterSubtree" type="checkbox" id={attribute.name} />
              <label htmlFor={attribute.name}>{attribute.name}</label>
            </div>
          ))}
        </aside>
        <section className={style['products-block']}>
          {productsList
            ? productsList.body.results.map((dataCard: ProductProjection) => (
                <Card dataCard={dataCard} key={dataCard.name.en} />
              ))
            : ''}
        </section>
      </main>
    </section>
  );
}
