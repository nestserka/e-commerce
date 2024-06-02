import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './slider-catalog-page.scss';
import { NavLink } from 'react-router-dom';

import type { CSSProperties } from 'react';
import type { Category } from '@commercetools/platform-sdk';

export interface SliderCatalogPageProps {
  allCategories: Category[];
}

export default function SliderCatalogPage({ allCategories }: SliderCatalogPageProps): JSX.Element {
  return (
    <div className="slider-wrapper">
      <Swiper
        loop
        grabCursor
        initialSlide={1}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={5.5}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          500: {
            slidesPerView: 1.2,
          },
          660: {
            slidesPerView: 1.5,
          },
          840: {
            slidesPerView: 2,
          },
          980: {
            slidesPerView: 2.5,
          },
          1200: {
            slidesPerView: 3,
          },
          1440: {
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
        style={{ '--swiper-theme-color': '#dcebea' } as CSSProperties}
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
