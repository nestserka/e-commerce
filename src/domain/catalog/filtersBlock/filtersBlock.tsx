import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useNavigate } from 'react-router';

import styles from './_filtersBlock.module.scss';
import { useCatalogCheckAttributeState, useCatalogData } from '../../../core/state/catalogState';
import { getAttributesCategory, isAttributeLocalizedEnumType } from '../../../pages/categoryPage/utils';
import SingleCheckboxGroup from '../../../components/ui/singleCheckboxGroup/SingleCheckboxGroup';
import PriceRangeFilter from './priceRangeFilter/PriceRangeFilter';
import AttributeBlock from './attributeBlock/attributeBlock';
import iconDelete from '../../../assets/images/icons/delete.png';
import InputCheckBox from '../../../components/ui/checkbox/checkbox';
import { DYNAMIC_ROUTES } from '../../../constants/constants';

import type { OptionsFromSelect } from '../../../pages/categoryPage/types';
import type { FiltersBlockProps } from '../types';
import type { AttributeLocalizedEnumValue } from '@commercetools/platform-sdk';

export default function FiltersBlock({
  category,
  nameCategory,
  categoryOptions,
  subtrees,
  selectedValue,
  getProductListFromCategory,
  resetAttributesForCategory,
  handleClickForCategory,
}: FiltersBlockProps): JSX.Element {
  const navigation = useNavigate();
  const [brandListAttribute, setBrandListAttribute] = useState<AttributeLocalizedEnumValue[]>([]);
  const [refractorListAttribute, setRefractorListAttribute] = useState<AttributeLocalizedEnumValue[]>([]);
  const [materialListAttribute, setMaterialListAttribute] = useState<AttributeLocalizedEnumValue[]>([]);
  const {
    productTypesAttributes,
    isDiscount,
    isBestseller,
    setBestsellerStatus,
    setDiscountStatus,
    setPriceRange,
    setRefractorList,
    setMaterialList,
    setBrandList,
  } = useCatalogData();

  const { isCheckedBrandList, isCheckedMaterialList, isCheckedRefractorList } = useCatalogCheckAttributeState();

  const handleResetAllFilters = (): void => {
    setPriceRange([0, 1700000]);
    setBestsellerStatus(false);
    setDiscountStatus(false);
    resetAttributesForCategory();
    handleClickForCategory();
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      navigation(`${DYNAMIC_ROUTES.CATALOG}${category}/${event.target.dataset.id}`);
    } else {
      navigation(`${DYNAMIC_ROUTES.CATALOG}${category}`);
    }
  };

  const handleChangeCategory = (option: OptionsFromSelect): void => {
    navigation(`${DYNAMIC_ROUTES.CATALOG}${option.value}`);
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

  return (
    <aside className={styles['products-filters']}>
      <h3 className={styles['filters-header']}>Filters</h3>

      <details className={styles['filters-section']} open>
        <summary className={styles['filter-title']}>Categories</summary>
        <div key={nameCategory} className={styles['select-sort']}>
          <Select
            labelInValue
            className={styles.subtrees}
            placeholder={nameCategory}
            onChange={handleChangeCategory}
            options={categoryOptions}
          />
        </div>
        <div>
          <SingleCheckboxGroup options={subtrees} selectedValue={selectedValue} onChange={handleCheckboxChange} />
        </div>
      </details>
      <details className={styles['filters-section']} open>
        <summary className={styles['filter-title']}>Promo-Actions</summary>
        <div className={styles['select-sort']}>
          <div className={styles['checkbox-wrapper']}>
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
          <div className={styles['checkbox-wrapper']}>
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
      <PriceRangeFilter getProductListFromCategory={getProductListFromCategory} />

      <AttributeBlock
        attributeArray={brandListAttribute}
        nameAttribute="Brand"
        isCheckedAttributeList={isCheckedBrandList}
        handleClickForCheckbox={(e: React.ChangeEvent<HTMLInputElement>) => {
          setBrandList(e.target.id, e.target.checked);
          getProductListFromCategory();
        }}
      />

      <AttributeBlock
        attributeArray={materialListAttribute}
        nameAttribute="Material"
        isCheckedAttributeList={isCheckedMaterialList}
        handleClickForCheckbox={(e: React.ChangeEvent<HTMLInputElement>) => {
          setMaterialList(e.target.id, e.target.checked);
          getProductListFromCategory();
        }}
      />

      <AttributeBlock
        attributeArray={refractorListAttribute}
        nameAttribute="Refractor"
        isCheckedAttributeList={isCheckedRefractorList}
        handleClickForCheckbox={(e: React.ChangeEvent<HTMLInputElement>) => {
          setRefractorList(e.target.id, e.target.checked);
          getProductListFromCategory();
        }}
      />
      <div className={styles['filters-section']}>
        <button className={styles['filters-button']} type="button" onClick={handleResetAllFilters}>
          <span className={styles['filters-button-span']}>Clear Filters</span>
          <img src={iconDelete} alt="delete" />
        </button>
      </div>
    </aside>
  );
}
