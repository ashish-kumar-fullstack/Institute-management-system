const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
app.disable("etag");
const connectDB = require('./config/db')
connectDB()

const errorMiddleware = require('./middleware/errorMiddleware.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const authRouter = require('./routes/authRoute.js')
const userRouter = require('./routes/userRoute.js')

app.use('/auth', authRouter)
app.use('/user', userRouter)

app.use(errorMiddleware);


module.exports = app;