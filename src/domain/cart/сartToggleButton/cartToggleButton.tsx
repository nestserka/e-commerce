import { useCartData } from '../../../core/state/cartState';
import { useLoginData } from '../../../core/state/userState';

import type { PAGES } from '../../../constants/constants';

interface CartToggleButtonProps {
  productId: string | undefined;
  page: keyof typeof PAGES;
}

export default function CartToggleButton({ productId, page }: CartToggleButtonProps): JSX.Element {
  const { customerId } = useLoginData();
  const { activeCart, setCart, addProductToCart, isInCart } = useCartData();

  const handleAddToCart = async (): Promise<void> => {
    if (!activeCart) {
      try {
        await setCart(customerId);
      } catch (err) {
        console.log((err as Error).message);

        return;
      }
    }

    try {
      if (productId) {
        await addProductToCart(productId, customerId);
      }
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  const productInCart = productId ? isInCart(productId) : false;

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={productInCart}
      className={page === 'PRODUCT' ? 'button-primary' : 'button-secondary'}
    >
      {productId && isInCart(productId) ? 'Already in Cart' : 'Add to Cart'}
    </button>
  );
}
