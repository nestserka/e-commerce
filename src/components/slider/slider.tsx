import { useState } from 'react';
import { A11y, FreeMode, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Swiper as SwiperProps } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import style from './_slider.module.scss';

import type { CSSProperties } from 'react';

interface Image {
  dimensions: {
    h: number;
    w: number;
  };
  url: string;
}

interface SliderProps {
  images: Image[] | undefined;
}

export default function Slider({ images }: SliderProps): JSX.Element {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperProps | null>(null);
  const [thumbsModalSwiper, setThumbsModalSwiper] = useState<SwiperProps | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);

  return (
    <>
      <Swiper
        modules={[FreeMode, Navigation, Pagination, Scrollbar, A11y, Thumbs]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className={style.myswiper}
        onSlideChange={() => {
          console.log('slide change');
        }}
        onSwiper={(swiper) => {
          console.log(swiper);
        }}
        style={{ '--swiper-theme-color': '#3E45E6' } as CSSProperties}
      >
        {images?.map((image, index) => (
          <SwiperSlide
            key={image.url}
            onClick={() => {
              setIsGalleryOpen(true);
            }}
          >
            <img src={image.url} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={24}
        slidesPerView={5}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className={style.thumbs}
      >
        {images?.map((image, index) => (
          <SwiperSlide key={image.url}>
            <img src={image.url} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <section className={isGalleryOpen ? style.modalopen : style.modalhide}>
        <Swiper
          modules={[FreeMode, Navigation, Pagination, Scrollbar, A11y, Thumbs]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          thumbs={{ swiper: thumbsModalSwiper && !thumbsModalSwiper.destroyed ? thumbsModalSwiper : null }}
          className={style.modalswiper}
          onSlideChange={() => {
            console.log('slide change');
          }}
          onSwiper={(swiper) => {
            console.log(swiper);
          }}
          style={{ '--swiper-theme-color': '#3E45E6' } as CSSProperties}
        >
          {images?.map((image, index) => (
            <SwiperSlide key={image.url}>
              <img src={image.url} alt={`Slide ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsModalSwiper}
          spaceBetween={24}
          slidesPerView={5}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          className={style.modalthumbs}
        >
          {images?.map((image, index) => (
            <SwiperSlide key={image.url}>
              <img src={image.url} alt={`Slide ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
