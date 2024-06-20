import { useEffect } from 'react';

import style from './_cart.module.scss';
import CartView from '../../domain/cart/cartView/cartView';
import { useBoundStore } from '../../core/state/boundState';

export default function CartPage(): JSX.Element {
  const { activeCart, itemsInCart, setPromoCodes, setCurrentUsedPromoCodes } = useBoundStore();

  useEffect(() => {
    const fetchPromoCodes = async (): Promise<void> => {
      try {
        await setPromoCodes();
        setCurrentUsedPromoCodes();
      } catch (err) {
        console.error('Error fetching promo codes:', err);
      }
    };

    fetchPromoCodes().catch((err) => {
      console.log(err);
    });
  }, [setPromoCodes, setCurrentUsedPromoCodes]);

  return (
    <section className={style.cart} data-testid="cart">
      {activeCart && <CartView />}
      {activeCart && !itemsInCart && <span>Cart is empty</span>}
    </section>
  );
}
