import type { OptionsFromSelectSort } from '../../pages/categoryPage/types';
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
