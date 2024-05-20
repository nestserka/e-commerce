import { useParams } from 'react-router';

import style from './_cart.module.scss';

import type { Params } from 'react-router';

export default function CartPage(): JSX.Element {
  const { customerId }: Readonly<Params<string>> = useParams();

  return (
    <section className={style.cart} data-testid="cart">
      CartPage{customerId}
    </section>
  );
}
