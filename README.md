# Budget App

Application web de gestion de budget personnel créée par **deveraste21**.

Budget App permet de créer un compte, suivre ses entrées et sorties, gérer plusieurs budgets et visualiser des statistiques financières. Les données sont isolées par utilisateur grâce à une authentification JWT.

## Fonctionnalités

- Inscription, connexion, déconnexion et restauration de session ;
- routes privées protégées côté frontend et backend ;
- création, consultation et suppression de budgets ;
- identification automatique du budget actif ;
- calcul des dépenses associées au budget actif ;
- création, consultation, filtrage et suppression de transactions ;
- catégories de transactions proposées dans une liste contrôlée ;
- totaux distincts pour les entrées et les sorties ;
- tableau de bord avec synthèse, dernières opérations et évolution du solde ;
- statistiques par catégorie, comparaison mensuelle et projection du solde ;
- interface responsive avec sidebar et topbar fixes.

## Technologies

### Frontend

- React 19 et TypeScript 6 ;
- Vite 8 ;
- React Router 7 ;
- Tailwind CSS 4 et daisyUI 5 ;
- Recharts 3 pour les graphiques ;
- Lucide React pour les icônes.

### Backend

- Node.js et Express 5 ;
- PostgreSQL avec le pilote `pg` ;
- JSON Web Token pour l’authentification ;
- bcrypt pour le hachage des mots de passe ;
- dotenv pour la configuration.

## Organisation

```text
budget-app/
├── backend/          # API REST et connexion PostgreSQL
├── frontend/         # Application React
└── README.md         # Vue d’ensemble
```

Documentation détaillée :

- [Documentation du backend](backend/README.md)
- [Documentation du frontend](frontend/README.md)
- [Guide Recharts](frontend/src/components/dashboard/recharts.md)

## Prérequis

- Node.js récent ;
- npm ;
- une base de données PostgreSQL accessible.

## Installation

Depuis la racine du projet :

```powershell
cd backend
npm install

cd ../frontend
npm install
```

## Configuration

Créer `backend/.env` :

```dotenv
PORT=3001
JWT_SECRET=remplacer_par_une_cle_longue_et_aleatoire
DATABASE_URL=postgresql://utilisateur:mot_de_passe@hote:5432/budget_app
```

L’API frontend est actuellement configurée sur `http://localhost:3001` dans `frontend/src/services/api.ts`.

## Démarrage

Ouvrir deux terminaux.

Terminal 1 :

```powershell
cd backend
npm run dev
```

Terminal 2 :

```powershell
cd frontend
npm run dev
```

Vite affiche l’adresse du frontend dans le terminal. L’API répond sur `http://localhost:3001`.

## Vérifications

```powershell
cd frontend
npm run build
npm run lint
```

Le projet ne possède pas encore de suite de tests automatisés.

## Points d’attention

- Vérifier que `DATABASE_URL` pointe vers une base PostgreSQL accessible avant de lancer le backend.
- Utiliser le format ISO `YYYY-MM-DD` pour les dates de transaction.
- Respecter exactement les valeurs `Entrée`, `Sortie`, `Mensuelle` et `Ponctuelle`.
- Ne jamais versionner `backend/.env` ou exposer les identifiants PostgreSQL.
- Les routes `/users` doivent être protégées avant un déploiement en production.
