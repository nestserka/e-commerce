import { useParams } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { Input, Select, Space } from 'antd';

// import {  useForm } from 'react-hook-form';

import style from './_category.module.scss';
import Card from '../../components/cards/card/Card';
import { useCatalogData } from '../../core/state/catalogState';
import { getAttributesCategory, getSubCategory } from './utils';
import InputCheckBox from '../../components/ui/checkbox/checkbox';
import { OPTIONS_FROM_SORT } from '../../constants/constants';

import type { SearchProps } from 'antd/es/input';
import type { OptionsFromSort } from './types';
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
  const [productsList, setProductsList] = useState<ProductProjection[]>([]);
  // const [subtreeList, setSubtreeList] = useState<string[]>();

  // const { control, setValue, watch, trigger } = useForm();

  // const shippingAddress = useWatch({
  //   control,
  //   name: 'shippingAddress',
  // });

  const { categoriesData, productTypesAttributes, setSearchValue, getProductsList, setSubtreesList, setSort } =
    useCatalogData();
  const { Search } = Input;

  // const onCahange: SearchProps['onChange'] = (e) => {
  //   console.log(e.target.value)
  //   // const valueInput: string = value.trim();

  //   // if (valueInput.length > 0) {
  //   //   this.buttonForm.node.removeAttribute('disabled');
  //   // } else {
  //   //   this.buttonForm.node.disabled = true;
  //   // }
  // };

  const getProductListFromCategory = useCallback(() => {
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
  }, [categoriesData, category, getProductsList]);

  const onSearch: SearchProps['onSearch'] = (value) => {
    setSearchValue(value);
    getProductListFromCategory();
  };

  const onChange: SearchProps['onChange'] = (e) => {
    if (!e.target.value.length) {
      setSearchValue(e.target.value);
      getProductListFromCategory();
    }
  };

  const handleChangeSort = (option: OptionsFromSort): void => {
    setSort(option.value);
    getProductListFromCategory();
  };

  const handleChangeSubTrees = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSubtreesList(e.target.id, e.target.checked);
    getProductListFromCategory();
  };

  useEffect(() => {
    if (category) {
      setSubtree(getSubCategory(categoriesData, category));
      setAttributesList(getAttributesCategory(productTypesAttributes, category));
      getProductListFromCategory();
    }
  }, [categoriesData, category, getProductListFromCategory, getProductsList, productTypesAttributes]);

  return (
    <section className={style.category} data-testid={category}>
      <header className={style['category-header']}>
        <h1 className={style['category-title']}>{category}</h1>
        <div className={style['category-search']}>
          <Space direction="vertical">
            <Search
              className={style.search}
              placeholder="Search For..."
              style={{ width: 304 }}
              enterButton
              onSearch={onSearch}
              onChangeCapture={onChange}
            />
          </Space>
        </div>
        <div className={style['sort-section']}>
          <Select
            labelInValue
            placeholder="Sort by"
            style={{ width: 200 }}
            onChange={handleChangeSort}
            options={OPTIONS_FROM_SORT}
          />
        </div>
      </header>

      <main className={style.products}>
        <aside className={style['products-filters']}>
          {subtree.map((subCategory) => (
            <InputCheckBox
              key={subCategory.key}
              id={subCategory.id}
              name={subCategory.name.en}
              label={subCategory.name.en}
              onChange={handleChangeSubTrees}
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
          {productsList.length ? (
            productsList.map((dataCard: ProductProjection) => <Card dataCard={dataCard} key={dataCard.name.en} />)
          ) : (
            <div>No product by attribute or filter found</div>
          )}
        </section>
      </main>
    </section>
  );
}
