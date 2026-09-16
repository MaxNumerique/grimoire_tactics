import { ReactNode } from "react";

interface ParchmentCardProps {
  children: ReactNode;
  className?: string;
  borderColor?: string;
}

export function ParchmentCard({
  children,
  className = "",
  borderColor = "border-[#d4af37]/30",
}: ParchmentCardProps) {
  return (
    <div
      className={`bg-gradient-to-b from-[#201a15]/95 to-[#14100d]/95 border ${borderColor} shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}
