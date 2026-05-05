"use client";
import { useEffect, useState } from "react";
import LogoIcon from "@/components/icons/LogoIcon";
import MenuIcon from "@/components/icons/MenuIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import actions from "./config";
import { logout } from "@/hooks/lib/apiClient";
import Link from "next/link";

export default function AdminHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logout();
    closeSidebar();
  };

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden p-4 border-b bg-box shadow-sm flex items-center justify-between z-30 fixed top-0 left-0 right-0">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          <MenuIcon size={24} />
        </button>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={closeSidebar} />
      )}

      {/* Header/Sidebar */}
      <header
        className={`fixed lg:static inset-y-0 left-0 z-50 h-screen lg:h-auto w-64 bg-box/95 backdrop-blur-md p-5 flex flex-col gap-5 shadow-2xl lg:shadow-md transition-all duration-300 ease-in-out ${
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
              onClick={action.isLogout ? handleLogout : closeSidebar}
            >
              {action.icon}
              <span>{action.name}</span>
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
