// import { useParams } from 'react-router';

import { useEffect } from 'react';

import style from './_cart.module.scss';
import CartView from '../../domain/cart/cartView/cartView';
import getCustomerActiveCart from '../../api/me/cart/getActiveCustomerCart';
import { useCartData } from '../../core/state/cartState';
import getAnonymousCart from '../../api/me/cart/getAnonymousCart';
import { LS_PREFIX } from '../../constants/constants';

import type { Cart } from '@commercetools/platform-sdk';

// import type { Params } from 'react-router';

export default function CartPage(): JSX.Element {
  // const { customerId }: Readonly<Params<string>> = useParams();
  const { anonymousCartId, customerCartId, activeCart, isLoading, setActiveCart, setItemsInCart } = useCartData();
  const customerId = localStorage.getItem(`customerId-${LS_PREFIX}`) ?? '';

  useEffect(() => {
    const fetchCart = async (): Promise<void> => {
      if (customerId) {
        await getCustomerActiveCart()
          .then((response: Cart | undefined) => {
            if (response) {
              setActiveCart(response);
              setItemsInCart(response.lineItems);
            }
          })
          .catch(() => {});
      } else {
        await getAnonymousCart()
          .then((response: Cart) => {
            setActiveCart(response);
            setItemsInCart(response.lineItems);
          })
          .catch(() => {});
      }
    };

    fetchCart().catch((error: Error) => {
      console.log(error);
    });
  }, [anonymousCartId, customerCartId, setActiveCart, setItemsInCart, customerId]);

  return (
    <section className={style.cart} data-testid="cart">
      {activeCart && !isLoading && <CartView />}
      {isLoading && <span>Loading...</span>}
      {!activeCart && <span>Cart is empty</span>}
    </section>
  );
}
