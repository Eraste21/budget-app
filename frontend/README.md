# Budget App — Frontend

Interface React de Budget App. Elle fournit l’authentification, un espace protégé et les écrans nécessaires au suivi des budgets, transactions et statistiques.

## Stack

- React 19 ;
- TypeScript 6 ;
- Vite 8 ;
- React Router 7 ;
- Tailwind CSS 4 ;
- daisyUI 5 ;
- Recharts 3 ;
- Lucide React.

## Structure

```text
frontend/src/
├── components/
│   ├── budgets/          # Liste, création et suppression des budgets
│   ├── dashboard/        # Graphique du solde et guide Recharts
│   ├── statistics/       # Graphiques statistiques
│   ├── transactions/     # Liste, création et suppression des transactions
│   └── ui/               # Modal, boutons et navigation
├── context/
│   ├── auth/
│   ├── budgets/
│   └── transactions/
├── hooks/                # Accès typé aux contextes
├── layout/               # Sidebar, topbar et contenu des pages
├── pages/
│   ├── auth/
│   ├── budgets/
│   ├── dashboard/
│   ├── statistics/
│   └── transactions/
├── services/             # Appels HTTP
├── types/                # Interfaces TypeScript
├── utils/                # Formatage et calculs statistiques
├── App.tsx               # Routes et lazy loading
└── main.tsx              # Providers et montage React
```

## Installation

```powershell
cd frontend
npm install
```

Le backend doit être lancé sur `http://localhost:3001`.

## Lancement

Développement :

```powershell
npm run dev
```

Compilation de production :

```powershell
npm run build
```

Prévisualisation du build :

```powershell
npm run preview
```

Analyse ESLint :

```powershell
npm run lint
```

## Routes

Routes publiques :

- `/login` : connexion ;
- `/register` : inscription.

Routes protégées :

- `/dashboard` : synthèse financière, dernières opérations et solde ;
- `/budgets` : budget actif, dépenses et historique ;
- `/transactions` : création, filtre et historique ;
- `/statistics` : analyses et projections.

Les pages sont chargées à la demande avec `React.lazy`. `ProtectedRoute` contrôle l’accès à l’espace connecté.

## Authentification

Après la connexion, le JWT est enregistré dans `localStorage` sous la clé `token`.

Les requêtes protégées utilisent :

```http
Authorization: Bearer jeton_jwt
```

`AuthProvider` restaure la session en demandant le profil au backend. La déconnexion supprime le jeton et renvoie vers la page de connexion.

## Gestion de l’état

L’application utilise trois contextes :

- `AuthProvider` : utilisateur, jeton, inscription, connexion et déconnexion ;
- `BudgetProvider` : budgets, budget actif, total dépensé et opérations associées ;
- `TransactionProvider` : transactions, liste limitée, totaux, filtres et opérations CRUD.

Les composants accèdent à ces contextes avec `useAuth`, `useBudget` et `useTransaction`.

## Services HTTP

- `services/api.ts` définit l’URL, construit les en-têtes JWT et centralise les erreurs avec `checkResponse` ;
- `services/auth/authService.ts` gère l’authentification ;
- `services/budgets/budgetService.ts` gère les budgets ;
- `services/transactions/transactionService.ts` gère les transactions, filtres et totaux.

L’URL est actuellement écrite directement dans `services/api.ts` :

```ts
const API_URL = 'http://localhost:3001'
```

Pour un déploiement, elle devra être déplacée vers une variable d’environnement Vite.

## Transactions

Le formulaire propose une liste contrôlée de catégories et transmet :

- `date` au format `YYYY-MM-DD` ;
- `category` ;
- `amount` numérique ;
- `type` : `Entrée` ou `Sortie` ;
- `frequency` : `Mensuelle` ou `Ponctuelle` ;
- `description` facultative.

La page permet de filtrer les transactions par type. Les suppressions passent par une fenêtre de confirmation.

## Budgets

La page affiche :

- le budget actif ;
- le total des dépenses liées à ce budget ;
- l’historique des budgets ;
- le statut actif ou archivé ;
- un formulaire de création ;
- une confirmation avant suppression.

Le budget actif est celui renvoyé par `/budgets/current`.

## Dashboard et statistiques

Le Dashboard affiche les totaux des entrées et sorties, les dépenses, le budget actif, les dernières transactions et l’évolution du solde.

La page Statistiques contient :

- les dépenses regroupées par catégorie ;
- la comparaison mensuelle entre entrées et sorties ;
- une projection du solde sur douze mois.

Les calculs sont regroupés dans `src/utils/calculations.ts` et les graphiques utilisent Recharts.

Un guide détaillé est disponible dans [src/components/dashboard/recharts.md](src/components/dashboard/recharts.md).

## Scripts npm

- `npm run dev` : démarre Vite ;
- `npm run build` : vérifie TypeScript et compile l’application ;
- `npm run lint` : exécute ESLint ;
- `npm run preview` : sert le build localement.

## Limites actuelles

- Aucun test frontend automatisé n’est configuré.
- L’URL de l’API n’utilise pas encore de variable d’environnement.
- Recharts augmente la taille du bundle ; le lazy loading limite toutefois le chargement aux pages utilisées.
- La validation du formulaire repose encore principalement sur les contrôles côté composant et les contraintes PostgreSQL.
