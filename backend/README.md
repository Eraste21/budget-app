# Budget App — Backend

API REST de l’application **Budget App**, développée avec Express et SQLite.

Le backend permet de créer et authentifier des utilisateurs, puis de gérer leurs transactions de manière isolée grâce à un jeton JWT.

## Stack technique

- Node.js et Express 5
- SQLite avec `better-sqlite3`
- Authentification JWT avec `jsonwebtoken`
- Hachage des mots de passe avec `bcrypt`
- Variables d’environnement avec `dotenv`
- Rechargement automatique en développement avec `nodemon`

## Structure

```text
backend/
├── middleware/
│   └── auth.js                  # Vérification du jeton JWT
├── routes/
│   ├── auth/auth.js             # Inscription et connexion
│   ├── transactions/transactions.js
│   └── users/users.js
├── db.js                        # Connexion SQLite et création des tables
├── server.js                    # Configuration et démarrage d’Express
├── package.json
└── README.md
```

## Installation

Depuis le dossier `backend` :

```powershell
cd backend
npm install
```

## Configuration

Créer un fichier `.env` dans le dossier `backend` :

```dotenv
PORT=3001
JWT_SECRET=remplacer_par_une_cle_longue_et_aleatoire
```

`JWT_SECRET` est obligatoire pour générer et vérifier les jetons de connexion. Le port `3001` est utilisé par défaut si `PORT` n’est pas défini.

Ne jamais enregistrer le fichier `.env` dans Git.

## Lancement

Mode développement avec rechargement automatique :

```powershell
npm run dev
```

Mode normal :

```powershell
npm start
```

L’API est ensuite disponible à l’adresse :

```text
http://localhost:3001
```

La route `GET /` permet de vérifier que le serveur répond.

## Base de données

La base SQLite `database.db` est créée automatiquement au premier lancement dans le dossier depuis lequel le serveur est démarré.

Pour conserver la base au bon emplacement, lancer systématiquement les commandes depuis `backend`.

Deux tables sont initialisées :

- `users` : comptes utilisateurs et mots de passe hachés ;
- `transactions` : opérations rattachées à un utilisateur.

Les fichiers `*.db` sont ignorés par Git.

## Authentification

### Créer un compte

`POST /auth/register`

```json
{
  "username": "Eraste",
  "email": "eraste@example.com",
  "password": "mot_de_passe"
}
```

### Se connecter

`POST /auth/login`

```json
{
  "email": "eraste@example.com",
  "password": "mot_de_passe"
}
```

La réponse contient un jeton :

```json
{
  "token": "jeton_jwt"
}
```

Les routes de transactions nécessitent ensuite cet en-tête :

```http
Authorization: Bearer jeton_jwt
```

## Routes disponibles

### Authentification

- `POST /auth/register` : créer un compte ;
- `POST /auth/login` : se connecter et obtenir un JWT.

### Utilisateurs

- `POST /users` : créer un utilisateur ;
- `GET /users` : récupérer tous les utilisateurs ;
- `GET /users/email?email=...` : rechercher un utilisateur par e-mail ;
- `GET /users/:id` : récupérer un utilisateur par identifiant ;
- `PATCH /users/:id` : modifier le nom et l’e-mail ;
- `PATCH /users/:id/password` : modifier le mot de passe ;
- `DELETE /users/:id` : supprimer un utilisateur.

### Transactions protégées

- `POST /transactions` : créer une transaction ;
- `GET /transactions` : récupérer les transactions de l’utilisateur connecté ;
- `GET /transactions/:id` : récupérer une transaction ;
- `PATCH /transactions/:id` : modifier une transaction ;
- `DELETE /transactions/:id` : supprimer une transaction.

Exemple de corps pour créer ou modifier une transaction :

```json
{
  "date": "2026-09-01",
  "category": "Alimentation",
  "amount": 42.5,
  "type": "sortie",
  "frequency": "ponctuelle",
  "description": "Courses"
}
```

Valeurs actuellement acceptées par SQLite :

- `type` : `entrée` ou `sortie` ;
- `frequency` : `mensuelle` ou `ponctuelle`.

## Scripts npm

- `npm run dev` : démarre le serveur avec `nodemon` ;
- `npm start` : démarre le serveur avec Node.js ;
- `npm test` : aucun test automatisé n’est encore configuré.

## Sécurité

- Utiliser une valeur `JWT_SECRET` longue, aléatoire et propre à chaque environnement.
- Ne jamais envoyer ou stocker un mot de passe en clair.
- Les mots de passe sont hachés avec bcrypt avant leur enregistrement.
- Les routes `/transactions` limitent les opérations à l’utilisateur identifié par le JWT.
- Les routes `/users` ne sont actuellement pas protégées et doivent être sécurisées avant une mise en production.
