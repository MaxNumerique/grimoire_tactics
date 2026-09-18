import { BattleOutcome, CombatLogEntry, CombatUnit } from "@/types/combat";
import { isUnitAlive } from "@/engine/combat/unitState";
import { selectTarget } from "@/engine/combat/targeting";
import { calculateDamage, calculateHeal, DamageResult } from "@/engine/combat/damage";
import { evaluateBattleOutcome } from "@/engine/combat/instanceResolver";
import { sortInitiative } from "@/engine/combat/timeline";

export interface TurnStepContext {
  units: CombatUnit[];
  turnQueue: CombatUnit[];
  activeUnitId: string;
  turnCount: number;
  currentRound: number;
  currentWaveNumber: 1 | 2 | 3;
}

export interface TurnStepResult {
  units: CombatUnit[];
  turnQueue: CombatUnit[];
  activeUnitId: string | null;
  turnCount: number;
  currentRound: number;
  battleOutcome: BattleOutcome;
  newLogEntry?: CombatLogEntry;
}

export function resolveTurnStep({
  units,
  turnQueue,
  activeUnitId,
  turnCount,
  currentRound,
  currentWaveNumber,
}: TurnStepContext): TurnStepResult | null {
  const actorUnitIndex = units.findIndex((unit) => unit.id === activeUnitId);
  if (actorUnitIndex === -1) return null;
  const actorUnit = units[actorUnitIndex];

  // Si l'unité active est déjà éliminée, on saute son tour
  if (!isUnitAlive(actorUnit)) {
    const nextQueue = turnQueue.filter((unit) => unit.id !== actorUnit.id);
    return {
      units,
      turnQueue: nextQueue,
      activeUnitId: nextQueue.length > 0 ? nextQueue[0].id : null,
      turnCount,
      currentRound,
      battleOutcome: "ongoing",
    };
  }

  const targetUnit = selectTarget(actorUnit, units);
  if (!targetUnit) return null;

  const updatedUnits = [...units];
  let logMessage = "";
  let logType: CombatLogEntry["type"] = "attack";
  let actionAmount = 0;
  let isActionCritical = false;
  let isActionKo = false;

  if (actorUnit.category === "healer") {
    const healResult = calculateHeal(actorUnit);
    const targetIndex = updatedUnits.findIndex((unit) => unit.id === targetUnit.id);
    const maxHp = targetUnit.effectiveStats.health;
    const newHealth = Math.min(maxHp, targetUnit.currentHealth + healResult.amount);

    updatedUnits[targetIndex] = { ...targetUnit, currentHealth: newHealth };
    logMessage = `${actorUnit.name} soigne ${targetUnit.name} de ${healResult.amount} PV.`;
    logType = "heal";
    actionAmount = healResult.amount;
  } else {
    const damageResult = calculateDamage(actorUnit, targetUnit);
    const targetIndex = updatedUnits.findIndex((unit) => unit.id === targetUnit.id);
    const remainingHp = Math.max(0, targetUnit.currentHealth - damageResult.amount);
    const isTargetDead = remainingHp === 0;

    updatedUnits[targetIndex] = {
      ...targetUnit,
      currentHealth: remainingHp,
      isDead: isTargetDead,
    };

    const criticalNotice = damageResult.isCritical ? "COUP CRITIQUE ! " : "";
    const deathNotice = isTargetDead ? "\nK.O. !" : "";

    logMessage = `${criticalNotice}${actorUnit.name} inflige ${damageResult.amount} dégâts à ${targetUnit.name}.${deathNotice}`;
    logType = isTargetDead ? "kill" : "attack";
    actionAmount = damageResult.amount;
    isActionCritical = damageResult.isCritical;
    isActionKo = isTargetDead;
  }

  const newLogEntry: CombatLogEntry = {
    id: `log_${turnCount}_${Date.now()}`,
    turn: turnCount,
    waveNumber: currentWaveNumber,
    message: logMessage,
    type: logType,
    isCritical: isActionCritical,
    amount: actionAmount,
    isKo: isActionKo,
    actorName: actorUnit.name,
    targetName: targetUnit.name,
    actorSide: actorUnit.side,
    targetSide: targetUnit.side,
  };

  const nextBattleOutcome = evaluateBattleOutcome(updatedUnits, currentWaveNumber);

  // Filtrage des unités mortes et mise à jour des références
  let remainingQueue = turnQueue
    .filter((unit) => {
      if (unit.id === actorUnit.id) return false;
      const liveUnit = updatedUnits.find((updated) => updated.id === unit.id);
      return liveUnit && isUnitAlive(liveUnit);
    })
    .map((unit) => {
      const liveUnit = updatedUnits.find((updated) => updated.id === unit.id);
      return liveUnit || unit;
    });

  let nextRound = currentRound;
  if (remainingQueue.length === 0 && nextBattleOutcome === "ongoing") {
    remainingQueue = sortInitiative(updatedUnits);
    nextRound = currentRound + 1;
  }

  const nextActiveUnitId = remainingQueue.length > 0 ? remainingQueue[0].id : null;

  return {
    units: updatedUnits,
    turnQueue: remainingQueue,
    activeUnitId: nextActiveUnitId,
    turnCount: turnCount + 1,
    currentRound: nextRound,
    battleOutcome: nextBattleOutcome,
    newLogEntry,
  };
}

