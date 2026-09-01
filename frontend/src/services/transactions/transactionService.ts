import API_URL from "../api";
import type { Transaction, TransactionInput } from "../../types";

const getToken = () => localStorage.getItem('token')

const authHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken}`,
})

export const createTransaction = async (data: TransactionInput): Promise<void> => {
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

export const updateTransaction = async (id: number, data: TransactionInput): Promise<void> => {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la mise à jour de la transaction')
    }
}

export const deleteTransaction = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la suppression de la transaction')
    }
}