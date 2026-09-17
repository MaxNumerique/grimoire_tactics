"use client";

import { useCombatStore } from "@/stores/combatStore";

export function WaveHeader() {
  const { dungeon, currentWaveNumber } = useCombatStore();

  if (!dungeon) return null;

  const currentWaveConfig = dungeon.waves[currentWaveNumber - 1];

  return (
    <div
      className="relative overflow-hidden rounded-sm border-2 border-gold-border px-3 py-1.5 shadow-md bg-cover bg-center shrink-0 flex items-center justify-between"
      style={{ backgroundImage: "url('/images/bg/smooth_parchment.png')" }}
    >
      <div className="flex items-center gap-2">
        <span className="font-cinzel text-xs font-black uppercase tracking-widest text-parchment-ink-title">
          {dungeon.name}
        </span>
        <span className="text-gold-border/60">•</span>
        <span className="font-cinzel text-xs font-bold text-parchment-ink-dark">
          {currentWaveConfig.title}
        </span>
      </div>

      <div className="font-cinzel text-xs font-black px-2.5 py-0.5 rounded-sm bg-[#2d1e12] border border-gold-border/60 text-gold-bright">
        VAGUE {currentWaveNumber} / 3
      </div>
    </div>
  );
}
