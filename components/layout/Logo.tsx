export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        className="size-6 text-primary-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M8.2 7.2 10 10.2M15.8 7.2 14 10.2M8.2 16.8 10 13.8" />
      </svg>
      <span className="text-lg font-semibold text-neutral-900">Synapse</span>
    </div>
  );
}
