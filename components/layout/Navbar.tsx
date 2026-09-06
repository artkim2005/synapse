import { Bell } from "lucide-react";
import { SearchInput } from "../ui/Input";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <header className="flex h-16 items-center gap-6 border-b border-neutral-200 bg-white px-6">
      <Logo />
      <nav className="flex items-center gap-1 text-sm font-medium text-neutral-700">
        <a
          href="#"
          className="rounded-small px-3 py-2 text-primary-500 bg-primary-100"
        >
          Courses
        </a>
        <a href="#" className="rounded-small px-3 py-2 hover:bg-neutral-100">
          My Learning
        </a>
      </nav>
      <div className="ml-auto flex items-center gap-4">
        <div className="w-64">
          <SearchInput placeholder="Search topics, concepts, or questions..." />
        </div>
        <button
          aria-label="Notifications"
          className="flex size-9 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100"
        >
          <Bell className="size-5" strokeWidth={2} />
        </button>
        <span className="flex size-9 items-center justify-center rounded-full bg-primary-500 text-sm font-semibold text-white">
          AK
        </span>
      </div>
    </header>
  );
}
