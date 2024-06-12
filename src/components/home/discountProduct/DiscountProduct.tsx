import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import getProductsDiscountList from '../../../api/products/getProductsDiscountList';
import style from './_discountProduct.module.scss';
import { DiscountCard } from '../discountCard/DiscountCard';

import type { ProductProjection } from '@commercetools/platform-sdk';

export default function DiscountProduct(): JSX.Element {
  const [productsList, setProductsList] = useState<ProductProjection[]>([]);

  useEffect(() => {
    getProductsDiscountList()
      .then((response) => {
        setProductsList(response.results);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, []);

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
            breakpoints={{
              400: {
                slidesPerView: 1.5,
              },
              500: {
                slidesPerView: 2,
              },
              750: {
                slidesPerView: 3,
              },
              900: {
                slidesPerView: 3.5,
              },
              1200: {
                slidesPerView: 5,
              },
              1390: {
                slidesPerView: 5,
              },
              1440: {
                slidesPerView: 6,
              },
              1500: {
                slidesPerView: 6,
              },
              2100: {
                slidesPerView: 7,
              },
            }}            
            slidesPerView={5}
            watchSlidesProgress
            slideActiveClass={style['active-class']}
            centeredSlides
            coverflowEffect={{
              rotate: 20,
              slideShadows: true,
              depth: 3,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            // pagination={{ el: '.swiper-pagination', clickable: true }}

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
