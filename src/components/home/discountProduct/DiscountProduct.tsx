import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useEffect, useState } from 'react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import style from './_discountProduct.module.scss';
import { DiscountCard } from '../discountCard/DiscountCard';
import { useCatalogData } from '../../../core/state/homeState';

import type { ProductProjection } from '@commercetools/platform-sdk';

export default function DiscountProduct(): JSX.Element {
  const [productsList, setProductsList] = useState<ProductProjection[]>([]);
  const { getDiscountedProductsList} = useCatalogData();

  useEffect(() => {
      getDiscountedProductsList()
      .then((response) => {
        setProductsList(response.results);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, [getDiscountedProductsList]);

  return (
    <section className={style['discount-section']}>
      <section className={style['welcome-section']}>
        <h1 className={style.title}>
          <span className={style['accent-text']}>Embark </span> on a journey with
          <br />
          our discounted products!
        </h1>
      </section>
      <div className={style['products-block']}>
        {productsList.length ? (
          <Swiper
            effect="coverflow"
           grabCursor
            loop
            centeredSlides
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              400: {
                slidesPerView: 1.2,
              },
              500: {
                slidesPerView: 2,
              },
              760: {
                slidesPerView: 2.5,
              },
              900: {
                slidesPerView: 3,
              },
              1150: {
                slidesPerView:4,
              },
              1440: {
                slidesPerView: 5,
              },
              1980: {
                slidesPerView: 5,
                spaceBetween:30
              },
            }}
            watchSlidesProgress
            slideActiveClass={style['active-class']}
            coverflowEffect={{
              rotate: 20,
            }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay, EffectCoverflow]}
    
            className={style['swiper-cont']}
          >
            {productsList.map((dataCard: ProductProjection) => (
              <SwiperSlide key={dataCard.name.en}>
                <DiscountCard dataCard={dataCard} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={style['products-list-empty']}>No product by attribute or filter found</div>
        )}
      </div>
    </section>
  );
}
