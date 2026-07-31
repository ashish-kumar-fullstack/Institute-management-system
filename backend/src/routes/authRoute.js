const express = require('express')
const router = express.Router();

const {registerInstitute, login} = require('../controllers/authController.js')

router.post('/institute-register', registerInstitute)
router.post('/login', login)


module.exports = router