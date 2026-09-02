const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const db = require('../../db')

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

        const stmt = db.prepare('INSERT INTO users (username, email, password_hash) VALUES (@username, @email, @password)')
        stmt.run({
            username,
            email,
            password
        })

        return res.status(201).send('user created successfully !')

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// récupérer tous les utilisateurs
router.get('/', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM users')
        const users = stmt.all()

        if (!users) return res.status(404).json({ error: 'no user found' })

        return res.status(200).json({ users })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// trouver un utilisateur par email ( GET /users/email?email=bob@gmail.com )
router.get('/email', (req, res) => {
    try {
        const { email } = req.query
        const stmt = db.prepare('SELECT id, username, email, created_at FROM users WHERE email = ?')
        const user = stmt.get(email)

        if (!user) return res.status(404).json({ error: 'email not found' })

        return res.status(200).json({ message: 'user found by email successfully', user })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// récupérer un utilisateur par id
router.get('/:id', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM users WHERE id = ?')
        const user = stmt.get(req.params.id)

        if (!user) return res.status(404).json({ error: 'no user found' })

        return res.status(200).json({ user })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})


// mettre à jour un utilisateur
router.patch('/:id', (req, res) => {
    try {
        const { username, email } = req.body
        const stmt = db.prepare('UPDATE users SET username = ?, email = ? WHERE id = ?')
        const result = stmt.run(username, email, req.params.id)

        if (result.changes === 0) return res.status(404).json({ error: 'no user found' })

        return res.status(200).json({ message: 'user updated successfully' })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// mettre à jour le mot de passe d'un utilisateur
router.patch('/:id/password', async (req, res) => {
    try {
        let stmt = db.prepare('SELECT * FROM users WHERE id = ?')
        const user = stmt.get(req.params.id)
        if (!user) return res.status(404).json({ error: 'no user found' })

        const { prev, password } = req.body
        const isValid = await comparePassword(prev, user.password_hash)
        if (!isValid) return res.status(401).json({ message: 'password invalid' })

        user.password_hash = await hashPassword(password)

        stmt = db.prepare('UPDATE users SET password_hash = ? WHERE id = ?')
        stmt.run(user.password_hash, req.params.id)

        return res.status(200).json({ message: 'user\'s password updated successfully' })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// supprimer un utilisateur
router.delete('/:id', (req, res) => {
    try {
        const stmt = db.prepare('DELETE FROM users WHERE id = ?')
        const result = stmt.run(req.params.id)

        if (result.changes === 0) return res.status(404).json({ error: 'no user found' })

        return res.status(200).json({ message: 'user deleted successfully' })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

module.exports = router