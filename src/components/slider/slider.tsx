import { useState } from 'react';
import { A11y, FreeMode, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import style from './_slider.module.scss';

interface Image {
  dimensions: {
    h: number;
    w: number;
  };
  url: string;
}

interface SliderProps {
  images: Image[];
}

export default function Slider({ images }: SliderProps): JSX.Element {
  const [thumbsSwiper] = useState(null);

  return (
    <Swiper
      modules={[FreeMode, Navigation, Pagination, Scrollbar, A11y, Thumbs]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      thumbs={{ swiper: thumbsSwiper }}
      className={style.myswiper}
      onSlideChange={() => {
        console.log('slide change');
      }}
      onSwiper={(swiper) => {
        console.log(swiper);
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={image.url}>
          <img src={image.url} alt={`Slide ${index}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
