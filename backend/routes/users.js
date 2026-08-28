const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (res, req) => {
    const stmt = db.prepare('SELECT * FROM users')
    const users = stmt.all()
    res.json({message: users})
})


router.post('/', (req,res) => {
    const data = req.body
    console.log(data)

    const stmt = db.prepare('INSERT INTO users (username, email, password_hash) VALUES (@username, @email, @password_hash)')
    stmt.run({
        username: data.username,
        email: data.email,
        password_hash: data.password_hash,
    })

    res.send('It works !')
})

module.exports = router