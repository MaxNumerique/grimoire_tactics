import { CombatUnit } from "@/types/combat";

export function generateTurnQueue(units: CombatUnit[]): CombatUnit[] {
  const livingUnits = units.filter(
    (unit) => !unit.isDead && unit.currentHealth > 0
  );

  return [...livingUnits].sort((firstUnit, secondUnit) => {
    if (
      secondUnit.effectiveStats.speed !== firstUnit.effectiveStats.speed
    ) {
      return secondUnit.effectiveStats.speed - firstUnit.effectiveStats.speed;
    }
    if (firstUnit.side !== secondUnit.side) {
      return firstUnit.side === "player" ? -1 : 1;
    }
    return firstUnit.id.localeCompare(secondUnit.id);
  });
}
