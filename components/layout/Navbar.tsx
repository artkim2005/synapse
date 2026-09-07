import { Bell, ChevronDown } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "../ui/Input";
import { Logo } from "./Logo";

type NavKey = "home" | "courses" | "my-learning" | "resources";

const navItems: { key: NavKey; label: string; href: string }[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "courses", label: "Courses", href: "/courses" },
  { key: "my-learning", label: "My Learning", href: "/my-learning" },
  { key: "resources", label: "Resources", href: "/resources" },
];

export function Navbar({ active = "courses" }: { active?: NavKey }) {
  return (
    <header className="flex h-16 items-center gap-6 border-b border-neutral-200 bg-white px-4 sm:px-6">
      <Logo />
      <nav className="hidden items-center gap-1 text-sm font-medium text-neutral-700 md:flex">
        {navItems.map(({ key, label, href }) => (
          <Link
            key={key}
            href={href}
            className={`rounded-small px-3 py-2 ${
              key === active
                ? "text-primary-500 bg-primary-100"
                : "hover:bg-neutral-100"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <div className="hidden w-64 lg:block">
          <SearchInput placeholder="Search topics, courses, or questions..." />
        </div>
        <button
          aria-label="Notifications"
          className="flex size-9 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100"
        >
          <Bell className="size-5" strokeWidth={2} />
        </button>
        <button className="flex items-center gap-1 rounded-full hover:bg-neutral-100">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary-500 text-sm font-semibold text-white">
            AK
          </span>
          <ChevronDown className="size-4 text-neutral-500" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
