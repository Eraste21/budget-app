# Budget App — Frontend

Interface web React de Budget App. Elle fournit les écrans d’authentification et l’espace protégé de gestion des budgets et transactions.

## Stack technique

- React 19
- TypeScript 6
- Vite 8
- React Router 7
- Tailwind CSS 4
- daisyUI 5
- Lucide React

## Structure

```text
frontend/src/
├── components/
│   ├── budgets/          # Formulaire de budget
│   ├── transactions/     # Formulaire et liste des transactions
│   └── ui/               # Sidebar, liens et top bar
├── context/
│   ├── auth/             # État d’authentification
│   ├── budgets/          # État des budgets
│   └── transactions/     # État et actions des transactions
├── hooks/                # Accès aux contextes
├── layout/               # Structure du tableau de bord
├── pages/                # Pages associées aux routes
├── services/             # Appels HTTP vers le backend
├── types/                # Types TypeScript partagés
├── App.tsx               # Déclaration des routes
└── main.tsx              # Montage de React et des providers
```

## Prérequis

- Node.js dans une version récente
- npm
- Backend Budget App lancé sur `http://localhost:3001`

## Installation

Depuis le dossier `frontend` :

```powershell
npm install
```

## Lancement

Mode développement :

```powershell
npm run dev
```

Vite affiche l’adresse locale à ouvrir dans le navigateur.

Prévisualisation de la version compilée :

```powershell
npm run build
npm run preview
```

## Routes

Routes publiques :

- `/login` : connexion ;
- `/register` : création d’un compte.

Routes protégées :

- `/dashboard` : synthèse du budget ;
- `/budgets` : gestion des budgets ;
- `/transactions` : gestion des transactions ;
- `/statistics` : statistiques.

Les routes protégées redirigent vers `/login` lorsqu’aucun jeton n’est disponible.

## Authentification

Après une connexion réussie, le JWT renvoyé par le backend est enregistré dans `localStorage` sous la clé `token`.

Les services protégés transmettent ensuite :

```http
Authorization: Bearer jeton_jwt
```

Au chargement de l’application, le profil est demandé au backend pour vérifier la session existante.

## Services

- `services/api.ts` centralise l’URL de l’API, les en-têtes authentifiés et la vérification des réponses HTTP ;
- `services/auth/authService.ts` gère l’inscription, la connexion et le profil ;
- `services/budgets/budgetService.ts` gère les budgets ;
- `services/transactions/transactionService.ts` gère les transactions et leurs filtres.

L’URL du backend est actuellement définie directement dans `services/api.ts` :

```text
http://localhost:3001
```

## Scripts npm

- `npm run dev` : démarre Vite en développement ;
- `npm run build` : vérifie TypeScript et génère la version de production ;
- `npm run lint` : lance ESLint ;
- `npm run preview` : sert localement la version compilée.

## État actuel

- Le contexte d’authentification est connecté aux services.
- Le contexte des transactions fournit les opérations CRUD.
- Le contexte des budgets est encore une base vide à compléter.
- Aucune suite de tests frontend n’est actuellement configurée.
