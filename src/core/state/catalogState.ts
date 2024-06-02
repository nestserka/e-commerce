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
  parentsCategories: Category[];
  productTypesAttributes: ProductType[];
  isLoading: boolean;
  limit: number;
  sort: string;
  isBestseller: boolean;
  isDiscount: boolean;
  offset: number;
  setOffset: (status: number) => void;
  setSort: (status: string) => void;
  setBestsellerStatus: (status: boolean) => void;
  setDiscountStatus: (status: boolean) => void;
  setCategoriesData: () => Promise<void>;
  setProductTypesAttributes: () => Promise<void>;
  getProductsList: (subtrees: string) => Promise<ClientResponse<ProductProjectionPagedSearchResponse>>;
}

export const useCatalogData = create<CatalogStateData>((set, get) => ({
  categoriesData: [],
  parentsCategories: [],
  productTypesAttributes: [],
  isLoading: false,
  limit: 100,
  sort: 'price asc',
  isBestseller: false,
  isDiscount: false,
  offset: 0,
  setOffset: (page: number): void => {
    set(() => ({ offset: page - 1 }));
  },
  setSort: (newSort: string): void => {
    set(() => ({ sort: newSort }));
  },
  setBestsellerStatus: (status: boolean): void => {
    set(() => ({ isBestseller: status }));
  },
  setDiscountStatus: (status: boolean): void => {
    set(() => ({ isDiscount: status }));
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
  getProductsList: async (subtrees: string): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> => {
    set({ isLoading: true });

    try {
      const productsList = await api
        .root()
        .productProjections()
        .search()
        .get({
          queryArgs: {
            sort: get().sort,
            limit: get().limit,
            // 'text.en-us': `${search}`,
            // fuzzy: true,
            // fuzzyLevel: Number(`${fuzzylevel}`),
            offset: get().offset * get().limit,
            'filter.query': [
              `categories.id: subtree("${subtrees}")`,
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
