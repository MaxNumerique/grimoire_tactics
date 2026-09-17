import {
  CombatUnit,
  EnemyDefinition,
  HeroDefinition,
  Rarity,
  UnitSide,
} from "@/types/combat";
import { calculateEffectiveStats } from "@/engine/stats/statsCalculator";

export function createCombatUnitInstance(
  template: HeroDefinition | EnemyDefinition,
  instanceId: string,
  side: UnitSide,
  slotId: string,
  level: number,
  rarity: Rarity
): CombatUnit {
  if (!template) {
    throw new Error(
      `[unitFactory] Impossible d'instancier l'unité (${instanceId}) : Modèle de définition introuvable.`
    );
  }

  const effectiveStats = calculateEffectiveStats(
    template.baseStats,
    template.statGrowthPerLevel,
    level,
    rarity
  );

  return {
    id: instanceId,
    templateId: template.id,
    name: template.name,
    category: template.category,
    rarity,
    level,
    image: template.image,
    side,
    slotId,
    baseStats: template.baseStats,
    statGrowthPerLevel: template.statGrowthPerLevel,
    effectiveStats,
    currentHealth: effectiveStats.health,
    isDead: false,
    weaponType: template.weaponType,
    elementType: template.elementType,
    weaponWeakness: template.weaponWeakness,
    elementWeakness: template.elementWeakness,
  };
}
