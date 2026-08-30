const authMiddleware = require('../../middleware/auth')

const express = require('express')
const router = express.Router()
const db = require('../../db')

router.get('/', authMiddleware, (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM transactions WHERE user_id = ?')
        const transactions = stmt.all(req.userId)

        return res.status(200).json({ transactions })
    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
})

module.exports = router