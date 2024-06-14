import { create } from 'zustand';

import withClientCredentialsFlow from '../../api/middlewareFlows/withClientCredentials';

import type { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';

const Images: Record<string, number> = {
  'pillars-of-creation-photo-print': 5,
  'supernova-1987a-print-poster': 3,
  'cracks-in-europa-print-poster': 1,
  'stars-orbiting-a-supermassive-black-hole-print-poster': 2,
  'the-bullet-cluster-print-poster': 3,
};

export interface HometateData {
  getDiscountedProductsList: () => Promise<ProductProjectionPagedSearchResponse>;
  images: Record<string, string>;
  setImages: (key: string) => number | undefined;
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
  setImages: (key: string): number | undefined => {
    if (key in Images) {
      return Images[key];
    }

    return undefined;
  },
}));
