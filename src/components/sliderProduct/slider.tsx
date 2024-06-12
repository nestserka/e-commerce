import { useState } from 'react';
import { A11y, Controller, FreeMode, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Swiper as SwiperProps } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import styles from './_slider.module.scss';
import { EMPTY_IMAGES_LIST_REPLACEMENT } from '../../constants/constants';

import type { Image, SliderProps } from './types';
import type { CSSProperties } from 'react';

export default function Slider({ images }: SliderProps): JSX.Element {
  const [productSwiper, setProductSwiper] = useState<SwiperProps | null>(null);
  const [modalProductSwiper, setModalProductSwiper] = useState<SwiperProps | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperProps | null>(null);
  const [isModalSwiperShown, setIsModalSwiperShown] = useState<boolean>(false);
  const [ImagesList] = useState<Image[]>(images?.length ? images : EMPTY_IMAGES_LIST_REPLACEMENT);

  return (
    <>
      <Swiper
        loop
        modules={[Controller, FreeMode, Navigation, Pagination, Scrollbar, A11y, Thumbs]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className={styles.myswiper}
        controller={{ control: modalProductSwiper }}
        onSwiper={setProductSwiper}
        style={{ '--swiper-theme-color': '#dcebea' } as CSSProperties}
      >
        {ImagesList.map((image, index) => (
          <SwiperSlide
            key={`Slide ${index + 1}`}
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
        className={styles.thumbs}
        breakpoints={{
          1366: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
        }}
      >
        {ImagesList.map((image, index) => (
          <SwiperSlide key={`Slide ${index + 1}`}>
            <img src={image.url} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <section className={isModalSwiperShown ? styles.modalopen : styles.modalhide}>
        <button
          aria-label="Close"
          type="button"
          className={styles['close-button']}
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
          className={styles.modalswiper}
          onSwiper={setModalProductSwiper}
          style={{ '--swiper-theme-color': '#dcebea' } as CSSProperties}
        >
          {ImagesList.map((image, index) => (
            <SwiperSlide key={`Slide ${index + 1}`}>
              <img src={image.url} alt={`Slide ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
