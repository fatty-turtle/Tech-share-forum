"use client";
import { useEffect } from "react";
import LogoIcon from "@/components/icons/LogoIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import actions from "./config";
import { logout } from "@/hooks/lib/apiClient";
import Link from "next/link";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminHeader({ sidebarOpen, setSidebarOpen }: Props) {
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logout();
  };

  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <header
      className={`fixed lg:static z-50 h-screen lg:h-auto w-64 bg-box p-5 flex flex-col gap-5 shadow-lg lg:shadow-md transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <button
        className="lg:hidden mb-4 p-2 rounded hover:bg-gray-200 self-end"
        onClick={closeSidebar}
      >
        <CloseIcon size={24} />
      </button>
      <section className="flex items-center gap-2 cursor-pointer">
        <LogoIcon />
        <p className="font-bold text-xl">TechShare</p>
      </section>
      <nav className="flex-1 space-y-2">
        {actions.map((action) => (
          <Link
            key={action.name}
            href={action.route}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-all text-gray-700 hover:text-blue-600 w-full"
            onClick={closeSidebar}
          >
            {action.icon}
            <span>{action.name}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
