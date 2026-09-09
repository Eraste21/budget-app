import type { BalancePointByCategory, BalancePoint, Transaction, MonthlyTotal, ProjectionPoint } from "../types";
import { getYearMonth } from "./format";

export const calculateBalanceOverTime = (transactions: Transaction[]): BalancePoint[] => {
    const sorted = [...transactions].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    let solde = 0
    const results = new Map<string, number>()

    for (const transaction of sorted) {
        solde += (transaction.type === 'Entrée') ? transaction.amount : -transaction.amount
        results.set(transaction.date, solde)
    }

    return Array.from(results, ([date, balance]) => ({ date, balance }))
}

export const calculateTotalsByCategory = (transactions: Transaction[]): BalancePointByCategory[] => {
    let total = 0
    const results = new Map<string, number>()

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

export const calculateAverageMonthlyPonctuelle = (transactions: Transaction[]) => {
    const ponctuelles = transactions.filter((t) => t.type === 'Sortie' && t.frequency === 'Ponctuelle')
    if (ponctuelles.length === 0) return 0
    
    let total = 0
    const data = calculateTotalsByMonth(ponctuelles)

    for (const d of data) total += d.sorties

    return total / data.length
}

export const getRecurringTransactions = (transactions: Transaction[]) => {
    const mensuelles = transactions.filter((t) => t.frequency === 'Mensuelle')
    if (mensuelles.length === 0) return []

    const results = new Map<string, Transaction>()

    for (const m of mensuelles) results.set(m.category, m)

    return Array.from(results.values())
}

export const calculateProjection = (transactions: Transaction[], monthsAhead: number): ProjectionPoint[] => {
    const balanceHistory = calculateBalanceOverTime(transactions)
    const currentBalance = balanceHistory.length > 0 ? balanceHistory[balanceHistory.length -1].balance : 0

    const recurring = getRecurringTransactions(transactions)
    const avgPonctuelle = calculateAverageMonthlyPonctuelle(transactions)
    
    let recurringEffect = 0
    for (const t of recurring) {
        recurringEffect += t.type === 'Entrée' ? t.amount : -t.amount
    }

    const results: ProjectionPoint[] = []
    let projectedBalance = currentBalance

    for (let i = 1; i <= monthsAhead; i++) {
        projectedBalance += recurringEffect - avgPonctuelle
        const futureDate = new Date()
        futureDate.setMonth(futureDate.getMonth() + i)
        const month = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}`

        results.push({month, projectedBalance})
    }

    return results
}