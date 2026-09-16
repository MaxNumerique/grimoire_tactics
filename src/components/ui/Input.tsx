import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export function Input({
  label,
  helperText,
  error,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block font-cinzel text-xs font-semibold text-[#f3d068] uppercase tracking-wider mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full bg-[#120e0b] border border-[rgba(212,175,55,0.3)] px-4 py-2.5 text-sm text-[#e2d9cd] placeholder-[#6b5f52] focus:outline-none focus:border-[#d4af37] transition-colors ${
          error ? "border-[#ff9999]" : ""
        } ${className}`}
        {...props}
      />
      {helperText && (
        <p className="mt-1 text-[10px] text-[#a39482]">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-[#ff9999]">{error}</p>
      )}
    </div>
  );
}
