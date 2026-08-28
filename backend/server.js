// instanciation de la bdd
const db = require('./db')

// section des Routers
const userRouter = require('./routes/users')

// utilisation de express
const express = require('express')
const cors = require('cors')

// instanciation de l'application express
const app = express()
app.use(cors())
app.use(express.json())

// utilisation des routes
app.use('/users', userRouter)

const PORT = process.env.PORT || 3001

// Route par défaut
app.get('/', (req, res) => {
    res.json({message: 'API is running\n'})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})