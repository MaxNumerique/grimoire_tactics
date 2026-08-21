"use client";

import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/Button";

export function HeaderNav() {
  const { user, isAuthenticated, openAuthModal, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[rgba(212,175,55,0.25)] bg-[#0d0a08]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-[#d4af37] bg-[#1a140e] font-cinzel text-xl font-bold text-[#f3d068] shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            <svg className="w-5 h-5 text-[#f3d068]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <span className="font-cinzel-decorative text-xl font-black tracking-wider text-[#f3d068] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              GRIMOIRE TACTICS
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-[#a39482]">
              Auto-Battler Tactique
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-8 font-cinzel text-sm font-semibold tracking-widest text-[#d6c7b2] md:flex">
          <a href="#hero" className="transition-colors hover:text-[#f3d068]">
            JEU
          </a>
          <a href="#classes" className="transition-colors hover:text-[#f3d068]">
            CLASSES
          </a>
          <a href="#features" className="transition-colors hover:text-[#f3d068]">
            STRATÉGIE
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-4 border border-[rgba(212,175,55,0.3)] bg-[#1a140e] px-3 py-1.5 text-xs text-[#e2d9cd] sm:flex">
                <span className="flex items-center gap-1.5">
                  <span className="font-cinzel text-[10px] font-bold text-[#a39482] uppercase">Or</span>
                  <strong className="text-[#f3d068] font-cinzel">{user.gold}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="font-cinzel text-[10px] font-bold text-[#a39482] uppercase">Gemmes</span>
                  <strong className="text-[#9d4edd] font-cinzel">{user.gems}</strong>
                </span>
              </div>
              <Button variant="secondary" onClick={logout} className="!text-xs !py-1.5 !px-4">
                Déconnexion
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => openAuthModal("login")}
                className="font-cinzel text-xs font-bold tracking-widest text-[#d6c7b2] hover:text-[#f3d068]"
              >
                SE CONNECTER
              </button>
              <Button variant="primary" onClick={() => openAuthModal("register")} className="!text-xs !py-1.5 !px-4">
                REJOINDRE
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
