require('dotenv').config()
const express = require('express')
const dbConnect = require('./config/db')
const cors = require('cors')
const authRoutes = require('./routers/authRoutes')

const app = express()
app.use(express.json())
app.use('/api/v1/auth', authRoutes)
const PORT = process.env.PORT || 8000
dbConnect()

app.listen(PORT, () => { console.log('Server is running') })