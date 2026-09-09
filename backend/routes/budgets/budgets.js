const authMiddleware = require('../../middleware/auth')

const express = require('express')
const router = express.Router()
const pool = require('../../db')

// créer un budget
router.post('/', authMiddleware, async (req, res) => {
    const userId = req.userId
    const { amount } = req.body
    try {
        await pool.query(
            'INSERT INTO budgets (amount, user_id) VALUES ($1, $2)',
            [amount, userId]
        )
        return res.status(201).json({ message: 'budget created successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// récupérer tous les budgets présents en base
router.get('/', authMiddleware, async (req, res) => {
    const userId = req.userId
    try {
        const stmt = await pool.query(
            'SELECT * FROM budgets WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        )
        const budgets = stmt.rows

        res.status(200).json({ budgets })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// récupérer le budget courant
router.get('/current', authMiddleware, async (req, res) => {
    const userId = req.userId
    try {
        const stmt = await pool.query(
            'SELECT * FROM budgets WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
            [userId]
        )
        const currentBudget = stmt.rows[0]

        if (!currentBudget) return res.status(404).json({ error: 'no budget found' })

        return res.status(200).json({ currentBudget })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// calucl du total des dépenses sur le budget actif
router.get('/current/spent', authMiddleware, async (req, res) => {
    const userId = req.userId
    try {
        let stmt = await pool.query(
            'SELECT * FROM budgets WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
            [userId]
        )
        const currentBudget = stmt.rows[0]

        if (!currentBudget) return res.status(404).json({ error: 'no budget found' })

        const budgetId = currentBudget.id

        stmt = await pool.query(
            `SELECT SUM(amount) AS total
            FROM transactions
            WHERE user_id = $1 AND budget_id = $2 AND type = 'Sortie'`,
            [userId, budgetId]
        )

        const result = stmt.rows[0]
        const spent = result.total ?? 0

        return res.status(200).json({ spent })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// récupérer 1 budget
router.get('/:id', authMiddleware, async (req, res) => {
    const userId = req.userId
    const { id } = req.params
    try {
        const stmt = await pool.query(
            'SELECT * FROM budgets WHERE id = $1 AND user_id = $2',
            [id, userId]
        )
        const budget = stmt.rows[0]

        if (!budget) return res.status(404).json({ error: 'no budget found' })

        return res.status(200).json({ budget })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// modifier le budget courant
router.patch('/current', authMiddleware, async (req, res) => {
    const userId = req.userId

    try {
        let stmt = await pool.query('SELECT * FROM budgets WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1', [userId])
        const budget = stmt.rows[0]

        if (!budget) return res.status(404).json({ error: 'no budget found' })

        const { newAmount } = req.body

        stmt = await pool.query(
            'UPDATE budgets SET amount = $1 WHERE id = $2 AND user_id = $3',
            [ newAmount, budget.id, userId ]
        )

        if (stmt.rowCount === 0) return res.status(400).send('no budget found')

        res.status(200).json({ message: 'budget updated successfully', amount: newAmount })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// ajuster ( augmenter / diminuer ) le budget courant
router.patch('/current/adjust', authMiddleware, async (req, res) => {
    const userId = req.userId
    const { delta } = req.body

    try {
        let stmt = await pool.query(
            'SELECT * FROM budgets WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
            [userId]
        )
        const budget = stmt.rows[0]

        if (!budget) return res.status(404).json({ error: 'no budget found' })

        const newAmount = budget.amount + delta

        stmt = await pool.query(
            'UPDATE budgets SET amount = $1 WHERE id = $2 AND user_id = $3',
            [newAmount, budget.id, userId]
        )

        if (stmt.rowCount === 0) return res.status(404).json({ error: 'no budget found' })

        res.status(200).json({ message: 'budget updated successfully', amount: newAmount })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// supprimer un budget
router.delete('/:id', authMiddleware, async (req, res) => {
    const userId = req.userId
    const { id } = req.params
    try {
        const stmt = await pool.query(
            'DELETE FROM budgets WHERE id = $1 AND user_id = $2',
            [id, userId]
        )

        if (stmt.rowCount === 0) return res.status(404).json({ error: 'no budget found' })

        res.status(200).json({ message: 'budget deleted successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router
