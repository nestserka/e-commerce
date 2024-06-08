import { create } from 'zustand';

import createCustomerCart from '../../api/me/createCustomerCart';
import createAnonymousCart from '../../api/me/createAnonimousCart';
import addProductToCart from '../../api/me/addProductToCart';
import { LS_PREFIX } from '../../constants/constants';
import getCustomerActiveCart from '../../api/me/getActiveCustomerCart';
import getAnonymousCart from '../../api/me/getAnonymousCart';

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

        // TODO не знаю может быть customerCartId и не нужно хранить пока еще не разобралась
        if (!customerCartId) {
          const customerCart = await createCustomerCart();
          customerCartId = customerCart.id;
        }

        set({ customerCartId });
        localStorage.setItem(`customerCart-${LS_PREFIX}`, customerCartId);

        // TODO это пока заглушка с логированием id корзины в консоль
        await addProductToCart(customerCartId, productId);
      } else {
        let { anonymousCartId } = useCartData.getState();

        // TODO тут запрашиваю анонмную корзину, она падает 404 ответом, в блоке catch создаю новую, при релаоде страницы корзина остается той же по id
        try {
          const anonymousCart = await getAnonymousCart();
          anonymousCartId = anonymousCart.id;
        } catch {
          const anonimousCart = await createAnonymousCart();
          anonymousCartId = anonimousCart.id;
          set({ anonymousCartId });
          localStorage.setItem(`anonymousCart-${LS_PREFIX}`, anonymousCartId);
        }

        await addProductToCart(anonymousCartId, productId);
      }

      set({ isLoading: false });
    } catch (err) {
      set({ error: 'Failed to add product to cart', isLoading: false });
    }
  },
}));
