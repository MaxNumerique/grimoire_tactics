import { create } from "zustand";
import { BattleOutcome, CombatLogEntry, CombatUnit, DungeonConfig } from "@/types/combat";
import dungeonsData from "@/data/dungeons.json";
import { buildWaveEnemies, transitionToNextWave } from "@/engine/combat/instanceResolver";
import { sortInitiative } from "@/engine/combat/timeline";
import { resolveTurnStep } from "@/engine/combat/turnResolver";

interface CombatStoreState {
  dungeon: DungeonConfig | null;
  currentWaveNumber: 1 | 2 | 3;
  units: CombatUnit[];
  turnQueue: CombatUnit[];
  activeUnitId: string | null;
  turnCount: number;
  currentRound: number;
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
  currentRound: 1,
  gameSpeed: 1,
  isPlaying: true,
  battleOutcome: "ongoing",
  logs: [],

  startInstance: (dungeonId, playerSquad) => {
    const dungeonsCatalog = dungeonsData as DungeonConfig[];
    const dungeon = dungeonsCatalog.find((item) => item.id === dungeonId);

    if (!dungeon) {
      throw new Error(
        `[combat] Impossible de démarrer le donjon : ID "${dungeonId}" introuvable dans dungeons.json.`
      );
    }

    const firstWave = dungeon.waves[0];
    const waveEnemies = buildWaveEnemies(firstWave);
    const allUnits = [...playerSquad, ...waveEnemies];
    const initialQueue = sortInitiative(allUnits);
    const initialActiveId = initialQueue.length > 0 ? initialQueue[0].id : null;

    const initialLog: CombatLogEntry = {
      id: `log_start_1`,
      turn: 1,
      waveNumber: 1,
      message: `Lancement du donjon "${dungeon.name}" - ${firstWave.title}. Combat automatique activé.`,
      type: "wave_start",
    };

    set({
      dungeon,
      currentWaveNumber: 1,
      units: allUnits,
      turnQueue: initialQueue,
      activeUnitId: initialActiveId,
      turnCount: 1,
      currentRound: 1,
      battleOutcome: "ongoing",
      logs: [initialLog],
      isPlaying: true,
    });
  },

  executeCurrentTurn: () => {
    const state = get();
    if (!state.isPlaying || state.battleOutcome !== "ongoing" || !state.activeUnitId) return;

    const result = resolveTurnStep({
      units: state.units,
      turnQueue: state.turnQueue,
      activeUnitId: state.activeUnitId,
      turnCount: state.turnCount,
      currentRound: state.currentRound,
      currentWaveNumber: state.currentWaveNumber,
    });

    if (!result) return;

    set({
      units: result.units,
      turnQueue: result.turnQueue,
      activeUnitId: result.activeUnitId,
      turnCount: result.turnCount,
      currentRound: result.currentRound,
      battleOutcome: result.battleOutcome,
      logs: result.newLogEntry ? [...state.logs, result.newLogEntry] : state.logs,
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

    const newTurnQueue = sortInitiative(newUnits);
    const firstActiveUnitId = newTurnQueue.length > 0 ? newTurnQueue[0].id : null;

    set({
      currentWaveNumber: nextWaveNumber,
      units: newUnits,
      turnQueue: newTurnQueue,
      activeUnitId: firstActiveUnitId,
      currentRound: 1,
      battleOutcome: "ongoing",
      logs: [...get().logs, ...waveLogs],
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
      currentRound: 1,
      gameSpeed: 1,
      battleOutcome: "ongoing",
      logs: [],
      isPlaying: false,
    }),
}));
