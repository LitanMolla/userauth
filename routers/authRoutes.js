const express = require('express')
const { registerController, loginController } = require('../controllers/authControllers')
const authLimiter = require('../middlewares/authLimiter')
const router = express.Router()

router.post('/register', authLimiter, registerController)
router.post('/login', authLimiter, loginController)

module.exports = router