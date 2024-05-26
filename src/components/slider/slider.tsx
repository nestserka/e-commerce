import { A11y, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

export default function Slider(): JSX.Element {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Thumbs]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
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
