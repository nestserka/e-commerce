import { create } from 'zustand';

import { api } from '../../api/Api';
import { apiRoot as adminApiRoot } from '../../api/AdminBuilder';

import type { Category, ProductType } from '@commercetools/platform-sdk';

export interface CatalogStateData {
  categoriesData: Category[];
  parentsCategories: Category[];
  productTypesAttributes: ProductType[];
  isLoading: boolean;
  setCategoriesData: () => Promise<void>;
  setProductTypesAttributes: () => Promise<void>;
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
      });
      set({ isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
