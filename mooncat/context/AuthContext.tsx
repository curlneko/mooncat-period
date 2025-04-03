import { createContext, useState, useEffect, ReactNode } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";

import { getCurrentUserSession, signOut } from "@/utils/auth";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
    user: CognitoUser | null;
    groups: string[];
    isAuthenticated: boolean | null;
    setUser: (user: CognitoUser | null) => void;
    setGroups: (groups: string[]) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<CognitoUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [groups, setGroups] = useState<string[]>([]);

    useEffect(() => {
        getCurrentUserSession()
            .then((currentUser) => {
                if (currentUser) {
                    const idToken = user?.getSignInUserSession()?.getIdToken().getJwtToken();
                    if (idToken) {
                        const decodedToken: any = jwtDecode(idToken);
                        setGroups(decodedToken["cognito:groups"] || []);
                    }

                    setUser(currentUser);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
            })
    }, [])

    const logout = async () => {
        await signOut();
        setUser(null);
        setGroups([]);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ user, groups, isAuthenticated, setUser, setGroups, logout }}>
            {children}
        </AuthContext.Provider>
    )
}