import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './slider-catalog-page.scss'
import { NavLink } from 'react-router-dom';

import type { Category } from '@commercetools/platform-sdk';

export interface SliderCatalogPageProps {
  allCategories: Category[];
}

export default function SliderCatalogPage({ allCategories }: SliderCatalogPageProps): JSX.Element {
  console.log(allCategories);

  return (
    <div className="slider-wrapper">
      <Swiper
        freeMode
        loop
        navigation
        grabCursor
        initialSlide={1}
        modules={[FreeMode, Navigation]}
        spaceBetween={100}
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          710: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
        className="slider-catalog"
      >
        {allCategories.map((category: Category) => (
          <SwiperSlide key={category.slug.en}>
            <NavLink className="slider-item" to={category.slug.en} key={category.slug.en}>
              <h3 className="slider-title">{category.name.en}</h3>
              <div className={`slider-img ${category.slug.en}`} />
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
