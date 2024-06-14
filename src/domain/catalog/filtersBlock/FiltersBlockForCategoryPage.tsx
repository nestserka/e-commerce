import { useEffect } from 'react';
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

export default function FiltersBlockForCategory({
  category,
  nameCategory,
  categoryOptions,
  subtrees,
  selectedValue,
  getProductListFromCategory,
  handleClickForCategory,
  nameSubtree,
}: FiltersBlockProps): JSX.Element {
  const navigation = useNavigate();

  const {
    productTypesAttributes,
    isDiscount,
    isBestseller,
    setOffset,
    setCurrentPage,
    setBestsellerStatus,
    setDiscountStatus,
    setRefractorList,
    setMaterialList,
    setBrandList,
    setBrandListDefault,
    setMaterialListDefault,
    setRefractorListDefault,
    resetAttributes,
  } = useCatalogData();

  const {
    brandListAttribute,
    refractorListAttribute,
    materialListAttribute,
    checkedStatesBrandList,
    checkedStatesRefractorList,
    checkedStatesMaterialList,
    setRefractorListAttribute,
    setMaterialListAttribute,
    setBrandListAttribute,
    setCheckedStatesBrandList,
    setCheckedStatesRefractorList,
    setCheckedStatesMaterialList,
    resetCheckedStatesAttributesList,
  } = useCatalogCheckAttributeState();

  const handleResetAllFilters = (): void => {
    if (nameSubtree) {
      handleClickForCategory();
    } else {
      resetAttributes();
      resetCheckedStatesAttributesList();
      getProductListFromCategory();
    }
  };

  const defaultPage = (): void => {
    setCurrentPage(1);
    setOffset(1);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      defaultPage();
      navigation(`${DYNAMIC_ROUTES.CATALOG}${category}/${event.target.dataset.id}`);
    } else {
      defaultPage();
      navigation(`${DYNAMIC_ROUTES.CATALOG}${category}`);
    }
  };

  const handleChangeCategory = (option: OptionsFromSelect): void => {
    defaultPage();
    setRefractorListDefault();
    setBrandListDefault();
    setMaterialListDefault();
    setMaterialListAttribute([]);
    setBrandListAttribute([]);
    setRefractorListAttribute([]);
    navigation(`${DYNAMIC_ROUTES.CATALOG}${option.value}`);
  };

  const handleCheckboxChangeBrandList = (e: React.ChangeEvent<HTMLInputElement>): void => {
    defaultPage();
    setCheckedStatesBrandList({ ...checkedStatesBrandList, [e.target.id]: e.target.checked });
    setBrandList(e.target.id, e.target.checked);
    getProductListFromCategory();
  };

  const handleCheckboxChangeMaterialList = (e: React.ChangeEvent<HTMLInputElement>): void => {
    defaultPage();
    setCheckedStatesMaterialList({ ...checkedStatesMaterialList, [e.target.id]: e.target.checked });
    setMaterialList(e.target.id, e.target.checked);
    getProductListFromCategory();
  };

  const handleCheckboxChangeRefractorList = (e: React.ChangeEvent<HTMLInputElement>): void => {
    defaultPage();
    setCheckedStatesRefractorList({ ...checkedStatesRefractorList, [e.target.id]: e.target.checked });
    setRefractorList(e.target.id, e.target.checked);
    getProductListFromCategory();
  };

  const handleCheckboxChangeBestseller = (e: React.ChangeEvent<HTMLInputElement>): void => {
    defaultPage();
    setBestsellerStatus(e.target.checked);
    getProductListFromCategory();
  };

  const handleCheckboxChangeDiscount = (e: React.ChangeEvent<HTMLInputElement>): void => {
    defaultPage();
    setDiscountStatus(e.target.checked);
    getProductListFromCategory();
  };

  useEffect(() => {
    if (category) {
      const attributesCategory = getAttributesCategory(productTypesAttributes, category);
      attributesCategory.forEach((attribute) => {
        if (attribute.name === 'brand' && isAttributeLocalizedEnumType(attribute.type)) {
          setBrandListAttribute(attribute.type.values);
          setCheckedStatesBrandList(
            Object.fromEntries(attribute.type.values.map((attributeBrandList) => [attributeBrandList.key, false])),
          );
        } else if (attribute.name === 'material' && isAttributeLocalizedEnumType(attribute.type)) {
          setMaterialListAttribute(attribute.type.values);
          setCheckedStatesMaterialList(
            Object.fromEntries(
              attribute.type.values.map((attributeMaterialList) => [attributeMaterialList.key, false]),
            ),
          );
        } else if (attribute.name === 'refractor' && isAttributeLocalizedEnumType(attribute.type)) {
          setRefractorListAttribute(attribute.type.values);
          setCheckedStatesRefractorList(
            Object.fromEntries(
              attribute.type.values.map((attributeRefractorList) => [attributeRefractorList.key, false]),
            ),
          );
        }
      });
    }
  }, [
    category,
    productTypesAttributes,
    setBrandListAttribute,
    setCheckedStatesBrandList,
    setCheckedStatesMaterialList,
    setCheckedStatesRefractorList,
    setMaterialListAttribute,
    setRefractorListAttribute,
  ]);

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
              onChange={handleCheckboxChangeDiscount}
            />
          </div>
          <div className={styles['checkbox-wrapper']}>
            <InputCheckBox
              id="bestseller"
              name="Bestseller"
              label="BestSeller"
              isValue={isBestseller}
              onChange={handleCheckboxChangeBestseller}
            />
          </div>
        </div>
      </details>

      <PriceRangeFilter getProductListFromCategory={getProductListFromCategory} />

      <AttributeBlock
        attributeArray={brandListAttribute}
        nameAttribute="Brand"
        checkedStates={checkedStatesBrandList}
        handleClickForCheckbox={handleCheckboxChangeBrandList}
      />

      <AttributeBlock
        attributeArray={materialListAttribute}
        nameAttribute="Material"
        checkedStates={checkedStatesMaterialList}
        handleClickForCheckbox={handleCheckboxChangeMaterialList}
      />

      <AttributeBlock
        attributeArray={refractorListAttribute}
        nameAttribute="Refractor"
        checkedStates={checkedStatesRefractorList}
        handleClickForCheckbox={handleCheckboxChangeRefractorList}
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
