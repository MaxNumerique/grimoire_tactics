"use client";

import { useEffect, useRef } from "react";
import { useCombatStore } from "@/stores/combat";
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

  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

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
        <div className="text-center border-b border-gold-border/40 pb-1 mb-2">
          <span className="font-cinzel text-[10px] font-black uppercase tracking-widest text-parchment-ink-title">
            CHRONIQUES DE COMBAT
          </span>
        </div>

        <div
          ref={logContainerRef}
          className="flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col gap-1.5 scrollbar-thin scroll-smooth"
        >
          {logs.length === 0 ? (
            <span className="font-cinzel text-xs text-parchment-ink-dark/50 italic text-center block py-4">
              En attente du premier coup de sort...
            </span>
          ) : (
            logs.map((logEntry) => {
              const isAttackOrKill = logEntry.type === "attack" || logEntry.type === "kill";
              const isHeal = logEntry.type === "heal";

              const renderUnitName = (name: string, side?: "player" | "enemy") => (
                <span
                  className={
                    side === "player"
                      ? "font-black text-blue-900"
                      : side === "enemy"
                      ? "font-black text-red-800"
                      : "font-black text-parchment-ink-title"
                  }
                >
                  {name}
                </span>
              );

              return (
                <div
                  key={logEntry.id}
                  className={`font-cinzel text-[11px] leading-relaxed py-0.5 ${
                    logEntry.type === "wave_start"
                      ? "text-amber-950 font-bold border-b border-gold-border/30 pb-1"
                      : "text-parchment-ink-dark"
                  }`}
                >
                  {isAttackOrKill && logEntry.actorName ? (
                    <div>
                      {logEntry.isCritical && (
                        <span className="font-black text-amber-900 tracking-wider mr-1">
                          COUP CRITIQUE !{" "}
                        </span>
                      )}
                      {renderUnitName(logEntry.actorName, logEntry.actorSide)}
                      <span> inflige </span>
                      <span className="font-black text-red-700 text-[11.5px]">
                        {logEntry.amount}
                      </span>
                      <span> dégâts à </span>
                      {renderUnitName(logEntry.targetName || "la cible", logEntry.targetSide)}
                      <span>.</span>
                      {logEntry.isKo && (
                        <div className="font-black text-red-700 tracking-wider mt-0.5">
                          K.O. !
                        </div>
                      )}
                    </div>
                  ) : isHeal && logEntry.actorName ? (
                    <div>
                      {renderUnitName(logEntry.actorName, logEntry.actorSide)}
                      <span> soigne </span>
                      {renderUnitName(logEntry.targetName || "l'allié", logEntry.targetSide)}
                      <span> de </span>
                      <span className="font-black text-emerald-700 text-[11.5px]">
                        {logEntry.amount}
                      </span>
                      <span> PV.</span>
                    </div>
                  ) : (
                    <div className="whitespace-pre-line font-medium">{logEntry.message}</div>
                  )}
                </div>
              );
            })
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
