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
          className="block font-cinzel text-xs font-semibold text-gold-bright uppercase tracking-wider mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full bg-bg-input border border-gold-primary/30 px-4 py-2.5 text-sm text-parchment-light placeholder-parchment-placeholder focus:outline-none focus:border-gold-primary transition-colors ${
          error ? "border-error-text" : ""
        } ${className}`}
        {...props}
      />
      {helperText && (
        <p className="mt-1 text-[10px] text-parchment-muted">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-error-text">{error}</p>
      )}
    </div>
  );
}
