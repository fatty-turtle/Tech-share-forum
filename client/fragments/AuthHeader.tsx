"use client";
import LogoIcon from "@/components/icons/LogoIcon";
import { useRouter } from "next/navigation";

export default function AuthHeader() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/home");
  };
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-background-box border-b border-gray-200 font-inter ">
      {/* Brand */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        id="brand"
        onClick={handleClick}
      >
        <LogoIcon />
        <p className="text-foreground font-bold text-xl">TechShare</p>
      </div>
    </header>
  );
}
