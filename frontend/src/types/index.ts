// utilisateur
export interface User {
    id: number;
    username: string;
    email: string;
    created_at: string;
}

// transaction
export interface Transaction {
    id: number;
    date: string;
    category: string;
    amount: number;
    type: 'Entrée' | 'Sortie';
    frequency: 'Ponctuelle' | 'Mensuelle';
    description: string;
    created_at: string;
    user_id: number;
    budget_id: number | null;
}

// budget
export interface Budget {
    id: number;
    amount: number;
    created_at: string;
    user_id: number;
}

// delta pour le budget
export interface Delta {
    delta: number;
}

// pour créer une transaction, on omet les id
export type TransactionInput = Omit<Transaction, 'id' | 'user_id' | 'budget_id' | 'created_at'>

export type BudgetInput = Omit<Budget, 'id' | 'user_id' | 'created_at'>

// pour récupérer le token
export interface LoginResponse {
    token: string;
}

// inscription
export interface RegisterInput {
    username: string;
    email: string;
    password: string;
}

// connexion
export interface LoginInput {
    email: string;
    password: string;
}

// contexte d'authentification
export interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    register: (data: RegisterInput) => Promise<void>;
    login: (data: LoginInput) => Promise<void>;
    logout: () => void;
}

// contexte des budgets
export interface BudgetContextType {
    budgets: Budget[] | null;
    currentBudget: Budget | null;
    totalSpent: number;
    createBudget: (data: BudgetInput) => Promise<void>;
    updateCurrentBudget: (data: BudgetInput) => Promise<void>;
    increaseCurrentBudget: (delta: Delta) => Promise<void>;
    decreaseCurrentBudget: (delta: Delta) => Promise<void>;
    deleteCurrentBudget: (id: number) => Promise<void>;
}

// contexte des transactions
export interface TransactionContextType {
    transactions: Transaction[] | null;
    incomes: string;
    expenses: string;
    createTransaction: (data: TransactionInput) => Promise<void>;
    refreshTransactions: () => Promise<void>;
    refreshTransactionsFilter: (query?: string) => Promise<void>;
    updateTransaction: (id: number, data: TransactionInput) => Promise<void>;
    deleteTransaction: (id: number) => Promise<void>;
}

// format de donnée pour le graphique du dashboard
export interface BalancePoint {
    date: string
    balance: number
}

// format de donnée pour les graphiques dans la page des statistiques ( par catégorie )
export interface BalancePointByCategory {
    category: string
    total: number
}

// format de donnée pour les graphiques dans la page des statistiques ( par mois )
export interface MonthlyTotal {
    month: string
    entrees: number
    sorties: number
}