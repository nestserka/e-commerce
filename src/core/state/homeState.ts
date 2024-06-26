import getHomeProductList from '../../api/products/gettHomeProductList';

import type { HomeStateData } from './types';
import type { StateCreator } from 'zustand';
import type { QueryArgs } from '../../utils/types';

const Images: Record<string, number> = {
  'pillars-of-creation-photo-print': 5,
  'supernova-1987a-print-poster': 3,
  'cracks-in-europa-print-poster': 1,
  'stars-orbiting-a-supermassive-black-hole-print-poster': 2,
  'the-bullet-cluster-print-poster': 3,
  'cosmopit-space-mashed-potatoes-wit-chicken': 1,
  'cosmopit-space-chicken-shawarma': 1,
  'cosmopit-lumb-with-kebab': 1,
  'cosmopit-space-burger-with-cheese': 1,
  'cosmopit-space-french-fries': 1,
  'cosmopit-space-pizza-with-ham-doi-pa': 1,
  'cosmopit-space-ukha-king': 1,
  'cosmopit-space-borscht': 1,
};

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
});
