import { create } from 'zustand';

import withClientCredentialsFlow from '../../api/middlewareFlows/withClientCredentials';

import type { Category, ProductProjectionPagedSearchResponse, ProductType } from '@commercetools/platform-sdk';

export interface CatalogStateData {
  categoryName: string;
  categoriesData: Category[];
  priceRange: number[];
  subtreesList: string;
  parentsCategories: Category[];
  productTypesAttributes: ProductType[];
  isLoading: boolean;
  limit: number;
  fuzzyLevelValue: number;
  sortValue: string;
  searchValue: string;
  isBestseller: boolean;
  isDiscount: boolean;
  offset: number;
  setPriceRange: (newRange: number[]) => void;
  setCategoryName: (newName: string) => void;
  createFilterByCategoriesId: (category?: string) => string;
  setOffset: (page: number) => void;
  setSort: (newSort: string) => void;
  setSubtreesList: (id: string, isStatus: boolean) => void;
  setBestsellerStatus: (isStatus: boolean) => void;
  setDiscountStatus: (iStatus: boolean) => void;
  setSearchValue: (newSearch: string) => void;
  setFuzzyLevel: () => number;
  setCategoriesData: () => Promise<void>;
  setProductTypesAttributes: () => Promise<void>;
  getProductsList: (subtrees?: string) => Promise<ProductProjectionPagedSearchResponse>;
}

export const useCatalogData = create<CatalogStateData>((set, get) => ({
  categoryName: 'all',
  priceRange: [0, 17000],
  categoriesData: [],
  subtreesList: '',
  parentsCategories: [],
  productTypesAttributes: [],
  isLoading: false,
  limit: 100,
  fuzzyLevelValue: 0,
  sortValue: 'price asc',
  searchValue: '',
  isBestseller: false,
  isDiscount: false,
  offset: 0,
  setPriceRange: (newRange: number[]): void => {
    set(() => ({ priceRange: newRange }));
  },
  setCategoryName: (newName: string): void => {
    set(() => ({ categoryName: newName }));
  },
  setSubtreesList: (id: string, isStatus: boolean): void => {
    if (isStatus) {
      set(() => ({ subtreesList: id }));
    } else {
      set(() => ({ subtreesList: '' }));
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
    set(() => ({ offset: page - 1 }));
  },
  setSort: (newSort: string): void => {
    set(() => ({ sortValue: newSort }));
  },
  setBestsellerStatus: (isStatus: boolean): void => {
    set(() => ({ isBestseller: isStatus }));
  },
  setDiscountStatus: (isStatus: boolean): void => {
    set(() => ({ isDiscount: isStatus }));
  },
  setSearchValue: (newSearch: string): void => {
    set(() => ({ searchValue: newSearch }));
  },
  setFuzzyLevel: (): number => {
    switch (get().searchValue.length) {
      case 1:
      case 2:
        set(() => ({ fuzzyLevelValue: 0 }));

        return 0;
      case 3:
      case 4:
      case 5:
        set(() => ({ fuzzyLevelValue: 1 }));

        return 1;
      default:
        set(() => ({ fuzzyLevelValue: 2 }));

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
            ...newSearch,
            offset: get().offset * get().limit,
            'filter.query': [
              ...(get().categoryName === 'all' ? [] : [get().createFilterByCategoriesId(category)]),
              ...(get().isBestseller ? ['variants.attributes.bestseller: "true"'] : []),
              ...(get().isDiscount ? [`variants.attributes.discount.key: "10%-off", "15%-off", "20%-off"`] : []),
              // `variants.attributes.brand.key:${brand}`,
              `variants.price.centAmount:range (${get().priceRange[0] * 100}to ${get().priceRange[1] * 100})`,
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
