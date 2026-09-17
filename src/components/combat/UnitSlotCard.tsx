"use client";

import Image from "next/image";
import { CombatUnit, ElementType, HeroCategory } from "@/types/combat";
import { HERO_BADGE_THEMES } from "@/data/heroThemes";

interface UnitSlotCardProps {
  unit: CombatUnit | null;
  isActiveTurn?: boolean;
  onSelect?: () => void;
}

const RARITY_BORDERS = {
  common: "border-slate-500/80 shadow-md",
  rare: "border-blue-600/90 shadow-[0_0_10px_rgba(37,99,235,0.4)]",
  epic: "border-purple-600/90 shadow-[0_0_12px_rgba(147,51,234,0.5)]",
  legendary: "border-gold-bright shadow-[0_0_16px_rgba(212,175,55,0.7)]",
};

function ElementBadgeOverlay({ type }: { type: ElementType }) {
  const badgeStyle: Record<ElementType, string> = {
    feu: "bg-red-900/90 text-red-200 border-red-500/60",
    eau: "bg-blue-900/90 text-blue-200 border-blue-500/60",
    terre: "bg-amber-900/90 text-amber-200 border-amber-500/60",
    foudre: "bg-yellow-900/90 text-yellow-200 border-yellow-500/60",
    lumiere: "bg-amber-800/90 text-amber-100 border-amber-300/60",
    tenebres: "bg-purple-900/90 text-purple-200 border-purple-500/60",
    physique: "bg-slate-900/90 text-slate-200 border-slate-500/60",
  };

  const label: Record<ElementType, string> = {
    feu: "FEU",
    eau: "EAU",
    terre: "TR",
    foudre: "FDR",
    lumiere: "LUM",
    tenebres: "TNB",
    physique: "PHY",
  };

  return (
    <span
      className={`font-cinzel text-[9px] font-black px-1.5 py-0.5 rounded border shadow-md backdrop-blur-xs ${
        badgeStyle[type] || "bg-black/80 text-gold-bright border-gold-border/60"
      }`}
      title={`Élément: ${type}`}
    >
      {label[type]}
    </span>
  );
}

function ClassBadgeOverlay({ category }: { category: HeroCategory }) {
  const theme = HERO_BADGE_THEMES[category] || HERO_BADGE_THEMES.warrior;

  return (
    <div
      className="relative h-6 w-6 rounded-full border border-gold-border shadow-md overflow-hidden bg-slate-950/80"
      title={`Classe: ${category}`}
    >
      <Image
        src={theme.imageBadge}
        alt={category}
        fill
        sizes="24px"
        className="object-cover scale-110"
      />
    </div>
  );
}

export function UnitSlotCard({ unit, isActiveTurn, onSelect }: UnitSlotCardProps) {
  if (!unit) {
    return (
      <div
        className="h-44 w-28 sm:w-32 rounded-sm border-2 border-dashed border-gold-border/30 bg-cover bg-center flex items-center justify-center pointer-events-none relative shadow-inner"
        style={{ backgroundImage: "url('/images/bg/smooth_parchment.png')" }}
      >
        <span className="font-cinzel text-[10px] font-bold text-parchment-ink-dark/40 uppercase tracking-widest text-center px-1">
          Vide
        </span>
      </div>
    );
  }

  const healthPercentage = Math.max(
    0,
    Math.min(100, Math.round((unit.currentHealth / unit.effectiveStats.health) * 100)),
  );
  const isUnitDead = unit.isDead || unit.currentHealth <= 0;
  const isPlayer = unit.side === "player";

  return (
    <div
      onClick={onSelect}
      className={`relative group h-44 w-28 sm:w-32 transition-all duration-300 rounded-sm overflow-hidden border-2 cursor-pointer ${
        isUnitDead ? "opacity-30 grayscale cursor-not-allowed" : ""
      } ${
        isActiveTurn
          ? "ring-4 ring-gold-bright border-gold-bright scale-[1.05] z-30 shadow-[0_0_25px_rgba(212,175,55,0.9)]"
          : RARITY_BORDERS[unit.rarity] || "border-gold-border/60"
      }`}
    >
      {/* GW2 Parchment Filigree Corners */}
      <div className="absolute top-0.5 left-0.5 w-2 h-2 border-t-2 border-l-2 border-gold-bright/80 pointer-events-none z-20" />
      <div className="absolute top-0.5 right-0.5 w-2 h-2 border-t-2 border-r-2 border-gold-bright/80 pointer-events-none z-20" />
      <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-b-2 border-l-2 border-gold-bright/80 pointer-events-none z-20" />
      <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b-2 border-r-2 border-gold-bright/80 pointer-events-none z-20" />

      {/* FULL CARD PORTRAIT IMAGE (ZOOMED IN, FILLS 100% AREA) */}
      <Image
        src={unit.image}
        alt={unit.name}
        fill
        sizes="130px"
        className="object-cover object-top scale-135 group-hover:scale-145 transition-transform duration-500"
      />

      {/* OVERLAY: Element Badge (Top Left) */}
      <div className="absolute top-1.5 left-1.5 z-20">
        <ElementBadgeOverlay type={unit.elementType} />
      </div>

      {/* OVERLAY: Class Badge (Top Right) */}
      <div className="absolute top-1.5 right-1.5 z-20">
        <ClassBadgeOverlay category={unit.category} />
      </div>

      {/* OVERLAY: Gradient Shadow at Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none z-10 flex flex-col justify-end p-1.5" />

      {/* OVERLAY CONTENT: HP Bar & Name */}
      <div className="absolute bottom-1 left-1 right-1 z-20 flex flex-col gap-0.5">
        <div className="relative h-3.5 w-full rounded-xs bg-slate-950/90 border border-gold-border/50 overflow-hidden shadow-md flex items-center justify-center">
          <div
            className={`absolute left-0 top-0 bottom-0 transition-all duration-300 ${
              isPlayer
                ? healthPercentage > 50
                  ? "bg-gradient-to-r from-emerald-700 to-emerald-400"
                  : healthPercentage > 20
                    ? "bg-gradient-to-r from-amber-700 to-amber-400"
                    : "bg-gradient-to-r from-red-800 to-red-500 animate-pulse"
                : healthPercentage > 50
                  ? "bg-gradient-to-r from-red-800 to-red-500"
                  : "bg-gradient-to-r from-red-950 to-red-700 animate-pulse"
            }`}
            style={{ width: `${healthPercentage}%` }}
          />
          <span className="relative z-10 font-cinzel text-[8.5px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
            {unit.currentHealth}/{unit.effectiveStats.health} HP
          </span>
        </div>

        <span className="font-cinzel text-[10px] font-black text-gold-bright text-center truncate drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] tracking-wide">
          {unit.name}
        </span>
      </div>
    </div>
  );
}
