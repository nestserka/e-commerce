import { useParams } from 'react-router';
import Swiper from 'swiper';

import 'swiper/css';

import style from './_product.module.scss';

import type { Params } from 'react-router';

export default function ProductPage(): JSX.Element {
  const { productId }: Readonly<Params<string>> = useParams();

  return (
    <section className={style.product} data-testid="product">
      Product № {productId}
    </section>
  );
}
