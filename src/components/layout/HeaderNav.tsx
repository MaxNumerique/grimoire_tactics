"use client";

import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/Button";
import { UserCurrencyBadge } from "@/components/ui/UserCurrencyBadge";

export function HeaderNav() {
  const { user, isAuthenticated, openAuthModal, logout } = useAuthStore();

  const navLinks = [
    { label: "DONJONS", href: "/play" },
    { label: "JEU", href: "/#hero" },
    { label: "CLASSES", href: "/#classes" },
    { label: "STRATÉGIE", href: "/#features" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gold-primary/25 bg-bg-header/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <a href="#hero" className="inline-block">
            <span className="font-cinzel-decorative text-xl font-black tracking-wider text-gold-bright drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              GRIMOIRE TACTICS
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-parchment-muted">
              Auto-Battler Tactique
            </span>
          </a>
        </div>

        <nav className="hidden items-center gap-8 font-cinzel text-sm font-semibold tracking-widest text-parchment-light md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-gold-bright">
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
                className="font-cinzel text-xs font-bold tracking-widest text-parchment-light hover:text-gold-bright"
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
