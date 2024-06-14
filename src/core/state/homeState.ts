import { create } from 'zustand';

import getHomeProductList from '../../api/products/gettHomeProductList';

import type { QueryArgs } from '../../utils/types';
import type { ProductProjection } from '@commercetools/platform-sdk';

const Images: Record<string, number> = {
  'pillars-of-creation-photo-print': 5,
  'supernova-1987a-print-poster': 3,
  'cracks-in-europa-print-poster': 1,
  'stars-orbiting-a-supermassive-black-hole-print-poster': 2,
  'the-bullet-cluster-print-poster': 3,
};

export interface HometateData {
  discountedProducts: ProductProjection[];
  bestProducts: ProductProjection[];
  setBestProductList: () => Promise<void>;
  setDiscountedProductList: () => Promise<void>;
  images: Record<string, string>;
  setImages: (key: string) => number | undefined;
}

export const useHomeData = create<HometateData>((set) => ({
  discountedProducts: [],
  bestProducts: [],
  images: {},
  setDiscountedProductList: async (): Promise<void> => {
    try {
      const queryArgs: QueryArgs = {
        'filter.query': ['variants.attributes.discount.key: "10%-off", "15%-off", "20%-off"'],
      };
      const productsList = await getHomeProductList(queryArgs);
      console.log(productsList);
      set({ discountedProducts: productsList.results });
    } catch {
      throw new Error('There are no products on sales');
    }
  },
  setBestProductList: async (): Promise<void> => {
    try {
      const queryArgs: QueryArgs = {
        'filter.query': [`variants.attributes.bestseller: "true"`],
      };
      const bestSellerList = await getHomeProductList(queryArgs);
      set({ bestProducts: bestSellerList.results });
    } catch {
      throw new Error('Currently no product has been found');
    }
  },
  setImages: (key: string): number | undefined => {
    if (key in Images) {
      return Images[key];
    }

    return undefined;
  },
}));
