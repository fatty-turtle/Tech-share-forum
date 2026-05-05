"use client";

// import Swiper core and required modules
import { Navigation, Pagination, A11y } from "swiper/modules";

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
      className="w-full max-w-6xl mx-auto mt-5 mb-5 rounded-2xl px-4 sm:px-6"
    >
      {samples.map((sample, i) => (
        <SwiperSlide key={i}>
          <div className="flex flex-col items-center justify-center text-center min-h-[400px] md:min-h-[500px] bg-foreground text-white p-5 ">
            <h1 className="text-3xl mb-4 font-bold text-background-box">
              {sample.title}
            </h1>
            <p className="max-w-4xl mx-auto mb-8 text-blue-200 px-4">
              {sample.content}
            </p>
            <button className="w-full max-w-sm sm:max-w-md font-bold cursor-pointer bg-box text-foreground h-12 rounded-2xl hover:bg-blue-200 mx-auto">
              {sample.button}
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
