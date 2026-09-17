"use client";

import { useEffect } from "react";
import { useCombatStore } from "@/stores/combatStore";
import { Button } from "@/components/ui/Button";

export function CombatControls() {
  const {
    executeCurrentTurn,
    nextWave,
    battleOutcome,
    gameSpeed,
    setGameSpeed,
    isPlaying,
    togglePlayPause,
    activeUnitId,
  } = useCombatStore();

  useEffect(() => {
    if (!isPlaying || battleOutcome !== "ongoing") return;

    const speedDelayMap = { 1: 800, 2: 400, 4: 200 };
    const stepIntervalDelay = speedDelayMap[gameSpeed] || 800;

    const autoPlayTimer = setInterval(() => {
      executeCurrentTurn();
    }, stepIntervalDelay);

    return () => clearInterval(autoPlayTimer);
  }, [isPlaying, battleOutcome, gameSpeed, activeUnitId, executeCurrentTurn]);

  return (
    <div className="relative overflow-hidden rounded-sm border border-gold-border/40 bg-slate-950 p-3 shadow-lg">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2">
          {battleOutcome === "wave_cleared" ? (
            <Button variant="primary" onClick={nextWave}>
              VAGUE SUIVANTE
            </Button>
          ) : battleOutcome === "victory" ? (
            <span className="font-cinzel text-xs font-black text-gold-bright uppercase tracking-widest px-4 py-2 border border-gold-border bg-amber-950/80 rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.5)]">
              DONJON ACCOMPLI AVEC SUCCÈS
            </span>
          ) : battleOutcome === "defeat" ? (
            <span className="font-cinzel text-xs font-black text-red-400 uppercase tracking-widest px-4 py-2 border border-red-900 bg-red-950/80 rounded-sm shadow-[0_0_12px_rgba(239,68,68,0.4)]">
              VOTRE ESCOUADE A ÉTÉ DÉCIMÉE
            </span>
          ) : (
            <button
              onClick={togglePlayPause}
              className={`font-cinzel text-xs font-black px-4.5 py-2 rounded-sm border transition-all duration-300 ${
                isPlaying
                  ? "border-amber-500 bg-amber-950/90 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                  : "border-emerald-500 bg-emerald-950/90 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.6)]"
              }`}
            >
              {isPlaying ? "PAUSE" : "CONTINUER"}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-cinzel text-[11px] font-bold text-gold-border/80 uppercase tracking-wider">
            Vitesse :
          </span>
          {([1, 2, 4] as const).map((speedOption) => (
            <button
              key={speedOption}
              onClick={() => setGameSpeed(speedOption)}
              className={`font-cinzel text-xs font-black px-3.5 py-1.5 rounded-sm border transition-all ${
                gameSpeed === speedOption
                  ? "border-gold-bright bg-amber-950/90 text-gold-bright shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                  : "border-gold-border/30 bg-slate-900/60 text-parchment-light/70 hover:border-gold-border"
              }`}
            >
              {speedOption}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
