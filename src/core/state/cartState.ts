import { create } from 'zustand';

import createCustomerCart from '../../api/me/cart/createCustomerCart';
import createAnonymousCart from '../../api/me/cart/createAnonimousCart';
import { LS_PREFIX } from '../../constants/constants';
import getCustomerActiveCart from '../../api/me/cart/getActiveCustomerCart';
import getAnonymousCart from '../../api/me/cart/getAnonymousCart';
import addProductToCart from '../../api/me/cart/addProductToCart';

import type { Cart, LineItem } from '@commercetools/platform-sdk';

const anonymousCartIdLocal = localStorage.getItem(`anonymousCartId-${LS_PREFIX}`) ?? '';
const customerCartIdLocal = localStorage.getItem(`customerCart-${LS_PREFIX}`) ?? '';
const anonymousIdLocal = localStorage.getItem(`anonymousId-${LS_PREFIX}`) ?? '';

interface CartState {
  anonymousId: string;
  anonymousCartId: string;
  customerCartId: string;
  activeCart: Cart | undefined;
  itemsInCart: LineItem[] | null;
  isLoading: boolean;
  error: string;
  addProductToCart: (productId: string, customerId: string) => Promise<void>;
  setCart: (customerId: string) => Promise<void>;
  reset: () => void;
}

// TODO стейт корзины находится тут
export const useCartData = create<CartState>((set) => ({
  anonymousId: anonymousIdLocal,
  anonymousCartId: anonymousCartIdLocal,
  customerCartId: customerCartIdLocal,
  activeCart: undefined,
  itemsInCart: null,
  isLoading: false,
  error: '',

  // TODO этот метод вызываю при заходе на страницу корзины, он получает или создают либо анонимную либо пользовательскую корзину
  // activeCart это активная корзина на данный момент

  setCart: async (customerId): Promise<void> => {
    set({ isLoading: true, error: '' });

    let { activeCart } = useCartData.getState();

    if (customerId) {
      try {
        activeCart = await getCustomerActiveCart();
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
        set({ customerCartId: activeCart.id });
        set({ itemsInCart: activeCart.lineItems });

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
      set({ anonymousId: activeCart.anonymousId });
      console.log('setCart', activeCart.anonymousId);
      set({ anonymousCartId: activeCart.id });
      set({ itemsInCart: activeCart.lineItems });

      const { anonymousId } = useCartData.getState();

      // TODO эти данные сохраняю в локалсторадж чтобы сохранять анонимную корзину на релоад страницы
      // а также чтобы передать id анонимной корзины при логине но пока что корзины смержить не получилось увы

      localStorage.setItem(`anonymousId-${LS_PREFIX}`, anonymousId);

      localStorage.setItem(`anonymousCartId-${LS_PREFIX}`, activeCart.id);
    }

    set({ isLoading: false });
  },

  // TODO этот метод вызывается по клику на кнопку Add to cart
  addProductToCart: async (productId, customerId): Promise<void> => {
    set({ isLoading: true, error: '' });

    const { activeCart } = useCartData.getState();

    console.log('addProductToCart', activeCart);

    if (activeCart) {
      const { version } = activeCart;

      if (customerId) {
        try {
          const { customerCartId } = useCartData.getState();
          await addProductToCart(customerCartId, productId, version);
          console.log(`Product ${productId} added to cart with id ${customerCartId}`);
        } catch (err) {
          console.log(err);
        }
      } else {
        const { anonymousCartId } = useCartData.getState();
        await addProductToCart(anonymousCartId, productId, version);
        console.log(`Product ${productId} added to cart with id ${anonymousCartId}`);
      }
    }
  },
  reset: (): void => {
    set({
      anonymousCartId: '',
      customerCartId: '',
      activeCart: undefined,
      itemsInCart: null,
      isLoading: false,
      error: '',
    });
  },
}));
