import "@/app/globals.css";
import { Inter } from "next/font/google";
import ReduxProvider from "@/store/Provider";
import AuthInitializer from "@/hooks/lib/AuthInitializer";

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
        <ReduxProvider>
          <AuthInitializer />
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
