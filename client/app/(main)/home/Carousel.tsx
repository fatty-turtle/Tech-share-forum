"use client";

export default function Carousel() {
  return (
    <section className="mx-4 my-6 rounded-2xl bg-foreground px-8 py-16 text-center text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to TechShare</h1>
      <p className="text-base text-blue-200 max-w-lg mx-auto mb-8">
        The ultimate community for developers to share knowledge, discover
        trends, and grow together.
      </p>
      <button className="bg-white text-foreground font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
        Join the Community
      </button>
    </section>
  );
}
