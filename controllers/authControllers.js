const User = require('../models/userModel')
const permissionList = require('../utils/permission')
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
const registerController = async (req, res) => {
    try {
        const { role = 'user', password, email, name } = req.body
        const { permission } = permissionList.filter(item => item.role == role)

        // empty validation
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All feild are required' })
        }

        // emaiil validation
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Please Enter valid email' })
        }

        // password validation
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ success: false, message: 'Password minimum 8 chars, 1 Letter, 1 Number required' })
        }
        // name validation
        if (name.length < 3 || name.length > 50) {
            return res.status(400).json({ success: false, message: 'Minimum 3 chars and Maximum 50 chars allowed' })
        }

        // 
        return res.status(201).json({success: true, message: 'Register success'})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { registerController }