import { CombatUnit } from "@/types/combat";

export function isUnitAlive(unit: CombatUnit): boolean {
  return !unit.isDead && unit.currentHealth > 0;
}

export function getLivingUnits(units: CombatUnit[]): CombatUnit[] {
  return units.filter(isUnitAlive);
}

export function getHealthPercentage(unit: CombatUnit): number {
  if (!unit.effectiveStats.health) return 0;
  return Math.max(
    0,
    Math.min(
      100,
      Math.round((unit.currentHealth / unit.effectiveStats.health) * 100)
    )
  );
}

