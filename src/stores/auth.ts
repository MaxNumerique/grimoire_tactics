import { create } from "zustand";

export interface UserSession {
  id: string;
  email: string;
  gold: number;
  gems: number;
}

interface AuthState {
  user: UserSession | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: "login" | "register";
  openAuthModal: (mode?: "login" | "register") => void;
  closeAuthModal: () => void;
  setUser: (user: UserSession | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthModalOpen: false,
  authModalMode: "register",
  openAuthModal: (mode = "register") =>
    set({ isAuthModalOpen: true, authModalMode: mode }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  setUser: (user) =>
    set({
      user,
      isAuthenticated: Boolean(user),
      isAuthModalOpen: false,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
