import { useNavigate, useParams } from 'react-router';
import { useCallback, useEffect, useState } from 'react';

import styles from './_category.module.scss';
import Card from '../../domain/catalog/card/Card';
import { useCatalogCheckAttributeState, useCatalogData } from '../../core/state/catalogState';
import { createCategoriesList, getSubCategory } from './utils';
import { DYNAMIC_ROUTES, ROUTES } from '../../constants/constants';
import BreadCrumbsCatalog from '../../domain/catalog/breadCrumbsCatalog/BreadCrumbsCatalog';
import PaginationBlock from '../../components/pagination/Patination';
import FiltersBlockForCategory from '../../domain/catalog/filtersBlock/FiltersBlockForCategoryPage';
import HeaderCatalogPage from '../../domain/catalog/HeaderCatalog/HeaderCatalog';
import Loader from '../../components/loader/Loader';

import type { SearchProps } from 'antd/es/input';
import type { OptionsFromSelect, OptionsFromSelectSort } from './types';
import type { Params } from 'react-router';
import type { Category, ProductProjection, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';

export default function CategoryPage(): JSX.Element {
  const { category, subtree }: Readonly<Params<string>> = useParams();
  const [subtrees, setSubtree] = useState<OptionsFromSelect[]>([]);
  const [productsList, setProductsList] = useState<ProductProjection[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [categoryOptions, setCategoryOptions] = useState<OptionsFromSelect[]>([]);
  const [namePosition, setNamePosition] = useState<string | undefined>();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [nameSubtree, setNameSubtree] = useState<string | null>(null);

  const navigation = useNavigate();
  const {
    currentPage,
    categoriesData,
    limit,
    total,
    isLoading,
    setCurrentPage,
    setTotal,
    setOffset,
    setCategoryName,
    setSearchValue,
    getProductsList,
    setSubtreesList,
    setSort,
    resetAttributes,
  } = useCatalogData();

  const { resetAttributesList, resetCheckedStatesAttributesList } = useCatalogCheckAttributeState();

  const getProductListFromCategory = useCallback(() => {
    if (category === 'all') {
      getProductsList()
        .then((productListData: ProductProjectionPagedSearchResponse) => {
          setProductsList(productListData.results);
          setTotal(productListData.total ? productListData.total : 0);
        })
        .catch((error: Error) => {
          console.log(error.message);
        });
    }

    const dataCategory = categoriesData.find((item: Category) => item.slug.en === category);

    if (dataCategory) {
      getProductsList(dataCategory.id)
        .then((productListData: ProductProjectionPagedSearchResponse) => {
          setProductsList(productListData.results);
          setTotal(productListData.total ? productListData.total : 0);
        })
        .catch((error: Error) => {
          console.log(error.message);
        });
    }
  }, [categoriesData, category, getProductsList, setTotal]);

  const defaultPage = (): void => {
    setCurrentPage(1);
    setOffset(1);
  };

  const handleSearch: SearchProps['onSearch'] = (value: string) => {
    setSearchValue(value);
    defaultPage();
    getProductListFromCategory();
  };

  const handleChangeCapture: SearchProps['onChange'] = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.length) {
      defaultPage();
      setSearchValue(e.target.value);
      getProductListFromCategory();
    }
  };

  const handleChangeSort = (option: OptionsFromSelectSort): void => {
    setSort(option.value);
    getProductListFromCategory();
  };

  const handleChangePage = (page: number): void => {
    setOffset(page);
    setCurrentPage(page);
    getProductListFromCategory();
  };

  const resetAttributesForCategory = (): void => {
    setSelectedValue('');
    setNameSubtree('');
    resetAttributes();
    resetCheckedStatesAttributesList();
  };

  const handleClickForCategory = (): void => {
    resetAttributesForCategory();
    navigation(`${DYNAMIC_ROUTES.CATALOG}${category}`);
  };

  const handleClickForCatalog = (): void => {
    resetAttributesForCategory();
    resetAttributesList();
    navigation(ROUTES.CATALOG_ALL);
  };

  useEffect((): void => {
    if (category) {
      const allSubtrees = getSubCategory(categoriesData, category);
      setSubtree(allSubtrees);
      const newOptionCategoriesList = createCategoriesList(categoriesData);
      setCategoryOptions(newOptionCategoriesList);

      if (subtree) {
        const nameCategory = allSubtrees.find((option: OptionsFromSelect) => option.key === subtree);
        setSelectedValue(subtree);
        setSubtreesList(nameCategory?.value ?? '', true);
        setNameSubtree(nameCategory?.label ?? '');
      } else {
        setSubtreesList('', true);
        setNameSubtree('');
        setSelectedValue(null);
      }

      if (category === 'all') {
        setActiveCategory('Select by Category');
      } else {
        const nameCategory = newOptionCategoriesList.find((option: OptionsFromSelect) => option.value === category);
        setNamePosition(nameCategory?.label);
        setActiveCategory(nameCategory?.label ?? '');
        setCategoryName(category);
      }
    }

    getProductListFromCategory();
  }, [
    categoriesData,
    category,
    getProductListFromCategory,
    getProductsList,
    setCategoryName,
    setSubtreesList,
    subtree,
  ]);

  return (
    <section className={styles.category} data-testid={category}>
      <BreadCrumbsCatalog
        category={category}
        namePosition={namePosition}
        nameSubtree={nameSubtree}
        handleClickForCatalog={handleClickForCatalog}
        handleClickForCategory={handleClickForCategory}
      />
      <main className={styles.main}>
        <FiltersBlockForCategory
          category={category}
          subtrees={subtrees}
          categoryOptions={categoryOptions}
          nameCategory={activeCategory}
          selectedValue={selectedValue}
          getProductListFromCategory={getProductListFromCategory}
          handleClickForCategory={handleClickForCategory}
          nameSubtree={nameSubtree}
        />

        <section className={styles.products}>
          <HeaderCatalogPage
            handleSearch={handleSearch}
            handleChangeSort={handleChangeSort}
            handleChangeCapture={handleChangeCapture}
          />
          <div className={styles['products-block']}>
            {isLoading && (
              <div className={styles['products-loader']}>
                <Loader />
              </div>
            )}

            {productsList.length ? (
              productsList.map((dataCard: ProductProjection) => <Card dataCard={dataCard} key={dataCard.name.en} />)
            ) : (
              <div className={styles['products-list-empty']}>
                <div className={styles['products-list-empty-text']}>
                  Looks like even the stars couldn&lsquo;t find anything here. Try searching again! 💫
                </div>
              </div>
            )}
          </div>
          <PaginationBlock
            page={currentPage}
            total={total}
            defaultPageSize={limit}
            handleChangePage={handleChangePage}
          />
        </section>
      </main>
    </section>
  );
}
