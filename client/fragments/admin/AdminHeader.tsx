import LogoIcon from "@/components/icons/LogoIcon";
import actions from "./config";
import Link from "next/link";
import "@/app/globals.css";

export default function AdminHeader() {
  return (
    <header className="bg-box p-5 flex flex-col flex-1 gap-5 shadow-md text-foreground">
      <section
        className="flex items-center gap-2 cursor-pointer shrink-0"
        id="brand"
      >
        <LogoIcon />
        <p className="text-foreground font-bold text-2xl">TechShare</p>
      </section>
      <section className="flex flex-col gap-3 font-inter">
        {actions.map((action) => (
          <p key={action.name} className="hover:bg-background rounded-xl">
            <Link
              href={action.route}
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600  transition-colors w-full p-2 "
            >
              {action.icon}
              {action.name}
            </Link>
          </p>
        ))}
      </section>
    </header>
  );
}
