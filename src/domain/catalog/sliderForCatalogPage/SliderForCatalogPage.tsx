import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './_sliderForCatalogPage.scss';
import { NavLink } from 'react-router-dom';

import { useCatalogCheckAttributeState, useCatalogData } from '../../../core/state/catalogState';

import type { CSSProperties } from 'react';
import type { Category } from '@commercetools/platform-sdk';

export interface SliderCatalogPageProps {
  allCategories: Category[];
}

export default function SliderCatalogPage({ allCategories }: SliderCatalogPageProps): JSX.Element {
  const { resetAttributes } = useCatalogData();
  const { resetAttributesList, resetCheckedStatesAttributesList } = useCatalogCheckAttributeState();

  return (
    <div className="slider-wrapper">
      {allCategories.length ? (
        <Swiper
          loop
          grabCursor
          initialSlide={1}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Scrollbar]}
          spaceBetween={20}
          slidesPerView={5.5}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            400: {
              slidesPerView: 1.2,
            },
            500: {
              slidesPerView: 1.5,
            },
            720: {
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
              <NavLink
                className="slider-item"
                to={category.slug.en}
                onClick={() => {
                  resetAttributes();
                  resetAttributesList();
                  resetCheckedStatesAttributesList();
                }}
                key={category.slug.en}
              >
                <h3 className="slider-title">{category.name.en}</h3>
                <div className={`slider-img ${category.slug.en}`} />
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        ''
      )}
    </div>
  );
}
