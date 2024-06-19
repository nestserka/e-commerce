import { create } from 'zustand';

import { useCartData } from './cartState';
import { useHomeData } from './homeState';

import type { StateCreator } from 'zustand';
import type { CartState } from './cartState';
import type { HomeStateData } from './homeState';

const createSharedSlice: StateCreator<CartState & HomeStateData, [], [], SharedSlice> = (set, get) => ({
  getPromotionCodes: (): void => {
    const { promocodes } = get();
    set((state) => ({ ...state, promocodes }));
  },
});

export const useBoundStore = create<CartState & HomeStateData & SharedSlice>()((...a) => ({
  ...useCartData(...a),
  ...useHomeData(...a),
  ...createSharedSlice(...a),
}));

interface SharedSlice {
  getPromotionCodes: () => void;
}
