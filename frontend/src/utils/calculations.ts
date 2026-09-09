import type { BalancePointByCategory, BalancePoint, Transaction, MonthlyTotal } from "../types";
import { getYearMonth } from "./format";

export const calculateBalanceOverTime = (transactions: Transaction[]): BalancePoint[] => {
    const sorted = [...transactions].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    let solde = 0
    let results = new Map<string, number>()

    for (const transaction of sorted) {
        solde += (transaction.type === 'Entrée') ? transaction.amount : -transaction.amount
        results.set(transaction.date, solde)
    }

    return Array.from(results, ([date, balance]) => ({ date, balance }))
}

export const calculateTotalsByCategory = (transactions: Transaction[]): BalancePointByCategory[] => {
    let results = new Map<string, number>()
    let total = 0

    for (const transaction of transactions) {
        if (transaction.type !== 'Sortie') continue

        total = results.get(transaction.category) ?? 0
        results.set(transaction.category, total + transaction.amount)
    }

    return Array.from(results, ([category, total]) => ({ category, total }))
}

export const calculateTotalsByMonth = (transactions: Transaction[]): MonthlyTotal[] => {
    const results = new Map<string, MonthlyTotal>()

    for (const transaction of transactions) {
        const key = getYearMonth(transaction.date)
        const current = results.get(key) ?? { month: key, entrees: 0, sorties: 0 }

        if (transaction.type === "Entrée") {
            current.entrees += transaction.amount
        } else {
            current.sorties -= transaction.amount
        }

        results.set(key, current)
    }

    return Array.from(results.values())
}
