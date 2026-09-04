const authMiddleware = require('../../middleware/auth')

const express = require('express')
const router = express.Router()
const db = require('../../db')

// créer une transaction
router.post('/', authMiddleware, (req, res) => {
    const userId = req.userId
    const data = req.body
    try {
        // On récupère le budget courant s'il y'en a 1, sinon on assigne pas de budget
        let stmt = db.prepare('SELECT * FROM budgets WHERE user_id = ? ORDER BY created_at DESC LIMIT 1')
        const currentBudget = stmt.get(userId)
        const budgetId = currentBudget ? currentBudget.id : null

        stmt = db.prepare(`
            INSERT INTO transactions (date, category, amount, type, frequency, description, user_id, budget_id)
            VALUES (@date, @category, @amount, @type, @frequency, @description, @userId, @budgetId)
        `)

        stmt.run({
            date: data.date,
            category: data.category,
            amount: data.amount,
            type: data.type,
            frequency: data.frequency,
            description: data.description,
            userId,
            budgetId
        })

        res.status(201).send('transaction created successfully !')
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// lister toutes les transactions ( avec un filtre )
router.get('/', authMiddleware, (req, res) => {
    const userId = req.userId
    const { budgetId, type, frequency, category } = req.query

    try {
        let query = 'SELECT * FROM transactions WHERE user_id = ?'
        const params = [userId]

        if (budgetId) {
            query += ' AND budget_id = ?'
            params.push(budgetId)
        }
        if (type) {
            query += ' AND type = ?'
            params.push(type)
        }
        if (frequency) {
            query += ' AND frequency = ?'
            params.push(frequency)
        }
        if (category) {
            query += ' AND category = ?'
            params.push(category)
        }

        const stmt = db.prepare(query)
        const transactions = stmt.all(...params)

        return res.status(200).json({ transactions })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// trouver une transaction
router.get('/:id', authMiddleware, (req, res) => {
    const transactionId = req.params.id
    const userId = req.userId
    try {
        const stmt = db.prepare('SELECT * FROM transactions WHERE id = ? AND user_id = ?')
        const transaction = stmt.get(transactionId, userId)

        if (!transaction) return res.status(404).json({ error: 'no transaction found' })

        return res.status(200).json({ transaction })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// modifier les informations d'une transaction
router.patch('/:id', authMiddleware, (req, res) => {
    const userId = req.userId
    const transactionId = req.params.id
    const { date, category, amount, type, frequency, description } = req.body
    try {
        const stmt = db.prepare(`
            UPDATE transactions SET date = ?, category = ?, amount = ?, type = ?, frequency = ?, description = ? 
            WHERE id = ? AND user_id = ?
        `)
        const result = stmt.run(date, category, amount, type, frequency, description, transactionId, userId)

        if (result.changes === 0) return res.status(404).json({ error: 'no transaction found' })

        return res.status(200).json({ message: 'transaction updated successfully' })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// supprimer une transaction
router.delete('/:id', authMiddleware, (req, res) => {
    const userId = req.userId
    const transactionId = req.params.id
    try {
        const stmt = db.prepare('DELETE FROM transactions WHERE id = ? AND user_id = ?')
        const result = stmt.run(transactionId, userId)

        if (result.changes === 0) return res.status(404).json({ error: 'no transaction found' })

        return res.status(200).json({ message: 'transaction deleted successfully' })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

module.exports = router