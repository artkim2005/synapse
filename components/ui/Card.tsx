import { BarChart3, BookOpen, Clock, Download, FileText, Play } from "lucide-react";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { Label } from "./Badge";

function CardShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-medium border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {children}
    </div>
  );
}

export function CourseCard({
  title,
  description,
  lessons,
  duration,
  level,
  icon: Icon,
  thumbnailClassName = "bg-gradient-to-br from-neutral-900 to-primary-500",
  videoDuration,
  href,
}: {
  title: string;
  description: string;
  lessons: number;
  duration: string;
  level?: string;
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  thumbnailClassName?: string;
  videoDuration?: string;
  href?: string;
}) {
  const content = (
    <CardShell>
      <div className={`relative flex h-32 items-start p-3 ${thumbnailClassName}`}>
        <Label tone="video">Course</Label>
        {Icon && (
          <Icon
            className="absolute inset-0 m-auto size-12 text-white/90"
            strokeWidth={1.5}
          />
        )}
        {videoDuration && (
          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-soft bg-neutral-900/80 px-1.5 py-0.5 text-[11px] text-white">
            <Play className="size-2.5 fill-white text-white" />
            {videoDuration}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
        <p className="text-xs text-neutral-500">{description}</p>
        <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-neutral-500">
          <span className="inline-flex items-center gap-1">
            <BookOpen className="size-3.5" strokeWidth={2} />
            {lessons} lessons
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" strokeWidth={2} />
            {duration}
          </span>
          {level && (
            <span className="inline-flex items-center gap-1">
              <BarChart3 className="size-3.5" strokeWidth={2} />
              {level}
            </span>
          )}
        </div>
      </div>
    </CardShell>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

export function VideoResultCard({
  title,
  description,
  module,
  duration,
  timestamp,
}: {
  title: string;
  description: string;
  module: string;
  duration: string;
  timestamp: string;
}) {
  return (
    <CardShell>
      <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-neutral-700 to-neutral-900">
        <span className="flex size-10 items-center justify-center rounded-full bg-white/90">
          <Play className="size-4 fill-neutral-900 text-neutral-900" />
        </span>
        <span className="absolute bottom-2 right-2 rounded-soft bg-neutral-900/80 px-1.5 py-0.5 text-[11px] text-white">
          {timestamp}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
        <p className="text-xs text-neutral-500">{description}</p>
        <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-neutral-500">
          <span>{module}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" strokeWidth={2} />
            {duration}
          </span>
        </div>
      </div>
    </CardShell>
  );
}

export function LessonCard({
  title,
  description,
  module,
  duration,
}: {
  title: string;
  description: string;
  module: string;
  duration: string;
}) {
  return (
    <CardShell>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Label tone="lesson">Lesson</Label>
        <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
        <p className="text-xs text-neutral-500">{description}</p>
        <div className="flex items-center gap-4 pt-1 text-xs text-neutral-500">
          <span>{module}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" strokeWidth={2} />
            {duration}
          </span>
        </div>
        <button className="mt-2 inline-flex h-10 items-center justify-center gap-1 rounded-small bg-primary-500 px-3 text-sm font-medium text-white hover:brightness-95">
          Jump to Lesson →
        </button>
      </div>
    </CardShell>
  );
}

export function ResourceCard({
  title,
  fileType,
  fileSize,
}: {
  title: string;
  fileType: string;
  fileSize: string;
}) {
  return (
    <CardShell>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Label tone="resource">Resource</Label>
        <div className="flex items-start gap-3 pt-1">
          <span className="flex size-9 items-center justify-center rounded-small bg-neutral-100 text-neutral-700">
            <FileText className="size-4" strokeWidth={2} />
          </span>
          <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-neutral-500">
            {fileType} · {fileSize}
          </span>
          <button className="inline-flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-500/80">
            <Download className="size-4" strokeWidth={2} />
            Download
          </button>
        </div>
      </div>
    </CardShell>
  );
}
