// import { useParams } from 'react-router';

import { useEffect } from 'react';

import style from './_cart.module.scss';
import CartView from '../../domain/cart/cartView/cartView';
import getCustomerActiveCart from '../../api/me/cart/getActiveCustomerCart';
import { useCartData } from '../../core/state/cartState';
import getAnonymousCart from '../../api/me/cart/getAnonymousCart';

import type { Cart } from '@commercetools/platform-sdk';

// import type { Params } from 'react-router';

export default function CartPage(): JSX.Element {
  // const { customerId }: Readonly<Params<string>> = useParams();
  const { anonymousCartId, customerCartId, activeCart, setActiveCart } = useCartData();

  useEffect(() => {
    const fetchCart = async (): Promise<void> => {
      if (anonymousCartId) {
        await getAnonymousCart()
          .then((response: Cart) => {
            setActiveCart(response);
          })
          .catch(() => {});
      }

      if (customerCartId) {
        await getCustomerActiveCart()
          .then((response: Cart | undefined) => {
            if (response) setActiveCart(response);
          })
          .catch(() => {});
      }
    };

    fetchCart().catch((error: Error) => {
      console.log(error);
    });
  }, [anonymousCartId, customerCartId, setActiveCart]);

  return (
    <section className={style.cart} data-testid="cart">
      {activeCart && <CartView />}
      {!activeCart && <span>Cart is empty</span>}
    </section>
  );
}
