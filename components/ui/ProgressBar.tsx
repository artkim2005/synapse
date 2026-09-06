export function ProgressBar({
  value,
  label,
  valueLabel,
}: {
  value: number;
  label?: string;
  valueLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {(label || valueLabel) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-neutral-700">{label}</span>}
          {valueLabel && (
            <span className="font-medium text-neutral-900">{valueLabel}</span>
          )}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-primary-500 transition-[width]"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
