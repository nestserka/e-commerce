import { create } from 'zustand';

import { useCartData } from './cartState';
import { useHomeData } from './homeState';

import type { CartState } from './cartState';
import type { HomeStateData } from './homeState';

export const useBoundStore = create<CartState & HomeStateData>()((...a) => ({
  ...useCartData(...a),
  ...useHomeData(...a),
}));
