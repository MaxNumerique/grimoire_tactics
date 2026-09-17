import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-cinzel text-[10px] font-bold uppercase tracking-widest text-gold-bright border border-gold-primary/30 bg-bg-card-dark/80 px-2.5 py-1 ${className}`}
    >
      {children}
    </span>
  );
}
