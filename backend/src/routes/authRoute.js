const express = require('express')

const router = express.Router()

const authController = require('../controllers/authController')

router.post('/institute-register', authController.instituteRegister)

router.get('/login',authController.login)
router.get('/logout',authController.logout)

module.exports = router;