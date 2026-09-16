interface UserCurrencyBadgeProps {
  gold: number;
  gems: number;
  className?: string;
}

export function UserCurrencyBadge({ gold, gems, className = "" }: UserCurrencyBadgeProps) {
  return (
    <div
      className={`hidden items-center gap-4 border border-[rgba(212,175,55,0.3)] bg-[#1a140e] px-3 py-1.5 text-xs text-[#e2d9cd] sm:flex ${className}`}
    >
      <span className="flex items-center gap-1.5">
        <span className="font-cinzel text-[10px] font-bold text-[#a39482] uppercase">Or</span>
        <strong className="text-[#f3d068] font-cinzel">{gold}</strong>
      </span>
      <span className="flex items-center gap-1.5">
        <span className="font-cinzel text-[10px] font-bold text-[#a39482] uppercase">Gemmes</span>
        <strong className="text-[#9d4edd] font-cinzel">{gems}</strong>
      </span>
    </div>
  );
}
