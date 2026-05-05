"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MenuIcon from "@/components/icons/MenuIcon";
import AdminHeader from "@/fragments/admin/AdminHeader";
import { useAuth } from "@/hooks/lib/useAuth";
import "./admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading, isAdmin } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!user || !isAdmin) {
      router.push("/");
    }
  }, [user, isAdmin, isLoading, router]);

  if (isLoading || !user || !isAdmin) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      <div className="lg:hidden p-4 border-b bg-box shadow-sm flex items-center justify-between z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Open sidebar"
        >
          <MenuIcon size={24} />
        </button>
      </div>

      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
    </div>
  );
}
