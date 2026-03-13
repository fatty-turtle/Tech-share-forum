"use client";
import Carousel from "./Carousel";
import DashBoard from "./Dashboard";
import Post from "./Post";

export default function Homepage() {
  return (
    <>
      <Carousel></Carousel>
      <section className="flex gap-6 px-6 py-6 max-w-6xl mx-auto">
        <Post /> <DashBoard />
      </section>
    </>
  );
}
