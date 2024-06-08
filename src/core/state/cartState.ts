import { create } from 'zustand';

import createCustomerCart from '../../api/me/cart/createCustomerCart';
import createAnonymousCart from '../../api/me/cart/createAnonimousCart';
import addProductToCustomerCart from '../../api/me/cart/addProductToCustomerCart';
import { LS_PREFIX } from '../../constants/constants';
import getCustomerActiveCart from '../../api/me/cart/getActiveCustomerCart';
import getAnonymousCart from '../../api/me/cart/getAnonymousCart';
import addProductToAnonymousCart from '../../api/me/cart/addProductToAnonymousCart';

import type { Cart } from '@commercetools/platform-sdk';

const anonymousCartIdLocal = localStorage.getItem(`anonymousCart-${LS_PREFIX}`) ?? '';
const customerCartIdLocal = localStorage.getItem(`customerCart-${LS_PREFIX}`) ?? '';

interface CartState {
  anonymousCartId: string;
  customerCartId: string;
  activeCart: Cart | null;
  isLoading: boolean;
  error: string;
  setAnonymousCartId: (id: string) => void;
  setCustomerCartId: (id: string) => void;
  setActiveCart: (cart: Cart) => void;
  addProduct: (productId: string, customerId: string) => Promise<void>;
}

// TODO стейт корзины находится тут
export const useCartData = create<CartState>((set) => ({
  anonymousCartId: anonymousCartIdLocal,
  customerCartId: customerCartIdLocal,
  activeCart: null,
  isLoading: false,
  error: '',
  setAnonymousCartId: (id): void => {
    set({ anonymousCartId: id });
  },
  setCustomerCartId: (id): void => {
    set({ customerCartId: id });
  },
  setActiveCart: (activeCart: Cart): void => {
    set({ activeCart });
  },

  // TODO этот метод вызывается по клику на кнопку Add to cart
  addProduct: async (productId, customerId): Promise<void> => {
    set({ isLoading: true, error: '' });

    try {
      // TODO проверка по customerId, если есть то запрашиваю активную корзину через Password Flow
      if (customerId) {
        let { customerCartId } = useCartData.getState();

        const activeCart = await getCustomerActiveCart();
        customerCartId = activeCart?.id ?? '';
        let cartVersion = activeCart?.version;

        // TODO не знаю может быть customerCartId и не нужно хранить пока еще не разобралась
        if (!customerCartId) {
          const customerCart = await createCustomerCart();
          customerCartId = customerCart.id;
          cartVersion = customerCart.version;
        }

        set({ customerCartId });
        localStorage.setItem(`customerCart-${LS_PREFIX}`, customerCartId);

        // TODO это пока заглушка с логированием id корзины в консоль
        if (cartVersion) await addProductToCustomerCart(customerCartId, productId, cartVersion);
      } else {
        let { anonymousCartId } = useCartData.getState();
        let cartVersion;

        // TODO тут запрашиваю анонмную корзину, она падает 404 ответом, в блоке catch создаю новую, при релаоде страницы корзина остается той же по id
        try {
          const anonymousCart = await getAnonymousCart();
          anonymousCartId = anonymousCart.id;
          cartVersion = anonymousCart.version;
        } catch {
          const anonimousCart = await createAnonymousCart();
          anonymousCartId = anonimousCart.id;
          cartVersion = anonimousCart.version;
          set({ anonymousCartId });
          localStorage.setItem(`anonymousCart-${LS_PREFIX}`, anonymousCartId);
        }

        await addProductToAnonymousCart(anonymousCartId, productId, cartVersion);
      }

      set({ isLoading: false });
    } catch (err) {
      set({ error: 'Failed to add product to cart', isLoading: false });
    }
  },
}));
