import { describe, expect, it } from "vitest";
import { calculateEffectiveStats } from "@/engine/stats/statsCalculator";

describe("statsCalculator engine", () => {
  it("should return base stats at level 1 common", () => {
    const baseStats = { health: 100, attack: 20, defense: 10, speed: 10 };
    const statGrowth = { health: 10, attack: 2, defense: 1, speed: 0.5 };

    const effective = calculateEffectiveStats(baseStats, statGrowth, 1, "common");

    expect(effective.health).toBe(100);
    expect(effective.attack).toBe(20);
  });

  it("should scale stats higher with level and rarity", () => {
    const baseStats = { health: 100, attack: 20, defense: 10, speed: 10 };
    const statGrowth = { health: 10, attack: 2, defense: 1, speed: 0.5 };

    const lvl1Common = calculateEffectiveStats(baseStats, statGrowth, 1, "common");
    const lvl10Legendary = calculateEffectiveStats(
      baseStats,
      statGrowth,
      10,
      "legendary"
    );

    // level 10: health = (100 + 9 * 10) * 1.6 = 190 * 1.6 = 304
    expect(lvl10Legendary.health).toBe(304);
    expect(lvl10Legendary.health).toBeGreaterThan(lvl1Common.health);
    expect(lvl10Legendary.attack).toBeGreaterThan(lvl1Common.attack);
  });
});
