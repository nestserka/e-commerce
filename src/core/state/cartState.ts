import { create } from 'zustand';

import createCustomerCart from '../../api/me/cart/createCustomerCart';
import createAnonymousCart from '../../api/me/cart/createAnonimousCart';
import { LS_PREFIX } from '../../constants/constants';
import getActiveCart from '../../api/me/cart/getActiveCart';
import getAnonymousCart from '../../api/me/cart/getAnonymousCart';
import addProductToCart from '../../api/me/cart/addProductToCart';
import removeProductFromCart from '../../api/me/cart/removeProductFromCart';

import type { Cart, LineItem, MyCartRemoveLineItemAction } from '@commercetools/platform-sdk';

const anonymousCartIdLocal = localStorage.getItem(`anonymousCartId-${LS_PREFIX}`) ?? '';
const customerCartIdLocal = localStorage.getItem(`customerCart-${LS_PREFIX}`) ?? '';

interface CartState {
  anonymousCartId: string;
  customerCartId: string;
  activeCart: Cart | undefined;
  version: number | null;
  itemsInCart: LineItem[] | null;
  isLoading: boolean;
  error: string;
  isInCart: (productId: string) => boolean;
  addProductToCart: (productId: string, customerId: string, quantity?: number) => Promise<void>;
  removeProductFromCart: (items: MyCartRemoveLineItemAction[], customerId: string) => Promise<void>;
  getItemsIds: () => string[] | undefined;
  setCart: (customerId: string) => Promise<void>;
  updateCartState: (cart: Cart) => void;
  getTotalItemsDiscount: () => number;
  reset: () => void;
}

export const useCartData = create<CartState>((set, get) => ({
  anonymousCartId: anonymousCartIdLocal,
  customerCartId: customerCartIdLocal,
  activeCart: undefined,
  version: null,
  itemsInCart: null,
  isLoading: false,
  error: '',
  isInCart: (productId: string): boolean => {
    const { itemsInCart } = useCartData.getState();

    return !!itemsInCart?.filter((item) => item.id === productId || item.productId === productId).length;
  },
  setCart: async (customerId): Promise<void> => {
    set({ isLoading: true, error: '' });

    const handleCustomerCart = async (): Promise<void> => {
      try {
        let cart = await getActiveCart();

        if (!cart) {
          cart = await createCustomerCart();
        }

        set({ customerCartId: cart.id });
        get().updateCartState(cart);
        localStorage.setItem(`customerCart-${LS_PREFIX}`, cart.id);
      } catch (err) {
        console.log('Failed to get or create customer cart', err);
      }
    };

    const handleAnonymousCart = async (): Promise<void> => {
      try {
        const { anonymousCartId } = useCartData.getState();
        const cart = anonymousCartId ? await getAnonymousCart(anonymousCartId) : await createAnonymousCart();
        set({ anonymousCartId: cart.id });
        get().updateCartState(cart);
        localStorage.setItem(`anonymousCartId-${LS_PREFIX}`, cart.id);
      } catch (err) {
        console.log('Failed to get or create anonymous cart', err);
      }
    };

    if (customerId) {
      await handleCustomerCart();
    } else {
      await handleAnonymousCart();
    }

    set({ isLoading: false });
  },

  updateCartState: (cart: Cart): void => {
    set({
      activeCart: cart,
      version: cart.version,
      itemsInCart: cart.lineItems,
    });
  },

  addProductToCart: async (productId, customerId, quantity = 1): Promise<void> => {
    set({ isLoading: true, error: '' });

    const { activeCart } = useCartData.getState();

    if (activeCart) {
      const { version } = activeCart;

      try {
        const { customerCartId, anonymousCartId } = useCartData.getState();
        const cartId = customerId ? customerCartId : anonymousCartId;
        console.log('addProductToCart', customerCartId, anonymousCartId);
        const updatedCart = await addProductToCart(cartId, productId, version, quantity);
        get().updateCartState(updatedCart);
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
        get().updateCartState(updatedCart);
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
  getTotalItemsDiscount: (): number => {
    let totalDiscount = 0;

    const { itemsInCart } = useCartData.getState();

    if (itemsInCart) {
      const diffArr = itemsInCart.map((item) => {
        const value = item.price.discounted?.value.centAmount;
        let diff = 0;

        if (value) {
          const discountedPrice = value;
          const pricePerItem = item.price.value.centAmount;

          if (typeof discountedPrice === 'number' && typeof pricePerItem === 'number') {
            diff = (pricePerItem - discountedPrice) * item.quantity;
          }
        }

        return diff;
      });
      totalDiscount = diffArr.reduce((acum, value) => acum + value, 0);
    }

    return totalDiscount / 100;
  },
  reset: (): void => {
    set({
      anonymousCartId: '',
      customerCartId: '',
      activeCart: undefined,
      itemsInCart: null,
      version: null,
      isLoading: false,
      error: '',
    });
  },
}));
