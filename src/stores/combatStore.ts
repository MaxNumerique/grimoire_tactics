import { create } from "zustand";
import { BattleOutcome, CombatLogEntry, CombatUnit, DungeonConfig } from "@/types/combat";
import dungeonsData from "@/data/dungeons.json";
import {
  buildWaveEnemies,
  evaluateBattleOutcome,
  transitionToNextWave,
} from "@/engine/combat/instanceResolver";
import { generateTurnQueue } from "@/engine/combat/initiative";
import { selectTarget } from "@/engine/combat/targeting";
import { calculateDamage, calculateHeal } from "@/engine/combat/damage";

interface CombatStoreState {
  dungeon: DungeonConfig | null;
  currentWaveNumber: 1 | 2 | 3;
  units: CombatUnit[];
  turnQueue: CombatUnit[];
  activeUnitId: string | null;
  turnCount: number;
  gameSpeed: 1 | 2 | 4;
  isPlaying: boolean;
  battleOutcome: BattleOutcome;
  logs: CombatLogEntry[];

  startInstance: (dungeonId: string, playerSquad: CombatUnit[]) => void;
  executeCurrentTurn: () => void;
  nextWave: () => void;
  togglePlayPause: () => void;
  setGameSpeed: (speedMultiplier: 1 | 2 | 4) => void;
  resetInstance: () => void;
}

export const useCombatStore = create<CombatStoreState>((set, get) => ({
  dungeon: null,
  currentWaveNumber: 1,
  units: [],
  turnQueue: [],
  activeUnitId: null,
  turnCount: 1,
  gameSpeed: 1,
  isPlaying: true,
  battleOutcome: "ongoing",
  logs: [],

  startInstance: (dungeonId, playerSquad) => {
    const dungeonsCatalog = dungeonsData as DungeonConfig[];
    const dungeon = dungeonsCatalog.find(
      (dungeonItem) => dungeonItem.id === dungeonId
    );

    if (!dungeon) {
      throw new Error(
        `[combatStore] Impossible de démarrer le donjon : ID "${dungeonId}" introuvable dans dungeons.json.`
      );
    }

    const wave1Config = dungeon.waves[0];
    const wave1Enemies = buildWaveEnemies(wave1Config);
    const allCombatUnits = [...playerSquad, ...wave1Enemies];

    const initialQueue = generateTurnQueue(allCombatUnits);
    const initialActiveId =
      initialQueue.length > 0 ? initialQueue[0].id : null;

    const initialLog: CombatLogEntry = {
      id: `log_start_1`,
      turn: 1,
      waveNumber: 1,
      message: `Lancement du donjon "${dungeon.name}" - ${wave1Config.title}. Combat automatique activé.`,
      type: "wave_start",
    };

    set({
      dungeon,
      currentWaveNumber: 1,
      units: allCombatUnits,
      turnQueue: initialQueue,
      activeUnitId: initialActiveId,
      turnCount: 1,
      battleOutcome: "ongoing",
      logs: [initialLog],
      isPlaying: true,
    });
  },

  executeCurrentTurn: () => {
    const {
      units,
      turnQueue,
      activeUnitId,
      turnCount,
      currentWaveNumber,
      battleOutcome,
      logs,
      isPlaying,
    } = get();

    if (!isPlaying || battleOutcome !== "ongoing" || !activeUnitId) return;

    const actorUnitIndex = units.findIndex(
      (unit) => unit.id === activeUnitId
    );
    if (actorUnitIndex === -1) return;
    const actorUnit = units[actorUnitIndex];

    if (actorUnit.isDead || actorUnit.currentHealth <= 0) {
      const nextTurnQueue = turnQueue.filter(
        (unit) => unit.id !== actorUnit.id
      );
      set({
        turnQueue: nextTurnQueue,
        activeUnitId: nextTurnQueue.length > 0 ? nextTurnQueue[0].id : null,
      });
      return;
    }

    const targetUnit = selectTarget(actorUnit, units);
    if (!targetUnit) return;

    const updatedUnits = [...units];
    let newLogMessage = "";
    let logType: CombatLogEntry["type"] = "attack";

    if (actorUnit.category === "healer") {
      const healResult = calculateHeal(actorUnit);
      const targetIndex = updatedUnits.findIndex(
        (unit) => unit.id === targetUnit.id
      );
      const newHealth = Math.min(
        targetUnit.effectiveStats.health,
        targetUnit.currentHealth + healResult.amount
      );
      updatedUnits[targetIndex] = { ...targetUnit, currentHealth: newHealth };

      newLogMessage = `${actorUnit.name} soigne ${targetUnit.name} de ${healResult.amount} PV.`;
      logType = "heal";
    } else {
      const damageResult = calculateDamage(actorUnit, targetUnit);
      const targetIndex = updatedUnits.findIndex(
        (unit) => unit.id === targetUnit.id
      );
      const remainingHp = Math.max(
        0,
        targetUnit.currentHealth - damageResult.amount
      );
      const isTargetDead = remainingHp === 0;

      updatedUnits[targetIndex] = {
        ...targetUnit,
        currentHealth: remainingHp,
        isDead: isTargetDead,
      };

      const criticalPrefix = damageResult.isCritical ? "COUP CRITIQUE ! " : "";
      let weaknessNotice = "";
      if (damageResult.weaponWeaknessHit && damageResult.elementWeaknessHit) {
        weaknessNotice = " [DOUBLE FAIBLESSE +125%]";
      } else if (damageResult.weaponWeaknessHit) {
        weaknessNotice = " [FAIBLESSE ARME +50%]";
      } else if (damageResult.elementWeaknessHit) {
        weaknessNotice = " [FAIBLESSE ÉLÉMENT +50%]";
      }

      newLogMessage = `${criticalPrefix}${actorUnit.name} inflige ${damageResult.amount} dégâts à ${targetUnit.name}.${weaknessNotice}${isTargetDead ? ` - K.O. !` : ""}`;
      logType = isTargetDead ? "kill" : "attack";
    }

    const newLogEntry: CombatLogEntry = {
      id: `log_${turnCount}_${Date.now()}`,
      turn: turnCount,
      waveNumber: currentWaveNumber,
      message: newLogMessage,
      type: logType,
    };

    const nextBattleOutcome = evaluateBattleOutcome(
      updatedUnits,
      currentWaveNumber
    );

    let remainingQueue = turnQueue.filter(
      (unit) =>
        unit.id !== actorUnit.id &&
        !updatedUnits.find((updatedUnit) => updatedUnit.id === unit.id)?.isDead
    );

    if (remainingQueue.length === 0 && nextBattleOutcome === "ongoing") {
      remainingQueue = generateTurnQueue(updatedUnits);
    }

    const nextActiveUnitId =
      remainingQueue.length > 0 ? remainingQueue[0].id : null;

    set({
      units: updatedUnits,
      turnQueue: remainingQueue,
      activeUnitId: nextActiveUnitId,
      turnCount: turnCount + 1,
      battleOutcome: nextBattleOutcome,
      logs: [newLogEntry, ...logs],
    });
  },

  nextWave: () => {
    const { units, dungeon, currentWaveNumber, battleOutcome } = get();
    if (battleOutcome !== "wave_cleared" || !dungeon) return;

    const nextWaveNumber = (currentWaveNumber + 1) as 2 | 3;
    const playerUnits = units.filter((unit) => unit.side === "player");

    const { units: newUnits, logs: waveLogs } = transitionToNextWave(
      playerUnits,
      dungeon,
      nextWaveNumber
    );

    const newTurnQueue = generateTurnQueue(newUnits);
    const firstActiveUnitId =
      newTurnQueue.length > 0 ? newTurnQueue[0].id : null;

    set({
      currentWaveNumber: nextWaveNumber,
      units: newUnits,
      turnQueue: newTurnQueue,
      activeUnitId: firstActiveUnitId,
      battleOutcome: "ongoing",
      logs: [...waveLogs, ...get().logs],
      isPlaying: true,
    });
  },

  togglePlayPause: () =>
    set((state) => ({ isPlaying: !state.isPlaying })),

  setGameSpeed: (speedMultiplier) =>
    set({ gameSpeed: speedMultiplier }),

  resetInstance: () =>
    set({
      dungeon: null,
      currentWaveNumber: 1,
      units: [],
      turnQueue: [],
      activeUnitId: null,
      turnCount: 1,
      gameSpeed: 1,
      battleOutcome: "ongoing",
      logs: [],
      isPlaying: false,
    }),
}));
