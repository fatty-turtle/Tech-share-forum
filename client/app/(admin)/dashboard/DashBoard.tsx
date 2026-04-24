"use client";

import { useGetApi } from "@/hooks/api";

interface DashboardStats {
  stats: {
    totalUsers: number;
    totalPosts: number;
    newUsersToday: number;
    totalTags: number;
    recentPosts: {
      rows: {
        post_id: number;
        title: string;
        author_name: string;
        created_at: string;
      }[];
    };
  };
}

export default function Dashboard() {
  const { data, loading, error, status } = useGetApi<DashboardStats>(
    "http://localhost:4000/dashboard",
  );

  //   console.log("=== useGetApi Debug ===");
  //   console.log("loading:", loading);
  //   console.log("status:", status);
  //   console.log("error:", error);
  //   console.log("data:", data);

  const recentPosts = data?.stats?.recentPosts?.rows;

  return (
    <section className="flex flex-col gap-7 p-4 h-screen flex-6">
      <article>
        <h1>Dashboard Overview</h1>
        <p>Real-time pulse of the TechShare editorial ecosystem.</p>
      </article>

      <article className="flex flex-row justify-evenly gap-4 text-center">
        <div className="bg-box p-4 rounded-2xl flex-1 min-w-50">
          <p>Total Members</p>
          <h1>{loading ? "..." : (data?.stats?.totalUsers ?? "—")}</h1>
        </div>
        <div className="bg-box p-4 rounded-2xl flex-1 min-w-50">
          <p>Total Posts</p>
          <h1>{loading ? "..." : (data?.stats?.totalPosts ?? "—")}</h1>
        </div>
        <div className="bg-box p-4 rounded-2xl flex-1 min-w-50">
          <p>New Users Today</p>
          <h1>{loading ? "..." : (data?.stats?.newUsersToday ?? "—")}</h1>
        </div>
        <div className="bg-box p-4 rounded-2xl flex-1 min-w-50">
          <p>Tag Made</p>
          <h1>{loading ? "..." : (data?.stats?.totalTags ?? "—")}</h1>
        </div>
      </article>

      <article>
        <div className="flex flex-row items-center justify-between gap-4 mb-4">
          <h1>Recent Activity</h1>
          <div className="flex flex-row gap-3">
            <button>Filter</button>
            <button>View All</button>
          </div>
        </div>
        <div>
          <table className="w-full bg-box rounded-2xl p-4 ">
            <thead>
              <tr className="bg-gray-200 h-18 p-2.5">
                <th>Post Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="p-2.5">
              {loading ? (
                <tr className="text-center h-18">
                  <td colSpan={4} className="text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr className="text-center h-18">
                  <td colSpan={4} className="text-red-400">
                    Error {status}: {error.message}
                  </td>
                </tr>
              ) : recentPosts?.length ? (
                recentPosts.map((item) => (
                  <tr key={item.post_id} className="text-center h-18">
                    <td className="text-left p-2.5">{item.title}</td>
                    <td>{item.author_name}</td>
                    <td>{item.created_at ?? "—"}</td>
                    <td className="text-center space-x-2">
                      <button>Edit</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center h-18">
                  <td colSpan={4} className="text-gray-400">
                    No recent activity found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
