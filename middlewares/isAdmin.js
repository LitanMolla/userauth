const jwt = require('jsonwebtoken')

const isAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        // header validation
        if (!authHeader) {
            return res.status(400).json({ success: false, message: 'Please send headers' })
        }

        // token validation
        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(400).json({ success: false, message: 'Please send token' })
        }

        // token decode and validation
        const decode = jwt.decode(token)
        if (!decode) {
            return res.status(400).json({ success: false, message: 'Invalid token' })
        }

        // role validation
        const isAdmin = decode.role == 'admin'
        if (!isAdmin) {
            return res.status(401).json({ success: false, message: 'Unauthorized access' })
        }
        if (isAdmin) {
            next()
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = isAdmin