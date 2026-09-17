import {
  BattleOutcome,
  CombatLogEntry,
  CombatUnit,
  DungeonConfig,
  EnemyDefinition,
  WaveConfig,
} from "@/types/combat";
import { createCombatUnitInstance } from "@/engine/combat/unitFactory";
import enemiesData from "@/data/enemies.json";

const enemyDictionary: Record<string, EnemyDefinition> = (
  enemiesData as unknown as EnemyDefinition[]
).reduce(
  (accumulator, enemyDefinition) => ({
    ...accumulator,
    [enemyDefinition.id]: enemyDefinition,
  }),
  {}
);

export function buildWaveEnemies(wave: WaveConfig): CombatUnit[] {
  return wave.enemies.map((enemySetup, enemyIndex) => {
    const enemyDefinition = enemyDictionary[enemySetup.enemyId];

    if (!enemyDefinition) {
      throw new Error(
        `[instanceResolver] Échec de génération de la vague : L'ennemi "${enemySetup.enemyId}" n'existe pas dans le catalogue enemies.json.`
      );
    }

    const instanceId = `enemy_${wave.waveNumber}_${enemyIndex}_${enemySetup.slotId}`;

    return createCombatUnitInstance(
      enemyDefinition,
      instanceId,
      "enemy",
      enemySetup.slotId,
      enemySetup.level,
      enemySetup.rarity
    );
  });
}

export function evaluateBattleOutcome(
  units: CombatUnit[],
  currentWaveNumber: 1 | 2 | 3
): BattleOutcome {
  const hasLivingPlayer = units.some(
    (unit) => unit.side === "player" && !unit.isDead && unit.currentHealth > 0
  );
  const hasLivingEnemy = units.some(
    (unit) => unit.side === "enemy" && !unit.isDead && unit.currentHealth > 0
  );

  if (!hasLivingPlayer) return "defeat";
  if (!hasLivingEnemy) {
    return currentWaveNumber === 3 ? "victory" : "wave_cleared";
  }
  return "ongoing";
}

export function transitionToNextWave(
  playerUnits: CombatUnit[],
  dungeon: DungeonConfig,
  nextWaveNumber: 2 | 3
): { units: CombatUnit[]; logs: CombatLogEntry[] } {
  const nextWaveConfig = dungeon.waves[nextWaveNumber - 1];
  const newWaveEnemies = buildWaveEnemies(nextWaveConfig);

  const refreshedPlayerUnits = playerUnits.map((playerUnit) => {
    if (playerUnit.isDead) return playerUnit;
    const healAmount = Math.round(playerUnit.effectiveStats.health * 0.1);
    const newHealth = Math.min(
      playerUnit.effectiveStats.health,
      playerUnit.currentHealth + healAmount
    );
    return { ...playerUnit, currentHealth: newHealth };
  });

  const transitionLogs: CombatLogEntry[] = [
    {
      id: `log_wave_${nextWaveNumber}`,
      turn: 1,
      waveNumber: nextWaveNumber,
      message: `⚔️ Entrée dans la ${nextWaveConfig.title} ! Les héros récupèrent 10% de leurs PV.`,
      type: "wave_start",
    },
  ];

  return {
    units: [...refreshedPlayerUnits, ...newWaveEnemies],
    logs: transitionLogs,
  };
}
