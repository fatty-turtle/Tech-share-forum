"use client";
import SearchIcon from "@/components/icons/SearchIcon";
import { useState } from "react";
import LogoIcon from "@/components/icons/LogoIcon";
import { useRouter } from "next/navigation";
import MenuIcon from "@/components/icons/MenuIcon";
import CloseIcon from "@/components/icons/CloseIcon";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (route: string) => {
    router.push(route);
    setMenuOpen(false);
  };

  return (
    <header className="relative bg-background-box border-b border-gray-200 font-inter">
      {/* ─── Main bar ─── */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 gap-4">
        {/* Brand — always visible */}
        <div
          className="flex items-center gap-2 cursor-pointer shrink-0"
          id="brand"
        >
          <LogoIcon />
          <p className="text-foreground font-bold text-xl">TechShare</p>
        </div>

        {/* Nav — desktop only (lg+) */}
        <nav className="hidden lg:block">
          <ul className="flex gap-8 font-medium">
            {["Discussions", "Tutorials", "Events"].map((item) => (
              <li key={item}>
                <a
                  href=""
                  className="text-foreground text-sm hover:text-blue-600 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search Bar — desktop only (lg+) */}
        <div className="hidden lg:flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 w-80 bg-white">
          <SearchIcon size={16} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search discussions, tags, or users..."
            className="outline-none text-sm text-gray-400 w-full bg-transparent"
          />
        </div>

        {/* Auth Buttons — desktop only (lg+) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            className="text-sm text-foreground font-medium px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => handleClick("/login")}
          >
            Log In
          </button>
          <button
            className="text-sm text-white font-medium px-4 py-2 bg-foreground rounded-md hover:bg-[#15294a] transition-colors"
            onClick={() => handleClick("/register")}
          >
            Sign Up
          </button>
        </div>

        {/* Hamburger — visible on mobile AND tablet (below lg) */}
        <button
          className="lg:hidden p-1 text-foreground"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* ─── Mobile + Tablet drawer (below lg) ─── */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pb-4 flex flex-col gap-4">
          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 mt-3 bg-white">
            <SearchIcon size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search discussions, tags, or users..."
              className="outline-none text-sm text-gray-400 w-full bg-transparent"
            />
          </div>

          {/* Nav links */}
          <nav>
            <ul className="flex flex-col gap-1 font-medium">
              {["Discussions", "Tutorials", "Events"].map((item) => (
                <li key={item}>
                  <a
                    href=""
                    className="block text-foreground text-sm py-2 px-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth */}
          <div className="flex flex-col gap-2 pt-1 border-t border-gray-100">
            <button
              className="w-full text-sm text-foreground font-medium px-4 py-2 hover:bg-gray-100 rounded-md transition-colors text-left"
              onClick={() => handleClick("/login")}
            >
              Log In
            </button>
            <button
              className="w-full text-sm text-white font-medium px-4 py-2 bg-foreground rounded-md hover:bg-[#15294a] transition-colors"
              onClick={() => handleClick("/register")}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
