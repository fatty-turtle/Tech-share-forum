"use client";

import EyeIcon from "@/components/icons/EyeIcon";
import ThumbIcon from "@/components/icons/ThumbIcon";
import TrendIcon from "@/components/icons/TrendIcon";
import HashIcon from "@/components/icons/HashIcon";

interface PostType {
  post_id: number;
  title: string;
  content: string;
  view_count: number;
  like_count: number;
  comment_count?: number;
  author_name: string;
  author_avatar?: string;
  time_ago?: string;
  tag?: string;
}

interface Props {
  posts: PostType[];
  tags: { name: string }[];
  activeTag?: string;
  onTagChange?: (tag: string) => void;
}

export default function Post({ posts, tags, activeTag, onTagChange }: Props) {
  return (
    <div className="flex-1 space-y-6">
      {/* Tag Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isActive = activeTag === tag.name;
          return (
            <button
              key={tag.name}
              onClick={() => onTagChange?.(tag.name)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                isActive
                  ? "bg-[#1a2744] text-white border-[#1a2744]"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              #{tag.name}
            </button>
          );
        })}
      </div>

      {/* Trending Discussions Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
          <TrendIcon className="w-5 h-5 text-gray-700" />
          Trending Discussions
        </h3>
      </div>

      {/* Post Cards */}
      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.post_id}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow"
          >
            {/* Author Row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                {post.author_avatar ? (
                  <img
                    src={post.author_avatar}
                    alt={post.author_name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                    {post.author_name[0]}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-none">
                    {post.author_name}
                  </p>
                  {(post.time_ago || post.tag) && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {post.time_ago && <span>{post.time_ago}</span>}
                      {post.time_ago && post.tag && <span> in </span>}
                      {post.tag && (
                        <span className="text-[#1a6ef5] font-medium">
                          #{post.tag}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
              {/* More options */}
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="5" cy="12" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="19" cy="12" r="1.5" />
                </svg>
              </button>
            </div>

            <h4 className="text-base font-bold text-foreground mb-2 leading-snug cursor-pointer hover:underline">
              {post.title}
            </h4>

            <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
              {post.content}
            </p>

            {/* Stats Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <ThumbIcon className="w-4 h-4" />
                  {post.like_count}
                </span>
                {post.comment_count !== undefined && (
                  <span className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 8h10M7 12h6m-6 8l4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                    {post.comment_count}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <EyeIcon className="w-4 h-4" />
                  {post.view_count >= 1000
                    ? `${(post.view_count / 1000).toFixed(1)}k`
                    : post.view_count}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
