import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import style from './_discountProduct.module.scss';
import { HomeCard } from '../homeCard/HomeCard';
import { useBoundStore } from '../../../core/state/boundState';

import type { ProductProjection } from '@commercetools/platform-sdk';

export default function DiscountProduct(): JSX.Element {
  const { setDiscountedProductList, discountedProducts } = useBoundStore();

  useEffect(() => {
    const fetchDiscountedProducts = async (): Promise<void> => {
      try {
        await setDiscountedProductList();
      } catch (error) {
        console.error('Error fetching discounted products:', error);
      }
    };

    if (discountedProducts.length === 0) {
      fetchDiscountedProducts().catch((error: Error) => {
        console.log(error);
      });
    }
  }, [setDiscountedProductList, discountedProducts]);

  return (
    <section className={style['discount-section']}>
      {discountedProducts.length > 0 && (
        <>
          <section className={style['welcome-section']}>
            <h1 className={style.title}>
              <span className={style['accent-text']}>Discover </span> Amazing Deals on Our Discounted Products
            </h1>
          </section>
          <div className={style['products-block']}>
            <Swiper
              effect="coverflow"
              grabCursor
              loop
              centeredSlides
              breakpoints={{
                0: { slidesPerView: 1.5 },
                380: { slidesPerView: 1.5 },
                400: { slidesPerView: 1.5 },
                480: { slidesPerView: 1.8 },
                500: { slidesPerView: 2 },
                760: { slidesPerView: 2.5 },
                900: { slidesPerView: 3 },
                1150: { slidesPerView: 3.5 },
                1300: { slidesPerView: 4 },
                1440: { slidesPerView: 5 },
                1980: { slidesPerView: 5 },
              }}
              watchSlidesProgress
              slidesPerView={5}
              slideActiveClass={style['active-class']}
              coverflowEffect={{ rotate: 20, slideShadows: true }}
              modules={[FreeMode, Navigation, Thumbs, EffectCoverflow]}
              className={style['swiper-cont']}
            >
              {discountedProducts.map((dataCard: ProductProjection) => (
                <SwiperSlide key={dataCard.name.en}>
                  <HomeCard dataCard={dataCard} isVertical={false} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </section>
  );
}
