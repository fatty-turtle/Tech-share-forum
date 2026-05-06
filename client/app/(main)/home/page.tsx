"use client";
import Carousel from "./Carousel";
import MainStats from "./MainStats";
import Post from "./Post";
import { useGetApi } from "@/hooks/api";

export default function Homepage() {
  const postApiRes = useGetApi("/post/trend");
  const tagApiRes = useGetApi("/tag");
  const trendTagApiRes = useGetApi("/tag/trend");

  const posts = postApiRes.data?.posts || [];
  const tags = tagApiRes.data?.tags || [];
  const trendTags = trendTagApiRes.data?.tags || [];

  const topContributors = [
    {
      id: 1,
      name: "Jordan S.",
      avatar: "https://i.pravatar.cc/150?img=11",
      discussions: 48,
      likes: 2100,
    },
    {
      id: 2,
      name: "Elena Vance",
      avatar: "https://i.pravatar.cc/150?img=47",
      discussions: 32,
      likes: 1800,
    },
    {
      id: 3,
      name: "Liam Hughes",
      avatar: "https://i.pravatar.cc/150?img=53",
      discussions: 25,
      likes: 1500,
    },
  ];

  return (
    <>
      <Carousel />
      <section className="flex flex-col lg:flex-row gap-4 lg:gap-6 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <Post posts={posts} tags={tags} />
        <MainStats trendTags={trendTags} topContributors={topContributors} />
      </section>
    </>
  );
}
