import type { AttributeLocalizedEnumValue } from '@commercetools/platform-sdk';
import type { OptionsFromSelect, OptionsFromSelectSort } from '../../pages/categoryPage/types';
import type { FormEventHandler } from 'react';
import type { SearchProps } from 'antd/es/input';

export interface HeaderCatalogProps {
  handleChangeSort: (option: OptionsFromSelectSort) => void;
  handleChangeCapture: FormEventHandler<HTMLInputElement>;
  handleSearch: SearchProps['onSearch'];
}

export interface BreadCrumbsCatalogProps {
  nameSubtree: string | null;
  category: string | undefined;
  namePosition: string | undefined;
  handleClickForCatalog: () => void;
  handleClickForCategory: () => void;
}

export interface PriceRangeFilterProps {
  getProductListFromCategory: () => void;
}

export interface AttributeBlockProps {
  attributeArray: AttributeLocalizedEnumValue[];
  nameAttribute: string;
  isCheckedAttributeList: boolean;
  handleClickForCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FiltersBlockProps {
  category: string | undefined;
  nameCategory: string;
  categoryOptions: OptionsFromSelect[];
  subtrees: OptionsFromSelect[];
  selectedValue: string | null;
  getProductListFromCategory: () => void;
  resetAttributesForCategory: () => void;
  handleClickForCategory: () => void;
}
