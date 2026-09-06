import type { LucideIcon } from "lucide-react";
import { Bookmark, Check, CircleDot, Play } from "lucide-react";
import type { ReactNode } from "react";

type LabelTone = "video" | "lesson" | "relevant" | "resource";

const labelClasses: Record<LabelTone, string> = {
  video: "bg-neutral-900 text-white",
  lesson: "bg-primary-100 text-primary-500",
  relevant: "bg-neutral-100 text-neutral-700",
  resource: "bg-neutral-900 text-white",
};

export function Label({
  tone = "lesson",
  children,
}: {
  tone?: LabelTone;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-soft px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${labelClasses[tone]}`}
    >
      {children}
    </span>
  );
}

export function TopicTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700">
      {children}
    </span>
  );
}

type StatusTone = "blue" | "green" | "playing" | "neutral";

const statusClasses: Record<StatusTone, string> = {
  blue: "bg-primary-100 text-primary-500",
  green: "bg-primary-100 text-primary-500",
  playing: "bg-primary-500 text-white",
  neutral: "bg-neutral-100 text-neutral-700",
};

const statusIcons: Record<StatusTone, LucideIcon> = {
  blue: CircleDot,
  green: Check,
  playing: Play,
  neutral: Bookmark,
};

export function StatusTag({
  tone = "neutral",
  children,
}: {
  tone?: StatusTone;
  children: ReactNode;
}) {
  const Icon = statusIcons[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${statusClasses[tone]}`}
    >
      <Icon className="size-3.5" strokeWidth={2} />
      {children}
    </span>
  );
}
