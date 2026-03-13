"use client";
import AddFriendIcon from "@/components/icons/AddFriendIcon";
import HashIcon from "@/components/icons/HashIcon";
import StarIcon from "@/components/icons/StarIcon";

const popularTags = [
  { name: "#javascript", count: "1.2k" },
  { name: "#artificialintelligence", count: "980" },
  { name: "#rustlang", count: "750" },
  { name: "#docker", count: "540" },
];

const contributors = [
  {
    name: "Jordan S.",
    avatar: "JS",
    stats: "48 discussions • 2.1k likes",
    color: "bg-teal-500",
  },
  {
    name: "Elena Vance",
    avatar: "EV",
    stats: "32 discussions • 1.8k likes",
    color: "bg-yellow-500",
  },
  {
    name: "Liam Hughes",
    avatar: "LH",
    stats: "25 discussions • 1.5k likes",
    color: "bg-orange-400",
  },
];

export default function DashBoard() {
  return (
    <aside className="flex flex-col gap-4 w-64 shrink-0">
      {/* Popular Tags */}
      <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
        <h2 className="flex items-center gap-2 font-bold text-[#1a355b] text-base mb-4">
          <HashIcon /> Popular Tags
        </h2>
        <ul className="flex flex-col gap-3">
          {popularTags.map((tag) => (
            <li key={tag.name} className="flex items-center justify-between">
              <a href="" className="text-sm text-[#1a355b] hover:underline">
                {tag.name}
              </a>
              <span className="text-xs bg-blue-50 text-[#1a355b] font-semibold px-2 py-0.5 rounded-md">
                {tag.count}
              </span>
            </li>
          ))}
        </ul>
        <button className="mt-4 text-sm font-semibold text-[#1a355b] hover:underline w-full text-center">
          View all tags
        </button>
      </div>

      {/* Top Contributors */}
      <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
        <h2 className="flex items-center gap-2 font-bold text-[#1a355b] text-base mb-4">
          <StarIcon /> Top Contributors
        </h2>
        <ul className="flex flex-col gap-4">
          {contributors.map((user) => (
            <li key={user.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full ${user.color} flex items-center justify-center text-xs font-bold text-white shrink-0`}
                >
                  {user.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a355b]">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400">{user.stats}</p>
                </div>
              </div>
              <button className="text-[#1a355b] hover:opacity-70 shrink-0">
                <AddFriendIcon size={18} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Community Stats */}
      <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
        <h2 className="font-bold text-[#1a355b] text-base mb-4">
          TechShare Community
        </h2>
        <div className="flex justify-around">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#1a355b]">45k</p>
            <p className="text-xs text-gray-400 font-semibold tracking-wide">
              MEMBERS
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#1a355b]">12k</p>
            <p className="text-xs text-gray-400 font-semibold tracking-wide">
              POSTS
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
