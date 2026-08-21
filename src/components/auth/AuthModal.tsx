"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/Button";

export function AuthModal() {
  const { isAuthModalOpen, authModalMode, closeAuthModal, setUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"login" | "register">(authModalMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationDetails, setValidationDetails] = useState<Array<{ field?: string; message: string }> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setValidationDetails(null);
    setIsLoading(true);

    const endpoint = activeTab === "register" ? "/api/auth/register" : "/api/auth/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Une erreur est survenue.");
        if (data.details && Array.isArray(data.details)) {
          setValidationDetails(data.details);
        }
        setIsLoading(false);
        return;
      }

      setUser(data.user);
      closeAuthModal();
    } catch {
      setErrorMessage("Impossible de contacter le serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#201a15]/95 to-[#14100d]/95 border-2 border-[#d4af37] p-8 shadow-[0_0_25px_rgba(212,175,55,0.3)]">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-[#a39482] hover:text-[#f3d068] text-xl font-bold transition-colors"
          aria-label="Fermer"
        >
          ✕
        </button>

        <div className="flex border-b border-[rgba(212,175,55,0.25)] mb-6">
          <button
            onClick={() => {
              setActiveTab("register");
              setErrorMessage(null);
              setValidationDetails(null);
            }}
            className={`flex-1 py-3 font-cinzel text-sm font-bold tracking-wider transition-colors ${
              activeTab === "register"
                ? "text-[#f3d068] border-b-2 border-[#d4af37]"
                : "text-[#a39482] hover:text-[#e2d9cd]"
            }`}
          >
            INSCRIPTION
          </button>
          <button
            onClick={() => {
              setActiveTab("login");
              setErrorMessage(null);
              setValidationDetails(null);
            }}
            className={`flex-1 py-3 font-cinzel text-sm font-bold tracking-wider transition-colors ${
              activeTab === "login"
                ? "text-[#f3d068] border-b-2 border-[#d4af37]"
                : "text-[#a39482] hover:text-[#e2d9cd]"
            }`}
          >
            CONNEXION
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-cinzel text-xs font-semibold text-[#f3d068] uppercase tracking-wider mb-1">
              Adresse Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="joueur@grimoire.com"
              required
              className="w-full bg-[#120e0b] border border-[rgba(212,175,55,0.3)] px-4 py-2.5 text-sm text-[#e2d9cd] placeholder-[#6b5f52] focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block font-cinzel text-xs font-semibold text-[#f3d068] uppercase tracking-wider mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-[#120e0b] border border-[rgba(212,175,55,0.3)] px-4 py-2.5 text-sm text-[#e2d9cd] placeholder-[#6b5f52] focus:outline-none focus:border-[#d4af37]"
            />
            {activeTab === "register" && (
              <p className="mt-1 text-[10px] text-[#a39482]">
                Au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.
              </p>
            )}
          </div>

          {errorMessage && (
            <div className="bg-[#5c1d1d]/40 border border-[#5c1d1d] p-3 text-xs text-[#ff9999] rounded-sm">
              <strong className="block font-semibold">{errorMessage}</strong>
              {validationDetails && (
                <ul className="mt-1 list-disc list-inside space-y-0.5 text-[11px]">
                  {validationDetails.map((detail, idx) => (
                    <li key={idx}>{detail.message}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            variant="primary"
            className="w-full mt-6 text-sm !py-3"
          >
            {isLoading
              ? "CHARGEMENT..."
              : activeTab === "register"
              ? "CRÉER MON COMPTE"
              : "SE CONNECTER"}
          </Button>
        </form>
      </div>
    </div>
  );
}
