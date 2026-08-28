const db = require('./db')

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001


app.get('/', (req, res) => {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?')
    const user = stmt.get(1)
    res.json({message: 'API is running\n', user})
})

app.post('/users', (req,res) => {
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})