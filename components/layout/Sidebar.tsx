import {
  BookOpen,
  FolderOpen,
  Home,
  Settings,
  type LucideIcon,
} from "lucide-react";

const items: { label: string; icon: LucideIcon; active?: boolean }[] = [
  { label: "Home", icon: Home },
  { label: "Courses", icon: BookOpen, active: true },
  { label: "My Learning", icon: BookOpen },
  { label: "Resources", icon: FolderOpen },
  { label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <nav className="flex w-56 shrink-0 flex-col gap-1 border-r border-neutral-200 bg-white p-3">
      {items.map(({ label, icon: Icon, active }) => (
        <a
          key={label}
          href="#"
          className={`flex items-center gap-3 rounded-small px-3 py-2 text-sm font-medium transition-colors ${
            active
              ? "bg-primary-100 text-primary-500"
              : "text-neutral-700 hover:bg-neutral-100"
          }`}
        >
          <Icon className="size-4" strokeWidth={2} />
          {label}
        </a>
      ))}
    </nav>
  );
}
