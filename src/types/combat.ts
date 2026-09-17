export type Rarity = "common" | "rare" | "epic" | "legendary";

export type HeroCategory = "warrior" | "tank" | "mage" | "healer";

export type WeaponType = "tranchant" | "contendant" | "transperce" | "distance";

export type ElementType =
  | "feu"
  | "eau"
  | "terre"
  | "foudre"
  | "lumiere"
  | "tenebres"
  | "physique";

export type UnitSide = "player" | "enemy";

export type PlayerSlotId =
  | "front_1"
  | "front_2"
  | "front_3"
  | "back_1"
  | "back_2"
  | "back_3";

export type EnemySlotId =
  | "front_1"
  | "front_2"
  | "front_3"
  | "front_4"
  | "back_1"
  | "back_2"
  | "back_3"
  | "back_4";

export interface BaseStats {
  health: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface StatGrowth {
  health: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface HeroDefinition {
  id: string;
  name: string;
  category: HeroCategory;
  rarity: Rarity;
  description: string;
  image: string;
  baseStats: BaseStats;
  statGrowthPerLevel: StatGrowth;
  weaponType: WeaponType;
  elementType: ElementType;
  weaponWeakness: WeaponType;
  elementWeakness: ElementType;
  badgeColor?: string;
}

export interface EnemyDefinition {
  id: string;
  name: string;
  category: HeroCategory;
  rarity: Rarity;
  image: string;
  baseStats: BaseStats;
  statGrowthPerLevel: StatGrowth;
  weaponType: WeaponType;
  elementType: ElementType;
  weaponWeakness: WeaponType;
  elementWeakness: ElementType;
}

export interface CombatUnit {
  id: string;
  templateId: string;
  name: string;
  category: HeroCategory;
  rarity: Rarity;
  level: number;
  image: string;
  side: UnitSide;
  slotId: string;
  baseStats: BaseStats;
  statGrowthPerLevel: StatGrowth;
  effectiveStats: BaseStats;
  currentHealth: number;
  isDead: boolean;
  weaponType: WeaponType;
  elementType: ElementType;
  weaponWeakness: WeaponType;
  elementWeakness: ElementType;
}

export interface WaveEnemySetup {
  enemyId: string;
  slotId: EnemySlotId;
  level: number;
  rarity: Rarity;
}

export interface WaveConfig {
  waveNumber: 1 | 2 | 3;
  title: string;
  enemies: WaveEnemySetup[];
}

export interface DungeonConfig {
  id: string;
  name: string;
  description: string;
  recommendedLevel: number;
  waves: [WaveConfig, WaveConfig, WaveConfig];
}

export interface CombatLogEntry {
  id: string;
  turn: number;
  waveNumber: number;
  message: string;
  type: "attack" | "heal" | "skill" | "kill" | "wave_start" | "victory" | "defeat";
}

export type BattleOutcome = "ongoing" | "wave_cleared" | "victory" | "defeat";
