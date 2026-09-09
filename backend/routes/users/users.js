const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const pool = require('../../db')

const saltRounds = 10

// fonction pour crypter le mot de passe
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        return await bcrypt.hash(password, salt)
    } catch (error) {
        throw error
    }
}

// fonction pour comparer les mots de passe
const comparePassword = async (prev, password) => {
    try {
        return await bcrypt.compare(prev, password)
    } catch (error) {
        throw error
    }
}

// créer un utilisateur
router.post('/', async (req, res) => {
    try {
        const { username, email } = req.body
        const password = await hashPassword(req.body.password)

        await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)',
            [username, email, password]
        )

        return res.status(201).send('user created successfully !')

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// récupérer tous les utilisateurs
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, username, email, created_at FROM users')
        const users = result.rows

        return res.status(200).json({ users })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// trouver un utilisateur par email ( GET /users/email?email=bob@gmail.com )
router.get('/email', async (req, res) => {
    try {
        const { email } = req.query
        const result = await pool.query(
            'SELECT id, username, email, created_at FROM users WHERE email = $1',
            [email]
        )
        const user = result.rows[0]

        if (!user) return res.status(404).json({ error: 'email not found' })

        return res.status(200).json({ message: 'user found by email successfully', user })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// récupérer un utilisateur par id
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, username, email, created_at FROM users WHERE id = $1',
            [req.params.id]
        )
        const user = result.rows[0]

        if (!user) return res.status(404).json({ error: 'no user found' })

        return res.status(200).json({ user })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})


// mettre à jour un utilisateur
router.patch('/:id', async (req, res) => {
    try {
        const { username, email } = req.body
        const result = await pool.query(
            'UPDATE users SET username = $1, email = $2 WHERE id = $3',
            [username, email, req.params.id]
        )

        if (result.rowCount === 0) return res.status(404).json({ error: 'no user found' })

        return res.status(200).json({ message: 'user updated successfully' })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// mettre à jour le mot de passe d'un utilisateur
router.patch('/:id/password', async (req, res) => {
    try {
        let result = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [req.params.id]
        )
        const user = result.rows[0]
        if (!user) return res.status(404).json({ error: 'no user found' })

        const { prev, password } = req.body
        const isValid = await comparePassword(prev, user.password_hash)
        if (!isValid) return res.status(401).json({ message: 'password invalid' })

        user.password_hash = await hashPassword(password)

        result = await pool.query(
            'UPDATE users SET password_hash = $1 WHERE id = $2',
            [user.password_hash, req.params.id]
        )

        return res.status(200).json({ message: 'user\'s password updated successfully' })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// supprimer un utilisateur
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM users WHERE id = $1',
            [req.params.id]
        )

        if (result.rowCount === 0) return res.status(404).json({ error: 'no user found' })

        return res.status(200).json({ message: 'user deleted successfully' })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

module.exports = router
