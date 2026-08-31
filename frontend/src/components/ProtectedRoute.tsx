import type { ReactNode } from "react"
import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { token, isLoading } = useAuth()

    if (isLoading) {
        return <p>Chargement...</p>
    }

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

export default ProtectedRoute