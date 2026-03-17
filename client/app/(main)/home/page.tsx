import fetchApi from "@/utils/fetchApi";
import Carousel from "./Carousel";
import DashBoard from "./Dashboard";
import Post from "./Post";

export default async function Homepage() {
  const postApiRes = await fetchApi("http://localhost:4000/post/trend");
  const tagApiRes = await fetchApi("http://localhost:4000/tag");
  const trendTagApiRes = await fetchApi("http://localhost:4000/tag/trend");

  const posts = postApiRes.response?.posts || [];
  const tags = tagApiRes.response?.tags || [];
  const trendTags = trendTagApiRes.response?.tags || [];

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
      <section className="flex gap-6 px-6 py-6 max-w-6xl mx-auto">
        <Post posts={posts} tags={tags} />
        <DashBoard trendTags={trendTags} topContributors={topContributors} />
      </section>
    </>
  );
}
