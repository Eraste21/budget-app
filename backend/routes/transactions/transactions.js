const authMiddleware = require('../../middleware/auth')

const express = require('express')
const router = express.Router()
const pool = require('../../db')

// créer une transaction
router.post('/', authMiddleware, async (req, res) => {
    const userId = req.userId
    const data = req.body
    try {
        // On récupère le budget courant s'il y'en a 1, sinon on assigne pas de budget
        const stmt = await pool.query(
            'SELECT * FROM budgets WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
            [userId]
        )
        const currentBudget = stmt.rows[0]
        const budgetId = currentBudget ? currentBudget.id : null

        await pool.query(
            `INSERT INTO transactions (date, category, amount, type, frequency, description, user_id, budget_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [data.date, data.category, data.amount, data.type, data.frequency, data.description, userId, budgetId]
        )

        res.status(201).send('transaction created successfully !')
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// lister toutes les transactions ( avec un filtre )
router.get('/', authMiddleware, async (req, res) => {
    const userId = req.userId
    const { budgetId, type, frequency, category, limit } = req.query

    try {
        let query = 'SELECT * FROM transactions WHERE user_id = $1'
        const params = [userId]

        if (budgetId) {
            params.push(budgetId)
            query += ` AND budget_id = $${params.length}`
        }
        if (type) {
            params.push(type)
            query += ` AND type = $${params.length}`
        }
        if (frequency) {
            params.push(frequency)
            query += ` AND frequency = $${params.length}`
        }
        if (category) {
            params.push(category)
            query += ` AND category = $${params.length}`
        }

        query += ' ORDER BY created_at DESC'

        if (limit) {
            params.push(limit)
            query += ` LIMIT $${params.length}`
        }

        const transactions = await pool.query(query, params)

        return res.status(200).json({ transactions: transactions.rows })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// calculer le total des entrées / sorties
router.get('/total', authMiddleware, async (req, res) => {
    const { type, budgetId } = req.query

    if (!type) return res.status(400).json({ error: 'type query parameter is required' })

    const userId = req.userId
    try {
        const params = [userId, type]
        let query = 'SELECT SUM(amount) AS total FROM transactions where user_id = $1 AND type = $2'

        if (budgetId) {
            params.push(budgetId)
            query += ` AND budget_id = $${params.length}`
        }

        const result = await pool.query(query, params)

        return res.status(200).json({total: result.rows[0]?.total || 0})
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// trouver une transaction
router.get('/:id', authMiddleware, async (req, res) => {
    const transactionId = req.params.id
    const userId = req.userId
    try {
        const result = await pool.query(
            'SELECT * FROM transactions WHERE id = $1 AND user_id = $2',
            [transactionId, userId]
        )
        const transaction = result.rows[0]

        if (!transaction) return res.status(404).json({ error: 'no transaction found' })

        return res.status(200).json({ transaction })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// modifier les informations d'une transaction
router.patch('/:id', authMiddleware, async (req, res) => {
    const userId = req.userId
    const transactionId = req.params.id
    const { date, category, amount, type, frequency, description } = req.body
    try {
        const result = await pool.query(`
            UPDATE transactions SET date = $1, category = $2, amount = $3, type = $4, frequency = $5, description = $6
            WHERE id = $7 AND user_id = $8`, [date, category, amount, type, frequency, description, transactionId, userId])

        if (result.rowCount === 0) return res.status(404).json({ error: 'no transaction found' })

        return res.status(200).json({ message: 'transaction updated successfully' })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// supprimer une transaction
router.delete('/:id', authMiddleware, async (req, res) => {
    const userId = req.userId
    const transactionId = req.params.id
    try {
        const result = await pool.query(
            'DELETE FROM transactions WHERE id = $1 AND user_id = $2',
            [transactionId, userId]
        )

        if (result.rowCount === 0) return res.status(404).json({ error: 'no transaction found' })

        return res.status(200).json({ message: 'transaction deleted successfully' })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

module.exports = router
