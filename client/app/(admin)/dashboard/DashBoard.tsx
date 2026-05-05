"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
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

// interface DeleteResponse {
//   message: string;
// }

type FilterType = "all" | "today" | "thisWeek" | "thisMonth";

export default function Dashboard() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>("all");
  // const [deleteId, setDeleteId] = useState<number | null>(null);

  // Fetch dashboard stats
  const { data, loading, error, status, refetch } = useGetApi<DashboardStats>(
    "http://localhost:4000/dashboard",
  );

  // Delete post mutation
  // const { remove: deletePost, loading: deleting } =
  //   useDeleteApi<DeleteResponse>("http://localhost:4000/post", {
  //     onSuccess: () => {
  //       setDeleteId(null);
  //       refetch(); // Refresh after delete
  //     },
  //   });

  const recentPosts = data?.stats?.recentPosts?.rows;

  // Filter posts based on selected filter
  const filteredPosts = useCallback(() => {
    if (!recentPosts) return [];

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return recentPosts.filter((post) => {
      if (filter === "all") return true;
      const postDate = new Date(post.created_at);
      switch (filter) {
        case "today":
          return postDate >= today;
        case "thisWeek":
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return postDate >= weekAgo;
        case "thisMonth":
          const monthAgo = new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            today.getDate(),
          );
          return postDate >= monthAgo;
        default:
          return true;
      }
    });
  }, [recentPosts, filter])();

  // Handlers
  // const handleEdit = (postId: number) => {
  //   router.push(`/posts/${postId}/edit`);
  // };

  // const handleDelete = async () => {
  //   if (deleteId === null) return;
  //   await deletePost(`/${deleteId}`);
  // };

  const handleViewAll = () => {
    router.push("/posts");
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as FilterType);
  };

  return (
    <section className="flex flex-col gap-7 p-4 h-screen flex-6">
      <article>
        <h1>Dashboard Overview</h1>
        <p>Real-time pulse of the TechShare editorial ecosystem.</p>
      </article>

      <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-center">
        <div className="bg-box p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all">
          <p className="text-gray-600 mb-2 text-sm font-medium">
            Total Members
          </p>
          <h1 className="text-3xl font-bold text-foreground">
            {loading ? "..." : (data?.stats?.totalUsers ?? "—")}
          </h1>
        </div>
        <div className="bg-box p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all">
          <p className="text-gray-600 mb-2 text-sm font-medium">Total Posts</p>
          <h1 className="text-3xl font-bold text-foreground">
            {loading ? "..." : (data?.stats?.totalPosts ?? "—")}
          </h1>
        </div>
        <div className="bg-box p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all">
          <p className="text-gray-600 mb-2 text-sm font-medium">
            New Users Today
          </p>
          <h1 className="text-3xl font-bold text-foreground">
            {loading ? "..." : (data?.stats?.newUsersToday ?? "—")}
          </h1>
        </div>
        <div className="bg-box p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all">
          <p className="text-gray-600 mb-2 text-sm font-medium">Tags Created</p>
          <h1 className="text-3xl font-bold text-foreground">
            {loading ? "..." : (data?.stats?.totalTags ?? "—")}
          </h1>
        </div>
      </article>

      <article>
        <div className="flex flex-col items-center justify-between gap-4 mb-4  sm:flex-row">
          <h1>Recent Activity</h1>
          <div className="flex flex-row gap-3">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="bg-box p-2 rounded-xl text-foreground border cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
            </select>
            <button
              onClick={handleViewAll}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors"
            >
              View All
            </button>
            <button
              onClick={() => refetch()}
              disabled={loading}
              className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {/* {deleteId !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-box p-6 rounded-2xl max-w-md">
              <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
              <p className="mb-6">
                Are you sure you want to delete this post? This action cannot be
                undone.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setDeleteId(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )} */}

        <div className="border rounded-2xl p-0.5">
          <table className="w-full bg-box rounded-2xl p-4">
            <thead>
              <tr className="bg-gray-200 h-auto py-3 md:py-4 p-2.5 rounded-l-xl">
                <th className="rounded-tl-xl">Post Title</th>
                <th>Date</th>
                <th className="rounded-tr-xl">Author</th>
                {/* <th>Action</th> */}
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
                    <button
                      onClick={() => refetch()}
                      className="ml-2 text-blue-500 underline"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              ) : filteredPosts.length ? (
                filteredPosts.map((item) => (
                  <tr key={item.post_id} className="text-center h-18">
                    <td className="text-left p-2.5">{item.title}</td>
                    <td>{item.author_name}</td>
                    <td>{item.created_at ?? "—"}</td>
                    {/* <td className="text-center space-x-2">
                      <button
                        onClick={() => handleEdit(item.post_id)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(item.post_id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </td> */}
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
