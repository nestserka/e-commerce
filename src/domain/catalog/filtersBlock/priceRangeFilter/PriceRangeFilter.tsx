import ReactSlider from 'react-slider';

import style from '../filtersBlock.module.scss';
import { useCatalogData } from '../../../../core/state/catalogState';

import type { PriceRangeFilterProps } from '../../types';

export default function PriceRangeFilter({ getProductListFromCategory }: PriceRangeFilterProps): JSX.Element {
  const { priceRange, setPriceRange } = useCatalogData();

  return (
    <details className={style['filters-section']} open>
      <summary className={style['filter-title']}>Price Range</summary>
      <div className={style['price-range']}>
        <div className={style['price-range-inputs']}>
          <span className={style['price-range-value']}>$ {(priceRange[0] / 100).toFixed(2)}</span>
          <span className={style['price-range-value']}>$ {(priceRange[1] / 100).toFixed(2)}</span>
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
          onAfterChange={getProductListFromCategory}
        />
      </div>
    </details>
  );
}
