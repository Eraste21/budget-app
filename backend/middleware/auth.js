require('dotenv').config()

const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if (!authHeader) return res.status(401).json({error: 'token\'s missing'})

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = decoded.userId

        next()
    } catch(error) {
        return res.status(401).json({error: 'token invalid or expired'})
    }
}

module.exports = authMiddleware