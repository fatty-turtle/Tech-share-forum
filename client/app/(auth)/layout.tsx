// app/layout.tsx
import { Inter } from "next/font/google";
import "@/app/globals.css";
import AuthHeader from "@/components/AuthHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthHeader />
      <main>{children}</main>
    </>
  );
}
