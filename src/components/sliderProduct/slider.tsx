import { useState } from 'react';
import { A11y, Controller, FreeMode, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper/modules';
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
  const [productSwiper, setProductSwiper] = useState<SwiperProps | null>(null);
  const [modalProductSwiper, setModalProductSwiper] = useState<SwiperProps | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperProps | null>(null);
  const [isModalSwiperShown, setIsModalSwiperShown] = useState<boolean>(false);

  return (
    <>
      <Swiper
        modules={[Controller, FreeMode, Navigation, Pagination, Scrollbar, A11y, Thumbs]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className={style.myswiper}
        controller={{ control: modalProductSwiper }}
        onSwiper={setProductSwiper}
        style={{ '--swiper-theme-color': '#dcebea' } as CSSProperties}
      >
        {images?.map((image, index) => (
          <SwiperSlide
            key={image.url}
            onClick={() => {
              setIsModalSwiperShown(true);
            }}
          >
            <img src={image.url} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className={style.thumbs}
        breakpoints={{
          1366: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
        }}
      >
        {images?.map((image, index) => (
          <SwiperSlide key={image.url}>
            <img src={image.url} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <section className={isModalSwiperShown ? style.modalopen : style.modalhide}>
        <button
          aria-label="Close"
          type="button"
          className={style['close-button']}
          onClick={(): void => {
            setIsModalSwiperShown(false);
          }}
        />
        <Swiper
          modules={[Controller, FreeMode, Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          controller={{ control: productSwiper }}
          className={style.modalswiper}
          onSwiper={setModalProductSwiper}
          style={{ '--swiper-theme-color': '#dcebea' } as CSSProperties}
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
