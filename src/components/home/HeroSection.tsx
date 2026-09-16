"use client";

import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/Button";
import { ParchmentCard } from "@/components/ui/ParchmentCard";
import { StatIcon } from "@/components/ui/StatIcon";

export function HeroSection() {
  const { isAuthenticated, user, openAuthModal } = useAuthStore();

  const features = [
    {
      title: "Escouade 6v6",
      description: "Positionnez 6 héros sur le grimoire pour déclencher des synergies dévastatrices.",
      icon: "attack" as const,
      borderColor: "border-l-[#d4af37]",
      iconColor: "text-[#f3d068]",
    },
    {
      title: "Invocations Gacha",
      description: "Tirez des grimoires magiques et débloquez des héros rares et mythiques.",
      icon: "gacha" as const,
      borderColor: "border-l-[#9d4edd]",
      iconColor: "text-[#9d4edd]",
    },
    {
      title: "Tours par Vitesse",
      description: "L'initiative et la vitesse déterminent l'ordre de passage sur le plateau.",
      icon: "speed" as const,
      borderColor: "border-l-[#d4af37]",
      iconColor: "text-[#f3d068]",
    },
  ];

  return (
    <section id="hero" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.15)_30%,transparent_70%)]" />

      <div className="mx-auto max-w-5xl px-6 text-center">
        <h1 className="mt-8 font-cinzel-decorative text-4xl font-black tracking-wider text-[#f3d068] sm:text-6xl md:text-7xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          GRIMOIRE TACTICS
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-[#c4b5a2] sm:text-lg">
          Invoquez des héros légendaires, composez votre escouade stratégique de 6 unités et dominez le plateau arcanique.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {isAuthenticated && user ? (
            <Button
              variant="primary"
              onClick={() => alert("Bienvenue dans le Grimoire ! Le hub de jeu arrive bientôt.")}
            >
              ENTRER DANS LE GRIMOIRE
            </Button>
          ) : (
            <Button variant="primary" onClick={() => openAuthModal("register")}>
              ENTRER DANS LE GRIMOIRE
            </Button>
          )}

          <a href="#classes">
            <Button variant="secondary">DÉCOUVRIR LES CLASSES</Button>
          </a>
        </div>

        <div id="features" className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {features.map((feature, idx) => (
            <ParchmentCard
              key={idx}
              className={`p-6 text-center border-l-4 ${feature.borderColor}`}
            >
              <div className="flex justify-center mb-2">
                <StatIcon type={feature.icon} className={`w-8 h-8 ${feature.iconColor}`} />
              </div>
              <h3 className="font-cinzel text-base font-bold text-[#f3d068]">
                {feature.title}
              </h3>
              <p className="mt-1 text-xs text-[#a39482]">
                {feature.description}
              </p>
            </ParchmentCard>
          ))}
        </div>
      </div>
    </section>
  );
}
