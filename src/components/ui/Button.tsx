import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-cinzel transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#d4af37] via-[#997a22] to-[#d4af37] text-[#0d0a07] font-extrabold uppercase tracking-widest px-6 py-3 border border-[#f3d068] shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_6px_25px_rgba(243,208,104,0.6)] [clip-path:polygon(10px_0,100%_0,calc(100%-10px)_100%,0_100%)]",
    secondary:
      "bg-[#1c1713]/85 text-[#f3d068] font-bold uppercase tracking-wider px-5 py-2.5 border border-[#d4af37] hover:bg-[#d4af37]/15 hover:border-[#f3d068] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] [clip-path:polygon(8px_0,100%_0,calc(100%-8px)_100%,0_100%)]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
