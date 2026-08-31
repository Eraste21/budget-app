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

// pour créer une transaction, on omet les id
export type TransactionInput = Omit<Transaction, 'id' | 'user_id'>

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
    login: (data: LoginInput) => Promise<void>;
    logout: ()=> void;
}