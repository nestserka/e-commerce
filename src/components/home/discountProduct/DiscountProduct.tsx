import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';


import getProductsDiscountList from '../../../api/products/getProductsDiscountList';
import style from  './_discountProduct.module.scss';
import { DiscountCard } from '../discountCard/DiscountCard';

import type { ProductProjection } from '@commercetools/platform-sdk';


export default function DiscountProduct(): JSX.Element {
  const [productsList, setProductsList] = useState<ProductProjection[]>([]);
  
  useEffect(() => {
   getProductsDiscountList().then((response)=> {
    setProductsList(response.results);
    }).catch((error : Error) => {
        console.log(error) 

    })
  }, []);

  return <section className={style['discount-section']}>
    <section className={style['welcome-section']}>
    <h1 className={style.title}>
          <span className={style['accent-text']}>Embark </span> on a journey with
          <br />
          our discounted products!
        </h1>
    </section>
    <div className={style['products-block']}>
      {productsList.length ? (
        <Swiper effect="coverFlow"
        grabCursor
        centeredSlides
        loop
        slidesPerView="auto"
        coverflowEffect={ {
          rotate: 0,
          stretch:0,
          depth: 100,
          modifier: 2.5,
        }
        }  className={style.swiper_container}>
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
  </section>;
}
