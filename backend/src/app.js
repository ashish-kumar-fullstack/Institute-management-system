const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/db')
connectDB()



app.use(express.json())
app.use(express.urlencoded({extended: true}))

const authRouter = require('./routes/authRoute')
app.use('/auth', authRouter)

module.exports = app;