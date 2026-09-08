import type { BalancePoint, Transaction } from "../types";

export const calculateBalanceOverTime = (transactions: Transaction[]): BalancePoint[] => {
    const sorted = [...transactions].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    let solde = 0
    let results = new Map<string,number>()

    for (const transaction of sorted) {
            solde += (transaction.type === 'Entrée') ? transaction.amount : -transaction.amount
            results.set(transaction.date, solde)
    }

    return Array.from(results, ([date, balance]) => ({date, balance}))
}