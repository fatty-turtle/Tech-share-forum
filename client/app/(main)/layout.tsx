"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ClientHeader from "@/fragments/client/MainHeader";
import ClientFooter from "@/fragments/client/MainFooter";
import { useAuth } from "@/hooks/lib/useAuth";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading, isAdmin } = useAuth();

  useEffect(() => {
    // Wait for auth to initialize
    if (isLoading) return;

    // Redirect admins to dashboard
    if (user && isAdmin) {
      router.push("/dashboard");
    }
  }, [user, isAdmin, isLoading, router]);

  // Don't render anything while checking
  if (isLoading) {
    return null;
  }

  // Admins are redirected, non-admins can access
  return (
    <>
      <ClientHeader />
      <main>{children}</main>
      <ClientFooter />
    </>
  );
}
