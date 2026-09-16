import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-cinzel text-[10px] font-bold uppercase tracking-widest text-[#f3d068] border border-[#d4af37]/30 bg-[#1c1713]/80 px-2.5 py-1 ${className}`}
    >
      {children}
    </span>
  );
}
