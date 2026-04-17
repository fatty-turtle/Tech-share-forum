// app/layout.tsx

import "@/app/globals.css";
import ClientHeader from "@/fragments/client/MainHeader";
import ClientFooter from "@/fragments/client/MainFooter";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClientHeader />
      <main>{children}</main>
      <ClientFooter />
    </>
  );
}
