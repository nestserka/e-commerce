import { Outlet } from 'react-router-dom';
import { Suspense, useEffect } from 'react';

import styles from './_catalog.module.scss';
import SliderCatalogPage from '../../domain/catalog/sliderForCatalogPage/SliderForCatalogPage';
import { useCatalogData } from '../../core/state/catalogState';
import Loader from '../../components/loader/Loader';

export default function CatalogPage(): JSX.Element {
  const { setCategoriesData, setProductTypesAttributes, parentsCategories, categoriesData } = useCatalogData();

  useEffect(() => {
    if (categoriesData.length === 0) {
      setCategoriesData().catch((error: Error) => {
        console.log(error.message);
      });
      setProductTypesAttributes().catch((error: Error) => {
        console.log(error.message);
      });
    }
  }, [categoriesData.length, setCategoriesData, setProductTypesAttributes]);

  return (
    <section className={styles.catalog} data-testid="catalog">
      <SliderCatalogPage allCategories={parentsCategories} />
      <Suspense
        fallback={
          <div className="loading">
            <Loader />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </section>
  );
}
