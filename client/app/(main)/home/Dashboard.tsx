"use client";

import HashIcon from "@/components/icons/HashIcon";
import StarIcon from "@/components/icons/StarIcon";
import AddFriendIcon from "@/components/icons/AddFriendIcon";

interface TrendTag {
  tag_id: number;
  name: string;
  post_count: number;
}

interface TopContributor {
  id: number;
  name: string;
  avatar?: string;
  discussions: number;
  likes: number;
}

interface CommunityStats {
  members: number;
  posts: number;
}

interface Props {
  trendTags: TrendTag[];
  topContributors?: TopContributor[];
  communityStats?: CommunityStats;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function DashBoard({
  trendTags,
  topContributors = [],
  communityStats,
}: Props) {
  return (
    <aside className="w-64 shrink-0 flex flex-col gap-5">
      {/* Popular Tags Card */}
      <div className="bg-backgroud-box border border-gray-200 rounded-xl p-5">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2 mb-4">
          <HashIcon className="w-4 h-4 text-gray-500" />
          Popular Tags
        </h3>
        <div className="space-y-2">
          {trendTags.map((tag) => (
            <div
              key={tag.tag_id}
              className="flex items-center justify-between group cursor-pointer"
            >
              <span className="text-sm text-gray-700 group-hover:text-[#1a6ef5] transition-colors">
                #{tag.name}
              </span>
              <span className="text-xs text-gray-400 font-medium">
                {formatCount(tag.post_count)}
              </span>
            </div>
          ))}

          {trendTags.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">
              No trending tags yet
            </p>
          )}
        </div>
        {trendTags.length > 0 && (
          <button className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors w-full text-center font-medium">
            View all tags
          </button>
        )}
      </div>

      {/* Top Contributors Card */}
      {topContributors.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2 mb-4">
            {/* circle-plus icon */}
            <StarIcon />
            Top Contributors
          </h3>
          <div className="space-y-3">
            {topContributors.map((contributor) => (
              <div
                key={contributor.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  {contributor.avatar ? (
                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                      {contributor.name[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-none">
                      {contributor.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {contributor.discussions} discussions &bull;{" "}
                      {formatCount(contributor.likes)} likes
                    </p>
                  </div>
                </div>
                {/* Add / follow button */}
                <button className="text-gray-400 hover:text-[#1a6ef5] transition-colors">
                  <AddFriendIcon></AddFriendIcon>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Community Stats Card */}
      {communityStats && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-base font-bold text-foreground mb-4">
            TechShare Community
          </h3>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-2xl font-bold text-foreground">
                {formatCount(communityStats.members)}
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-wide mt-0.5 font-medium">
                Members
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {formatCount(communityStats.posts)}
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-wide mt-0.5 font-medium">
                Posts
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
