"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/fragments/admin/AdminHeader";
// import AdminHead from "@/fragments/admin/MainHead";
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
    // Wait for auth to initialize
    if (isLoading) return;

    // Check if user is authenticated and has ADMIN role
    if (!user || !isAdmin) {
      // Redirect non-admins to home page
      router.push("/");
    }
  }, [user, isAdmin, isLoading, router]);

  // Don't render anything while checking or if not admin
  if (isLoading || !user || !isAdmin) {
    return null;
  }

  return (
    <>
      <AdminHeader />
      <div className="flex-5 mr-5">
        {/* <AdminHead /> */}
        {children}
      </div>
    </>
  );
}
