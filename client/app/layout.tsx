import "@/app/globals.css";
import { Inter } from "next/font/google";
import ReduxProvider from "@/store/Provider";
import AuthInitializer from "@/hooks/lib/AuthInitializer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "TechShare Forum | Chia sẻ kiến thức công nghệ",
    template: "%s | TechShare Forum",
  },
  description:
    "TechShare - Cộng đồng chia sẻ kiến thức công nghệ, thảo luận xu hướng, tutorial và kinh nghiệm lập trình. Join now!",
  keywords:
    "techshare, công nghệ, lập trình, javascript, react, node.js, tutorial, forum",
  authors: [{ name: "TechShare Team" }],
  creator: "TechShare Team",
  publisher: "TechShare",
  metadataBase: new URL("http://localhost:3000"), // Update to production
  alternates: {
    canonical: "/",
  },
  category: "technology",
  openGraph: {
    title: "TechShare Forum | Chia sẻ kiến thức công nghệ",
    description:
      "Cộng đồng dành cho developer Việt Nam - chia sẻ kiến thức, thảo luận xu hướng công nghệ mới nhất.",
    url: "http://localhost:3000",
    siteName: "TechShare",
    images: [
      {
        url: "/og-image.jpg", // Add later
        width: 1200,
        height: 630,
        alt: "TechShare",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechShare Forum | Chia sẻ kiến thức công nghệ",
    description:
      "Cộng đồng dành cho developer Việt Nam - chia sẻ kiến thức, thảo luận xu hướng công nghệ mới nhất.",
    images: "/twitter-image.jpg", // Add later
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code-here",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Add if have
  },
};

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi-VN" suppressHydrationWarning>
      <body className={inter.variable}>
        <ReduxProvider>
          <AuthInitializer />
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
