import { create } from 'zustand';

import createCustomerCart from '../../api/me/cart/createCustomerCart';
import createAnonymousCart from '../../api/me/cart/createAnonimousCart';
import { LS_PREFIX } from '../../constants/constants';
import getActiveCart from '../../api/me/cart/getActiveCart';
import getAnonymousCart from '../../api/me/cart/getAnonymousCart';
import addProductToCart from '../../api/me/cart/addProductToCart';
import removeProductFromCart from '../../api/me/cart/removeProductFromCart';
import { getTotalDiscount } from '../../utils/utils';

import type { Cart, LineItem, MyCartRemoveLineItemAction } from '@commercetools/platform-sdk';

const anonymousCartIdLocal = localStorage.getItem(`anonymousCartId-${LS_PREFIX}`) ?? '';
const customerCartIdLocal = localStorage.getItem(`customerCart-${LS_PREFIX}`) ?? '';

interface CartState {
  anonymousCartId: string;
  customerCartId: string;
  activeCart: Cart | undefined;
  version: number | null;
  itemsInCart: LineItem[] | null;
  totalDiscount: number | null;
  isLoading: boolean;
  error: string;
  isInCart: (productId: string) => boolean;
  addProductToCart: (productId: string, customerId: string) => Promise<void>;
  removeProductFromCart: (items: MyCartRemoveLineItemAction[], customerId: string) => Promise<void>;
  getItemsIds: () => string[] | undefined;
  setCart: (customerId: string) => Promise<void>;
  reset: () => void;
}

export const useCartData = create<CartState>((set) => ({
  anonymousCartId: anonymousCartIdLocal,
  customerCartId: customerCartIdLocal,
  activeCart: undefined,
  version: null,
  itemsInCart: null,
  totalDiscount: null,
  isLoading: false,
  error: '',
  isInCart: (productId: string): boolean => {
    const { itemsInCart } = useCartData.getState();

    return !!itemsInCart?.filter((item) => item.id === productId || item.productId === productId).length;
  },

  // eslint-disable-next-line max-statements
  setCart: async (customerId): Promise<void> => {
    set({ isLoading: true, error: '' });

    let { activeCart } = useCartData.getState();

    if (customerId) {
      try {
        activeCart = await getActiveCart();
      } catch (err) {
        console.log('Failed to get active customer cart', err);
      }

      if (!activeCart) {
        try {
          activeCart = await createCustomerCart();
        } catch (err) {
          console.log('Failed to create active customer cart', err);
        }
      }

      if (activeCart) {
        set({ activeCart });
        set({ version: activeCart.version });
        set({ customerCartId: activeCart.id });
        set({ itemsInCart: activeCart.lineItems });
        set({ totalDiscount: getTotalDiscount(activeCart.lineItems) });

        const { customerCartId } = useCartData.getState();
        localStorage.setItem(`customerCart-${LS_PREFIX}`, customerCartId);
      }

      set({ isLoading: false });
    } else {
      const { anonymousCartId } = useCartData.getState();

      if (anonymousCartId) {
        activeCart = await getAnonymousCart(anonymousCartId);
      } else {
        activeCart = await createAnonymousCart();
      }

      set({ activeCart });
      set({ version: activeCart.version });
      set({ anonymousCartId: activeCart.id });
      set({ itemsInCart: activeCart.lineItems });
      set({ totalDiscount: getTotalDiscount(activeCart.lineItems) });

      console.log('setCart', activeCart.id);
      localStorage.setItem(`anonymousCartId-${LS_PREFIX}`, activeCart.id);
    }

    set({ isLoading: false });
  },

  addProductToCart: async (productId, customerId): Promise<void> => {
    set({ isLoading: true, error: '' });

    const { activeCart } = useCartData.getState();

    if (activeCart) {
      const { version } = activeCart;

      try {
        const { customerCartId, anonymousCartId } = useCartData.getState();
        const cartId = customerId ? customerCartId : anonymousCartId;
        const updatedCart = await addProductToCart(cartId, productId, version);
        set({ version: updatedCart.version });
        set({ activeCart: updatedCart });
        set({ itemsInCart: updatedCart.lineItems });
        set({ totalDiscount: getTotalDiscount(activeCart.lineItems) });
      } catch (err) {
        console.log(err);
      }
    }

    set({ isLoading: false });
  },
  removeProductFromCart: async (action, customerId): Promise<void> => {
    set({ isLoading: true, error: '' });

    const { activeCart } = useCartData.getState();

    if (activeCart) {
      const { version } = activeCart;

      try {
        const { customerCartId, anonymousCartId } = useCartData.getState();
        const cartId = customerId ? customerCartId : anonymousCartId;
        const updatedCart = await removeProductFromCart(cartId, action, version);
        const totalDiscountValue = getTotalDiscount(activeCart.lineItems);
        set({ version: updatedCart.version });
        set({ activeCart: updatedCart });
        set({ itemsInCart: updatedCart.lineItems });
        set({ totalDiscount: totalDiscountValue });
      } catch (err) {
        console.log(err);
      }
    }

    set({ isLoading: false });
  },
  getItemsIds: (): string[] | undefined => {
    const { itemsInCart } = useCartData.getState();
    const arrIds = itemsInCart?.map((item) => item.id);

    return arrIds;
  },
  reset: (): void => {
    set({
      anonymousCartId: '',
      customerCartId: '',
      activeCart: undefined,
      itemsInCart: null,
      version: null,
      totalDiscount: null,
      isLoading: false,
      error: '',
    });
  },
}));