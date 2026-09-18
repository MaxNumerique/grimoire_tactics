import { describe, expect, it } from "vitest";
import { calculateDamage } from "@/engine/combat/damage";
import { CombatUnit } from "@/types/combat";

function createMockUnit(overrides: Partial<CombatUnit>): CombatUnit {
  return {
    id: "mock-1",
    templateId: "mock-template",
    name: "Mock Unit",
    category: "warrior",
    rarity: "common",
    level: 1,
    image: "/images/heroes/warrior.png",
    side: "player",
    slotId: "front_1",
    baseStats: { health: 100, attack: 20, defense: 10, speed: 10 },
    statGrowthPerLevel: { health: 10, attack: 2, defense: 1, speed: 0.5 },
    effectiveStats: { health: 100, attack: 20, defense: 10, speed: 10 },
    currentHealth: 100,
    isDead: false,
    weaponType: "tranchant",
    elementType: "feu",
    weaponWeakness: "contendant",
    elementWeakness: "eau",
    ...overrides,
  };
}

describe("Damage engine with Weakness multipliers", () => {
  it("should calculate standard damage without weakness", () => {
    const attacker = createMockUnit({
      weaponType: "tranchant",
      elementType: "feu",
      effectiveStats: { health: 100, attack: 20, defense: 10, speed: 10 },
    });
    const defender = createMockUnit({
      weaponWeakness: "contendant",
      elementWeakness: "eau",
      effectiveStats: { health: 100, attack: 10, defense: 10, speed: 10 },
    });

    const result = calculateDamage(attacker, defender, 1.0, () => 0.5);
    expect(result.amount).toBe(17);
    expect(result.weaponWeaknessHit).toBe(false);
    expect(result.elementWeaknessHit).toBe(false);
  });

  it("should apply +50% weapon weakness bonus", () => {
    const attacker = createMockUnit({
      weaponType: "contendant",
      elementType: "feu",
      effectiveStats: { health: 100, attack: 20, defense: 10, speed: 10 },
    });
    const defender = createMockUnit({
      weaponWeakness: "contendant",
      elementWeakness: "eau",
      effectiveStats: { health: 100, attack: 10, defense: 10, speed: 10 },
    });

    const result = calculateDamage(attacker, defender, 1.0, () => 0.5);
    expect(result.amount).toBe(25);
    expect(result.weaponWeaknessHit).toBe(true);
    expect(result.elementWeaknessHit).toBe(false);
  });

  it("should apply +50% elemental weakness bonus", () => {
    const attacker = createMockUnit({
      weaponType: "tranchant",
      elementType: "eau",
      effectiveStats: { health: 100, attack: 20, defense: 10, speed: 10 },
    });
    const defender = createMockUnit({
      weaponWeakness: "contendant",
      elementWeakness: "eau",
      effectiveStats: { health: 100, attack: 10, defense: 10, speed: 10 },
    });

    const result = calculateDamage(attacker, defender, 1.0, () => 0.5);
    expect(result.amount).toBe(25);
    expect(result.weaponWeaknessHit).toBe(false);
    expect(result.elementWeaknessHit).toBe(true);
  });

  it("should stack both weapon and elemental weakness bonuses (+125% total / 2.25x)", () => {
    const attacker = createMockUnit({
      weaponType: "contendant",
      elementType: "eau",
      effectiveStats: { health: 100, attack: 20, defense: 10, speed: 10 },
    });
    const defender = createMockUnit({
      weaponWeakness: "contendant",
      elementWeakness: "eau",
      effectiveStats: { health: 100, attack: 10, defense: 10, speed: 10 },
    });

    const result = calculateDamage(attacker, defender, 1.0, () => 0.5);
    expect(result.amount).toBe(37);
    expect(result.weaponWeaknessHit).toBe(true);
    expect(result.elementWeaknessHit).toBe(true);
  });
});
