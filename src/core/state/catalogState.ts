import { create } from 'zustand';

import { api } from '../../api/Api';
import { apiRoot as adminApiRoot } from '../../api/AdminBuilder';

import type {
  Category,
  ClientResponse,
  ProductProjectionPagedSearchResponse,
  ProductType,
} from '@commercetools/platform-sdk';

export interface CatalogStateData {
  categoriesData: Category[];
  subtreesList: string[];
  parentsCategories: Category[];
  productTypesAttributes: ProductType[];
  isLoading: boolean;
  limit: number;
  sort: string;
  search: string;
  isBestseller: boolean;
  isDiscount: boolean;
  offset: number;
  createFilterByCategoriesId: (category: string) => string;
  setOffset: (status: number) => void;
  setSort: (status: string) => void;
  setSubtreesList: (id: string, isStatus: boolean) => void;
  setBestsellerStatus: (isStatus: boolean) => void;
  setDiscountStatus: (iStatus: boolean) => void;
  setCategoriesData: () => Promise<void>;
  setProductTypesAttributes: () => Promise<void>;
  getProductsList: (subtrees: string) => Promise<ClientResponse<ProductProjectionPagedSearchResponse>>;
}

export const useCatalogData = create<CatalogStateData>((set, get) => ({
  categoriesData: [],
  subtreesList: [],
  parentsCategories: [],
  productTypesAttributes: [],
  isLoading: false,
  limit: 100,
  sort: 'price asc',
  search: '',
  isBestseller: false,
  isDiscount: false,
  offset: 0,
  setSubtreesList: (id: string, isStatus: boolean): void => {
    if (isStatus) {
      get().subtreesList.push(id);
    } else {
      const newSubtreesList = get().subtreesList.filter((idSubtrees: string) => idSubtrees !== id);
      set(() => ({ subtreesList: newSubtreesList }));
    }
  },
  createFilterByCategoriesId: (category: string): string => {
    if (get().subtreesList.length) {
      return get()
        .subtreesList.map((id) => `"${id}"`)
        .join(',');
    }

    return `subtree("${category}")`;
  },
  setOffset: (page: number): void => {
    set(() => ({ offset: page - 1 }));
  },
  setSort: (newSort: string): void => {
    set(() => ({ sort: newSort }));
  },
  setBestsellerStatus: (isStatus: boolean): void => {
    set(() => ({ isBestseller: isStatus }));
  },
  setDiscountStatus: (isStatus: boolean): void => {
    set(() => ({ isDiscount: isStatus }));
  },
  setCategoriesData: async (): Promise<void> => {
    set({ isLoading: true });

    try {
      const response = await api
        .root()
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
      const productType = await adminApiRoot.productTypes().get().execute();
      set({
        productTypesAttributes: productType.body.results,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },
  // setFuzzyLevel:():void=>{
  //   switch (searchValue.length) {
  //     case 1:
  //       fuzzylevel = 0;
  //       break;
  //     case 2:
  //       fuzzylevel = 0;
  //       break;
  //     case 3:
  //       fuzzylevel = 1;
  //       break;
  //     case 4:
  //       fuzzylevel = 1;
  //       break;
  //     case 5:
  //       fuzzylevel = 1;
  //       break;
  //     default:
  //       fuzzylevel = 2;
  //   }
  // },
  getProductsList: async (category: string): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> => {
    set({ isLoading: true });
    const newSearch = get().search.length ? [`text.en: ${get().search}`] : [];

    try {
      const productsList = await api
        .root()
        .productProjections()
        .search()
        .get({
          queryArgs: {
            sort: get().sort,
            limit: get().limit,
            newSearch,
            // 'text.en-us': `${get().search}`,
            fuzzy: true,
            fuzzyLevel: 0,

            offset: get().offset * get().limit,
            'filter.query': [
              `categories.id: ${get().createFilterByCategoriesId(category)}`,
              ...(get().isBestseller ? ['variants.attributes.bestseller: "true"'] : []),
              ...(get().isDiscount ? [`variants.attributes.discount.key: "10%-off", "15%-off", "20%-off"`] : []),
              // `variants.attributes.brand.key:${brand}`,
              // `variants.price.centAmount:range (${priceRangeStart} to ${priceRangeFinish})`,
            ],
          },
        })
        .execute();
      set({ isLoading: false });

      return productsList;
    } catch {
      set({ isLoading: false });
      throw new Error('no product by attribute or filter found');
    }
  },
}));
