import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Carousel() {
  return (
    <Swiper spaceBetween={20} slidesPerView={3}>
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
    </Swiper>
  );
}
