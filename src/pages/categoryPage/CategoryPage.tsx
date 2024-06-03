import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
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
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [nameSubtree, setNameSubtree] = useState<string | null>(null);
  const navigation = useNavigate();
  const {
    categoriesData,
    productTypesAttributes,
    setCategoryName,
    setSearchValue,
    getProductsList,
    setSubtreesList,
    setSort,
    setBestsellerStatus,
    setDiscountStatus
  } = useCatalogData();
  const { Search } = Input;
  const getProductListFromCategory = useCallback(() => {
    if (category === 'all') {
      getProductsList()
        .then((productListData: ProductProjectionPagedSearchResponse) => {
          setProductsList(productListData.results);
        })
        .catch((error: Error) => {
          console.log(error.message);
        });
    }

    const dataCategory = categoriesData.find((item: Category) => item.slug.en === category);

    if (dataCategory) {
      getProductsList(dataCategory.id)
        .then((productListData: ProductProjectionPagedSearchResponse) => {
          setProductsList(productListData.results);
        })
        .catch((error: Error) => {
          console.log(error.message);
        });
    }
  }, [categoriesData, category, getProductsList]);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      setNameSubtree(event.target.id);
      setSelectedValue(event.target.value);
    } else {
      setNameSubtree('');
      setSelectedValue(null);
    }

    setSubtreesList(event.target.value, event.target.checked);
    getProductListFromCategory();
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
  const handleClickForCategory = (): void => {
    setSelectedValue('');
    setNameSubtree('');
    setSubtreesList('', true);
    getProductListFromCategory();
  };

  useEffect(() => {
    setSubtreesList('', true);
    setSelectedValue('');

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
  }, [
    categoriesData,
    category,
    getProductListFromCategory,
    getProductsList,
    productTypesAttributes,
    setCategoryName,
    setSubtreesList,
  ]);

  return (
    <section className={style.category} data-testid={category}>
      <header className={style['category-header']}>
        <Link className={style['category-header-link']} to="/catalog/all">
          All categories
        </Link>
        {category === 'all' ? '' : <span className={style['category-header-link']}>/</span>}
        {category === 'all' ? (
          ''
        ) : (
          <button className={style['category-header-link']} type="button" onClick={handleClickForCategory}>
            {namePosition}
          </button>
        )}
        {nameSubtree ? <span className={style['category-header-link']}>/</span> : ''}
        {nameSubtree ? <span className={style['category-header-link']}>{nameSubtree}</span> : ''}
      </header>
      <main className={style.main}>
        <aside className={style['products-filters']}>
          <div className={style['filters-section']}>
            <h3 className={style['filters-header-title']}> FILTERS</h3>
          </div>

          <details className={style['filters-section']} open>
            <summary className={style['filters-header-title']}>Categories</summary>
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
              <SingleCheckboxGroup options={subtree} selectedValue={selectedValue} onChange={handleCheckboxChange} />
            </div>
          </details>
          <details className={style['filters-section']} open>
            <summary className={style['filters-header-title']}>Promo-Actions</summary>
            <div className={style['products-sort']}>
              <div className={style['checkbox-wrapper']}>
                <InputCheckBox
                  id="discount"
                  name="Discount"
                  label="Discount"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDiscountStatus(e.target.checked);
                    getProductListFromCategory();
                  }}
                />
              </div>
              <div className={style['checkbox-wrapper']}>
                <InputCheckBox
                  id="bestseller"
                  name="Bestseller"
                  label="BestSeller"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setBestsellerStatus(e.target.checked);
                    getProductListFromCategory();
                  }}
                />
              </div>
            </div>
          </details>

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
      </main>
    </section>
  );
}
