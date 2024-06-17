import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Swiper as SwiperProps } from 'swiper';
import { Controller, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './slider-home.scss';
import style from './_bestProduct.module.scss';
import { useHomeData } from '../../../core/state/homeState';
import { HomeCard } from '../homeCard/HomeCard';
import { ROUTES } from '../../../constants/constants';
import arrowIcon from '../../../assets/images/icons/arrow-icon.png';
import Loader from '../../loader/Loader';

import type { ProductProjection } from '@commercetools/platform-sdk';

export default function BestProduct(): JSX.Element {
  const { setBestProductList, bestProducts, leftSlider, rightSlider, isLoaded } = useHomeData();
  const [leftSwiper, setLeftSwiper] = useState<SwiperProps | null>(null);
  const [rightSwiper, setRightSwiper] = useState<SwiperProps | null>(null);
  const navigate = useNavigate();

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
  }, [setBestProductList, bestProducts, isLoaded]);

  return (
    <section className={style['moon-wrapper']}>
      {isLoaded ? (
        <section className={style['best-product-section']}>
          <section className={style['welcome-section']}>
            <h1 className={style.title}>
              <span className={style['accent-text']}>Get to know </span> <br /> our best products
            </h1>
            <section className={style['progress-wrapper']}>
              <div className={style.progress}>
                <span className={`${style.bar} ${style.wrapper}`} />
                <div className={style.circle}>
                  <div className={`${style.title} ${style.meteorite}`}>exclusive meterite fragments</div>
                </div>

                <span className={style.bar} />

                <div className={style.circle}>
                  <div className={style.title}>Hi-res Space Photos from current expeditions</div>
                </div>
                <span className={style.bar} />
                <div className={style.circle}>
                  <span className={style.title}>Recordings from Deep space and Mission Conversations</span>
                </div>
                <span className={`${style.bar} ${style.wrapper}`} />
              </div>
              <button
                type="button"
                className={style['navigation-button']}
                onClick={() => {
                  navigate(ROUTES.CATALOG_ALL);
                }}
              >
                <span>Explore Catalog</span>
                <img src={arrowIcon} alt="Arrow Icon" />
              </button>
            </section>
          </section>
          <section className={style['bestseller-block']}>
            <Swiper
              grabCursor
              speed={800}
              breakpoints={{
                0: { direction: 'horizontal', slidesPerGroup: 1, slidesPerView: 1 },
                380: { direction: 'horizontal', slidesPerGroup: 1, slidesPerView: 1.5 },
                480: { direction: 'horizontal', slidesPerGroup: 1, slidesPerView: 1.8 },
                500: { direction: 'horizontal', slidesPerGroup: 1, slidesPerView: 2 },
                600: { direction: 'horizontal', slidesPerGroup: 1, slidesPerView: 2.2 },
                690: { direction: 'horizontal', slidesPerGroup: 2, slidesPerView: 2.5 },
                800: { direction: 'horizontal', slidesPerGroup: 2, slidesPerView: 3.0 },
                860: { direction: 'horizontal', slidesPerGroup: 2, slidesPerView: 3.2 },
                900: { direction: 'horizontal', slidesPerGroup: 2, slidesPerView: 3.2 },
                960: {
                  direction: 'horizontal',
                  slidesPerGroup: 2,
                  slidesPerView: 3.5,
                },
                1061: {
                  direction: 'vertical',
                  slidesPerGroup: 2,
                  slidesPerView: 2,
                },
              }}
              watchSlidesProgress
              spaceBetween={20}
              pagination={{
                el: '.custom-pagination-div',
                clickable: true,
                renderBullet: (index, className) => `<span class="${className}  bullet-${index}"></span>`,
              }}
              modules={[FreeMode, Navigation, Thumbs, Pagination, Controller]}
              className="swiper-best-products"
              controller={{ control: rightSwiper, inverse: true }}
              onSwiper={setLeftSwiper}
            >
              {leftSlider.map((dataCard: ProductProjection) => (
                <SwiperSlide key={dataCard.name.en}>
                  <HomeCard dataCard={dataCard} isVertical />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="custom-pagination-div" />
            <Swiper
              grabCursor
              speed={800}
              slidesPerGroup={2}
              breakpoints={{
                0: { direction: 'horizontal', slidesPerGroup: 1, slidesPerView: 1 },
                380: { direction: 'horizontal', slidesPerGroup: 1, slidesPerView: 1.5 },
                480: { direction: 'horizontal', slidesPerGroup: 1, slidesPerView: 1.8 },
                500: { direction: 'horizontal', slidesPerGroup: 1, slidesPerView: 2 },
                600: { direction: 'horizontal', slidesPerGroup: 1, slidesPerView: 2.2 },
                690: { direction: 'horizontal', slidesPerGroup: 2, slidesPerView: 2.5 },
                800: { direction: 'horizontal', slidesPerGroup: 2, slidesPerView: 3.0 },
                860: { direction: 'horizontal', slidesPerGroup: 2, slidesPerView: 3.2 },
                900: { direction: 'horizontal', slidesPerGroup: 2, slidesPerView: 3.2 },
                960: {
                  direction: 'horizontal',
                  slidesPerGroup: 2,
                  slidesPerView: 3.5,
                },
                1061: {
                  direction: 'vertical',
                  slidesPerGroup: 2,
                  slidesPerView: 2,
                },
              }}
              watchSlidesProgress
              spaceBetween={20}
              modules={[FreeMode, Navigation, Thumbs, Controller]}
              className="swiper-best-products right-slider"
              controller={{ control: leftSwiper, inverse: true }}
              onSwiper={setRightSwiper}
            >
              {rightSlider.map((dataCard: ProductProjection) => (
                <SwiperSlide key={dataCard.name.en}>
                  <HomeCard dataCard={dataCard} isVertical />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </section>
      ) : (
        <Loader />
      )}
    </section>
  );
}
