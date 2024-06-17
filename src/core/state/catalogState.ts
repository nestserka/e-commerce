import { create } from 'zustand';

import withClientCredentialsFlow from '../../api/middlewareFlows/withClientCredentials';

import type { CatalogCheckAttributeState, CatalogStateData } from './types';
import type { Category, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';

export const useCatalogData = create<CatalogStateData>((set, get) => ({
  currentPage: 1,
  brandList: [],
  total: 0,
  refractorList: [],
  materialList: [],
  categoryName: 'all',
  priceRange: [0, 1700000],
  categoriesData: [],
  subtreesList: '',
  parentsCategories: [],
  productTypesAttributes: [],
  isLoading: false,
  limit: 6,
  fuzzyLevelValue: 0,
  sortValue: 'price asc',
  searchValue: '',
  isBestseller: false,
  isDiscount: false,
  offset: 0,

  resetAttributes: (): void => {
    get().setCurrentPage(1);
    get().setOffset(1);
    get().setPriceRange([0, 1700000]);
    get().setSubtreesList('', true);
    get().setBestsellerStatus(false);
    get().setDiscountStatus(false);
    get().setBrandListDefault();
    get().setMaterialListDefault();
    get().setRefractorListDefault();
  },
  resetSort: (): void => {
    get().setSort('price asc');
    get().setSearchValue('');
  },
  setCurrentPage: (newPage: number): void => {
    set({ currentPage: newPage });
  },
  setTotal: (quantity: number): void => {
    set({ total: quantity });
  },
  setRefractorList: (nameRefractor: string, isStatus: boolean): void => {
    if (isStatus) {
      get().refractorList.push(nameRefractor);
    } else {
      set({ refractorList: get().refractorList.filter((refractorItem) => refractorItem !== nameRefractor) });
    }
  },
  setRefractorListDefault: (): void => {
    set({ refractorList: [] });
  },
  setBrandList: (nameBrand: string, isStatus: boolean): void => {
    if (isStatus) {
      get().brandList.push(nameBrand);
    } else {
      set({ brandList: get().brandList.filter((brandItem) => brandItem !== nameBrand) });
    }
  },
  setBrandListDefault: (): void => {
    set({ brandList: [] });
  },
  setMaterialList: (nameMaterial: string, isStatus: boolean): void => {
    if (isStatus) {
      get().materialList.push(nameMaterial);
    } else {
      set({ materialList: get().materialList.filter((materialItem) => materialItem !== nameMaterial) });
    }
  },
  setMaterialListDefault: (): void => {
    set({ materialList: [] });
  },
  setPriceRange: (newRange: number[]): void => {
    set({ priceRange: newRange });
  },
  setCategoryName: (newName: string): void => {
    set({ categoryName: newName });
  },
  setSubtreesList: (id: string, isStatus: boolean): void => {
    if (isStatus) {
      set({ subtreesList: id });
    } else {
      set({ subtreesList: '' });
    }
  },
  createFilterByCategoriesId: (category?: string): string => {
    if (get().categoryName === 'all' || !category) {
      return '';
    }

    if (get().subtreesList.length) {
      return `categories.id: "${get().subtreesList}"`;
    }

    return `categories.id: subtree("${category}")`;
  },
  setOffset: (page: number): void => {
    set({ offset: page - 1 });
  },
  setSort: (newSort: string): void => {
    set({ sortValue: newSort });
  },
  setBestsellerStatus: (isStatus: boolean): void => {
    set({ isBestseller: isStatus });
  },
  setDiscountStatus: (isStatus: boolean): void => {
    set({ isDiscount: isStatus });
  },
  setSearchValue: (newSearch: string): void => {
    set({ searchValue: newSearch });
  },
  setFuzzyLevel: (): number => {
    switch (get().searchValue.length) {
      case 1:
      case 2:
        set({ fuzzyLevelValue: 0 });

        return 0;
      case 3:
      case 4:
      case 5:
        set({ fuzzyLevelValue: 1 });

        return 1;
      default:
        set({ fuzzyLevelValue: 2 });

        return 2;
    }
  },
  setCategoriesData: async (): Promise<void> => {
    set({ isLoading: true });

    try {
      const response = await withClientCredentialsFlow()
        .categories()
        .get({
          queryArgs: {
            limit: 100,
          },
        })
        .execute();
      set({
        categoriesData: response.body.results,
        parentsCategories: response.body.results.filter((data: Category) => data.ancestors.length === 0),
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
    }
  },
  setProductTypesAttributes: async (): Promise<void> => {
    set({ isLoading: true });

    try {
      const productType = await withClientCredentialsFlow().productTypes().get().execute();
      set({
        productTypesAttributes: productType.body.results,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },
  getProductsList: async (category?: string): Promise<ProductProjectionPagedSearchResponse> => {
    set({ isLoading: true });
    const newSearch = get().searchValue.length
      ? { 'text.en': get().searchValue, fuzzy: true, fuzzyLevel: get().setFuzzyLevel() }
      : {};

    try {
      const productsList = await withClientCredentialsFlow()
        .productProjections()
        .search()
        .get({
          queryArgs: {
            sort: get().sortValue,
            limit: get().limit,
            offset: get().offset * get().limit,
            ...newSearch,
            'filter.query': [
              ...(get().categoryName === 'all' ? [] : [get().createFilterByCategoriesId(category)]),
              ...(get().isBestseller ? ['variants.attributes.bestseller: "true"'] : []),
              ...(get().isDiscount ? [`variants.attributes.discount.key: "10%-off", "15%-off", "20%-off"`] : []),
              ...(get().brandList.length
                ? [
                    `variants.attributes.brand.key: ${get()
                      .brandList.map((name) => `"${name}"`)
                      .join(',')}`,
                  ]
                : []),
              ...(get().materialList.length
                ? [
                    `variants.attributes.material.key: ${get()
                      .materialList.map((name) => `"${name}"`)
                      .join(',')}`,
                  ]
                : []),
              ...(get().refractorList.length
                ? [
                    `variants.attributes.refractor.key: ${get()
                      .refractorList.map((name) => `"${name}"`)
                      .join(',')}`,
                  ]
                : []),
              `variants.price.centAmount:range (${get().priceRange[0]}to ${get().priceRange[1]})`,
            ],
          },
        })
        .execute();
      set({ isLoading: false });

      return productsList.body;
    } catch {
      set({ isLoading: false });
      throw new Error('no product by attribute or filter found');
    }
  },
}));

export const useCatalogCheckAttributeState = create<CatalogCheckAttributeState>((set, get) => ({
  brandListAttribute: [],
  refractorListAttribute: [],
  materialListAttribute: [],
  checkedStatesBrandList: {},
  checkedStatesRefractorList: {},
  checkedStatesMaterialList: {},
  resetCheckedStatesAttributesList: (): void => {
    get().setCheckedStatesBrandList(
      Object.fromEntries(get().brandListAttribute.map((attribute) => [attribute.key, false])),
    );
    get().setCheckedStatesMaterialList(
      Object.fromEntries(get().materialListAttribute.map((attribute) => [attribute.key, false])),
    );
    get().setCheckedStatesRefractorList(
      Object.fromEntries(get().refractorListAttribute.map((attribute) => [attribute.key, false])),
    );
  },
  resetAttributesList: (): void => {
    get().setRefractorListAttribute([]);
    get().setMaterialListAttribute([]);
    get().setBrandListAttribute([]);
  },
  setRefractorListAttribute: (newArray): void => {
    set({ refractorListAttribute: newArray });
  },
  setMaterialListAttribute: (newArray): void => {
    set({ materialListAttribute: newArray });
  },
  setBrandListAttribute: (newArray): void => {
    set({ brandListAttribute: newArray });
  },
  setCheckedStatesBrandList: (newValue): void => {
    set({ checkedStatesBrandList: newValue });
  },
  setCheckedStatesRefractorList: (newValue): void => {
    set({ checkedStatesRefractorList: newValue });
  },
  setCheckedStatesMaterialList: (newValue): void => {
    set({ checkedStatesMaterialList: newValue });
  },
}));
