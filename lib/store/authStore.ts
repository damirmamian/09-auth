import { User } from "@/types/user";
import { create } from "zustand";

type AuthStore = {
    isAuthenticated: boolean;
    user: User | null;
    setUser: (user: User) => void;
    clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
    isAuthenticated: false,
    user: null,
    setUser: (user) => set({ isAuthenticated: true, user: user }),
    clearIsAuthenticated: () => set({ isAuthenticated: false, user: null }),
}));