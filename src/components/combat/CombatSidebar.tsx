"use client";

import { useEffect } from "react";
import { useCombatStore } from "@/stores/combatStore";
import { Button } from "@/components/ui/Button";

export function CombatSidebar() {
  const {
    logs,
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
    <div
      className="rounded-sm border-2 border-gold-border p-3.5 flex flex-col justify-between h-full min-h-[580px] shadow-2xl relative overflow-hidden bg-cover bg-center text-parchment-ink-dark"
      style={{ backgroundImage: "url('/images/bg/smooth_parchment.png')" }}
    >
      <div className="absolute inset-1.5 border border-gold-border/30 pointer-events-none" />

      {/* TOP: COMBAT LOG */}
      <div className="flex-1 flex flex-col min-h-0 mb-3 relative z-10">
        <div className="text-center border-b border-gold-border/40 pb-1.5 mb-2.5">
          <h3 className="font-cinzel text-xs font-black uppercase tracking-widest text-parchment-ink-title">
            JOURNAL DES ARCANES
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2 scrollbar-thin max-h-[380px]">
          {logs.length === 0 ? (
            <span className="font-cinzel text-xs text-parchment-ink-dark/50 italic text-center block py-4">
              En attente du premier coup de sort...
            </span>
          ) : (
            logs.map((logEntry) => (
              <div
                key={logEntry.id}
                className={`font-cinzel text-[11px] font-bold leading-relaxed border-l-2 pl-2 py-0.5 ${
                  logEntry.type === "wave_start"
                    ? "border-amber-700 text-amber-900 bg-amber-500/10 font-black"
                    : logEntry.type === "kill"
                    ? "border-red-700 text-red-950 font-black"
                    : logEntry.type === "heal"
                    ? "border-emerald-700 text-emerald-950"
                    : "border-gold-border/60 text-parchment-ink-dark"
                }`}
              >
                {logEntry.message}
              </div>
            ))
          )}
        </div>
      </div>

      {/* MIDDLE: SPEED CONTROLS */}
      <div className="border-t border-gold-border/40 pt-2.5 mb-3 relative z-10">
        <span className="font-cinzel text-[10px] font-black uppercase tracking-widest text-parchment-ink-title block text-center mb-1.5">
          VITESSE DE COMBAT
        </span>
        <div className="grid grid-cols-3 gap-2">
          {([1, 2, 4] as const).map((speedOption) => (
            <button
              key={speedOption}
              onClick={() => setGameSpeed(speedOption)}
              className={`font-cinzel text-xs font-black py-1.5 rounded-xs border transition-all ${
                gameSpeed === speedOption
                  ? "border-gold-border bg-[#2d1e12] text-gold-bright shadow-sm"
                  : "border-gold-border/40 bg-parchment-ink-dark/10 text-parchment-ink-dark hover:border-gold-border"
              }`}
            >
              {speedOption}x
            </button>
          ))}
        </div>
      </div>

      {/* BOTTOM: MAIN ACTION BUTTON */}
      <div className="relative z-10">
        {battleOutcome === "wave_cleared" ? (
          <Button variant="primary" onClick={nextWave} className="w-full">
            VAGUE SUIVANTE
          </Button>
        ) : battleOutcome === "victory" ? (
          <div className="text-center font-cinzel text-xs font-black text-gold-bright py-2.5 px-2 border border-gold-border bg-[#2d1e12] rounded-xs shadow-sm">
            DONJON ACCOMPLI
          </div>
        ) : battleOutcome === "defeat" ? (
          <div className="text-center font-cinzel text-xs font-black text-red-400 py-2.5 px-2 border border-red-900 bg-red-950 rounded-xs shadow-sm">
            ESCOUADE DÉCIMÉE
          </div>
        ) : (
          <button
            onClick={togglePlayPause}
            className={`w-full font-cinzel text-xs font-black py-2.5 rounded-xs border tracking-widest transition-all ${
              isPlaying
                ? "border-amber-700 bg-amber-950 text-amber-200 shadow-sm"
                : "border-emerald-700 bg-emerald-950 text-emerald-200 shadow-sm"
            }`}
          >
            {isPlaying ? "PAUSE" : "CONTINUER"}
          </button>
        )}
      </div>
    </div>
  );
}
