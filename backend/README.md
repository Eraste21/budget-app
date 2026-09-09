# Budget App — Backend

API REST de Budget App, construite avec Express et PostgreSQL. Elle gère l’authentification, les utilisateurs, les budgets et les transactions.

## Stack

- Node.js ;
- Express 5 ;
- PostgreSQL avec le pilote `pg` ;
- `jsonwebtoken` pour les JWT ;
- `bcrypt` pour les mots de passe ;
- `dotenv` pour les variables d’environnement ;
- `nodemon` en développement.

## Structure

```text
backend/
├── middleware/
│   └── auth.js
├── routes/
│   ├── auth/auth.js
│   ├── budgets/budgets.js
│   ├── transactions/transactions.js
│   └── users/users.js
├── db.js
├── server.js
├── package.json
└── README.md
```

## Installation et configuration

```powershell
cd backend
npm install
```

Créer ensuite `backend/.env` :

```dotenv
PORT=3001
JWT_SECRET=remplacer_par_une_cle_longue_et_aleatoire
DATABASE_URL=postgresql://utilisateur:mot_de_passe@hote:5432/budget_app
```

- `JWT_SECRET` est indispensable à la création et à la vérification des jetons.
- `DATABASE_URL` contient les informations de connexion à PostgreSQL.
- Le port HTTP par défaut est `3001`.

La configuration actuelle active SSL avec `rejectUnauthorized: false`. Elle est adaptée à certains hébergeurs PostgreSQL ; pour une base locale sans SSL, la configuration de `db.js` devra être adaptée.

## Lancement

Développement :

```powershell
npm run dev
```

Mode normal :

```powershell
npm start
```

Test rapide :

```text
GET http://localhost:3001/
```

Réponse attendue :

```json
{ "message": "API is running\n" }
```

## Base de données

`db.js` crée automatiquement les tables suivantes dans la base indiquée par `DATABASE_URL` :

- `users` : compte, e-mail et mot de passe haché ;
- `budgets` : montant et propriétaire du budget ;
- `transactions` : date, catégorie, montant, type, fréquence, description, utilisateur et budget associé.

Le budget actif correspond actuellement au budget le plus récent de l’utilisateur.

Contraintes PostgreSQL des transactions :

```text
type      = Entrée | Sortie
frequency = Mensuelle | Ponctuelle
```

Les valeurs sont sensibles aux accents et aux majuscules. Les dates doivent être enregistrées au format `YYYY-MM-DD`.

## Authentification

### Inscription

```http
POST /auth/register
Content-Type: application/json
```

```json
{
  "username": "Marcus",
  "email": "marcus@example.com",
  "password": "mot_de_passe"
}
```

### Connexion

```http
POST /auth/login
Content-Type: application/json
```

```json
{
  "email": "marcus@example.com",
  "password": "mot_de_passe"
}
```

La réponse contient un JWT valable sept jours :

```json
{ "token": "jeton_jwt" }
```

### Route protégée

```http
Authorization: Bearer jeton_jwt
```

`GET /auth/profile` renvoie le profil de l’utilisateur connecté sans son mot de passe.

## Routes

### Authentification

- `POST /auth/register` : créer un compte ;
- `POST /auth/login` : obtenir un JWT ;
- `GET /auth/profile` : obtenir le profil connecté.

### Utilisateurs

- `POST /users` : créer un utilisateur ;
- `GET /users` : lister les utilisateurs ;
- `GET /users/email?email=...` : rechercher par e-mail ;
- `GET /users/:id` : obtenir un utilisateur ;
- `PATCH /users/:id` : modifier le nom et l’e-mail ;
- `PATCH /users/:id/password` : modifier le mot de passe ;
- `DELETE /users/:id` : supprimer un utilisateur.

Les routes `/users` ne sont actuellement pas protégées par `authMiddleware`.

### Budgets — JWT requis

- `POST /budgets` : créer un budget ;
- `GET /budgets` : lister les budgets de l’utilisateur ;
- `GET /budgets/current` : obtenir le budget le plus récent ;
- `GET /budgets/current/spent` : obtenir ses dépenses ;
- `GET /budgets/:id` : obtenir un budget précis ;
- `PATCH /budgets/current` : remplacer le montant courant ;
- `PATCH /budgets/current/adjust` : appliquer un ajustement ;
- `DELETE /budgets/:id` : supprimer un budget.

Création :

```json
{ "amount": 1500 }
```

Remplacement du montant :

```json
{ "newAmount": 1800 }
```

Ajustement :

```json
{ "delta": -100 }
```

Un `delta` positif augmente le montant ; un `delta` négatif le diminue.

### Transactions — JWT requis

- `POST /transactions` : créer une transaction ;
- `GET /transactions` : lister et filtrer les transactions ;
- `GET /transactions/total?type=...` : calculer un total ;
- `GET /transactions/:id` : obtenir une transaction ;
- `PATCH /transactions/:id` : la modifier ;
- `DELETE /transactions/:id` : la supprimer.

Création ou modification :

```json
{
  "date": "2026-09-09",
  "category": "Alimentation",
  "amount": 42.5,
  "type": "Sortie",
  "frequency": "Ponctuelle",
  "description": "Courses de la semaine"
}
```

Filtres acceptés par `GET /transactions` :

- `budgetId` ;
- `type` ;
- `frequency` ;
- `category` ;
- `limit`.

Exemples :

```text
GET /transactions?type=Sortie&category=Alimentation
GET /transactions?limit=3
GET /transactions/total?type=Entrée
GET /transactions/total?type=Sortie&budgetId=2
```

## Scripts

- `npm run dev` : serveur avec rechargement automatique ;
- `npm start` : serveur Node.js ;
- `npm test` : aucun test n’est encore configuré.

## Sécurité et limites

- Ne jamais versionner `.env` ou exposer `DATABASE_URL`.
- Utiliser un secret JWT long et propre à chaque environnement.
- Les mots de passe sont hachés avec bcrypt.
- Les budgets et transactions sont filtrés par l’utilisateur du JWT.
- Les routes `/users` restent à protéger.
- Les corps et paramètres ne disposent pas encore d’une validation applicative complète.
- CORS autorise actuellement toutes les origines ; il doit être restreint en production.
