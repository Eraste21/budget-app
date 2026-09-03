import type { Budget, BudgetInput, Delta } from "../../types"
import API_URL, { authHeaders } from "../api"

// créer un budget
export const createBudget = async (data: BudgetInput): Promise<void> => {
    const response = await fetch(`${API_URL}/budgets`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la création du budget')
    }
}

// récupérer le budget courant
export const getBudgets = async (): Promise<Budget[]> => {
    const response = await fetch(`${API_URL}/budgets`, {
        headers: authHeaders(),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la récupération du budget')
    }

    const data = await response.json()
    return data.budgets
}

// récupérer le budget courant
export const getCurrentBudget = async (): Promise<Budget> => {
    const response = await fetch(`${API_URL}/budgets/current`, {
        headers: authHeaders(),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la récupération du budget')
    }

    const data = await response.json()
    return data.currentBudget
}

// modifier le budget courant
export const updateCurrentBudget = async (data: BudgetInput): Promise<void> => {
    const response = await fetch(`${API_URL}/budgets/current`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la modification du budget')
    }
}

// augmenter le budget courant
const adjustCurrentBudget = async (delta: Delta): Promise<void> => {
    const response = await fetch(`${API_URL}/budgets/current/adjust`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(delta)
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de l\'augmentation du budget')
    }
}

// augmenter le budget courant
export const increaseCurrentBudget = async (delta: Delta): Promise<void> => {
    await adjustCurrentBudget(delta)
}

// diminuer le budget courant
export const decreaseCurrentBudget = async (delta: Delta): Promise<void> => {
    await adjustCurrentBudget(delta)
}

// supprimer le budget courant
export const deleteCurrentBudget = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/budgets/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la suppression du budget')
    }
}