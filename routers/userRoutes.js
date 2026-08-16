const express = require('express')
const { allUserController } = require('../controllers/userControllers')
const router = express.Router()

router.post('/all',allUserController)

module.exports=router