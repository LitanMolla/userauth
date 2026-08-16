const { rateLimit } = require('express-rate-limit')
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 10, 
    standardHeaders: 'draft-8',
    legacyHeaders: false, 
    ipv6Subnet: 56, 
})

module.exports = authLimiter