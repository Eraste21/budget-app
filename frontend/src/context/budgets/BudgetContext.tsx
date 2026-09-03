import { createContext, type ReactNode } from "react";
import type { /*Budget,*/ BudgetContextType } from "../../types";
// import API_URL from "../../services/api"

const BudgetContext = createContext<BudgetContextType | null>(null)
export default BudgetContext;

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
    // const createBudget = 0
    return (
        <BudgetContext.Provider value={{}} >
            {children}
        </BudgetContext.Provider>
    )
}