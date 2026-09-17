import { BaseStats, StatGrowth, Rarity } from "@/types/combat";

export const RARITY_MULTIPLIERS: Record<Rarity, number> = {
  common: 1.0,
  rare: 1.15,
  epic: 1.35,
  legendary: 1.6,
};

export function calculateEffectiveStats(
  baseStats: BaseStats,
  statGrowthPerLevel: StatGrowth,
  level: number,
  rarity: Rarity
): BaseStats {
  const rarityMult = RARITY_MULTIPLIERS[rarity] || 1.0;
  const levelDelta = Math.max(1, level) - 1;

  return {
    health: Math.round((baseStats.health + levelDelta * statGrowthPerLevel.health) * rarityMult),
    attack: Math.round((baseStats.attack + levelDelta * statGrowthPerLevel.attack) * rarityMult),
    defense: Math.round((baseStats.defense + levelDelta * statGrowthPerLevel.defense) * rarityMult),
    speed: Math.round((baseStats.speed + levelDelta * statGrowthPerLevel.speed) * rarityMult),
  };
}
