const express = require('express')
const { allUserController } = require('../controllers/userControllers')
const isAdmin = require('../middlewares/isAdmin')
const router = express.Router()

router.post('/all',isAdmin,allUserController)

module.exports=router