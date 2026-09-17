"use client";

import heroesData from "@/data/heroes.json";
import { HeroCard } from "@/components/ui/HeroCard";
import { HeroDefinition } from "@/types/combat";

export function ClassShowcase() {
  const heroes = heroesData as HeroDefinition[];

  return (
    <section id="classes" className="py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {heroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </div>
      </div>
    </section>
  );
}
