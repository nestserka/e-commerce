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
  setCategoriesData: () => Promise<void>;
  setProductTypesAttributes: () => Promise<void>;
  getProductsList: (subtrees: string) => Promise<ClientResponse<ProductProjectionPagedSearchResponse>>;
}

export const useCatalogData = create<CatalogStateData>((set) => ({
  categoriesData: [],
  parentsCategories: [],
  productTypesAttributes: [],
  isLoading: false,
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
            // sort: sortpricename,
            // limit: Number(`${limit}`),
            limit: 100,
            // 'text.en-us': `${search}`,
            // fuzzy: true,
            // fuzzyLevel: Number(`${fuzzylevel}`),
            // fuzzyLevel: 2,
            // offset: 9 * 1,
            // offset:2,
            'filter.query': [
              `categories.id: subtree("${subtrees}")`,
              // `variants.attributes.color.key:${colour}`,
              // `variants.attributes.size.key:${size}`,
              // `variants.attributes.bestseller: "true"`,
              // `variants.attributes.discount.key:"10%-off", "20%-off"`,
              // `variants.attributes.winter:${winter}`,
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
