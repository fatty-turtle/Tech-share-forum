"use client";
import { useState } from "react";
import FilterIcon from "@/components/icons/FilterIcon";
import ThumbIcon from "@/components/icons/ThumbIcon";
import CommentIcon from "@/components/icons/CommentIcon";
import EyeIcon from "@/components/icons/EyeIcon";
import TrendIcon from "@/components/icons/TrendIcon";
const tags = ["#JavaScript", "#AI", "#DevOps", "#Python", "#React", "#Web3"];

const posts = [
  {
    id: 1,
    author: "Alex Rivers",
    avatar: "AR",
    time: "2 hours ago",
    tag: "#JavaScript",
    title:
      "10 React Performance Optimization Techniques You Should Know in 2024",
    excerpt:
      "React 19 is bringing some incredible changes to how we handle memoization. Let's look at what's current and what's coming soon to the ecosystem...",
    likes: 124,
    comments: 45,
    views: "1.2k",
  },
  {
    id: 2,
    author: "Sarah Chen",
    avatar: "SC",
    time: "5 hours ago",
    tag: "#AI",
    title:
      "The Rise of Local LLMs: Why privacy-first AI is the future of development",
    excerpt:
      "Running Mistral or Llama-3 locally on your workstation is no longer a dream. Here is how I set up my development pipeline to stay offline...",
    likes: 89,
    comments: 22,
    views: "850",
  },
  {
    id: 3,
    author: "Marcus Thorne",
    avatar: "MT",
    time: "8 hours ago",
    tag: "#DevOps",
    title:
      "Kubernetes vs. Serverless: Choosing the right infrastructure for a scaling startup",
    excerpt:
      "Every architect faces this dilemma. We moved from AWS Lambda to EKS and then back to a hybrid model. Here are the cost and latency metrics...",
    likes: 210,
    comments: 67,
    views: "2.4k",
  },
];

export default function Post() {
  const [activeTag, setActiveTag] = useState("#JavaScript");

  return (
    <div className="flex-1 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 font-bold text-[#1a355b] text-lg">
          <TrendIcon /> Trending Discussions
        </h2>
        <button className="text-gray-400 hover:text-[#1a355b]">
          <FilterIcon />
        </button>
      </div>

      {/* Tag filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-150 ${
              activeTag === tag
                ? "bg-[#1a355b] text-white border-[#1a355b]"
                : "bg-white text-[#1a355b] border-gray-300 hover:border-[#1a355b]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl border border-gray-200 px-5 py-4"
          >
            {/* Author row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
                  {post.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a355b]">
                    {post.author}
                  </p>
                  <p className="text-xs text-gray-400">
                    {post.time} in{" "}
                    <span className="text-[#1a355b] font-medium">
                      {post.tag}
                    </span>
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <span className="text-lg leading-none">···</span>
              </button>
            </div>

            {/* Title & excerpt */}
            <h3 className="font-bold text-[#1a355b] text-base mb-1 cursor-pointer hover:underline">
              {post.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{post.excerpt}</p>

            {/* Stats row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-gray-400 text-sm">
                <span className="flex items-center gap-1">
                  <ThumbIcon /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <CommentIcon /> {post.comments}
                </span>
                <span className="flex items-center gap-1">
                  <EyeIcon /> {post.views}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
