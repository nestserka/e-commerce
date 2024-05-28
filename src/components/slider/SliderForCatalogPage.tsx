import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './slider-catalog-page.scss';
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
        grabCursor
        initialSlide={1}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        spaceBetween={20}
        slidesPerView={5.5}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          710: {
            slidesPerView: 3,
          },
          1550: {
            slidesPerView: 3.5,
          },
          1980: {
            slidesPerView: 4,
          },
          2440: {
            slidesPerView: 4.5,
          },
          2550: {
            slidesPerView: 5.5,
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
