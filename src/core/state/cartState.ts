import createCustomerCart from '../../api/me/cart/createCustomerCart';
import createAnonymousCart from '../../api/me/cart/createAnonimousCart';
import { LS_PREFIX } from '../../constants/constants';
import getActiveCart from '../../api/me/cart/getActiveCart';
import getAnonymousCart from '../../api/me/cart/getAnonymousCart';
import addProductToCart from '../../api/me/cart/addProductToCart';
import removeProductFromCart from '../../api/me/cart/removeProductFromCart';
import addDiscountCodeToCart from '../../api/me/cart/addDiscountCode';
import removeDiscountsFromCard from '../../api/me/cart/removeDiscount';
import getDiscountCodes from '../../api/me/cart/discountCodes';

import type { StateCreator } from 'zustand';
import type {
  Cart,
  DiscountCode,
  LineItem,
  MyCartRemoveDiscountCodeAction,
  MyCartRemoveLineItemAction,
} from '@commercetools/platform-sdk';

const anonymousCartIdLocal = localStorage.getItem(`anonymousCartId-${LS_PREFIX}`) ?? '';
const customerCartIdLocal = localStorage.getItem(`customerCart-${LS_PREFIX}`) ?? '';

export interface CartState {
  anonymousCartId: string;
  customerCartId: string;
  activeCart: Cart | undefined;
  version: number | null;
  itemsInCart: LineItem[] | null;
  isPromocodeApplied: boolean;
  isLoading: boolean;
  error: string;
  promocodes: DiscountCode[];
  appliedCoupons: AppliedCoupon[] | null;
  isInCart: (productId: string) => boolean;
  addProductToCart: (productId: string, customerId: string, quantity?: number) => Promise<void>;
  removeProductFromCart: (items: MyCartRemoveLineItemAction[], customerId: string) => Promise<void>;
  getItemsIds: () => string[] | undefined;
  setCart: (customerId: string) => Promise<void>;
  updateCartState: (cart: Cart) => void;
  getTotalItemsDiscount: () => number;
  addDiscountCode: (customerId: string, codeStr: string) => Promise<void>;
  reset: () => void;
  removeDiscountFromCard: (body: MyCartRemoveDiscountCodeAction, version: number, id: string) => Promise<void>;
  checkIfAlreadyExist: (promoCode: string) => boolean;
  setCurrentUsedPromoCodes: () => void;
  setPromoCodes: () => Promise<void>;
}

interface AppliedCoupon {
  id: string;
  name: string;
}

export const useCartData: StateCreator<CartState> = (set, get) => ({
  anonymousCartId: anonymousCartIdLocal,
  customerCartId: customerCartIdLocal,
  activeCart: undefined,
  version: null,
  itemsInCart: null,
  isPromocodeApplied: false,
  isLoading: false,
  error: '',
  promocodes: [],
  appliedCoupons: null,
  isInCart: (productId: string): boolean =>
    !!get().itemsInCart?.filter((item) => item.id === productId || item.productId === productId).length,
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
        console.error('Failed to get or create customer cart', err);

        const cart = await createCustomerCart();
        get().updateCartState(cart);
        set({ customerCartId: cart.id });
        localStorage.setItem(`customerCart-${LS_PREFIX}`, cart.id);
      }
    };

    const handleAnonymousCart = async (): Promise<void> => {
      try {
        const { anonymousCartId } = get();
        const cart = anonymousCartId ? await getAnonymousCart(anonymousCartId) : await createAnonymousCart();
        set({ anonymousCartId: cart.id });
        get().updateCartState(cart);
        localStorage.setItem(`anonymousCartId-${LS_PREFIX}`, cart.id);
      } catch (err) {
        console.error('Failed to get or create anonymous cart', err);

        const cart = await createAnonymousCart();
        get().updateCartState(cart);
        set({ anonymousCartId: cart.id });
        localStorage.setItem(`anonymousCartId-${LS_PREFIX}`, cart.id);
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
      isPromocodeApplied:
        !!cart.discountOnTotalPrice || !!cart.lineItems.some((item) => !!(item.discountedPricePerQuantity.length > 0)),
    });
  },

  addProductToCart: async (productId, customerId, quantity = 1): Promise<void> => {
    set({ isLoading: true, error: '' });

    const { activeCart } = get();

    if (activeCart) {
      const { version } = activeCart;

      try {
        const cartId = customerId ? get().customerCartId : get().anonymousCartId;
        const updatedCart = await addProductToCart(cartId, productId, version, quantity);
        get().updateCartState(updatedCart);
      } catch (err) {
        console.error(err);
      }
    }

    set({ isLoading: false });
  },
  removeProductFromCart: async (action, customerId): Promise<void> => {
    set({ isLoading: true, error: '' });

    const { activeCart } = get();

    if (activeCart) {
      const { version } = activeCart;

      try {
        const cartId = customerId ? get().customerCartId : get().anonymousCartId;
        const updatedCart = await removeProductFromCart(cartId, action, version);
        get().updateCartState(updatedCart);
      } catch (err) {
        console.error(err);
      }
    }

    set({ isLoading: false });
  },
  getItemsIds: (): string[] | undefined => {
    const arrIds = get().itemsInCart?.map((item) => item.id);

    return arrIds;
  },
  getTotalItemsDiscount: (): number => {
    let totalDiscount = 0;

    const { itemsInCart } = get();

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
  addDiscountCode: async (customerId: string, codeStr: string): Promise<void> => {
    set({ isLoading: true, error: '' });

    const { activeCart } = get();

    if (activeCart) {
      const { version } = activeCart;

      try {
        const cartId = customerId ? get().customerCartId : get().anonymousCartId;
        await addDiscountCodeToCart(cartId, version, codeStr).then((response) => {
          const appliedPromoCode = response.discountCodes[response.discountCodes.length - 1];

          let message = null;

          switch (appliedPromoCode.state) {
            case 'DoesNotMatchCart':
              message = `Failed to add promocode ${codeStr} to the cart. Check if all conditions met.`;
              break;
            case 'ApplicationStoppedByPreviousDiscount':
              message = `You cannot apply this promocode ${codeStr} after adding previous coupon(s) on total discount.`;
              break;
            case 'MatchesCart':
              get().updateCartState(response);

              get().setCurrentUsedPromoCodes();
              break;
            default:
              break;
          }

          if (message) {
            const body: MyCartRemoveDiscountCodeAction = {
              action: 'removeDiscountCode',
              discountCode: {
                typeId: appliedPromoCode.discountCode.typeId,
                id: appliedPromoCode.discountCode.id,
              },
            };
            set({ error: message });
            get()
              .removeDiscountFromCard(body, response.version, response.id)
              .catch((err) => {
                console.error(err);
              });
          }
        });
      } catch (err) {
        set({ error: `Failed to add promocode to the cart. Check if the promocode ${codeStr} exists.` });
        console.error(`Failed to add promocode to the cart. Check if the promocode ${codeStr} exists.`, err);
      }
    }

    set({ isLoading: false });
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
      appliedCoupons: null,
    });
  },
  removeDiscountFromCard: async (body: MyCartRemoveDiscountCodeAction, version: number, id: string): Promise<void> => {
    await removeDiscountsFromCard(body, version, id)
      .then((response) => {
        get().updateCartState(response);
        const updatedCoupns = get().appliedCoupons?.filter((coupon) => coupon.id !== body.discountCode.id);
        set({ appliedCoupons: updatedCoupns });
      })
      .catch((err) => {
        console.error('Failed to set the cart: ', err);
      });
  },
  checkIfAlreadyExist: (promocode: string): boolean => {
    const isPromoExist = !!get().appliedCoupons?.filter((item) => item.name === promocode).length;

    if (isPromoExist) {
      set({ error: 'The coupon was already applied' });

      return true;
    }

    return isPromoExist;
  },
  setCurrentUsedPromoCodes: (): void => {
    if (get().activeCart?.discountCodes) {
      const matchingCodes: AppliedCoupon[] = [];
      get().activeCart?.discountCodes.forEach((cartCode) => {
        const matchingCode = get().promocodes.find((discountCode) => discountCode.id === cartCode.discountCode.id);

        if (matchingCode) {
          matchingCodes.push({ id: matchingCode.id, name: matchingCode.code });
        }
      });
      set({ appliedCoupons: matchingCodes });
    }
  },
  setPromoCodes: async (): Promise<void> => {
    try {
      const promocode = await getDiscountCodes();
      set({ promocodes: promocode?.results });
    } catch {
      throw new Error('Currently no product discounts has been found');
    }
  },
});
