interface UserCurrencyBadgeProps {
  gold: number;
  gems: number;
  className?: string;
}

export function UserCurrencyBadge({ gold, gems, className = "" }: UserCurrencyBadgeProps) {
  return (
    <div
      className={`hidden items-center gap-4 border border-gold-primary/30 bg-bg-card-dark px-3 py-1.5 text-xs text-parchment-light sm:flex ${className}`}
    >
      <span className="flex items-center gap-1.5">
        <span className="font-cinzel text-[10px] font-bold text-parchment-muted uppercase">Or</span>
        <strong className="text-gold-bright font-cinzel">{gold}</strong>
      </span>
      <span className="flex items-center gap-1.5">
        <span className="font-cinzel text-[10px] font-bold text-parchment-muted uppercase">Gemmes</span>
        <strong className="text-purple-arcane font-cinzel">{gems}</strong>
      </span>
    </div>
  );
}
