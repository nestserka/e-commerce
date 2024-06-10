import { Input, Select, Space } from 'antd';

import { OPTIONS_FROM_SORT } from '../../../constants/constants';
import style from './headerCatalog.module.scss';

import type { HeaderCatalogProps } from '../types';

export default function HeaderCatalog({
  handleSearch,
  handleChangeSort,
  handleChangeCapture,
}: HeaderCatalogProps): JSX.Element {
  const { Search } = Input;

  return (
    <header className={style['products-header']}>
      <div className={style['products-search']}>
        <Space direction="vertical">
          <Search
            className={style.search}
            placeholder="Search for..."
            enterButton
            onSearch={handleSearch}
            style={{ width: 300 }}
            onChangeCapture={handleChangeCapture}
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
  );
}
