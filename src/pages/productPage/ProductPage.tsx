import { useParams } from 'react-router';

import style from './_product.module.scss';

import type { Params } from 'react-router';

export default function ProductPage(): JSX.Element {
  const { productId }: Readonly<Params<string>> = useParams();
  console.log('product');

  return (
    <section className={style.product} data-testid="product">
      Product {productId}
    </section>
  );
}
