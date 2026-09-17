"use client";

import Image from "next/image";
import { useCombatStore } from "@/stores/combatStore";
import { HERO_BADGE_THEMES } from "@/data/heroThemes";

export function TurnQueueRibbon() {
  const { turnQueue, activeUnitId } = useCombatStore();

  if (!turnQueue || turnQueue.length === 0) return null;

  return (
    <div
      className="relative overflow-hidden rounded-sm border-2 border-gold-border px-3 py-1.5 shadow-md bg-cover bg-center shrink-0"
      style={{ backgroundImage: "url('/images/bg/smooth_parchment.png')" }}
    >
      <div className="flex items-center gap-3">
        <span className="font-cinzel text-[10px] font-black uppercase tracking-widest text-parchment-ink-title shrink-0 border-r border-gold-border/40 pr-2.5">
          Initiative
        </span>

        <div className="flex items-center gap-2 overflow-x-auto py-0.5 scrollbar-thin flex-1">
          {turnQueue.map((unit, index) => {
            const isActive = unit.id === activeUnitId;
            const isPlayer = unit.side === "player";
            const theme = HERO_BADGE_THEMES[unit.category] || HERO_BADGE_THEMES.warrior;

            return (
              <div
                key={`${unit.id}_${index}`}
                className={`relative flex-shrink-0 flex items-center gap-1.5 rounded-sm border px-2 py-0.5 transition-all duration-300 ${
                  isActive
                    ? "border-gold-bright bg-amber-950/90 text-gold-bright scale-105 shadow-[0_0_10px_rgba(212,175,55,0.7)] ring-1 ring-gold-bright"
                    : isPlayer
                    ? "border-gold-border/40 bg-parchment-ink-dark/10 text-parchment-ink-dark"
                    : "border-red-900/40 bg-red-950/20 text-red-950"
                }`}
              >
                <div className="relative h-5 w-5 rounded-full overflow-hidden border border-gold-border/60">
                  <Image
                    src={theme.imageBadge}
                    alt={unit.category}
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                </div>

                <span className="font-cinzel text-[10px] font-black truncate max-w-[80px]">
                  {unit.name}
                </span>

                <span className="font-cinzel text-[8.5px] font-bold opacity-75">
                  V{unit.effectiveStats.speed}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
