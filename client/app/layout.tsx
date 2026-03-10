// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {" "}
        {/* ✅ inject font variable */}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
