"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

interface AuthProviderProps {
    children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const setUser = useAuthStore((state) => state.setUser);
    const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

    useEffect(() => {
        const fetchUsers = async () => {
            const isAuthenticated = await checkSession();

            if (isAuthenticated.success === true) {
                const user = await getMe();

                if (user) {
                    setUser(user);
                } else {
                    clearIsAuthenticated();
                }
            } else {
                clearIsAuthenticated();
            }
        }

        fetchUsers();
    }, [setUser, clearIsAuthenticated])

    return children;
};

export default AuthProvider;