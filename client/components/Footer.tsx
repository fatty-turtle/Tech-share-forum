import LogoIcon from "./icons/LogoIcon";
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-box font-inter">
      <div className="flex items-center justify-between px-6 py-5">
        {/* Brand */}
        <div className="flex items-center gap-2 cursor-pointer" id="brand">
          <LogoIcon />
          <a href="" className="text-foreground font-bold text-xl font-sans">
            TechShare
          </a>
        </div>

        {/* Nav Links - centered */}
        <div className="flex items-center gap-8">
          <a href="" className="text-gray text-sm font-sans hover:underline">
            About
          </a>
          <a href="" className="text-gray text-sm font-sans hover:underline">
            Guidelines
          </a>
          <a href="" className="text-gray text-sm font-sans hover:underline">
            Privacy
          </a>
          <a href="" className="text-gray text-sm font-sans hover:underline">
            Terms
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray text-sm font-sans">
          © 2024 TechShare Forum. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
