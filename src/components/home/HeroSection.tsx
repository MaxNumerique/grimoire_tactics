"use client";

import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/Button";
import { ParchmentCard } from "@/components/ui/ParchmentCard";

export function HeroSection() {
  const { isAuthenticated, user, openAuthModal } = useAuthStore();

  const features = [
    {
      numeral: "I",
      title: "Escouade 6v6",
      description: "Positionnez 6 héros sur le grimoire pour déclencher des synergies dévastatrices.",
    },
    {
      numeral: "II",
      title: "Invocations Gacha",
      description: "Tirez des grimoires magiques et débloquez des héros rares et mythiques.",
    },
    {
      numeral: "III",
      title: "Tours par Vitesse",
      description: "L'initiative et la vitesse déterminent l'ordre de passage sur le plateau.",
    },
  ];

  return (
    <section id="hero" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.15)_30%,transparent_70%)]" />

      <div className="mx-auto max-w-6xl px-6 text-center">
        <h1 className="mt-8 font-cinzel-decorative text-4xl font-black tracking-wider text-gold-bright sm:text-6xl md:text-7xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          GRIMOIRE TACTICS
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-parchment-light/80 sm:text-lg">
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

        <div id="features" className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 items-stretch">
          {features.map((feature) => (
            <ParchmentCard key={feature.numeral} variant="parchment" className="h-full text-center">
              <div className="flex flex-col items-center justify-between h-full py-2">
                <div>
                  <span className="font-cinzel text-3xl sm:text-4xl font-black text-gold-border block">
                    {feature.numeral}
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-black uppercase tracking-widest text-parchment-ink-title mt-2">
                    {feature.title}
                  </h3>
                </div>
                <div className="my-4 w-16 border-t-2 border-gold-border/50" />
                <p className="text-sm sm:text-base font-semibold leading-relaxed text-parchment-ink-body">
                  {feature.description}
                </p>
              </div>
            </ParchmentCard>
          ))}
        </div>
      </div>
    </section>
  );
}
