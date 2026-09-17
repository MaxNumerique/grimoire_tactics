"use client";

import Image from "next/image";
import { useCombatStore } from "@/stores/combatStore";
import { UnitSlotCard } from "@/components/combat/UnitSlotCard";
import { HERO_BADGE_THEMES } from "@/data/heroThemes";

export function TacticalBoard() {
  const { dungeon, currentWaveNumber, turnQueue, units, activeUnitId } = useCombatStore();

  const playerUnits = units.filter((unit) => unit.side === "player");
  const enemyUnits = units.filter((unit) => unit.side === "enemy");

  return (
    <div
      className="relative overflow-hidden rounded-sm border-2 border-gold-border p-3 sm:p-4 shadow-2xl bg-cover bg-center text-parchment-ink-dark flex flex-col justify-between gap-3 h-full min-h-0"
      style={{ backgroundImage: "url('/images/bg/smooth_parchment.png')" }}
    >
      <div className="absolute inset-1.5 border border-gold-border/30 pointer-events-none" />

      {/* TOP SECTION: ENEMY SQUAD (HORIZONTAL ROW OF CARDS) */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 w-full shrink-0">
        <div className="flex flex-row justify-center items-center gap-1.5 sm:gap-3 overflow-x-auto w-full py-1 scrollbar-thin">
          {enemyUnits.length === 0 ? (
            <span className="font-cinzel text-xs text-red-900/40 italic py-2">
              Aucun ennemi présent.
            </span>
          ) : (
            enemyUnits.map((unit) => (
              <UnitSlotCard key={unit.id} unit={unit} isActiveTurn={unit.id === activeUnitId} />
            ))
          )}
        </div>
      </div>

      {/* CENTER SECTION: CHAMP DE BATAILLE TACTIQUE + INTEGRATED WAVE INFO & INITIATIVE QUEUE */}
      <div className="relative z-10 flex-1 w-full my-1 border border-gold-border/30 rounded-sm bg-black/10 p-2.5 flex flex-col items-center justify-between min-h-[100px] shadow-inner overflow-hidden">
        {/* Top edge of battlefield: Dungeon Name & Wave */}
        <div className="w-full flex items-center justify-between text-[11px] font-cinzel font-black text-parchment-ink-title border-b border-gold-border/30 pb-1 shrink-0">
          <span>{dungeon?.name}</span>
          <span className="px-2 py-0.5 rounded bg-[#2d1e12] text-gold-bright border border-gold-border/50 text-[10px]">
            VAGUE {currentWaveNumber} / 3
          </span>
        </div>

        {/* Center edge of battlefield: Rune Title */}
        <div className="flex flex-col items-center gap-0.5 opacity-60 my-1 shrink-0">
          <span className="font-cinzel text-[10px] font-black uppercase tracking-widest text-parchment-ink-title">
            CHAMP DE BATAILLE TACTIQUE
          </span>
          <div className="w-20 h-[1px] bg-gold-border/50" />
        </div>

        {/* Bottom edge of battlefield: Compact Initiative Queue */}
        <div className="w-full flex items-center justify-center gap-1.5 overflow-x-auto pt-1 border-t border-gold-border/30 scrollbar-thin shrink-0">
          <span className="font-cinzel text-[9px] font-black uppercase text-parchment-ink-title opacity-80 mr-1 shrink-0">
            INITIATIVE:
          </span>
          {turnQueue.map((unit, index) => {
            const isActive = unit.id === activeUnitId;
            const isPlayer = unit.side === "player";
            const theme = HERO_BADGE_THEMES[unit.category] || HERO_BADGE_THEMES.warrior;

            return (
              <div
                key={`${unit.id}_${index}`}
                className={`flex items-center gap-1 rounded px-1.5 py-0.5 border text-[9px] font-cinzel font-bold transition-all shrink-0 ${
                  isActive
                    ? "border-gold-bright bg-amber-950 text-gold-bright ring-1 ring-gold-bright scale-105"
                    : isPlayer
                      ? "border-gold-border/40 bg-slate-950/40 text-parchment-ink-dark"
                      : "border-red-900/40 bg-red-950/40 text-red-950"
                }`}
                title={`${unit.name} (Vitesse: ${unit.effectiveStats.speed})`}
              >
                <div className="relative h-4 w-4 rounded-full overflow-hidden border border-gold-border/60">
                  <Image
                    src={theme.imageBadge}
                    alt={unit.category}
                    fill
                    sizes="16px"
                    className="object-cover"
                  />
                </div>
                <span className="truncate max-w-[65px]">{unit.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM SECTION: PLAYER SQUAD (HORIZONTAL ROW OF CARDS) */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 w-full shrink-0">
        <div className="flex flex-row justify-center items-center gap-1.5 sm:gap-3 overflow-x-auto w-full py-1 scrollbar-thin">
          {playerUnits.length === 0 ? (
            <span className="font-cinzel text-xs text-parchment-ink-dark/40 italic py-2">
              Aucun héros déployé.
            </span>
          ) : (
            playerUnits.map((unit) => (
              <UnitSlotCard key={unit.id} unit={unit} isActiveTurn={unit.id === activeUnitId} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
