import { Outlet } from 'react-router-dom';
import { Suspense, useEffect } from 'react';

import style from './_catalog.module.scss';
import SliderCatalogPage from '../../components/slider/SliderForCatalogPage';
import { useCatalogData } from '../../core/state/catalogState';

export default function CatalogPage(): JSX.Element {
  const { setCategoriesData, parentsCategories } = useCatalogData();

  useEffect(() => {
    setCategoriesData().catch((error: Error) => {
      console.log(error.message);
    });
  }, [setCategoriesData]);

  return (
    <section className={style.catalog} data-testid="catalog">
      <SliderCatalogPage allCategories={parentsCategories} />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Outlet />
      </Suspense>
    </section>
  );
}
