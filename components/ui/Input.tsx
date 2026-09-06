import { ChevronDown, Search } from "lucide-react";
import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const fieldBase =
  "w-full rounded-small border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-500 transition-colors focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 disabled:bg-neutral-100 disabled:text-neutral-500";

function Field({
  label,
  helperText,
  children,
}: {
  label?: string;
  helperText?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      {label && (
        <span className="text-sm font-medium text-neutral-700">{label}</span>
      )}
      {children}
      {helperText && <span className="text-xs text-neutral-500">{helperText}</span>}
    </label>
  );
}

export function SearchInput({
  label,
  helperText,
  className = "",
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
}) {
  return (
    <Field label={label} helperText={helperText}>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500"
          strokeWidth={2}
        />
        <input
          type="search"
          className={`${fieldBase} h-10 pl-9 pr-3 ${className}`}
          {...rest}
        />
      </div>
    </Field>
  );
}

export function TextInput({
  label,
  helperText,
  className = "",
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
}) {
  return (
    <Field label={label} helperText={helperText}>
      <input className={`${fieldBase} h-10 px-3 ${className}`} {...rest} />
    </Field>
  );
}

export function Select({
  label,
  helperText,
  className = "",
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  helperText?: string;
}) {
  return (
    <Field label={label} helperText={helperText}>
      <div className="relative">
        <select
          className={`${fieldBase} h-10 appearance-none px-3 pr-9 ${className}`}
          {...rest}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500"
          strokeWidth={2}
        />
      </div>
    </Field>
  );
}

export function Textarea({
  label,
  helperText,
  className = "",
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
}) {
  return (
    <Field label={label} helperText={helperText}>
      <textarea
        className={`${fieldBase} min-h-24 px-3 py-2 ${className}`}
        {...rest}
      />
    </Field>
  );
}
