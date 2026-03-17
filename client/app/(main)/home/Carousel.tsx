"use client";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const samples = [
  {
    title: "Welcome to TechShare",
    content:
      "The ultimate community for developers to share knowledge, discover trends, and grow together.",
    button: "Join the Community",
  },
  {
    title: "Share What You Know",
    content:
      "Publish articles, tutorials, and deep-dives. Your expertise can level up thousands of developers worldwide.",
    button: "Start Writing",
  },
  {
    title: "Stay Ahead of the Curve",
    content:
      "Track trending technologies, follow top contributors, and get personalized feed recommendations tailored to your stack.",
    button: "Explore Trends",
  },
];

export default function Carousel() {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      className="w-7xl mt-5 mb-5 rounded-2xl"
    >
      {samples.map((sample, i) => (
        <SwiperSlide key={i}>
          <div className="flex flex-col items-center justify-center text-center h-90 bg-foreground text-white">
            <h1 className="text-3xl mb-4 font-bold text-background-box">
              {sample.title}
            </h1>
            <p className="w-90 mb-8 text-blue-200">{sample.content}</p>
            <button className="w-50 font-bold cursor-pointer bg-box text-foreground h-12 rounded-2xl hover:bg-blue-200">
              {sample.button}
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
