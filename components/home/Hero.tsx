import {
  ArrowRight,
  Atom,
  Braces,
  Brain,
  ChevronRight,
  Play,
  Search,
} from "lucide-react";
import type { ComponentType } from "react";

const topics: {
  label: string;
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  glyph?: string;
}[] = [
  { label: "React", icon: Atom },
  { label: "Data Structures", icon: Braces },
  { label: "Machine Learning", icon: Brain },
  { label: "Calculus", glyph: "Σ" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-gradient-to-b from-primary-100/60 to-white px-6 py-20">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-primary-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-primary-200/40 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h1 className="text-display font-semibold tracking-[-0.01em] text-neutral-900">
          Search Smarter.
          <br />
          <span className="text-primary-500">Learn Faster.</span>
        </h1>
        <p className="max-w-xl text-body-lg text-neutral-500">
          Synapse connects your questions to the exact moments in video lessons,
          so you can learn what you need, when you need it.
        </p>

        <div className="relative w-full max-w-2xl">
          <Search
            className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-neutral-500"
            strokeWidth={2}
          />
          <input
            type="search"
            placeholder="Search topics, courses, or questions..."
            className="h-14 w-full rounded-full border border-neutral-200 bg-white pl-12 pr-16 text-body-lg text-neutral-900 shadow-sm placeholder:text-neutral-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          />
          <button
            type="button"
            aria-label="Search"
            className="absolute right-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:brightness-95"
          >
            <ArrowRight className="size-5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {topics.map(({ label, icon: Icon, glyph }) => (
            <button
              key={label}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-primary-500 hover:text-primary-500"
            >
              {Icon ? (
                <Icon className="size-4 text-primary-500" strokeWidth={2} />
              ) : (
                <span className="text-sm font-semibold text-primary-500">
                  {glyph}
                </span>
              )}
              {label}
            </button>
          ))}
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-primary-500 transition-colors hover:text-primary-500/80"
          >
            More
            <ChevronRight className="size-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
