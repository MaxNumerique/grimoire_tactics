import { CombatUnit } from "@/types/combat";

export interface ActionResult {
  amount: number;
  isCritical: boolean;
  isHeal: boolean;
  weaponWeaknessHit?: boolean;
  elementWeaknessHit?: boolean;
}

export type DamageResult = ActionResult;

export function calculateDamage(
  attackerUnit: CombatUnit,
  defenderUnit: CombatUnit,
  skillMultiplier: number = 1.0,
  randomProvider: () => number = Math.random
): ActionResult {
  const baseAttack = attackerUnit.effectiveStats.attack * skillMultiplier;
  const defenseMitigation = defenderUnit.effectiveStats.defense * 0.35;
  const netAttack = Math.max(1, baseAttack - defenseMitigation);

  // Weakness checks (+50% each)
  const weaponWeaknessHit =
    Boolean(attackerUnit.weaponType) &&
    Boolean(defenderUnit.weaponWeakness) &&
    attackerUnit.weaponType === defenderUnit.weaponWeakness;

  const elementWeaknessHit =
    Boolean(attackerUnit.elementType) &&
    Boolean(defenderUnit.elementWeakness) &&
    attackerUnit.elementType === defenderUnit.elementWeakness;

  const weaponMultiplier = weaponWeaknessHit ? 1.5 : 1.0;
  const elementMultiplier = elementWeaknessHit ? 1.5 : 1.0;

  const weaknessMultiplier = weaponMultiplier * elementMultiplier;
  const rawDamage = Math.max(1, Math.round(netAttack * weaknessMultiplier));

  const isCritical = randomProvider() < 0.1;
  const amount = isCritical ? Math.round(rawDamage * 1.5) : rawDamage;

  return {
    amount,
    isCritical,
    isHeal: false,
    weaponWeaknessHit,
    elementWeaknessHit,
  };
}

export function calculateHeal(
  healerUnit: CombatUnit,
  skillMultiplier: number = 1.4
): ActionResult {
  const amount = Math.max(
    10,
    Math.round(healerUnit.effectiveStats.attack * skillMultiplier)
  );

  return {
    amount,
    isCritical: false,
    isHeal: true,
  };
}
