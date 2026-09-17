"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FormErrorMessage, ValidationDetail } from "@/components/ui/FormErrorMessage";

export function AuthModal() {
  const { isAuthModalOpen, authModalMode, closeAuthModal, setUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"login" | "register">(authModalMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationDetails, setValidationDetails] = useState<ValidationDetail[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const resetErrors = () => {
    setErrorMessage(null);
    setValidationDetails(null);
  };

  const handleTabChange = (tab: "login" | "register") => {
    setActiveTab(tab);
    resetErrors();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetErrors();
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
      <div className="relative w-full max-w-md bg-gradient-to-b from-bg-modal-from/95 to-bg-modal-to/95 border-2 border-gold-primary p-8 shadow-[0_0_25px_rgba(212,175,55,0.3)]">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-parchment-muted hover:text-gold-bright text-xl font-bold transition-colors"
          aria-label="Fermer"
        >
          ✕
        </button>

        <div className="flex border-b border-gold-primary/25 mb-6">
          {(["register", "login"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 py-3 font-cinzel text-sm font-bold tracking-wider transition-colors ${
                activeTab === tab
                  ? "text-gold-bright border-b-2 border-gold-primary"
                  : "text-parchment-muted hover:text-parchment-light"
              }`}
            >
              {tab === "register" ? "INSCRIPTION" : "CONNEXION"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Adresse Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="joueur@grimoire.com"
            required
          />

          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            helperText={
              activeTab === "register"
                ? "Au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial."
                : undefined
            }
          />

          <FormErrorMessage message={errorMessage} details={validationDetails} />

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
