const User = require('../models/userModel')

const allUserController = async (req, res) => {
    try {
        const users = await User.find({})
        // empty array validation
        if (users.length==0) {
            return res.status(404).json({success: false, message: 'Users not found'})
        }
        return res.status(200).json({ success: true, message: 'Users fetch successfully', data: users })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { allUserController }