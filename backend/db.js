const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
})

const initDb = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS budgets(
            id SERIAL PRIMARY KEY,
            amount REAL NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER NOT NULL REFERENCES users(id)
        );

        CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            date TEXT NOT NULL,
            category TEXT NOT NULL,
            amount REAL NOT NULL,
            type TEXT CHECK(type IN ('Entrée', 'Sortie')) NOT NULL,
            frequency TEXT CHECK(frequency IN ('Mensuelle', 'Ponctuelle')) NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER NOT NULL REFERENCES users(id),
            budget_id INTEGER REFERENCES budgets(id)
        );
    `)
}

initDb().catch((err) => console.log(err))

module.exports = pool