import { Outlet } from 'react-router-dom';
import { Suspense, useEffect } from 'react';

import style from './_catalog.module.scss';
import SliderCatalogPage from '../../domain/catalog/sliderForCatalogPage/SliderForCatalogPage';
import { useCatalogData } from '../../core/state/catalogState';

export default function CatalogPage(): JSX.Element {
  const { setCategoriesData, setProductTypesAttributes, parentsCategories } = useCatalogData();

  useEffect(() => {
    setCategoriesData().catch((error: Error) => {
      console.log(error.message);
    });
    setProductTypesAttributes().catch((error: Error) => {
      console.log(error.message);
    });
  }, [setCategoriesData, setProductTypesAttributes]);

  return (
    <section className={style.catalog} data-testid="catalog">
      <SliderCatalogPage allCategories={parentsCategories} />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Outlet />
      </Suspense>
    </section>
  );
}
