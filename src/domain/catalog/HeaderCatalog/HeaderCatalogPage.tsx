import { Input, Select, Space } from 'antd';

import { OPTIONS_FROM_SORT } from '../../../constants/constants';
import styles from './_headerCatalog.module.scss';

import type { HeaderCatalogProps } from '../types';

export default function HeaderCatalog({
  handleSearch,
  handleChangeSort,
  handleChangeCapture,
}: HeaderCatalogProps): JSX.Element {
  const { Search } = Input;

  return (
    <header className={styles['products-header']}>
      <div className={styles['products-search']}>
        <Space direction="vertical">
          <Search
            className={styles.search}
            placeholder="Search for..."
            enterButton
            onSearch={handleSearch}
            style={{ width: 300 }}
            onChangeCapture={handleChangeCapture}
          />
        </Space>
      </div>
      <div className={styles['products-sort']}>
        <span className={styles['sort-title']}>Sort by:</span>
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
