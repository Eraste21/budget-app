import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Budget, BudgetContextType, BudgetInput, Delta } from "../../types";
import { 
    createBudget as createBudgetService, 
    getBudgets as getBudgetsService,
    getCurrentBudget as getCurrentBudgetService,
    getTotalSpent as getTotalSpentService,
    updateCurrentBudget as updateCurrentBudgetService,
    increaseCurrentBudget as increaseCurrentBudgetService,
    decreaseCurrentBudget as decreaseCurrentBudgetService,
    deleteCurrentBudget as deleteCurrentBudgetService
} from "../../services/budgets/budgetService";

const BudgetContext = createContext<BudgetContextType | null>(null)
export default BudgetContext;

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
    const [budgets, setBudgets] = useState<Budget[] | null>(null)
    const [currentBudget, setCurrentBudget] = useState<Budget | null>(null)
    const [totalSpent, setTotalSpent] = useState(0)

    useEffect(() => {
        const initBudget = async () => {
            await refreshBudgets()
            await refreshCurrentBudget()
            await getTotalSpent()
        }

        initBudget()
    }, [])

    // créer un budget
    const createBudget = async (data: BudgetInput) => {
        await createBudgetService(data)
        await refreshBudgets()
        await refreshCurrentBudget()
    }

    // récupérer tous les budgets
    const refreshBudgets = async () => {
        const response = await getBudgetsService()
        setBudgets(response)
    }

    // récupérer le budget courant
    const refreshCurrentBudget = async () => {
        const response = await getCurrentBudgetService()
        setCurrentBudget(response)
    }

    // récupérer le total des dépenses du budget courant
    const getTotalSpent = async () => {
        const response = await getTotalSpentService()
        setTotalSpent(response)
    }

    // modifier le budget courant
    const updateCurrentBudget = async (data: BudgetInput) => {
        await updateCurrentBudgetService(data)
        await refreshBudgets()
    }

    // augmenter le budget courant
    const increaseCurrentBudget = async (delta: Delta) => {
        await increaseCurrentBudgetService(delta)
        await refreshBudgets()
    }

    // diminuer le budget courant
    const decreaseCurrentBudget = async (delta: Delta) => {
        await decreaseCurrentBudgetService(delta)
        await refreshBudgets()
    }

    // supprimer le budget courant
    const deleteCurrentBudget = async (id: number) => {
        await deleteCurrentBudgetService(id)
        await refreshBudgets()
        await refreshCurrentBudget()
    }

    return (
        <BudgetContext.Provider value={{budgets, currentBudget, totalSpent, createBudget, updateCurrentBudget, increaseCurrentBudget, decreaseCurrentBudget, deleteCurrentBudget }} >
            {children}
        </BudgetContext.Provider>
    )
}