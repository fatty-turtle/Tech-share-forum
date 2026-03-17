// app/layout.tsx

import "@/app/globals.css";
import Header from "@/components/MainHeader";
import Footer from "@/components/MainFooter";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
