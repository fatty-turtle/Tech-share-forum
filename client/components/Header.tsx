import SearchIcon from "./icons/SearchIcon";
import LogoIcon from "./icons/LogoIcon";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-background-box border-b border-gray-200 font-inter ">
      {/* Brand */}
      <div className="flex items-center gap-2 cursor-pointer" id="brand">
        <LogoIcon />
        <a href="" className="text-foreground font-bold text-xl">
          TechShare
        </a>
      </div>

      {/* Nav */}
      <nav id="navbar">
        <ul className="flex gap-8 font-medium ">
          <li>
            <a href="" className="text-foreground text-sm hover:text-blue-600">
              Discussions
            </a>
          </li>
          <li>
            <a href="" className="text-foreground text-sm hover:text-blue-600">
              Tutorials
            </a>
          </li>
          <li>
            <a href="" className="text-foreground text-sm hover:text-blue-600">
              Events
            </a>
          </li>
        </ul>
      </nav>

      {/* Search Bar */}
      <div
        className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 w-80 bg-white"
        id="search-bar"
      >
        <SearchIcon size={16} className="text-gray-400 " />
        <input
          type="text"
          placeholder="Search discussions, tags, or users..."
          className="outline-none text-sm text-gray-400 w-full bg-transparent"
        />
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3" id="authentication">
        <button
          className="text-sm text-foreground font-medium px-4 py-2 hover:bg-gray-100 rounded-md"
          id="login"
        >
          Log In
        </button>
        <button
          className="text-sm text-white font-medium px-4 py-2 bg-foreground rounded-md hover:bg-[#15294a]"
          id="sign-up"
        >
          Sign Up
        </button>
      </div>
    </header>
  );
}
