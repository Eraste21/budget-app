import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { info as infoService, login as loginService, register as registerService } from "../../services/auth/authService";
import type { User, AuthContextType, LoginInput, RegisterInput } from "../../types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // à l'ouverture de la page, on guette si le token est bien dans le localStorage
    // s'il n'y est pas, alors on est pas connecté
    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token')
            if (storedToken) {
                setToken(storedToken)
                try {
                    await info()
                } catch (error) {
                    logout()
                }
            }
            setIsLoading(false)
        }

        initAuth()
    }, [])

    // on crée un compte
    const register = async (data: RegisterInput) => {
        await registerService(data)
    }

    // on envoie le token généré à la connexion dans le localStorage
    const login = async (data: LoginInput) => {
        const response = await loginService(data)
        setToken(response.token)
        localStorage.setItem('token', response.token)
        await info()
    }

    // on supprime le token du localStorage à la déconnexion
    const logout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem('token')
    }

    // on récupère les infos de l'utilisateur connecté
    const info = async () => {
        const response = await infoService()
        setUser(response)
    }

    return (
        <AuthContext.Provider value={{ user, token, isLoading, register, login, logout, info }}>
            {children}
        </AuthContext.Provider>
    )
}
