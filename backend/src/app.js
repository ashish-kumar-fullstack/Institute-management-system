const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/db')
connectDB()



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const authRouter = require('./routes/authRoute.js')
const userRouter = require('./routes/userRoute.js')

app.use('/auth', authRouter)
app.use('/user', userRouter)


module.exports = app;