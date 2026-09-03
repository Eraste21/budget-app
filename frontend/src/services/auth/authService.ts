import API_URL, { authHeaders } from "../api";
import type { RegisterInput, LoginInput, LoginResponse, User } from "../../types";

export const register = async (data: RegisterInput): Promise<void> => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de l\'inscription')
    }
}

export const login = async (data: LoginInput): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Email ou mot de passe incorrect')
    }

    return response.json()
}

export const info = async (): Promise<User> => {
    const response = await fetch(`${API_URL}/auth/profile`, {
        headers: authHeaders()
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la récupération du profil')
    }

    const data = await response.json()
    return data.user
}