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
    type: 'entrée' | 'sortie';
    frequency: 'ponctuelle' | 'mensuelle';
    description: string;
    created_at: string;
    user_id: number;
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
export type TransactionInput = Omit<Transaction, 'id' | 'user_id'>

export type BudgetInput = Omit<Budget, 'id' | 'user_id'>

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
export interface BudgetContextType { }

// contexte des transactions
export interface TransactionContextType {
    transactions: Transaction[] | null;
    createTransaction: (data: TransactionInput) => Promise<void>;
    refreshTransactions: () => Promise<void>;
    updateTransaction: (id: number, data: TransactionInput) => Promise<void>;
    deleteTransaction: (id: number) => Promise<void>;
}