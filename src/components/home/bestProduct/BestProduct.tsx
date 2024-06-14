import { useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import style from './_bestProduct.module.scss';
import { useHomeData } from '../../../core/state/homeState';

export default function BestProduct(): JSX.Element {
  const { setBestProductList, bestProducts } = useHomeData();

  useEffect(() => {
    const fetchDiscountedProducts = async (): Promise<void> => {
      try {
        await setBestProductList();
      } catch (error) {
        console.error('Error fetching discounted products:', error);
      }
    };

    if (bestProducts.length === 0) {
      fetchDiscountedProducts().catch((error: Error) => {
        console.log(error);
      });
    }
  }, [setBestProductList, bestProducts]);

  return (
    <section className={style['best-product-section']}>
      {bestProducts.length > 0 && (
        <section className={style['welcome-section']}>
          <h1 className={style.title}>
            <span className={style['accent-text']}>Get to know </span> <br/> our best products
          </h1>
          <ul className={style.bar}>
            <li className={style.subtitle}>exclusive meterite fragments</li>
            <li className={style.subtitle}>Hi-res Space Photos from current expeditions</li>
            <li className={style.subtitle}>Recordings from Deep space and Mission Conversations</li>
          </ul>
        </section>
      )}
    </section>
  );
}
