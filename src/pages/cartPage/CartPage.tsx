// import { useParams } from 'react-router';

import { useEffect } from 'react';

import style from './_cart.module.scss';
import CartView from '../../domain/cart/cartView/cartView';
import { useCartData } from '../../core/state/cartState';
import { LS_PREFIX } from '../../constants/constants';

// import type { Params } from 'react-router';

export default function CartPage(): JSX.Element {
  // const { customerId }: Readonly<Params<string>> = useParams();
  const { activeCart, isLoading, setCart, itemsInCart } = useCartData();
  const customerId = localStorage.getItem(`customerId-${LS_PREFIX}`) ?? '';

  useEffect(() => {
    const fetchCart = async (): Promise<void> => {
      await setCart(customerId);
    };

    fetchCart().catch((error: Error) => {
      console.log(error);
    });
  }, [customerId, setCart]);

  return (
    <section className={style.cart} data-testid="cart">
      {activeCart && !isLoading && <CartView />}
      {isLoading && <span>Loading...</span>}
      {activeCart && !itemsInCart && <span>Cart is empty</span>}
    </section>
  );
}
