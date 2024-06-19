import getHomeProductList from '../../api/products/gettHomeProductList';
import getCartDiscounts from '../../api/me/cart/cartDiscount';

import type { StateCreator } from 'zustand';
import type { QueryArgs } from '../../utils/types';
import type { CartDiscount, ProductProjection } from '@commercetools/platform-sdk';

const Images: Record<string, number> = {
  'pillars-of-creation-photo-print': 5,
  'supernova-1987a-print-poster': 3,
  'cracks-in-europa-print-poster': 1,
  'stars-orbiting-a-supermassive-black-hole-print-poster': 2,
  'the-bullet-cluster-print-poster': 3,
};

export interface HomeStateData {
  discountedProducts: ProductProjection[];
  isLoaded: boolean;
  bestProducts: ProductProjection[];
  leftSlider: ProductProjection[];
  rightSlider: ProductProjection[];
  promocodes: CartDiscount[];
  setBestProductList: () => Promise<void>;
  setDiscountedProductList: () => Promise<void>;
  images: Record<string, string>;
  setImages: (key: string) => number | undefined;
  setPromoCodes: () => Promise<void>;
}

export const useHomeData: StateCreator<HomeStateData> = (set) => ({
  discountedProducts: [],
  bestProducts: [],
  images: {},
  leftSlider: [],
  rightSlider: [],
  isLoaded: false,
  promocodes: [],
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
    set({ isLoaded: false });

    try {
      const queryArgs: QueryArgs = {
        'filter.query': [`variants.attributes.bestseller: "true"`],
      };
      const bestSellerList = await getHomeProductList(queryArgs);
      const bestProducts = bestSellerList.results;
      const midIndex = Math.ceil(bestProducts.length / 2);
      const firstHalf = bestProducts.slice(0, midIndex);
      const secondHalf = bestProducts.slice(midIndex);
      set({ bestProducts: bestSellerList.results, leftSlider: firstHalf, rightSlider: secondHalf, isLoaded: true });
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
  setPromoCodes: async (): Promise<void> => {
    try {
      const promocode = await getCartDiscounts();
      set({ promocodes: promocode?.results });
    } catch {
      throw new Error('Currently no product has been found');
    }
  },
});
