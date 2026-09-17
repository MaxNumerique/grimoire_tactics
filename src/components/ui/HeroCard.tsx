import Image from "next/image";
import { getHeroTheme } from "@/data/heroThemes";
import { StatIcon } from "@/components/ui/StatIcon";

export interface HeroClassData {
  id: string;
  name: string;
  heroName: string;
  role: string;
  image: string;
  description: string;
  stats: {
    health: number;
    attack: number;
    defense: number;
    speed: number;
  };
  badgeColor: string;
}

interface HeroCardProps {
  hero: HeroClassData;
}

export function HeroCard({ hero }: HeroCardProps) {
  const theme = getHeroTheme(hero.id);

  const statItems = [
    { type: "health" as const, value: hero.stats.health },
    { type: "attack" as const, value: hero.stats.attack },
    { type: "defense" as const, value: hero.stats.defense },
    { type: "speed" as const, value: hero.stats.speed },
  ];

  return (
    <div className="relative group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.4)]">
      <div
        className="relative overflow-hidden p-3.5 text-parchment-ink-dark border-2 border-gold-border shadow-[0_15px_35px_rgba(0,0,0,0.8)] rounded-sm bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg/smooth_parchment.png')" }}
      >
        <div className="absolute inset-1.5 border border-gold-border/30 pointer-events-none" />

        <div className="absolute top-1 left-1 z-10">
          <div className="h-13 w-13 rounded-full relative overflow-hidden">
            <Image
              src={theme.imageBadge}
              alt={hero.name}
              fill
              sizes="40px"
              className="object-cover scale-105 rounded-full"
            />
          </div>
        </div>

        <div className="relative h-64 w-full border border-gold-border/40 overflow-hidden shadow-sm">
          <Image
            src={hero.image}
            alt={hero.name}
            fill
            className="object-cover scale-110 transition-transform duration-500 group-hover:scale-120"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        <div className="relative h-16 w-full flex items-center justify-center overflow-hidden">
          <Image
            src={theme.titleBg}
            alt={hero.name}
            fill
            className="object-contain scale-180 mix-blend-multiply opacity-95"
          />
          <h4 className="relative z-10 font-cinzel text-lg font-black uppercase tracking-widest text-gold-bright drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
            {hero.name}
          </h4>
        </div>

        <div className="text-center mb-2">
          <span className="font-cinzel text-xs font-bold text-parchment-ink-title">
            {hero.heroName}
          </span>
        </div>

        <div className="pt-2 border-t border-gold-border/40 grid grid-cols-4 text-center">
          {statItems.map(({ type, value }) => (
            <div key={type} className="flex flex-col items-center justify-center">
              <StatIcon type={type} />
              <strong className="font-cinzel text-base font-black text-parchment-ink-dark mt-0.5">
                {value}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
