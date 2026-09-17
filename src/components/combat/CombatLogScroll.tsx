"use client";

import { useCombatStore } from "@/stores/combatStore";
import { StatIcon } from "@/components/ui/StatIcon";

export function CombatLogScroll() {
  const { logs } = useCombatStore();

  return (
    <div className="relative overflow-hidden rounded-sm border-2 border-gold-border p-3.5 text-parchment-light shadow-[0_15px_35px_rgba(0,0,0,0.85)] bg-slate-950 h-full flex flex-col min-h-[480px]">
      {/* Filigree Corner Accents */}
      <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 border-t-2 border-l-2 border-gold-bright/70 pointer-events-none" />
      <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 border-t-2 border-r-2 border-gold-bright/70 pointer-events-none" />
      <div className="absolute bottom-0.5 left-0.5 w-2.5 h-2.5 border-b-2 border-l-2 border-gold-bright/70 pointer-events-none" />
      <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 border-b-2 border-r-2 border-gold-bright/70 pointer-events-none" />

      <div className="flex items-center gap-2 border-b border-gold-border/40 pb-2 mb-3 shrink-0 relative z-10">
        <StatIcon type="book" className="w-4 h-4 text-gold-bright" />
        <span className="font-cinzel text-xs font-black uppercase tracking-widest text-gold-bright drop-shadow-sm">
          Journal des Arcanes
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2 scrollbar-thin max-h-[600px] relative z-10">
        {logs.length === 0 ? (
          <span className="font-cinzel text-xs text-parchment-light/50 italic">
            En attente du premier coup de sort...
          </span>
        ) : (
          logs.map((logEntry) => (
            <div
              key={logEntry.id}
              className={`font-cinzel text-xs font-bold leading-relaxed border-l-2 pl-2.5 py-1 rounded-r-xs transition-colors ${
                logEntry.type === "wave_start"
                  ? "border-amber-500 text-amber-300 bg-amber-950/40"
                  : logEntry.type === "kill"
                  ? "border-red-500 text-red-300 bg-red-950/50 font-black shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                  : logEntry.type === "heal"
                  ? "border-emerald-500 text-emerald-300 bg-emerald-950/40"
                  : "border-gold-border/50 text-parchment-light/90 bg-slate-900/40"
              }`}
            >
              {logEntry.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
