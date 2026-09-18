"use client";

import { useMemo } from "react";
import Image from "next/image";

import { buildContinuousTimeline } from "@/engine/combat/timeline";
import { getHealthPercentage } from "@/engine/combat/unitState";
import { useCombatStore } from "@/stores/combat";

export function TurnQueueRibbon() {
  const { turnQueue, units, activeUnitId, currentRound } = useCombatStore();

  const timelineItems = useMemo(() => {
    return buildContinuousTimeline({
      units,
      turnQueue,
      activeUnitId,
      currentRound,
      targetSize: 8,
    });
  }, [units, turnQueue, activeUnitId, currentRound]);

  if (timelineItems.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 px-1.5 scrollbar-thin rounded-xs bg-black/50 border border-gold-border/30 backdrop-blur-xs shadow-md select-none max-w-full">
      {timelineItems.map((timelineItem) => {
        if (timelineItem.type === "separator") {
          return (
            <div
              key={timelineItem.uniqueKey}
              className="flex items-center justify-center shrink-0 px-1.5 py-0.5 rounded-xs border border-gold-border/30 bg-[#24170d]/90 text-gold-bright/80 shadow-xs"
              title={`Tour ${timelineItem.roundNumber}`}
            >
              <span className="font-cinzel text-[8px] sm:text-[8.5px] font-bold tracking-wider uppercase">
                T{timelineItem.roundNumber}
              </span>
            </div>
          );
        }

        const { unit, isActive, uniqueKey } = timelineItem;
        const isPlayer = unit.side === "player";
        const healthPercentage = getHealthPercentage(unit);

        return (
          <div
            key={uniqueKey}
            title={`${unit.name} • ${isPlayer ? "Allié" : "Ennemi"} (Vitesse: ${unit.effectiveStats.speed} • ${unit.currentHealth}/${unit.effectiveStats.health} PV)`}
            className={`relative group shrink-0 w-7 h-10 sm:w-8 sm:h-11 rounded-xs overflow-hidden border-2 transition-all duration-300 ${
              isActive
                ? "border-gold-bright ring-2 ring-gold-bright scale-105 z-20 shadow-[0_0_12px_rgba(212,175,55,0.9)] -translate-y-0.5"
                : isPlayer
                ? "border-amber-500/80 bg-slate-950/80 hover:border-gold-bright"
                : "border-red-700/80 bg-red-950/50 hover:border-red-500"
            }`}
          >
            {/* Miniature portrait rectangulaire */}
            <Image
              src={unit.image}
              alt={unit.name}
              fill
              sizes="32px"
              className="object-cover object-top"
            />

            {/* Indicateur d'unité active */}
            {isActive && (
              <div className="absolute top-0 right-0 w-2 h-2 bg-gold-bright rotate-45 translate-x-1 -translate-y-1 shadow-xs" />
            )}

            {/* Mini-jauge de PV dynamique */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-black/80">
              <div
                className={`h-full transition-all duration-300 ${
                  isPlayer ? "bg-emerald-400" : "bg-red-500"
                }`}
                style={{ width: `${healthPercentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
