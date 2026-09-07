import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Transaction, TransactionContextType, TransactionInput } from "../../types";
import {
    createTransaction as createTransactionService,
    getTransactions as getTransactionsService,
    updateTransaction as updateTransactionService,
    deleteTransaction as deleteTransactionService,
    getTransactionsFilter as getTransactionsFilterService,
    getTotalIncomes as getTotalIncomesService,
    getTotalExpenses as getTotalExpensesService
} from "../../services/transactions/transactionService";

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
    const [transactions, setTransactions] = useState<Transaction[] | null>(null)
    const [incomes, setIncomes] = useState('')
    const [expenses, setExpenses] = useState('')

    useEffect(() => {
        const initTransaction = async () => {
            await refreshTransactions()
            await getTotal()
        }

        initTransaction()
    }, [])

    // créer une transaction
    const createTransaction = async (data: TransactionInput) => {
        await createTransactionService(data)
        await refreshTransactions()
        await getTotal()
    }

    // récupérer la somme de toutes les entrées / sorties
    const getTotal = async () => {
        let response = await getTotalExpensesService()
        setExpenses(response)
        response = await getTotalIncomesService()
        setIncomes(response)
    }

    // lister toutes les transactions
    const refreshTransactions = async () => {
        const response = await getTransactionsService()
        setTransactions(response)
        await getTotal()
    }

    // lister toutes les transactions
    const refreshTransactionsFilter = async (query?: string) => {
        const response = await getTransactionsFilterService(query)
        setTransactions(response)
        await getTotal()
    }

    // mettre à jour une transaction
    const updateTransaction = async (id: number, data: TransactionInput) => {
        await updateTransactionService(id, data)
        await refreshTransactions()
        await getTotal()
    }

    // supprimer une transaction
    const deleteTransaction = async (id: number) => {
        await deleteTransactionService(id)
        await refreshTransactions()
        await getTotal()
    }

    return (
        <TransactionContext.Provider value={{ transactions, incomes, expenses, createTransaction, refreshTransactions, refreshTransactionsFilter, updateTransaction, deleteTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}