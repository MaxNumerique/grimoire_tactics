export interface HeroTheme {
  imageBadge: string;
  titleBg: string;
}

export const HERO_BADGE_THEMES: Record<string, HeroTheme> = {
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

export function getHeroTheme(heroId: string): HeroTheme {
  return HERO_BADGE_THEMES[heroId] || HERO_BADGE_THEMES.warrior;
}
