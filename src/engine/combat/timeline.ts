import { CombatUnit } from "@/types/combat";
import { getLivingUnits } from "@/engine/combat/unitState";

export interface TimelineUnitItem {
  type: "unit";
  unit: CombatUnit;
  roundNumber: number;
  isActive: boolean;
  uniqueKey: string;
}

export interface TimelineRoundSeparator {
  type: "separator";
  roundNumber: number;
  uniqueKey: string;
}

export type TimelineItem = TimelineUnitItem | TimelineRoundSeparator;

export interface ContinuousTimelineOptions {
  units: CombatUnit[];
  turnQueue: CombatUnit[];
  activeUnitId: string | null;
  currentRound: number;
  targetSize?: number;
}

export function sortInitiative(units: CombatUnit[]): CombatUnit[] {
  const livingUnits = getLivingUnits(units);

  return [...livingUnits].sort((firstUnit, secondUnit) => {
    if (secondUnit.effectiveStats.speed !== firstUnit.effectiveStats.speed) {
      return secondUnit.effectiveStats.speed - firstUnit.effectiveStats.speed;
    }
    if (firstUnit.side !== secondUnit.side) {
      return firstUnit.side === "player" ? -1 : 1;
    }
    return firstUnit.id.localeCompare(secondUnit.id);
  });
}

// Alias de transition pour rétrocompatibilité
export const generateTurnQueue = sortInitiative;

export function buildContinuousTimeline({
  units,
  turnQueue,
  activeUnitId,
  currentRound,
  targetSize = 8,
}: ContinuousTimelineOptions): TimelineItem[] {
  const livingUnits = getLivingUnits(units);
  if (livingUnits.length === 0) return [];

  const fullInitiativeOrder = sortInitiative(livingUnits);
  const timelineItems: TimelineItem[] = [];
  let displayedUnitCount = 0;
  let roundNumber = currentRound;

  // 1. Unités restantes du tour en cours
  for (const queuedUnit of turnQueue) {
    if (displayedUnitCount >= targetSize) break;

    const liveUnit = livingUnits.find((living) => living.id === queuedUnit.id);
    if (liveUnit) {
      timelineItems.push({
        type: "unit",
        unit: liveUnit,
        roundNumber,
        isActive: liveUnit.id === activeUnitId,
        uniqueKey: `round_${roundNumber}_${liveUnit.id}_${displayedUnitCount}`,
      });
      displayedUnitCount++;
    }
  }

  // 2. Remplissage glissant des tours suivants jusqu'à atteindre targetSize
  while (displayedUnitCount < targetSize && fullInitiativeOrder.length > 0) {
    roundNumber++;
    timelineItems.push({
      type: "separator",
      roundNumber,
      uniqueKey: `sep_${roundNumber}`,
    });

    for (const combatUnit of fullInitiativeOrder) {
      if (displayedUnitCount >= targetSize) break;

      timelineItems.push({
        type: "unit",
        unit: combatUnit,
        roundNumber,
        isActive: false,
        uniqueKey: `round_${roundNumber}_${combatUnit.id}_${displayedUnitCount}`,
      });
      displayedUnitCount++;
    }
  }

  return timelineItems;
}

