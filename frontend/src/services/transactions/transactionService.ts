import type { Transaction, TransactionInput } from "../../types";
import API_URL from "../api";

const getToken = () => localStorage.getItem('token')

const authHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken}`,
})

export const createTransactions = async (data: TransactionInput): Promise<void> => {
    const response = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la création de la transaction')
    }
}

export const getTransactions = async (): Promise<Transaction[]> => {
    const response = await fetch(`${API_URL}/transactions`, {
        headers: authHeaders(),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la récupération des transactions')
    }

    const data = await response.json()
    return data.transactions
}

export const updateTransactions = async (id: number, data: TransactionInput): Promise<void> => {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la récupération des transactions')
    }
}

export const deleteTransactions = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la récupération des transactions')
    }
}