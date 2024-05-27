import { Outlet } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';

import style from './_catalog.module.scss';
import SliderCatalogPage from '../../components/slider/SliderForCatalogPage';
import ProductList from '../../api/InteractionForProductList';

import type { Category } from '@commercetools/platform-sdk';

export default function CatalogPage(): JSX.Element {
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  useEffect(() => {
    ProductList.getAllCategories().then((response:Category[])=>{
      setAllCategories(response);
    }).catch(()=>{})
  },[])

  return (
    <section className={style.catalog} data-testid="catalog">
      <SliderCatalogPage allCategories={allCategories}/>

      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Outlet />
      </Suspense>
    </section>
  );
}
