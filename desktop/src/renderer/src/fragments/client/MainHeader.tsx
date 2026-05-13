import SearchIcon from "../../components/icons/SearchIcon";
import LogoIcon from "../../components/icons/LogoIcon";
import MenuIcon from "../../components/icons/MenuIcon";
import CloseIcon from "../../components/icons/CloseIcon";
import SearchBar from "../../components/general/SearchBar";

export default function ClientHeader() {
  return (
    <header
      className="relative bg-background-box border-b border-gray-200 font-inter "
      id="box"
    >
      {/* ─── Main bar ─── */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 gap-4">
        {/* Brand */}
        <div
          className="flex items-center gap-2 cursor-pointer shrink-0"
          id="brand"
        >
          <LogoIcon />
          <p className="text-foreground font-bold text-xl">TechShare</p>
        </div>
        <nav>
          <ul className="flex gap-6 lg:gap-8 font-medium">
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

        <SearchBar placeholder="Search discussions, tags, or users..." />
      </div>
    </header>
  );
}
