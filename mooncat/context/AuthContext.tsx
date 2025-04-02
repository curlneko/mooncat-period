import { createContext, useState, useEffect, ReactNode } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";

import { getCurrentUserSession, signOut } from "@/utils/auth";

type AuthContextType = {
    user: CognitoUser | null;
    isAuthenticated: boolean | null;
    setUser: (user: CognitoUser | null) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<CognitoUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        getCurrentUserSession()
            .then((currentUser) => {
                if (currentUser) {
                    setUser(currentUser);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
            })
    })

    const logout = async () => {
        await signOut();
        setUser(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}