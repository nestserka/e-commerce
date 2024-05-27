import { useState } from 'react';
import { A11y, FreeMode, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

export default function Slider(): JSX.Element {
  const [thumbsSwiper] = useState(null);

  return (
    <Swiper
      modules={[FreeMode, Navigation, Pagination, Scrollbar, A11y, Thumbs]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      thumbs={{ swiper: thumbsSwiper }}
      className="mySwiper"
      onSlideChange={() => {
        console.log('slide change');
      }}
      onSwiper={(swiper) => {
        console.log(swiper);
      }}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
}
