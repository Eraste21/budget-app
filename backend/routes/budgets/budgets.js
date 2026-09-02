const authMiddleware = require('../../middleware/auth')

const express = require('express')
const router = express.Router()
const db = require('../../db')

// créer un budget
router.post('/', authMiddleware, (req, res) => {
    const userId = req.userId
    const { amount } = req.body
    try {
        const stmt = db.prepare('INSERT INTO budgets (amount, user_id) VALUES (@amount, @userId)')
        stmt.run({
            amount,
            userId
        })
        return res.status(201).json({ message: 'budget created successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// récupérer tous les budgets présents en base
router.get('/', authMiddleware, (req, res) => {
    const userId = req.userId
    try {
        const stmt = db.prepare('SELECT * FROM budgets WHERE user_id = ?')
        const budgets = stmt.all(userId)

        res.status(200).json({ budgets })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// récupérer le budget courant
router.get('/current', authMiddleware, (req, res) => {
    const userId = req.userId
    try {
        const stmt = db.prepare('SELECT * FROM budgets WHERE user_id = ? ORDER BY created_at DESC LIMIT 1')
        const currentBudget = stmt.get(userId)

        if (!currentBudget) return res.status(404).json({ error: 'no budget found' })

        return res.status(200).json({ currentBudget })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// récupérer 1 budget
router.get('/:id', authMiddleware, (req, res) => {
    const userId = req.userId
    const { id } = req.params
    try {
        const stmt = db.prepare('SELECT * FROM budgets WHERE id = ? AND user_id = ?')
        const budget = stmt.get(id, userId)

        if (!budget) return res.status(404).json({error: 'no budget found'})

        return res.status(200).json({ budget })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// modifier le budget courant
router.patch('/current', authMiddleware, (req, res) => {
    const userId = req.userId

    try {
        let stmt = db.prepare('SELECT * FROM budgets WHERE user_id = ? ORDER BY created_at DESC LIMIT 1')
        const budget = stmt.get(userId)

        if (!budget) return res.status(404).json({ error: 'no budget found' })

        const { newAmount } = req.body

        stmt = db.prepare('UPDATE budgets SET amount = ? WHERE id = ? AND user_id = ?')
        const response = stmt.run(
            newAmount,
            budget.id,
            userId
        )

        if (response.changes === 0) return res.status(400).send('no budget found')

        res.status(200).json({ message: 'budget updated successfully', amount: newAmount })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// ajuster ( augmenter / diminuer ) le budget courant
router.patch('/current/adjust', authMiddleware, (req, res) => {
    const userId = req.userId
    const { delta } = req.body

    try {
        let stmt = db.prepare('SELECT * FROM budgets WHERE user_id = ? ORDER BY created_at DESC LIMIT 1')
        const budget = stmt.get(userId)

        if (!budget) return res.status(404).json({ error: 'no budget found' })

        const newAmount = budget.amount + delta

        stmt = db.prepare('UPDATE budgets SET amount = ? WHERE id = ? AND user_id = ?')
        const response = stmt.run(
            newAmount,
            budget.id,
            userId
        )

        if (response.changes === 0) return res.status(404).json({ error: 'no budget found' })

        res.status(200).json({ message: 'budget updated successfully', amount: newAmount })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// supprimer le budget courant
router.delete('/:id', authMiddleware, (req, res) => {
    const userId = req.userId
    const {id} = req.params
    try {
        const stmt = db.prepare('DELETE FROM budgets WHERE id = ? AND user_id = ?')
        const response = stmt.run(id, userId)

        if (response.changes === 0) return res.status(404).json({error: 'no budget found'})

        res.status(200).json({message: 'budget deleted successfully'})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router