import { useNavigate, useParams } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { Input, Select, Space } from 'antd';
import ReactSlider from 'react-slider';
import { Link } from 'react-router-dom';

import style from './_category.module.scss';
import Card from '../../components/cards/card/Card';
import { useCatalogData } from '../../core/state/catalogState';
import { createCategoriesList, getAttributesCategory, getSubCategory, isAttributeLocalizedEnumType } from './utils';
import InputCheckBox from '../../components/ui/checkbox/checkbox';
import { DYNAMIC_ROUTES, OPTIONS_FROM_SORT, ROUTES } from '../../constants/constants';
import SingleCheckboxGroup from '../../components/ui/singleCheckboxGroup/SingleCheckboxGroup';
import chevronIcon from '../../assets/images/icons/chevron-icon.svg';
import homeIcon from '../../assets/images/icons/home-icon.svg';
import iconDelete from '../../assets/images/icons/delete.png';

import type { SearchProps } from 'antd/es/input';
import type { OptionsFromSelect, OptionsFromSelectSort } from './types';
import type { Params } from 'react-router';
import type {
  AttributeLocalizedEnumValue,
  Category,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';

// export function assertsEnum(value: unknown): asserts value is AttributeLocalizedEnumType {
//   if (!(typeof value === 'object' && value !== null && 'name' in value && value.name === 'lenum')) {
//     throw new Error();
//   }
// }

export default function CategoryPage(): JSX.Element {
  const { category, subtree }: Readonly<Params<string>> = useParams();
  const [subtrees, setSubtree] = useState<OptionsFromSelect[]>([]);
  const [productsList, setProductsList] = useState<ProductProjection[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [categoryOptions, setCategoryOptions] = useState<OptionsFromSelect[]>([]);
  const [namePosition, setNamePosition] = useState<string | undefined>();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [nameSubtree, setNameSubtree] = useState<string | null>(null);
  const [brandListAttribute, setBrandListAttribute] = useState<AttributeLocalizedEnumValue[]>([]);
  const [refractorListAttribute, setRefractorListAttribute] = useState<AttributeLocalizedEnumValue[]>([]);
  const [materialListAttribute, setMaterialListAttribute] = useState<AttributeLocalizedEnumValue[]>([]);
  const [isCheckedBrandList, setIsCheckedBrandList] = useState(false);
  const [isCheckedMaterialList, setIsCheckedMaterialList] = useState(false);
  const [isCheckedRefractorList, setIsCheckedRefractorList] = useState(false);

  const navigation = useNavigate();
  const {
    categoriesData,
    productTypesAttributes,
    priceRange,
    isDiscount,
    isBestseller,
    setCategoryName,
    setSearchValue,
    getProductsList,
    setSubtreesList,
    setSort,
    setBestsellerStatus,
    setDiscountStatus,
    setPriceRange,
    setBrandList,
    setBrandListDefault,
    setMaterialListDefault,
    setMaterialList,
    setRefractorListDefault,
    setRefractorList,
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

  const handleDeleteFilters = (): void => {
    setPriceRange([0, 1700000]);
    setPriceRange([0, 1700000]);
    setBestsellerStatus(false);
    setDiscountStatus(false);
    setBrandListDefault();
    setMaterialListDefault();
    setRefractorListDefault();
    setIsCheckedBrandList(true);
    setIsCheckedMaterialList(true);
    setIsCheckedRefractorList(true);
    setTimeout(() => {
      setIsCheckedBrandList(false);
      setIsCheckedMaterialList(false);
      setIsCheckedRefractorList(false);
    }, 0);
    getProductListFromCategory();
  };

  useEffect(() => {
    if (category) {
      const attributesCategory = getAttributesCategory(productTypesAttributes, category);

      if (!attributesCategory.length) {
        setRefractorListAttribute([]);
        setBrandListAttribute([]);
        setMaterialListAttribute([]);
      }

      const newListBrand = attributesCategory.find((attribute) => attribute.name === 'brand');
      const newListMaterial = attributesCategory.find((attribute) => attribute.name === 'material');
      const newListRefractor = attributesCategory.find((attribute) => attribute.name === 'refractor');

      if (!newListBrand) {
        setBrandListAttribute([]);
      }

      if (!newListMaterial) {
        setMaterialListAttribute([]);
      }

      if (!newListRefractor) {
        setRefractorListAttribute([]);
      }

      attributesCategory.forEach((attribute) => {
        if (attribute.name === 'brand' && isAttributeLocalizedEnumType(attribute.type)) {
          setBrandListAttribute(attribute.type.values);
        } else if (attribute.name === 'material' && isAttributeLocalizedEnumType(attribute.type)) {
          setMaterialListAttribute(attribute.type.values);
        } else if (attribute.name === 'refractor' && isAttributeLocalizedEnumType(attribute.type)) {
          setRefractorListAttribute(attribute.type.values);
        }
      });
    }
  }, [category, productTypesAttributes]);

  useEffect(() => {
    if (category) {
      const allSubtrees = getSubCategory(categoriesData, category);
      setSubtree(allSubtrees);
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
        <img src={chevronIcon} className="chevron-icon" alt="chevron" />
        <button className={style['category-header-link']} type="button" onClick={handleClickForCatalog}>
          All categories
        </button>
        {category === 'all' ? '' : <img src={chevronIcon} className="chevron-icon" alt="chevron" />}
        {category === 'all' ? (
          ''
        ) : (
          <button className={style['category-header-link']} type="button" onClick={handleClickForCategory}>
            {namePosition}
          </button>
        )}
        {nameSubtree ? <img src={chevronIcon} className="chevron-icon" alt="chevron" /> : ''}
        {nameSubtree ? <span className={style['category-header-link']}>{nameSubtree}</span> : ''}
      </header>
      <main className={style.main}>
        <aside className={style['products-filters']}>
          <h3 className={style['filters-header']}>Filters</h3>

          <details className={style['filters-section']} open>
            <summary className={style['filter-title']}>Categories</summary>
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
            <summary className={style['filter-title']}>Promo-Actions</summary>
            <div className={style['select-sort']}>
              <div className={style['checkbox-wrapper']}>
                <InputCheckBox
                  id="discount"
                  name="Discount"
                  label="Discount"
                  isValue={isDiscount}
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
                  isValue={isBestseller}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setBestsellerStatus(e.target.checked);
                    getProductListFromCategory();
                  }}
                />
              </div>
            </div>
          </details>
          <details className={style['filters-section']} open>
            <summary className={style['filter-title']}>Price Range</summary>
            <div className={style['price-range']}>
              <div className={style['price-range-inputs']}>
                <span className={style['price-range-value']}>$ {priceRange[0]}</span>
                <span className={style['price-range-value']}>$ {priceRange[1]}</span>
              </div>
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                defaultValue={[0, 1700000]}
                value={priceRange}
                max={1700000}
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

          <details
            className={brandListAttribute.length ? style['filters-section'] : style['filters-section-display-none']}
            open
          >
            <summary className={style['filters-header-title']}>Brand</summary>
            {brandListAttribute.length
              ? brandListAttribute.map((attribute) => (
                  <InputCheckBox
                    key={attribute.key}
                    id={attribute.key}
                    name={attribute.label.en}
                    label={attribute.label.en}
                    isValue={isCheckedBrandList}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setBrandList(e.target.id, e.target.checked);
                      getProductListFromCategory();
                    }}
                  />
                ))
              : ''}
          </details>

          <details
            className={materialListAttribute.length ? style['filters-section'] : style['filters-section-display-none']}
            open
          >
            <summary className={style['filters-header-title']}>Material</summary>

            {materialListAttribute.length
              ? materialListAttribute.map((attribute) => (
                  <InputCheckBox
                    key={attribute.key}
                    id={attribute.key}
                    name={attribute.label.en}
                    label={attribute.label.en}
                    isValue={isCheckedMaterialList}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setMaterialList(e.target.id, e.target.checked);
                      getProductListFromCategory();
                    }}
                  />
                ))
              : ''}
          </details>
          <details
            className={refractorListAttribute.length ? style['filters-section'] : style['filters-section-display-none']}
            open
          >
            <summary className={style['filters-header-title']}>Refractor</summary>
            {refractorListAttribute.length
              ? refractorListAttribute.map((attribute) => (
                  <InputCheckBox
                    key={attribute.key}
                    id={attribute.key}
                    name={attribute.label.en}
                    label={attribute.label.en}
                    isValue={isCheckedRefractorList}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRefractorList(e.target.id, e.target.checked);
                      getProductListFromCategory();
                    }}
                  />
                ))
              : ''}
          </details>
          <div className={style['filters-section']}>
            <button className={style['filters-button']} type="button" onClick={handleDeleteFilters}>
              <span className={style['filters-button-span']}>Clear Filters</span>
              <img src={iconDelete} alt="delete" />
            </button>
          </div>
        </aside>
        <section className={style.products}>
          <header className={style['products-header']}>
            <div className={style['products-search']}>
              <Space direction="vertical">
                <Search
                  className={style.search}
                  placeholder="Search for..."
                  enterButton
                  onSearch={onSearch}
                  style={{ width: 300 }}
                  onChangeCapture={onChange}
                />
              </Space>
            </div>
            <div className={style['products-sort']}>
              <span className={style['sort-title']}>Sort by:</span>
              <Select
                labelInValue
                placeholder="Price from low to high"
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
