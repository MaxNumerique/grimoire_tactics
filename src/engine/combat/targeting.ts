import { CombatUnit } from "@/types/combat";
import { getLivingUnits } from "@/engine/combat/unitState";

export function selectTarget(
  actorUnit: CombatUnit,
  allUnits: CombatUnit[]
): CombatUnit | null {
  const livingUnits = getLivingUnits(allUnits);

  if (actorUnit.category === "healer") {
    const allyUnits = livingUnits.filter(
      (unit) => unit.side === actorUnit.side
    );
    if (allyUnits.length === 0) return null;

    return [...allyUnits].sort((firstAlly, secondAlly) => {
      const healthRatioFirst =
        firstAlly.currentHealth / firstAlly.effectiveStats.health;
      const healthRatioSecond =
        secondAlly.currentHealth / secondAlly.effectiveStats.health;
      return healthRatioFirst - healthRatioSecond;
    })[0];
  }

  const enemyUnits = livingUnits.filter(
    (unit) => unit.side !== actorUnit.side
  );
  if (enemyUnits.length === 0) return null;

  if (actorUnit.category === "mage") {
    return [...enemyUnits].sort(
      (firstEnemy, secondEnemy) =>
        firstEnemy.currentHealth - secondEnemy.currentHealth
    )[0];
  }

  const frontlineEnemies = enemyUnits.filter((enemyUnit) =>
    enemyUnit.slotId.startsWith("front_")
  );
  if (frontlineEnemies.length > 0) {
    return frontlineEnemies[0];
  }

  return enemyUnits[0];
}
