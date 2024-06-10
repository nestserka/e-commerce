import style from './_cartToggleButton.module.scss';
import { useCartData } from '../../../core/state/cartState';
import { useLoginData } from '../../../core/state/userState';

import type { PAGES } from '../../../constants/constants';

interface CartToggleButtonProps {
  productId: string;
  page: keyof typeof PAGES;
}

export default function CartToggleButton({ productId, page }: CartToggleButtonProps): JSX.Element {
  const { addProductToCart } = useCartData();
  const { customerId } = useLoginData();

  return (
    <button
      type="button"
      onClick={() => addProductToCart(productId, customerId)}
      className={page === 'PRODUCT' ? 'button-primary' : style['toggle-cart-button-catalog']}
    >
      Add to Cart
    </button>
  );
}
