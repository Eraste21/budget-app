import { useContext } from "react"
import BudgetContext from "../../context/budgets/BudgetContext"

export const useBudget = () => {
  const context = useContext(BudgetContext)
  if (!context) throw new Error('useBudget doit être utilisé à l\'intérieur d\'un BudgetProvider')
  return context
}
