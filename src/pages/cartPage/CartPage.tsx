import { useParams } from 'react-router';

import style from './_cart.module.scss';
import CartView from '../../domain/cart/cartView/cartView';

import type { Params } from 'react-router';

export default function CartPage(): JSX.Element {
  const { customerId }: Readonly<Params<string>> = useParams();

  return (
    <section className={style.cart} data-testid="cart">
      <h1 className={style.title}>Shopping Cart {customerId}</h1>
      <CartView />
    </section>
  );
}
