import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Select } from 'antd';
// import {  useForm } from 'react-hook-form';

import style from './_category.module.scss';
import Card from '../../components/cards/card/Card';
import { useCatalogData } from '../../core/state/catalogState';
import { getAttributesCategory, getSubCategory } from './utils';
import InputCheckBox from '../../components/ui/checkbox/checkbox';
import { OPTIONS_FROM_SORT } from '../../constants/constants';

import type { Params } from 'react-router';
import type {
  AttributeDefinition,
  Category,
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import type { OptionsFromSort } from './types';

export default function CategoryPage(): JSX.Element {
  const { category }: Readonly<Params<string>> = useParams();
  const [subtree, setSubtree] = useState<Category[]>([]);
  const [attributesList, setAttributesList] = useState<AttributeDefinition[]>([]);
  const [productsList, setProductsList] = useState<ProductProjection[]>([]);
  // const [subtreeList, setSubtreeList] = useState<string[]>();

  // const { control, setValue, watch, trigger } = useForm();

  // const shippingAddress = useWatch({
  //   control,
  //   name: 'shippingAddress',
  // });

  const { categoriesData, productTypesAttributes, getProductsList, setSort } = useCatalogData();

  const handleChangeSort = (value: OptionsFromSort):void => {
    setSort(value.value);
    const dataCategory = categoriesData.find((item: Category) => item.slug.en === category);

    if (dataCategory) {
      getProductsList(dataCategory.id)
        .then((productListData: ClientResponse<ProductProjectionPagedSearchResponse>) => {
          setProductsList(productListData.body.results);
        })
        .catch((error: Error) => {
          setProductsList([])
          console.log(error.message);
        });
    }
  }

  useEffect(() => {
    if (category) {
      setSubtree(getSubCategory(categoriesData, category));
      setAttributesList(getAttributesCategory(productTypesAttributes, category));
      const dataCategory = categoriesData.find((item: Category) => item.slug.en === category);

      if (dataCategory) {
        getProductsList(dataCategory.id)
          .then((productListData: ClientResponse<ProductProjectionPagedSearchResponse>) => {
            setProductsList(productListData.body.results);
          })
          .catch((error: Error) => {
            console.log(error.message);
          });
      }
    }
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
  }, [categoriesData, category, getProductsList, productTypesAttributes]);

  // useEffect(() => {
  //   watch((_value, { name }) => {
  //     console.log(name);
  //   });
  // }, [watch]);

  // console.log(productsList?.body.results);
  // console.log(subtreeList?.map((name) => `"${name}"`).join(','));

  return (
    <section className={style.category} data-testid={category}>
      <header className={style['category-header']}>
        <h1 className={style['category-title']}>{category}</h1>
        <input className={style['category-search']} type="text" placeholder="Search For..." />
        <section className={style['input-section']}>
          <Select
            labelInValue
            defaultValue={{ value: 'price asc', label: 'Sort by' }}
            style={{ width: 200 }}
            onChange={handleChangeSort}
            options={OPTIONS_FROM_SORT}
          />
        </section>
      </header>

      <main className={style.products}>
        <aside className={style['products-filters']}>
          {subtree.map((subCategory) => (
            <InputCheckBox
              key={subCategory.name.en}
              id={subCategory.name.en}
              name={subCategory.name.en}
              label={subCategory.name.en}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log('pop', e.target.checked);
              }}
            />
          ))}

          {attributesList.map((attribute: AttributeDefinition) => (
            <InputCheckBox
              key={attribute.name}
              id={attribute.name}
              name={attribute.name}
              label={attribute.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log('pop', e);
              }}
            />
          ))}
        </aside>
        <section className={style['products-block']}>
          {productsList.length? productsList.map((dataCard: ProductProjection) => (
            <Card dataCard={dataCard} key={dataCard.name.en} />
          )): <div>No product by attribute or filter found</div>}
        </section>
      </main>
    </section>
  );
}
