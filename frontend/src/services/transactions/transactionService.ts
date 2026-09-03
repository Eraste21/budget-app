import API_URL, { authHeaders } from "../api";
import type { Transaction, TransactionInput } from "../../types";

// créer une transaciton
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

// lister toutes les transacations
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

// mettre à jour une transaction
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

// supprimer une transaction
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