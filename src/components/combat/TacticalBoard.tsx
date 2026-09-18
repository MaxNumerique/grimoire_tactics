"use client";

import { useCombatStore } from "@/stores/combat";
import { UnitSlotCard } from "@/components/combat/UnitSlotCard";
import { TurnQueueRibbon } from "@/components/combat/TurnQueueRibbon";

export function TacticalBoard() {
  const { dungeon, currentWaveNumber, units, activeUnitId } = useCombatStore();

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
        <div className="flex flex-col items-center gap-0.5 opacity-60 my-auto shrink-0">
          <span className="font-cinzel text-[10px] font-black uppercase tracking-widest text-parchment-ink-title">
            CHAMP DE BATAILLE TACTIQUE
          </span>
          <div className="w-20 h-[1px] bg-gold-border/50" />
        </div>

        {/* Timeline d'initiative fixée en bas à droite du champ de bataille tactique */}
        <div className="absolute bottom-2 right-2 z-20 max-w-[75%] sm:max-w-[80%] flex justify-end">
          <TurnQueueRibbon />
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
