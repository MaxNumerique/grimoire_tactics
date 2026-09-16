"use client";

import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/Button";
import { UserCurrencyBadge } from "@/components/ui/UserCurrencyBadge";
import { StatIcon } from "@/components/ui/StatIcon";

export function HeaderNav() {
  const { user, isAuthenticated, openAuthModal, logout } = useAuthStore();

  const navLinks = [
    { label: "JEU", href: "#hero" },
    { label: "CLASSES", href: "#classes" },
    { label: "STRATÉGIE", href: "#features" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[rgba(212,175,55,0.25)] bg-[#0d0a08]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-[#d4af37] bg-[#1a140e] font-cinzel text-xl font-bold text-[#f3d068] shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            <StatIcon type="book" className="w-5 h-5 text-[#f3d068]" />
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
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-[#f3d068]">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <UserCurrencyBadge gold={user.gold} gems={user.gems} />
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
