require('dotenv').config()

const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const db = require('../../db')
const jwt = require('jsonwebtoken')

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

// créer un compte
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body
        const password_hash = await hashPassword(password)

        const stmt = db.prepare('INSERT INTO users (username, email, password_hash) VALUES (@username, @email, @password_hash)')
        stmt.run({ username, email, password_hash })

        return res.status(201).json({message: 'user created successfully !'})

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// se connecter à un compte
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const stmt = db.prepare('SELECT * FROM users WHERE email = ?')
        const user = stmt.get(email)

        if (!user) return res.status(401).json({error: 'email or password invalid'})

        const isValid = await comparePassword(password, user.password_hash)

        if (!isValid) return res.status(401).json({error :'email or password invalid'})

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        return res.json({ token })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

module.exports = router