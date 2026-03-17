import LogoIcon from "@/components/icons/LogoIcon";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-box font-inter">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-5 gap-4 md:gap-0">
        {/* Brand */}
        <div className="flex items-center gap-2 cursor-pointer" id="brand">
          <LogoIcon />
          <a href="" className="text-foreground font-bold text-xl font-sans">
            TechShare
          </a>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-6 md:gap-8 flex-wrap justify-center">
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
        <p className="text-gray text-sm font-sans text-center md:text-right">
          © 2024 TechShare Forum. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
