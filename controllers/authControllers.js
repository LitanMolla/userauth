const User = require('../models/userModel')
const permissionList = require('../utils/permission')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

// register controller
const registerController = async (req, res) => {
    try {
        const { role = 'user', password, email, name } = req.body
        const permission = permissionList.filter(item => item.role == role)[0].permission

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

        // hash password
        const hashPassword = bcrypt.hashSync(password, 10)

        // user already exist or not
        const isExist = await User.findOne({ email })
        if (isExist) {
            return res.status(400).json({ success: false, message: 'User already exists with this email' })
        }

        // create new user
        const user = new User({ email, name, password: hashPassword, permission })
        await user.save()
        return res.status(201).json({ success: true, message: 'Register success' })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// login controller 
const loginController = async (req, res) => {
    try {
        const { password, email } = req.body

        // empty validation
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All feild are required' })
        }
        // user exist or not
        const isExist = await User.findOne({ email })
        if (!isExist) {
            return res.status(400).json({ success: false, message: 'User not exists with this email' })
        }

        // password match
        const isMatchPasword = bcrypt.compareSync(password, isExist.password)

        if (!isMatchPasword) {
            return res.status(400).json({ success: false, message: 'Password not match' })
        }

        if (isMatchPasword) {
            const token = jwt.sign(
                { _id: isExist._id, email: isExist.email, name: isExist.name , role: isExist.role},
                process.env.JWT_SECRET_KEY,
                { expiresIn: '7d' }
            )
            return res.status(200).json({ success: true, message: 'Login success', token })
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
module.exports = { registerController, loginController }