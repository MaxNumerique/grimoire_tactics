"use client";

import { useState } from "react";
import { HeaderNav } from "@/components/layout/HeaderNav";
import { useCombatStore } from "@/stores/combat";
import { TacticalBoard } from "@/components/combat/TacticalBoard";
import { CombatSidebar } from "@/components/combat/CombatSidebar";
import { Button } from "@/components/ui/Button";
import { createCombatUnitInstance } from "@/engine/combat/unitFactory";
import dungeonsData from "@/data/dungeons.json";
import heroesData from "@/data/heroes.json";
import {
  CombatUnit,
  DungeonConfig,
  HeroDefinition,
  PlayerSlotId,
  Rarity,
} from "@/types/combat";
import { ParchmentCard } from "@/components/ui/ParchmentCard";

export default function PlayPage() {
  const { isPlaying, startInstance, resetInstance, battleOutcome } =
    useCombatStore();
  const [selectedDungeonId, setSelectedDungeonId] =
    useState<string>("hall_of_runes");

  const dungeonsCatalog = dungeonsData as DungeonConfig[];
  const heroCatalog = heroesData as HeroDefinition[];

  const defaultSquadSetups: Array<{
    heroId: string;
    slotId: PlayerSlotId;
    level: number;
    rarity: Rarity;
  }> = [
    { heroId: "gideon-lion", slotId: "front_1", level: 10, rarity: "rare" },
    { heroId: "borin-marteau", slotId: "front_2", level: 12, rarity: "epic" },
    { heroId: "gideon-lion", slotId: "front_3", level: 8, rarity: "common" },
    { heroId: "elena-ombre", slotId: "back_1", level: 14, rarity: "legendary" },
    { heroId: "valerius-soin", slotId: "back_2", level: 11, rarity: "rare" },
    { heroId: "elena-ombre", slotId: "back_3", level: 10, rarity: "rare" },
  ];

  const handleLaunchCombat = () => {
    const playerSquadUnits: CombatUnit[] = defaultSquadSetups.map(
      (squadSetup, squadIndex) => {
        const heroDefinition = heroCatalog.find(
          (heroItem) => heroItem.id === squadSetup.heroId
        );

        if (!heroDefinition) {
          throw new Error(
            `[PlayPage] Impossible d'initialiser l'escouade : Héros "${squadSetup.heroId}" introuvable dans heroes.json.`
          );
        }

        const instanceId = `unit_player_${squadIndex}_${squadSetup.slotId}`;

        return createCombatUnitInstance(
          heroDefinition,
          instanceId,
          "player",
          squadSetup.slotId,
          squadSetup.level,
          squadSetup.rarity
        );
      }
    );

    startInstance(selectedDungeonId, playerSquadUnits);
  };

  // FULL SCREEN COMBAT CANVAS VIEW WHEN IN COMBAT
  if (isPlaying) {
    return (
      <div className="w-screen h-screen bg-[#130f0c] p-2 sm:p-3 flex flex-col overflow-hidden text-parchment-light">
        <div className="grid grid-cols-12 gap-2 sm:gap-3 flex-1 min-h-0 items-stretch">
          {/* FULL HEIGHT LEFT SIDEBAR (COMBAT LOG + SPEED + ACTION BUTTON) */}
          <div className="col-span-4 lg:col-span-3 flex flex-col h-full min-h-0">
            <CombatSidebar />
          </div>

          {/* MAIN RIGHT TACTICAL ARENA (WAVE & INITIATIVE + ENEMY SQUAD TOP + BATTLEFIELD CENTER + PLAYER SQUAD BOTTOM) */}
          <div className="col-span-8 lg:col-span-9 flex flex-col h-full min-h-0">
            <TacticalBoard />
          </div>
        </div>

        {(battleOutcome === "victory" || battleOutcome === "defeat") && (
          <div className="absolute bottom-4 right-4 z-50">
            <Button variant="secondary" onClick={resetInstance}>
              SELECTION DES DONJONS
            </Button>
          </div>
        )}
      </div>
    );
  }

  // STANDARD DUNGEON SELECTION VIEW
  return (
    <div className="min-h-screen flex flex-col bg-bg-dark text-parchment-light">
      <HeaderNav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 flex flex-col gap-6">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h1 className="font-cinzel-decorative text-3xl sm:text-5xl font-black text-gold-bright tracking-wider drop-shadow-md">
              SANCTUAIRE DE COMBAT PVE
            </h1>
            <p className="mt-3 font-cinzel text-sm sm:text-base text-parchment-light/80 max-w-2xl mx-auto">
              Choisissez votre donjon arcanique à 3 vagues successives et préparez votre escouade de 6 héros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dungeonsCatalog.map((dungeonItem) => (
              <div
                key={dungeonItem.id}
                onClick={() => setSelectedDungeonId(dungeonItem.id)}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedDungeonId === dungeonItem.id
                    ? "ring-2 ring-gold-bright scale-[1.02]"
                    : ""
                }`}
              >
                <ParchmentCard hoverable={true} className="h-full">
                  <div className="flex flex-col h-full justify-between gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-cinzel text-xl font-black text-gold-bright">
                          {dungeonItem.name}
                        </h3>
                        <span className="font-cinzel text-xs font-bold px-2.5 py-0.5 rounded-sm bg-[#2d1e12] border border-gold-border/60 text-gold-bright">
                          Niveau Rec. {dungeonItem.recommendedLevel}
                        </span>
                      </div>
                      <p className="font-cinzel text-xs text-parchment-ink-dark/90 leading-relaxed">
                        {dungeonItem.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gold-border/30 flex items-center justify-between text-xs font-cinzel font-bold text-parchment-ink-title">
                      <span>3 Combats Consécutifs</span>
                      <span className="text-gold-bright">8 Ennemis Max / Vague</span>
                    </div>
                  </div>
                </ParchmentCard>
              </div>
            ))}
          </div>

          <div className="rounded-sm border-2 border-gold-border bg-black/60 p-5 shadow-xl">
            <h3 className="font-cinzel text-lg font-black text-gold-bright mb-4 tracking-wider">
              VOTRE ESCOUADE DE 6 HÉROS (3 AVANT / 3 ARRIÈRE)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {defaultSquadSetups.map((squadSetup, squadIndex) => {
                const heroDefinition = heroCatalog.find(
                  (heroItem) => heroItem.id === squadSetup.heroId
                );

                if (!heroDefinition) return null;

                return (
                  <div
                    key={squadIndex}
                    className="rounded-sm border border-gold-border/50 bg-amber-950/40 p-2.5 text-center flex flex-col items-center justify-between"
                  >
                    <span className="font-cinzel text-[10px] font-bold text-gold-bright mb-1">
                      {squadSetup.slotId.startsWith("front_")
                        ? "Avant-Garde"
                        : "Arrière-Garde"}
                    </span>
                    <span className="font-cinzel text-xs font-black text-white truncate w-full">
                      {heroDefinition.name}
                    </span>
                    <span className="font-cinzel text-[10px] font-bold text-amber-300 mt-1">
                      Lvl {squadSetup.level} • {squadSetup.rarity.toUpperCase()}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="primary" onClick={handleLaunchCombat}>
                LANCER LE DONJON (3 COMBATS)
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
