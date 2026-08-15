const express = require('express')
const permissionList = require('../utils/permission')
const router = express.Router()
router.post('/register', async (req, res) => {
    try {
        const { role, otp, password, email, name } = req.body
        const { permission } = permissionList.filter(item => item.role == role)
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
})
module.exports = router