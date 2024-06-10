import type { OptionsFromSelectSort } from '../../pages/categoryPage/types';
import type { FormEventHandler } from 'react';
import type { SearchProps } from 'antd/es/input';

export interface HeaderCatalogProps {
  handleChangeSort: (option: OptionsFromSelectSort) => void;
  handleChangeCapture: FormEventHandler<HTMLInputElement>;
  handleSearch: SearchProps['onSearch'];
}
