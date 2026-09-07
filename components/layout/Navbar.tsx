import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";
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
        <Show when="signed-out">
          <div className="flex items-center gap-2">
            <SignInButton mode="modal">
              <Button variant="tertiary" size="sm">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="primary" size="sm">
                Sign up
              </Button>
            </SignUpButton>
          </div>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </header>
  );
}
