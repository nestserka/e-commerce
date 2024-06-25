import { create } from 'zustand';

import { useCartData } from './cartState';
import { useHomeData } from './homeState';

import type { CartState, HomeStateData } from './types';

export const useBoundStore = create<CartState & HomeStateData>()((...a) => ({
  ...useCartData(...a),
  ...useHomeData(...a),
}));
