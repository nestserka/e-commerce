import { useNavigate, useParams } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { Input, Select, Space } from 'antd';

// import {  useForm } from 'react-hook-form';

import style from './_category.module.scss';
import Card from '../../components/cards/card/Card';
import { useCatalogData } from '../../core/state/catalogState';
import { createCategoriesList, getAttributesCategory, getSubCategory } from './utils';
import InputCheckBox from '../../components/ui/checkbox/checkbox';
import { OPTIONS_FROM_SORT } from '../../constants/constants';
import SingleCheckboxGroup from '../../components/ui/singleCheckboxGroup/SingleCheckboxGroup';

import type { SearchProps } from 'antd/es/input';
import type { OptionsFromSelect } from './types';
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
  const [subtree, setSubtree] = useState<OptionsFromSelect[]>([]);
  const [attributesList, setAttributesList] = useState<AttributeDefinition[]>([]);
  const [productsList, setProductsList] = useState<ProductProjection[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [categoryOptions, setCategoryOptions] = useState<OptionsFromSelect[]>([]);
  const [namePosition, setNamePosition] = useState<string | undefined>();
  const navigation = useNavigate();

  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const {
    categoriesData,
    productTypesAttributes,
    setCategoryName,
    setSearchValue,
    getProductsList,
    setSubtreesList,
    setSort,
  } = useCatalogData();
  const { Search } = Input;

  const getProductListFromCategory = useCallback(() => {
    if (category === 'all') {
      getProductsList()
        .then((productListData: ClientResponse<ProductProjectionPagedSearchResponse>) => {
          setProductsList(productListData.body.results);
        })
        .catch((error: Error) => {
          console.log(error.message);
        });
    }

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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSubtreesList(event.target.id,event.target.checked);
    getProductListFromCategory();
    setSelectedValue(event.target.checked ? event.target.value : null);
  };

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

  const handleChangeSort = (option: OptionsFromSelect): void => {
    setSort(option.value);
    getProductListFromCategory();
  };


  const handleChangeCategory = (option: OptionsFromSelect): void => {
    navigation(`/catalog/${option.value}`);
  };

  useEffect(() => {
    setSubtreesList('', true);
    setSelectedValue('')

    if (category) {
      setSubtree(getSubCategory(categoriesData, category));
      setAttributesList(getAttributesCategory(productTypesAttributes, category));
      const newOptionCategoriesList = createCategoriesList(categoriesData);
      setCategoryOptions(newOptionCategoriesList);

      if (category === 'all') {
        setActiveCategory('Select by Category');
      } else {
        const nameCategory = newOptionCategoriesList.find((option) => option.value === category);
        setNamePosition(nameCategory?.label);
        setActiveCategory(nameCategory?.label ?? '');
        setCategoryName(category);
      }

      getProductListFromCategory();
    }
  }, [categoriesData, category, getProductListFromCategory, getProductsList, productTypesAttributes, setCategoryName, setSubtreesList]);

  return (
    <section className={style.category} data-testid={category}>
      <aside className={style['products-filters']}>
        <div className={style['filters-header']}>
          <h3 className={style['filters-header-title']}> FILTERS</h3>
        </div>

        <div className={style['filters-header']}>
          <h3 className={style['filters-header-title']}>Category</h3>
          <div className={style['products-sort']}>
            <Select
              labelInValue
              className={style.subtrees}
              placeholder={activeCategory}
              onChange={handleChangeCategory}
              options={categoryOptions}
            />
          </div>
          <div>
            {/* {subtree.map((subCategory) => (
              <InputCheckBox
                key={subCategory.key}
                id={subCategory.id}
                name={subCategory.name.en}
                label={subCategory.name.en}
                onChange={handleChangeSubTrees}
              />
            ))} */}

            <SingleCheckboxGroup options={subtree} selectedValue={selectedValue} onChange={handleCheckboxChange} />
          </div>
        </div>

        {attributesList.map((attribute: AttributeDefinition) => (
          <InputCheckBox
            key={attribute.name}
            id={attribute.name}
            name="subtrees"
            label={attribute.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log('pop', e);
            }}
          />
        ))}
      </aside>
      <section className={style.products}>
        <header className={style['products-header']}>
          <h1 className={style['products-title']}>Catalog {namePosition}</h1>
          <div className={style['products-search']}>
            <Space direction="vertical">
              <Search
                className={style.search}
                placeholder="Search For..."
                enterButton
                onSearch={onSearch}
                onChangeCapture={onChange}
              />
            </Space>
          </div>
          <div className={style['products-sort']}>
            <Select
              labelInValue
              placeholder="Sort by"
              style={{ width: 200 }}
              onChange={handleChangeSort}
              options={OPTIONS_FROM_SORT}
            />
          </div>
        </header>
        <div className={style['products-block']}>
          {productsList.length ? (
            productsList.map((dataCard: ProductProjection) => <Card dataCard={dataCard} key={dataCard.name.en} />)
          ) : (
            <div>No product by attribute or filter found</div>
          )}
        </div>
      </section>
    </section>
  );
}
