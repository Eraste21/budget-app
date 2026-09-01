import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { Transaction, TransactionContextType, TransactionInput } from "../types";
import { 
    createTransaction as createTransactionService, 
    getTransactions as getTransactionsService, 
    updateTransaction as updateTransactionService,
    deleteTransaction as deleteTransactionService
} from "../services/transactions/transactionService";

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export const TransactionProvider = ({children}: {children: ReactNode}) => {
    const [transactions, setTransactions] = useState<Transaction[] | null>(null)

    // créer une transaction
    const createTransaction = async (data: TransactionInput) => {
        await createTransactionService(data)
        await refreshTransactions()
    }

    // lister toutes les transactions
    const refreshTransactions = async () => {
        const response = await getTransactionsService()
        setTransactions(response)
    }

    // mettre à jour une transaction
    const updateTransaction = async (id: number, data: TransactionInput) => {
        await updateTransactionService(id, data)
        await refreshTransactions()
    }

    // supprimer une transaction
    const deleteTransaction = async (id: number) => {
        await deleteTransactionService(id)
        await refreshTransactions()
    }

    return (
        <TransactionContext.Provider value={{transactions, createTransaction, refreshTransactions, updateTransaction, deleteTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}