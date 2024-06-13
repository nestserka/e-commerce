import { create } from 'zustand';

import withClientCredentialsFlow from '../../api/middlewareFlows/withClientCredentials';

import type { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';

const categories = import.meta.env.VITE_APP_CATEGORIES;

const Images: Record<string, string | number> = {
  'pillars-of-creation-photo-print': 5,
  'supernova-1987a-print-poster': 3,
  'cracks-in-europa-print-poster': 1,
  'stars-orbiting-a-supermassive-black-hole-print-poster': 2,
  'the-bullet-cluster-print-poster': 3,
};

export interface HometateData {
  getDiscountedProductsList: () => Promise<ProductProjectionPagedSearchResponse>;
  images: Record<string, string>;
  setImages: (key: string) => string | number;
  setCategory: (id: string) => string | undefined;
}

export const useCatalogData = create<HometateData>(() => ({
  images: {},
  getDiscountedProductsList: async (): Promise<ProductProjectionPagedSearchResponse> => {
    try {
      const productsList = await withClientCredentialsFlow()
        .productProjections()
        .search()
        .get({
          queryArgs: {
            'filter.query': [`variants.attributes.discount.key: "10%-off", "15%-off", "20%-off"`],
          },
        })
        .execute();

      return productsList.body;
    } catch {
      throw new Error('no product by attribute or filter found');
    }
  },
  setImages: (key: string): string | number => {
    if (key in Images) {
      return Images[key];
    }

    return '';
  },
  setCategory: (categoryid: string): string | undefined => {
    const categoryArray = categories.split(',').map((item) => {
      const [id, name] = item.split(':').map((str) => str.trim());

      return { id, name };
    });
    const categoryName = categoryArray.find((category) => category.id === categoryid);

    return categoryName?.name;
  },
}));
