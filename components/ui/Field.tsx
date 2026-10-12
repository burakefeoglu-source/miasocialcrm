import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

const base =
  "w-full rounded-xl border border-line bg-white px-3 text-sm outline-none transition placeholder:text-black/30 focus:border-brand focus:ring-2 focus:ring-brand/15";

export const inputClass = `${base} h-10`;

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm text-mute">
      {label}
      <div className="mt-1.5">{children}</div>
      {hint && !error && <div className="mt-1 text-xs text-black/35">{hint}</div>}
      {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
    </label>
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className = "", ...rest },
  ref
) {
  return <input ref={ref} className={`${inputClass} ${className}`} {...rest} />;
});

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select(
  { className = "", ...rest },
  ref
) {
  return <select ref={ref} className={`${inputClass} ${className}`} {...rest} />;
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(
  { className = "", ...rest },
  ref
) {
  return <textarea ref={ref} className={`${base} min-h-[84px] py-2.5 ${className}`} {...rest} />;
});
