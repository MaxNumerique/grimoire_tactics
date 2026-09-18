import { describe, expect, it } from "vitest";
import { generateTurnQueue } from "@/engine/combat/timeline";
import { calculateDamage } from "@/engine/combat/damage";
import { selectTarget } from "@/engine/combat/targeting";
import { buildWaveEnemies, evaluateBattleOutcome } from "@/engine/combat/instanceResolver";
import { CombatUnit, HeroCategory } from "@/types/combat";

const createMockUnit = (
  unitId: string,
  side: "player" | "enemy",
  speed: number,
  slotId: string = "front_1",
  category: HeroCategory = "warrior"
): CombatUnit => ({
  id: unitId,
  templateId: "mock-template",
  name: unitId,
  category,
  rarity: "common",
  level: 1,
  image: "/images/heroes/warrior.png",
  side,
  slotId,
  baseStats: { health: 100, attack: 20, defense: 10, speed },
  statGrowthPerLevel: { health: 10, attack: 2, defense: 1, speed: 0.5 },
  effectiveStats: { health: 100, attack: 20, defense: 10, speed },
  currentHealth: 100,
  isDead: false,
  weaponType: "tranchant",
  elementType: "feu",
  weaponWeakness: "contendant",
  elementWeakness: "eau",
});

describe("Combat Engine & Instance Resolver", () => {
  it("should sort turn queue by speed descending", () => {
    const unitSlow = createMockUnit("slow", "player", 10);
    const unitFast = createMockUnit("fast", "enemy", 25);
    const unitMid = createMockUnit("mid", "player", 18);

    const turnQueue = generateTurnQueue([unitSlow, unitFast, unitMid]);

    expect(turnQueue.map((unit: CombatUnit) => unit.id)).toEqual(["fast", "mid", "slow"]);
  });

  it("should calculate damage with defense reduction", () => {
    const attackerUnit = createMockUnit("attacker", "player", 10);
    attackerUnit.effectiveStats.attack = 30;

    const defenderUnit = createMockUnit("defender", "enemy", 10);
    defenderUnit.effectiveStats.defense = 20;

    const damageResult = calculateDamage(attackerUnit, defenderUnit);
    expect(damageResult.amount).toBeGreaterThanOrEqual(10);
  });

  it("should prioritize frontline enemies for warrior", () => {
    const warriorUnit = createMockUnit("warrior", "player", 15, "front_1", "warrior");
    const enemyBackUnit = createMockUnit("enemyBack", "enemy", 10, "back_1", "mage");
    const enemyFrontUnit = createMockUnit("enemyFront", "enemy", 10, "front_2", "tank");

    const targetUnit = selectTarget(warriorUnit, [warriorUnit, enemyBackUnit, enemyFrontUnit]);
    expect(targetUnit?.id).toBe("enemyFront");
  });

  it("should evaluate wave cleared when all enemies are dead in wave 1", () => {
    const playerUnit = createMockUnit("player", "player", 10);
    const enemyUnit = createMockUnit("enemy", "enemy", 10);
    enemyUnit.isDead = true;
    enemyUnit.currentHealth = 0;

    const battleOutcome = evaluateBattleOutcome([playerUnit, enemyUnit], 1);
    expect(battleOutcome).toBe("wave_cleared");
  });

  it("should evaluate victory when all enemies are dead in wave 3", () => {
    const playerUnit = createMockUnit("player", "player", 10);
    const enemyUnit = createMockUnit("enemy", "enemy", 10);
    enemyUnit.isDead = true;
    enemyUnit.currentHealth = 0;

    const battleOutcome = evaluateBattleOutcome([playerUnit, enemyUnit], 3);
    expect(battleOutcome).toBe("victory");
  });

  it("should Fail Fast and throw an error when an unknown enemy ID is requested", () => {
    expect(() =>
      buildWaveEnemies({
        waveNumber: 1,
        title: "Test Wave",
        enemies: [
          {
            enemyId: "unknown_ghost_enemy",
            slotId: "front_1",
            level: 1,
            rarity: "common",
          },
        ],
      })
    ).toThrowError(/enemies.json/);
  });
});
