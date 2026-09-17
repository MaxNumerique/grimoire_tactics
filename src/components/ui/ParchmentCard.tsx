import { ReactNode } from "react";

interface ParchmentCardProps {
  children: ReactNode;
  className?: string;
  variant?: "parchment" | "dark";
  hoverable?: boolean;
}

export function ParchmentCard({
  children,
  className = "",
  variant = "parchment",
  hoverable = false,
}: ParchmentCardProps) {
  const isParchment = variant === "parchment";

  return (
    <div
      className={`relative h-full ${
        hoverable
          ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(212,175,55,0.35)]"
          : ""
      } ${className}`}
    >
      <div
        className={`relative h-full overflow-hidden p-8 border-2 border-gold-border shadow-[0_15px_35px_rgba(0,0,0,0.8)] rounded-sm bg-cover bg-center flex flex-col justify-center items-center ${
          isParchment
            ? "text-parchment-ink-dark"
            : "bg-gradient-to-b from-bg-modal-from/95 to-bg-modal-to/95 text-parchment-light"
        }`}
        style={
          isParchment
            ? { backgroundImage: "url('/images/bg/smooth_parchment.png')" }
            : undefined
        }
      >
        <div className="absolute inset-2 border border-gold-border/30 pointer-events-none" />
        <div className="relative z-10 w-full flex flex-col items-center justify-center h-full">{children}</div>
      </div>
    </div>
  );
}
