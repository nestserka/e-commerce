import { create } from 'zustand';

import createCustomerCart from '../../api/me/createCustomerCart';
import createAnonymousCart from '../../api/me/createAnonimousCart';
import addProductToCart from '../../api/me/addProductToCart';
import { LS_PREFIX } from '../../constants/constants';

const anonymousCartIdLocal = localStorage.getItem(`anonymousCart-${LS_PREFIX}`) ?? '';
const customerCartIdLocal = localStorage.getItem(`customerCart-${LS_PREFIX}`) ?? '';

interface CartState {
  anonymousCartId: string;
  customerCartId: string;
  isLoading: boolean;
  error: string;
  setAnonymousCartId: (id: string) => void;

  setCustomerCartId: (id: string) => void;
  addProduct: (productId: string, customerId: string) => Promise<void>;
}

export const useCartData = create<CartState>((set) => ({
  anonymousCartId: anonymousCartIdLocal,
  customerCartId: customerCartIdLocal,
  isLoading: false,
  error: '',
  setAnonymousCartId: (id): void => {
    set({ anonymousCartId: id });
  },
  setCustomerCartId: (id): void => {
    set({ customerCartId: id });
  },
  addProduct: async (productId, customerId): Promise<void> => {
    set({ isLoading: true, error: '' });

    try {
      if (customerId) {
        let { customerCartId } = useCartData.getState();

        if (!customerCartId) {
          const customerCart = await createCustomerCart();
          customerCartId = customerCart.id;
        }

        set({ customerCartId });
        localStorage.setItem(`customerCart-${LS_PREFIX}`, customerCartId);

        await addProductToCart(customerCartId, productId);
      } else {
        let { anonymousCartId } = useCartData.getState();

        if (!anonymousCartId) {
          const anonimousCart = await createAnonymousCart();
          anonymousCartId = anonimousCart.id;
        }

        set({ anonymousCartId });
        localStorage.setItem(`anonymousCart-${LS_PREFIX}`, anonymousCartId);

        await addProductToCart(anonymousCartId, productId);
      }

      set({ isLoading: false });
    } catch (err) {
      set({ error: 'Failed to add product to cart', isLoading: false });
    }
  },
}));
