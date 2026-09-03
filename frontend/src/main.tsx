import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/auth/AuthContext.tsx'
import { TransactionProvider } from './context/transactions/TransactionContext.tsx'
import { BudgetProvider } from './context/budgets/BudgetContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BudgetProvider>
        <TransactionProvider>
          <App />
        </TransactionProvider>
      </BudgetProvider>
    </AuthProvider>
  </StrictMode>,
)
