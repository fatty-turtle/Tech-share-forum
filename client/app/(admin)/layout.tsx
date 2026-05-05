"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/fragments/admin/AdminHeader";
import { useAuth } from "@/hooks/lib/useAuth";
import "./admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
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
    <div className="flex h-screen bg-background overflow-hidden">
      <AdminHeader />
      <main className="flex-1 p-4 lg:p-6 overflow-auto ml-0 mt-20 lg:mt-0">
        {children}
      </main>
    </div>
  );
}
