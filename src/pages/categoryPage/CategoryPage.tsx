import { useNavigate, useParams } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { Input, Select, Space } from 'antd';
import ReactSlider from 'react-slider';
import { Link } from 'react-router-dom';

import style from './_category.module.scss';
import Card from '../../components/cards/card/Card';
import { useCatalogData } from '../../core/state/catalogState';
import { createCategoriesList, getSubCategory } from './utils';
import InputCheckBox from '../../components/ui/checkbox/checkbox';
import { DYNAMIC_ROUTES, OPTIONS_FROM_SORT, ROUTES } from '../../constants/constants';
import SingleCheckboxGroup from '../../components/ui/singleCheckboxGroup/SingleCheckboxGroup';
import chevronIcon from '../../assets/images/icons/chevron-icon.svg';
import homeIcon from '../../assets/images/icons/home-icon.svg';

import type { SearchProps } from 'antd/es/input';
import type { OptionsFromSelect, OptionsFromSelectSort } from './types';
import type { Params } from 'react-router';
import type {
  // AttributeDefinition,
  Category,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';

export default function CategoryPage(): JSX.Element {
  const { category, subtree }: Readonly<Params<string>> = useParams();
  const [subtrees, setSubtree] = useState<OptionsFromSelect[]>([]);
  // const [attributesList, setAttributesList] = useState<AttributeDefinition[]>([]);
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
    priceRange,
    setCategoryName,
    setSearchValue,
    getProductsList,
    setSubtreesList,
    setSort,
    setBestsellerStatus,
    setDiscountStatus,
    setPriceRange,
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
      navigation(`${DYNAMIC_ROUTES.CATALOG}${category}/${event.target.dataset.id}`);
    } else {
      navigation(`${DYNAMIC_ROUTES.CATALOG}${category}`);
    }
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

  const handleChangeSort = (option: OptionsFromSelectSort): void => {
    setSort(option.value);
    getProductListFromCategory();
  };
  const handleChangeCategory = (option: OptionsFromSelect): void => {
    navigation(`${DYNAMIC_ROUTES.CATALOG}${option.value}`);
  };
  const handleClickForCategory = (): void => {
    setSelectedValue('');
    setNameSubtree('');
    setSubtreesList('', true);
    getProductListFromCategory();
  };

  const handleClickForCatalog = (): void => {
    setSelectedValue('');
    setNameSubtree('');
    setSubtreesList('', true);
    navigation(ROUTES.CATALOG_ALL);
  };

  useEffect(() => {
    if (category) {
      const allSubtrees = getSubCategory(categoriesData, category);
      setSubtree(allSubtrees);
      // setAttributesList(getAttributesCategory(productTypesAttributes, category));
      const newOptionCategoriesList = createCategoriesList(categoriesData);
      setCategoryOptions(newOptionCategoriesList);

      if (subtree) {
        const nameCategory = allSubtrees.find((option: OptionsFromSelect) => option.key === subtree);
        setSelectedValue(subtree);
        setSubtreesList(nameCategory?.value ?? '', true);
        setNameSubtree(nameCategory?.label ?? '');
      } else {
        setSubtreesList('', true);
        setNameSubtree('');
        setSelectedValue(null);
      }

      if (category === 'all') {
        setActiveCategory('Select by Category');
      } else {
        const nameCategory = newOptionCategoriesList.find((option: OptionsFromSelect) => option.value === category);
        setNamePosition(nameCategory?.label);
        setActiveCategory(nameCategory?.label ?? '');
        setCategoryName(category);
      }
    }

    getProductListFromCategory();
  }, [
    categoriesData,
    category,
    getProductListFromCategory,
    getProductsList,
    productTypesAttributes,
    setCategoryName,
    setSubtreesList,
    subtree,
  ]);

  return (
    <section className={style.category} data-testid={category}>
      <header className={style['category-header']}>
        <Link to={ROUTES.HOME} className={style['breadcrumbs-link']}>
          <img src={homeIcon} className="home-icon" alt="NASA Store Homepage" />
        </Link>
        <img src={chevronIcon} className="chevron-icon" alt="" />
        <button className={style['category-header-link']} type="button" onClick={handleClickForCatalog}>
          All categories
        </button>
        {category === 'all' ? '' : <img src={chevronIcon} className="chevron-icon" alt="" />}
        {category === 'all' ? (
          ''
        ) : (
          <button className={style['category-header-link']} type="button" onClick={handleClickForCategory}>
            {namePosition}
          </button>
        )}
        {nameSubtree ? <img src={chevronIcon} className="chevron-icon" alt="" /> : ''}
        {nameSubtree ? <span className={style['category-header-link']}>{nameSubtree}</span> : ''}
      </header>
      <main className={style.main}>
        <aside className={style['products-filters']}>
          <div className={style['filters-section-first']}>
            <h3 className={style['filters-header-title']}> FILTERS</h3>
          </div>
          <details className={style['filters-section']} open>
            <summary className={style['filters-header-title']}>Categories</summary>
            <div key={activeCategory} className={style['select-sort']}>
              <Select
                labelInValue
                className={style.subtrees}
                placeholder={activeCategory}
                onChange={handleChangeCategory}
                options={categoryOptions}
              />
            </div>
            <div>
              <SingleCheckboxGroup options={subtrees} selectedValue={selectedValue} onChange={handleCheckboxChange} />
            </div>
          </details>
          <details className={style['filters-section']} open>
            <summary className={style['filters-header-title']}>Promo-Actions</summary>
            <div className={style['select-sort']}>
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
          <details className={style['filters-section']} open>
            <summary className={style['filters-header-title']}>Price Range</summary>
            <div className={style['price-range']}>
              <div className={style['price-range-value']}>
                <span>Price</span>
                <span>${priceRange[0]}</span>
                <span>-</span>
                <span>${priceRange[1]}</span>
              </div>
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                defaultValue={[0, 17000]}
                max={17000}
                min={0}
                onChange={(value) => {
                  setPriceRange(value);
                }}
                onAfterChange={() => {
                  getProductListFromCategory();
                }}
              />
            </div>
          </details>

          {/* {attributesList.map((attribute: AttributeDefinition) => (
            <InputCheckBox
              key={attribute.name}
              id={attribute.name}
              name="subtrees"
              label={attribute.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log('pop', e);
              }}
            />
          ))} */}
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
                  style={{ width: 300 }}
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
              <div className={style['products-list-empty']}>No product by attribute or filter found</div>
            )}
          </div>
        </section>
      </main>
    </section>
  );
}
