import Image from "next/image";

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

const BADGE_THEMES: Record<string, { imageBadge: string; titleBg: string }> = {
  warrior: {
    imageBadge: "/images/badges_classes/warrior.png",
    titleBg: "/images/ui/fade_black_title_bg.jpeg",
  },
  tank: {
    imageBadge: "/images/badges_classes/tank.png",
    titleBg: "/images/ui/fade_black_title_bg2.jpeg",
  },
  mage: {
    imageBadge: "/images/badges_classes/mage.png",
    titleBg: "/images/ui/fade_black_title_bg3.jpeg",
  },
  healer: {
    imageBadge: "/images/badges_classes/healer.png",
    titleBg: "/images/ui/fade_black_title_bg4.jpeg",
  },
  archer: {
    imageBadge: "/images/badges_classes/archer.png",
    titleBg: "/images/ui/fade_black_title_bg5.jpeg",
  },
  assassin: {
    imageBadge: "/images/badges_classes/assassin.png",
    titleBg: "/images/ui/fade_black_title_bg.jpeg",
  },
  druid: {
    imageBadge: "/images/badges_classes/druid.png",
    titleBg: "/images/ui/fade_black_title_bg2.jpeg",
  },
  necromancer: {
    imageBadge: "/images/badges_classes/necromancer.png",
    titleBg: "/images/ui/fade_black_title_bg3.jpeg",
  },
};

export function HeroCard({ hero }: HeroCardProps) {
  const theme = BADGE_THEMES[hero.id] || BADGE_THEMES.warrior;

  return (
    <div className="relative group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.4)]">
      <div
        className="relative overflow-hidden p-3.5 text-[#241a0f] border-2 border-[#b89535] shadow-[0_15px_35px_rgba(0,0,0,0.8)] rounded-sm bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg/smooth_parchment.png')" }}
      >
        <div className="absolute inset-1.5 border border-[#b89535]/30 pointer-events-none" />

        <div className="absolute top-1 left-1 z-10">
          <div className="h-13 w-13 rounded-full relative overflow-hidden ">
            <Image
              src={theme.imageBadge}
              alt={hero.name}
              fill
              sizes="40px"
              className="object-cover scale-105 rounded-full"
            />
          </div>
        </div>

        <div className="relative h-64 w-full border border-[#b89535]/40 overflow-hidden shadow-sm">
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
          <h4 className="relative z-10 font-cinzel text-lg font-black uppercase tracking-widest text-[#f5d475] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
            {hero.name}
          </h4>
        </div>

        <div className="text-center mb-2">
          <span className="font-cinzel text-xs font-bold text-[#3b2b16]">
            {hero.heroName}
          </span>
        </div>

        <div className="pt-2 border-t border-[#b89535]/40 grid grid-cols-4 text-center">
          <div className="flex flex-col items-center justify-center">
            <svg className="w-4 h-4 text-[#4a3410]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <strong className="font-cinzel text-base font-black text-[#241a0f] mt-0.5">{hero.stats.health}</strong>
          </div>

          <div className="flex flex-col items-center justify-center">
            <svg className="w-4 h-4 text-[#4a3410]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            <strong className="font-cinzel text-base font-black text-[#241a0f] mt-0.5">{hero.stats.attack}</strong>
          </div>

          <div className="flex flex-col items-center justify-center">
            <svg className="w-4 h-4 text-[#4a3410]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
            </svg>
            <strong className="font-cinzel text-base font-black text-[#241a0f] mt-0.5">{hero.stats.defense}</strong>
          </div>

          <div className="flex flex-col items-center justify-center">
            <svg className="w-4 h-4 text-[#4a3410]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <strong className="font-cinzel text-base font-black text-[#241a0f] mt-0.5">{hero.stats.speed}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
