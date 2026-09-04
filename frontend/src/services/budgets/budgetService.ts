import type { Budget, BudgetInput, Delta } from "../../types"
import API_URL, { authHeaders, checkResponse } from "../api"

// créer un budget
export const createBudget = async (data: BudgetInput): Promise<void> => {
    const response = await fetch(`${API_URL}/budgets`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data)
    })

    await checkResponse(response, 'Erreur lors de la création du budget')
}

// récupérer le budget courant
export const getBudgets = async (): Promise<Budget[]> => {
    const response = await fetch(`${API_URL}/budgets`, {
        headers: authHeaders(),
    })

    await checkResponse(response, 'Erreur lors de la récupération du budget')

    const data = await response.json()
    return data.budgets
}

// récupérer le budget courant
export const getCurrentBudget = async (): Promise<Budget> => {
    const response = await fetch(`${API_URL}/budgets/current`, {
        headers: authHeaders(),
    })

    await checkResponse(response, 'Erreur lors de la récupération du budget')

    const data = await response.json()
    return data.currentBudget
}

// récupérer le total des dépenses sur le budget courrant
export const getSpent = async (): Promise<number> => {
    const response = await fetch(`${API_URL}/budgets/current/spent`, {
        headers: authHeaders(),
    })

    await checkResponse(response, 'Erreur lors de la récupération du budget')
    
    const data = await response.json()
    return data.spent
}

// modifier le budget courant
export const updateCurrentBudget = async (data: BudgetInput): Promise<void> => {
    const response = await fetch(`${API_URL}/budgets/current`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(data)
    })

    await checkResponse(response, 'Erreur lors de la modification du budget')
}

// augmenter le budget courant
const adjustCurrentBudget = async (delta: Delta): Promise<void> => {
    const response = await fetch(`${API_URL}/budgets/current/adjust`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(delta)
    })

    await checkResponse(response, 'Erreur lors de l\'augmentation du budget')
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

    await checkResponse(response, 'Erreur lors de la suppression du budget')
}
