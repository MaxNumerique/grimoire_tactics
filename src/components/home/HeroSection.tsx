"use client";

import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/Button";
import { ParchmentCard } from "@/components/ui/ParchmentCard";

export function HeroSection() {
  const { isAuthenticated, user, openAuthModal } = useAuthStore();

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
          <ParchmentCard className="p-6 text-center border-l-4 border-l-[#d4af37]">
            <div className="flex justify-center mb-2">
              <svg className="w-8 h-8 text-[#f3d068]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 className="font-cinzel text-base font-bold text-[#f3d068]">
              Escouade 6v6
            </h3>
            <p className="mt-1 text-xs text-[#a39482]">
              Positionnez 6 héros sur le grimoire pour déclencher des synergies dévastatrices.
            </p>
          </ParchmentCard>

          <ParchmentCard className="p-6 text-center border-l-4 border-l-[#9d4edd]">
            <div className="flex justify-center mb-2">
              <svg className="w-8 h-8 text-[#9d4edd]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
            </div>
            <h3 className="font-cinzel text-base font-bold text-[#f3d068]">
              Invocations Gacha
            </h3>
            <p className="mt-1 text-xs text-[#a39482]">
              Tirez des grimoires magiques et débloquez des héros rares et mythiques.
            </p>
          </ParchmentCard>

          <ParchmentCard className="p-6 text-center border-l-4 border-l-[#d4af37]">
            <div className="flex justify-center mb-2">
              <svg className="w-8 h-8 text-[#f3d068]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-cinzel text-base font-bold text-[#f3d068]">
              Tours par Vitesse
            </h3>
            <p className="mt-1 text-xs text-[#a39482]">
              L'initiative et la vitesse déterminent l'ordre de passage sur le plateau.
            </p>
          </ParchmentCard>
        </div>
      </div>
    </section>
  );
}
